'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { toast } from 'sonner'

import { AdminGallery } from '../AdminGallery'

export interface GalleryEditFormActions {
    addPhoto: (entityId: string, file: File) => Promise<{ photoUrl: string }>
    deletePhoto: (entityId: string, photoUrl: string) => Promise<void>
    reorderPhotos: (entityId: string, newOrder: string[]) => Promise<void>
}

interface GalleryEditFormProps {
    entityId: string
    initialPhotos: string[]
    actions: GalleryEditFormActions
}

export function GalleryEditForm({ entityId, initialPhotos, actions }: GalleryEditFormProps) {
    const router = useRouter()
    const [photos, setPhotos] = useState<string[]>(initialPhotos)
    const [isProcessing, setIsProcessing] = useState(false)
    const [uploadingCount, setUploadingCount] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files || files.length === 0) {
            return
        }

        const fileList = Array.from(files)

        setError(null)
        setUploadingCount(fileList.length)

        let uploadedCount = 0
        let currentPhotos = [...photos]

        for (const file of fileList) {
            try {
                const result = await actions.addPhoto(entityId, file)

                currentPhotos = [...currentPhotos, result.photoUrl]
                setPhotos(currentPhotos)
                uploadedCount++
                setUploadingCount(fileList.length - uploadedCount)
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : 'Ошибка добавления фотографии'

                setError(message)
                toast.error(message)
                setUploadingCount(0)

                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }

                if (uploadedCount > 0) {
                    toast.success(`Загружено ${uploadedCount} из ${fileList.length} файлов`)
                    router.refresh()
                }

                return
            }
        }

        setUploadingCount(0)
        toast.success(`Загружено ${fileList.length} фотографий`)
        router.refresh()

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleDelete = async (photoUrl: string) => {
        if (!confirm('Удалить эту фотографию?')) {
            return
        }

        setIsProcessing(true)
        setError(null)

        try {
            await actions.deletePhoto(entityId, photoUrl)
            setPhotos(photos.filter(url => url !== photoUrl))
            toast.success('Фотография удалена')
            router.refresh()
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Ошибка удаления'

            setError(message)
            toast.error(message)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleReorder = async (newOrder: string[]) => {
        setIsProcessing(true)
        setError(null)

        const oldPhotos = photos

        setPhotos(newOrder)

        try {
            await actions.reorderPhotos(entityId, newOrder)
            toast.success('Порядок изменён')
            router.refresh()
        } catch (e: unknown) {
            setPhotos(oldPhotos)

            const message = e instanceof Error ? e.message : 'Ошибка изменения порядка'

            setError(message)
            toast.error(message)
        } finally {
            setIsProcessing(false)
        }
    }

    const isUploading = uploadingCount > 0
    const isDisabled = isProcessing || isUploading

    return (
        <div className="form">
            <AdminGallery
                photos={photos}
                isProcessing={isProcessing}
                handleDelete={handleDelete}
                onReorder={handleReorder}
                uploadingCount={uploadingCount}
            />

            <div className="field">
                <label htmlFor="gallery-photo">
                    <span
                        className="primary-button"
                        style={{
                            opacity: isDisabled ? 0.5 : 1,
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isUploading ? `Загрузка... (${uploadingCount})` : 'Добавить фотографии'}
                    </span>
                </label>

                <input
                    ref={fileInputRef}
                    id="gallery-photo"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={isDisabled}
                />
            </div>

            {error && <div className="error" role="alert">{error}</div>}

            {photos.length === 0 && !isUploading && (
                <i>В галерее пока нет фотографий.</i>
            )}
        </div>
    )
}
