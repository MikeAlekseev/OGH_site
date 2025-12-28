import Image from 'next/image'
import clsx from 'clsx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { GripVerticalIcon } from '@/app/(security)/admin/_resources/gripVertical'

import styles from './GalleryPhotoItem.module.scss'

interface GalleryPhotoItemProps {
    photoUrl: string
    index: number
    isProcessing: boolean
    onDelete: (photoUrl: string) => void
}

export function GalleryPhotoItem({
    photoUrl,
    index,
    isProcessing,
    onDelete,
}: GalleryPhotoItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: photoUrl })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const photoNumber = index + 1

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx(styles.wrapper, {
                [styles.processing]: isProcessing,
                [styles.dragging]: isDragging,
            })}
            role="listitem"
            aria-label={`Фото ${photoNumber}`}
        >
            <Image
                src={photoUrl}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                sizes="200px"
            />

            <button
                type="button"
                className={styles.dragHandle}
                {...attributes}
                {...listeners}
                suppressHydrationWarning
                aria-label={`Перетащить фото ${photoNumber}`}
            >
                <GripVerticalIcon className={styles.dragIcon} size={24} />
            </button>

            <button
                type="button"
                className={styles.deleteButton}
                onClick={() => !isProcessing && onDelete(photoUrl)}
                disabled={isProcessing}
                aria-label={`Удалить фото ${photoNumber}`}
            >
                <span aria-hidden="true">×</span>
            </button>
        </div>
    )
}
