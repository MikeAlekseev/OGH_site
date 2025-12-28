'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'

import { Contacts } from '@/repository/types'
import { MdEditor, TextInput } from '@/app/_components/inputs'

import { saveContactsAction, SaveContactsActionData } from './actions'

type FormData = {
    text: string
    yMap: string
}

interface EditFormProps {
    initial: Contacts
}

export function EditForm({ initial }: EditFormProps) {
    const router = useRouter()

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            text: initial.text,
            yMap: initial.yMap,
        },
    })

    const onSubmit = useCallback(
        async (data: FormData) => {
            if (isSubmitting) return

            const finalData: SaveContactsActionData = {
                text: data.text,
                yMap: data.yMap,
            }

            try {
                await saveContactsAction(finalData)
                toast.success('Контакты сохранены')
                router.refresh()
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : 'Ошибка сохранения'

                setError('root', { message })
            }
        },
        [isSubmitting, router, setError]
    )

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
                name="text"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                    <MdEditor
                        label="Контактная информация (Markdown)"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.text?.message}
                        rows={15}
                    />
                )}
            />

            <TextInput
                label="Ссылка на Яндекс Карту"
                placeholder="https://yandex.ru/map-widget/v1/?um=constructor..."
                hint={<>Ссылка для iframe из <a href="https://yandex.ru/map-constructor" target="_blank">конструктора Яндекс Карт</a> вида &#34;{'https://yandex.ru/map-widget/v1/?um=constructor%3A<МНОГО-ЦИФР-И-БУКВ>&source=constructor'}&#34;</>}
                error={errors.yMap?.message}
                {...register('yMap')}
            />

            {errors.root?.message && (
                <div className="error" role="alert">
                    {errors.root.message}
                </div>
            )}

            <div className="buttons-wrapper">
                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSubmitting}
                >
                    Сохранить
                </button>
                <Link href="/admin" className="dangerous-button">
                    Назад
                </Link>
            </div>
        </form>
    )
}
