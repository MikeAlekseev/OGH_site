import styles from './GalleryPhotoSkeleton.module.scss'

interface GalleryPhotoSkeletonProps {
    index: number
}

export function GalleryPhotoSkeleton({ index }: GalleryPhotoSkeletonProps) {
    return (
        <div
            className={styles.wrapper}
            role="listitem"
            aria-label={`Загрузка фото ${index + 1}`}
        >
            <div className={styles.shimmer} />
            <span className={styles.loadingText}>Загрузка...</span>
        </div>
    )
}
