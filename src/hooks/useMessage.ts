import { useCallback, useRef, useState } from 'react'

export function useMessage() {
    const [message, setMessageT] = useState<{ text: string, timeoutId: ReturnType<typeof setTimeout> | null, type: 'success' | 'error' } | null>(null)
    const messageRef = useRef(message)

    messageRef.current = message

    const setMessage = useCallback((value: { text: string, timeout?: number, type: 'success' | 'error' } | null) => {
        if (messageRef.current?.timeoutId) {
            clearTimeout(messageRef.current.timeoutId)
        }

        if (value) {
            const { type, timeout, text } = value
            const timeoutId = timeout ? setTimeout(() => setMessageT(null), timeout) : null

            setMessageT({ text, timeoutId, type })
        } else {
            setMessageT(null)
        }



    }, [])

    return [message, setMessage] as const
}
