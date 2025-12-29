'use client'

import { forwardRef, useId, ComponentProps } from 'react'
import clsx from 'clsx'

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
    label: string
    error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    function Checkbox({ label, error, className, ...props }, ref) {
        const id = useId()

        return (
            <div className="field">
                <label htmlFor={id} className="checkbox-label">
                    <input
                        id={id}
                        type="checkbox"
                        ref={ref}
                        className={clsx(className, { errored: !!error })}
                        {...props}
                    />
                    {' '}{label}
                </label>
                {error && <div className="error">{error}</div>}
            </div>
        )
    }
)
