'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

import { ImageLightbox, LightboxImage } from '../ImageLightbox'

import styles from './Gallery.module.scss'

interface GalleryProps {
    images: string[]
    title: string
}

export function Gallery({ images, title }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const lightboxImages: LightboxImage[] = useMemo(() =>
        images.map((src, index) => ({
            src,
            alt: `${title} - фото ${index + 1}`,
        })),
    [images, title])

    if (images.length === 0) {
        return null
    }

    return (
        <>
            <div className={styles.grid}>
                {images.map((imgSrc, index) => (
                    <button
                        key={index}
                        type="button"
                        className={styles.thumbnail}
                        onClick={() => setSelectedIndex(index)}
                        aria-label={`Открыть фото ${index + 1} из ${images.length}: ${title}`}
                    >
                        <Image
                            src={imgSrc}
                            alt={`${title} - фото ${index + 1}`}
                            width={300}
                            height={300}
                            className={styles.image}
                        />
                    </button>
                ))}
            </div>

            <ImageLightbox
                images={lightboxImages}
                selected={selectedIndex}
                onChange={setSelectedIndex}
            />
        </>
    )
}
