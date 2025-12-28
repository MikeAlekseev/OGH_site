'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).finally(() => {
            router.replace('/')
        })
    }, [router])

    return (
        <div className="page-content">
            <div className="pc-container">
                <i>
                    Выход...
                </i>
            </div>
        </div>
    )
}
