import Link from 'next/link'

import { newsListRepository } from '@/repository/newsListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'
import { GalleryEditForm } from '@/app/(security)/admin/_components/GalleryEditForm'

import {
    addGalleryPhotoAction,
    deleteGalleryPhotoAction,
    reorderGalleryPhotosAction,
} from '../../_components/actions'

interface PageProps {
    params: Promise<{ newsId: string }>
}

export default async function GalleryPage({ params }: PageProps) {
    const { newsId } = await params
    const list = await newsListRepository.getData()
    const news = list.find(item => item.id === newsId)

    if (!news) {
        return <div>Новость не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href={`/admin/news/${newsId}`} className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h2>Галерея: {news.title}</h2>
            </div>

            <GalleryEditForm
                entityId={newsId}
                initialPhotos={news.galleryImgSrc}
                actions={{
                    addPhoto: addGalleryPhotoAction,
                    deletePhoto: deleteGalleryPhotoAction,
                    reorderPhotos: reorderGalleryPhotosAction,
                }}
            />
        </>
    )
}
