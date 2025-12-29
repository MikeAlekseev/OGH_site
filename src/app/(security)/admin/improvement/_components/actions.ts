'use server'

import { Improvement } from '@/repository/types'
import { improvementListRepository } from '@/repository/improvementListRepository'
import {
    saveEntity,
    deleteEntityWithGallery,
    addGalleryPhoto,
    reorderGalleryPhotos,
    deleteGalleryPhoto,
    SaveEntityData,
} from '@/app/(security)/admin/_lib/entityActions'

const ENTITY_NAME = 'improvement'
const NOT_FOUND_MESSAGE = 'Запись не найдена'

export type SaveImprovementActionData = SaveEntityData<Improvement>

export async function saveImprovementAction(data: SaveImprovementActionData) {
    return saveEntity({ repository: improvementListRepository, data })
}

export async function addGalleryPhotoAction(improvementId: string, img: File) {
    return addGalleryPhoto({
        repository: improvementListRepository,
        entityName: ENTITY_NAME,
        entityId: improvementId,
        img,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function reorderGalleryPhotosAction(improvementId: string, newOrder: string[]) {
    return reorderGalleryPhotos({
        repository: improvementListRepository,
        entityId: improvementId,
        newOrder,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function deleteGalleryPhotoAction(improvementId: string, photoUrl: string) {
    return deleteGalleryPhoto({
        repository: improvementListRepository,
        entityId: improvementId,
        photoUrl,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function deleteImprovementAction(id: string) {
    return deleteEntityWithGallery({ repository: improvementListRepository, id })
}
