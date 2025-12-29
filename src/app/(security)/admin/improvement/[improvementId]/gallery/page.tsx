import Link from 'next/link'

import { improvementListRepository } from '@/repository/improvementListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'
import { GalleryEditForm } from '@/app/(security)/admin/_components/GalleryEditForm'

import {
    addGalleryPhotoAction,
    deleteGalleryPhotoAction,
    reorderGalleryPhotosAction,
} from '../../_components/actions'

export default async function GalleryPage(props: PageProps<'/admin/improvement/[improvementId]/gallery'>) {
    const { improvementId } = await props.params
    const list = await improvementListRepository.getData()
    const improvement = list.find(item => item.id === improvementId)

    if (!improvement) {
        return <div>Запись не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href={`/admin/improvement/${improvementId}`} className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h2>Галерея: {improvement.title}</h2>
            </div>

            <GalleryEditForm
                entityId={improvementId}
                initialPhotos={improvement.galleryImgSrc}
                actions={{
                    addPhoto: addGalleryPhotoAction,
                    deletePhoto: deleteGalleryPhotoAction,
                    reorderPhotos: reorderGalleryPhotosAction,
                }}
            />
        </>
    )
}
