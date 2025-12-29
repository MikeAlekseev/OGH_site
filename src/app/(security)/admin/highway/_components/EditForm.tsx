'use client'

import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Highway } from '@/repository/types'
import { TextInput, MdEditor } from '@/app/_components/inputs'

import { saveHighwayAction, SaveHighwayActionData } from './actions'

type FormData = {
    title: string
    text: string
}

interface EditFormProps {
    initial?: Highway | null
}

export function EditForm({ initial }: EditFormProps) {
    const router = useRouter()
    const isEditing = !!initial

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
            text: initial?.text ?? '',
        },
    })

    const onSubmit = async (data: FormData) => {
        if (isSubmitting) {
            return
        }

        if (!data.title || data.title.trim() === '') {
            setError('root', { message: 'Необходимо указать заголовок' })

            return
        }

        const finalData: SaveHighwayActionData = {
            id: initial?.id,
            title: data.title,
            text: data.text,
            galleryImgSrc: initial?.galleryImgSrc ?? [],
        }

        try {
            const result = await saveHighwayAction(finalData)

            if (result.isCreating) {
                toast.success('Запись создана')
                router.push(`/admin/highway/${result.id}`)
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
            {isEditing && (
                <div className="field">
                    <div className="buttons-wrapper">
                        <Link href={`/admin/highway/${initial.id}/gallery`} className="primary-button">
                            Галерея фотографий ({initial.galleryImgSrc.length})
                        </Link>
                    </div>
                </div>
            )}

            <TextInput
                label="Заголовок"
                {...register('title', { required: 'Обязательное поле' })}
                error={errors.title?.message}
            />

            <Controller
                name="text"
                control={control}
                render={({ field }) => (
                    <MdEditor
                        label="Текст"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.text?.message}
                        rows={10}
                    />
                )}
            />

            {errors.root?.message && (
                <div className="error" role="alert">{errors.root.message}</div>
            )}

            <div className="buttons-wrapper">
                <button type="submit" className="primary-button" disabled={isSubmitting}>
                    Сохранить
                </button>
                <Link href="/admin/highway" className="dangerous-button">
                    Отменить
                </Link>
            </div>
        </form>
    )
}
