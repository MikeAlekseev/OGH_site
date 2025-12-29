import Link from 'next/link'

import { highwayListRepository } from '@/repository/highwayListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'
import { GalleryEditForm } from '@/app/(security)/admin/_components/GalleryEditForm'

import {
    addGalleryPhotoAction,
    deleteGalleryPhotoAction,
    reorderGalleryPhotosAction,
} from '../../_components/actions'

export default async function GalleryPage(props: PageProps<'/admin/highway/[highwayId]/gallery'>) {
    const { highwayId } = await props.params
    const list = await highwayListRepository.getData()
    const highway = list.find(item => item.id === highwayId)

    if (!highway) {
        return <div>Запись не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href={`/admin/highway/${highwayId}`} className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h2>Галерея: {highway.title}</h2>
            </div>

            <GalleryEditForm
                entityId={highwayId}
                initialPhotos={highway.galleryImgSrc}
                actions={{
                    addPhoto: addGalleryPhotoAction,
                    deletePhoto: deleteGalleryPhotoAction,
                    reorderPhotos: reorderGalleryPhotosAction,
                }}
            />
        </>
    )
}
