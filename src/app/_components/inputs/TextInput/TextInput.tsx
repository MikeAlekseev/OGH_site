'use client'

import { forwardRef, useId, ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'

interface TextInputProps extends ComponentProps<'input'> {
    label: string
    error?: string
    hint?: string | ReactNode
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput({ label, error, hint, className, ...props }, ref) {
        const id = useId()

        return (
            <div className="field">
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    type="text"
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
