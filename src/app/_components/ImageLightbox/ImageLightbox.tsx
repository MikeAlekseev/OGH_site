'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'

import { XMarkIcon } from '@/app/_resources/xmark'
import { AngleLeftIcon } from '@/app/_resources/angle-left'
import { AngleRightIcon } from '@/app/_resources/angle-right'

import styles from './ImageLightbox.module.scss'

export interface LightboxImage {
    src: string
    alt: string
}

interface ImageLightboxProps {
    images: LightboxImage[]
    selected: number | null
    onChange: (index: number | null) => void
}

interface ContainerSize {
    width: number
    height: number
}

function calculateContainerSize(
    naturalWidth: number,
    naturalHeight: number
): ContainerSize {
    const maxWidth = window.innerWidth * 0.9
    const maxHeight = window.innerHeight * 0.8

    const naturalRatio = naturalWidth / naturalHeight
    const containerRatio = maxWidth / maxHeight

    let width: number
    let height: number

    if (naturalRatio > containerRatio) {
        width = Math.min(naturalWidth, maxWidth)
        height = width / naturalRatio
    } else {
        height = Math.min(naturalHeight, maxHeight)
        width = height * naturalRatio
    }

    return { width, height }
}

export function ImageLightbox({ images, selected, onChange }: ImageLightboxProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [containerSize, setContainerSize] = useState<ContainerSize | undefined>(undefined)

    const dialogRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (selected === null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [selected])

    useEffect(() => {
        if (selected !== null) {
            previousActiveElement.current = document.activeElement as HTMLElement
            closeButtonRef.current?.focus()

            return () => {
                previousActiveElement.current?.focus()
            }
        }
    }, [selected])

    const imagesLength = images.length
    const hasMultipleImages = images.length > 1

    const onClose = useCallback(() => {
        onChange(null)
    }, [onChange])

    const goToPrevious = useCallback(() => {
        if (selected === null || imagesLength === 1) {
            onClose()
        } else {
            onChange(selected === 0 ? imagesLength - 1 : selected - 1)
        }
    }, [selected, imagesLength, onChange, onClose])

    const goToNext = useCallback(() => {
        if (selected === null || imagesLength === 1) {
            onClose()
        } else {
            onChange(selected === imagesLength - 1 ? 0 : selected + 1)
        }
    }, [selected, imagesLength, onChange, onClose])

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => hasMultipleImages && goToNext(),
        onSwipedRight: () => hasMultipleImages && goToPrevious(),
        trackMouse: true,
        preventScrollOnSwipe: true,
    })

    useEffect(() => {
        if (selected !== null) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose()
                } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
                    goToPrevious()
                } else if (e.key === 'ArrowRight' && hasMultipleImages) {
                    goToNext()
                }
            }

            window.addEventListener('keydown', handleKeyDown)

            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selected, onClose, goToPrevious, goToNext, hasMultipleImages])

    useEffect(() => {
        if (selected !== null) {
            const originalOverflow = document.body.style.overflow

            document.body.style.overflow = 'hidden'

            return () => {
                document.body.style.overflow = originalOverflow
            }
        }
    }, [selected])

    const currentImage = selected === null ? null : images[selected]

    const handleImageLoad = useCallback((
        loadedIndex: number,
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        const img = event.currentTarget
        const size = calculateContainerSize(img.naturalWidth, img.naturalHeight)

        setContainerSize(size)
        setIsLoading(false)
    }, [])

    if (selected === null || !currentImage) {
        return null
    }

    const content = (
        <div
            ref={dialogRef}
            className={styles.lightbox}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Просмотр фотографии ${selected + 1} из ${images.length}`}
        >
            <button
                ref={closeButtonRef}
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Закрыть просмотр фотографии"
            >
                <XMarkIcon size={36}/>
            </button>

            {hasMultipleImages && (
                <button
                    className={styles.prevButton}
                    onClick={(e) => {
                        e.stopPropagation()
                        goToPrevious()
                    }}
                    aria-label="Предыдущее фото"
                >
                    <AngleLeftIcon size={36}/>
                </button>
            )}

            <div
                {...swipeHandlers}
                className={styles.lightboxContent}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={styles.imageContainer}
                    style={containerSize}
                >
                    {isLoading && (
                        <div className={styles.loader}>
                            <div className={styles.spinner} />
                        </div>
                    )}

                    <Image
                        key={selected}
                        src={currentImage.src}
                        alt={currentImage.alt}
                        width={1000}
                        height={800}
                        className={styles.lightboxImage}
                        onLoad={(e) => handleImageLoad(selected, e)}
                    />
                </div>

                {hasMultipleImages && (
                    <div className={styles.counter}>
                        {selected + 1} / {images.length}
                    </div>
                )}
            </div>

            {hasMultipleImages && (
                <button
                    className={styles.nextButton}
                    onClick={(e) => {
                        e.stopPropagation()
                        goToNext()
                    }}
                    aria-label="Следующее фото"
                >
                    <AngleRightIcon size={36}/>
                </button>
            )}
        </div>
    )

    return createPortal(content, document.body)
}
