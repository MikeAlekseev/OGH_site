'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

import { validatePhone } from '@/utils/userDataValidators'
import { useMessage } from '@/hooks/useMessage'
import { sendVacancyApplication } from '@/lib/send-mail'
import { TextInput, TextArea } from '@/app/_components/inputs'

type FormValues = {
    phone: string
    email: string
    coverLetter: string
}

interface VacancyApplicationFormProps {
    vacancyTitle: string
    vacancyPrice?: string
}

export const VacancyApplicationForm = ({ vacancyTitle, vacancyPrice }: VacancyApplicationFormProps) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { phone: '', email: '', coverLetter: '' },
        mode: 'onSubmit',
    })

    const [message, setMessage] = useMessage()

    const onSubmit = useCallback(async (data: FormValues) => {
        setMessage(null)

        try {
            await sendVacancyApplication({
                phone: data.phone,
                email: data.email,
                coverLetter: data.coverLetter,
                vacancyTitle,
                vacancyPrice,
            })

            reset()

            setMessage({ text: 'Отклик отправлен', timeout: 5000, type: 'success' })
        } catch {
            setMessage({ text: 'Не удалось отправить отклик', type: 'error' })
        }
    }, [reset, setMessage, vacancyTitle, vacancyPrice])

    return (
        <div className="vacancy-application">
            <h2>Откликнуться на вакансию</h2>

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

                <TextInput
                    label="Email"
                    type="email"
                    placeholder="example@mail.ru"
                    {...register('email')}
                    disabled={isSubmitting}
                    error={errors.email?.message}
                />

                <TextArea
                    label="Сопроводительное письмо"
                    rows={4}
                    placeholder="Расскажите о себе"
                    {...register('coverLetter')}
                    disabled={isSubmitting}
                    error={errors.coverLetter?.message}
                />

                <div className="actions">
                    <button type="submit" className="primary-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка…' : 'Отправить отклик'}
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
        </div>
    )
}
