'use server'

import { News } from '@/repository/types'
import { newsListRepository } from '@/repository/newsListRepository'
import {
    saveEntity,
    deleteEntityWithGallery,
    addGalleryPhoto,
    reorderGalleryPhotos,
    deleteGalleryPhoto,
    SaveEntityData,
} from '@/app/(security)/admin/_lib/entityActions'

const ENTITY_NAME = 'news'
const NOT_FOUND_MESSAGE = 'Новость не найдена'

export type SaveNewsActionData = SaveEntityData<News>

export async function saveNewsAction(data: SaveNewsActionData) {
    return saveEntity({ repository: newsListRepository, data })
}

export async function addGalleryPhotoAction(newsId: string, img: File) {
    return addGalleryPhoto({
        repository: newsListRepository,
        entityName: ENTITY_NAME,
        entityId: newsId,
        img,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function reorderGalleryPhotosAction(newsId: string, newOrder: string[]) {
    return reorderGalleryPhotos({
        repository: newsListRepository,
        entityId: newsId,
        newOrder,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function deleteGalleryPhotoAction(newsId: string, photoUrl: string) {
    return deleteGalleryPhoto({
        repository: newsListRepository,
        entityId: newsId,
        photoUrl,
        notFoundMessage: NOT_FOUND_MESSAGE,
    })
}

export async function deleteNewsAction(id: string) {
    return deleteEntityWithGallery({ repository: newsListRepository, id })
}
