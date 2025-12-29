'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

import { validatePhone, validateMessage } from '@/utils/userDataValidators'
import { useMessage } from '@/hooks/useMessage'
import { sendMail } from '@/lib/send-mail'
import { TextInput, TextArea } from '@/app/_components/inputs'

type FormValues = {
    phone: string
    message: string
}

export const FeedbackForm = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { phone: '', message: '' },
        mode: 'onSubmit',
    })

    const [message, setMessage] = useMessage()

    const onSubmit = useCallback(async (data: FormValues) => {
        setMessage(null)

        try {
            await sendMail(data.phone, data.message, { subject: 'Обратная связь' })

            reset()

            setMessage({ text: 'Сообщение отправлено', timeout: 5000, type: 'success' })
        } catch {
            setMessage({ text: 'Не удалось отправить сообщение', type: 'error' })
        }
    }, [reset, setMessage])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <TextInput
                label="Телефон"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                {...register('phone', {
                    validate: (value) => validatePhone(value) || true,
                })}
                disabled={isSubmitting}
                error={errors.phone?.message}
            />

            <TextArea
                label="Сообщение"
                rows={4}
                {...register('message', {
                    validate: (value) => validateMessage(value) || true,
                })}
                disabled={isSubmitting}
                error={errors.message?.message}
            />

            <div className="actions">
                <button type="submit" className="primary-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка…' : 'Отправить'}
                </button>
            </div>

            {
                message && (
                    <p className={clsx({ success: message.type === 'success', error: message.type === 'error' })}>
                        {message.text}
                    </p>
                )
            }
        </form>
    )
}
