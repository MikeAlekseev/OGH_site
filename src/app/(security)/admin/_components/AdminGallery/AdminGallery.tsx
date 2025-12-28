'use client'

import { DndContext, closestCenter, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { GalleryPhotoItem } from './GalleryPhotoItem'
import { GalleryPhotoSkeleton } from './GalleryPhotoSkeleton'

import styles from './AdminGallery.module.scss'

interface AdminGalleryProps {
    photos: string[]
    isProcessing: boolean
    handleDelete: (photoUrl: string) => void
    onReorder?: (newOrder: string[]) => void
    uploadingCount?: number
}

const screenReaderAnnouncements = {
    onDragStart() {
        return `Начато перетаскивание фото.`
    },
    onDragOver({ over }: { over: { id: string | number } | null }) {
        if (over) {
            return `Фото над позицией ${over.id}.`
        }

        return 'Фото вне области сортировки.'
    },
    onDragEnd({ over }: { over: { id: string | number } | null }) {
        if (over) {
            return `Фото перемещено на новую позицию.`
        }

        return 'Перетаскивание отменено.'
    },
    onDragCancel() {
        return 'Перетаскивание отменено.'
    },
}

export function AdminGallery({ photos, isProcessing, handleDelete, onReorder, uploadingCount = 0 }: AdminGalleryProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id && onReorder) {
            const oldIndex = photos.indexOf(active.id as string)
            const newIndex = photos.indexOf(over.id as string)
            const newOrder = arrayMove(photos, oldIndex, newIndex)

            onReorder(newOrder)
        }
    }

    const isUploading = uploadingCount > 0
    const totalCount = photos.length + uploadingCount

    if (!photos.length && !isUploading) {
        return null
    }

    return (
        <div className="field">
            <label id="gallery-label">
                Фотографии в галерее ({photos.length})
                {isUploading && <span className="sr-only">, загружается: {uploadingCount}</span>}
            </label>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                accessibility={{ announcements: screenReaderAnnouncements }}
            >
                <SortableContext
                    items={photos}
                    strategy={rectSortingStrategy}
                    disabled={isProcessing || isUploading || !onReorder}
                >
                    <div className={styles.wrapper} role="list" aria-labelledby="gallery-label">
                        {photos.map((photoUrl, index) => (
                            <GalleryPhotoItem
                                key={photoUrl}
                                photoUrl={photoUrl}
                                index={index}
                                isProcessing={isProcessing || isUploading}
                                onDelete={handleDelete}
                            />
                        ))}
                        {isUploading && (
                            <GalleryPhotoSkeleton index={totalCount - uploadingCount} />
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}
