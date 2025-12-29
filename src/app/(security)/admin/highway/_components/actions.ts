'use server'

import { Highway } from '@/repository/types'
import { highwayListRepository } from '@/repository/highwayListRepository'
import {
    saveEntity,
    deleteEntityWithGallery,
    addGalleryPhoto,
    reorderGalleryPhotos,
    deleteGalleryPhoto,
    SaveEntityData,
} from '@/app/(security)/admin/_lib/entityActions'

const ENTITY_NAME = 'highway'
const NOT_FOUND_MESSAGE = 'Запись не найдена'

export type SaveHighwayActionData = SaveEntityData<Highway>

export async function saveHighwayAction(data: SaveHighwayActionData) {
    return saveEntity({ repository: highwayListRepository, data })
}

export async function addGalleryPhotoAction(highwayId: string, img: File) {
    return addGalleryPhoto({
        repository: highwayListRepository,
        entityName: ENTITY_NAME,
        entityId: highwayId,
        img,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function reorderGalleryPhotosAction(highwayId: string, newOrder: string[]) {
    return reorderGalleryPhotos({
        repository: highwayListRepository,
        entityId: highwayId,
        newOrder,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function deleteGalleryPhotoAction(highwayId: string, photoUrl: string) {
    return deleteGalleryPhoto({
        repository: highwayListRepository,
        entityId: highwayId,
        photoUrl,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function deleteHighwayAction(id: string) {
    return deleteEntityWithGallery({ repository: highwayListRepository, id })
}
