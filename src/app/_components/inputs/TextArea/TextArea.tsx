'use client'

import { forwardRef, useId, ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'

interface TextAreaProps extends ComponentProps<'textarea'> {
    label: string
    error?: string
    hint?: string | ReactNode
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    function TextArea({ label, error, hint, className, ...props }, ref) {
        const id = useId()

        return (
            <div className="field">
                <label htmlFor={id}>{label}</label>
                <textarea
                    id={id}
                    ref={ref}
                    className={clsx(className, { errored: !!error })}
                    {...props}
                />
                {hint && <div className="hint">{hint}</div>}
                {error && <div className="error">{error}</div>}
            </div>
        )
    }
)
