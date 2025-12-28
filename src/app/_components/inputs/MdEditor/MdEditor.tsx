'use client'

import { forwardRef, useId } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface MdEditorProps {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    rows?: number
}

export const MdEditor = forwardRef<HTMLDivElement, MdEditorProps>(
    function MdEditor({ label, value, onChange, error, rows = 10 }, ref) {
        const id = useId()

        return (
            <div className="field" ref={ref}>
                <label htmlFor={id}>{label}</label>
                <div data-color-mode="light">
                    <MDEditor
                        id={id}
                        value={value}
                        onChange={(val) => onChange(val ?? '')}
                        height={rows * 24}
                        preview="edit"
                        extraCommands={[]}
                        className={clsx({ errored: !!error })}
                    />
                </div>
                {error && <div className="error">{error}</div>}
            </div>
        )
    }
)
