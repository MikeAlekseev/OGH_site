'use client'

import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { VacancyFull } from '@/repository/types'
import { Checkbox, TextInput, MdEditor } from '@/app/_components/inputs'

import { saveVacancyAction, SaveVacancyActionData } from './actions'

type FormData = {
    title: string
    price: string
    text: string
    isArchived: boolean
}

interface EditFormProps {
    initial?: VacancyFull | null
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
            title: initial?.title ?? '',
            price: initial?.price ?? '',
            text: initial?.text ?? '',
            isArchived: initial?.isArchived ?? false,
        },
    })

    const onSubmit = async (data: FormData) => {
        if (isSubmitting) {
            return
        }

        if (!data.title || data.title.trim() === '') {
            setError('root', { message: 'Необходимо указать название вакансии' })

            return
        }

        const finalData: SaveVacancyActionData = {
            id: initial?.id,
            title: data.title,
            price: data.price,
            text: data.text,
            isArchived: data.isArchived,
        }

        try {
            const result = await saveVacancyAction(finalData)

            if (result.isCreating) {
                toast.success('Вакансия создана')
                router.push(`/admin/vacancy/${result.id}`)
            } else {
                toast.success('Изменения сохранены')
                router.refresh()
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Ошибка сохранения'

            setError('root', { message })
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextInput
                label="Название вакансии"
                {...register('title', { required: 'Обязательное поле' })}
                error={errors.title?.message}
            />

            <TextInput
                label="Зарплата"
                placeholder="например: от 50 000 руб."
                {...register('price')}
                error={errors.price?.message}
            />

            <Controller
                name="text"
                control={control}
                render={({ field }) => (
                    <MdEditor
                        label="Описание вакансии"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.text?.message}
                        rows={10}
                    />
                )}
            />

            <Checkbox
                label="В архиве"
                {...register('isArchived')}
            />

            {errors.root?.message && (
                <div className="error" role="alert">{errors.root.message}</div>
            )}

            <div className="buttons-wrapper">
                <button type="submit" className="primary-button" disabled={isSubmitting}>
                    Сохранить
                </button>
                <Link href="/admin/vacancy" className="dangerous-button">
                    Отменить
                </Link>
            </div>
        </form>
    )
}
