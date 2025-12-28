import { getImgPathFromUrl } from '@/constants'
import { deleteFile } from '@/utils/files'
import { SafeImage } from '@/repository/kdpvImage'

/**
 * Базовый интерфейс сущности
 */
export interface BaseEntity {
    id: string
}

/**
 * Интерфейс сущности с галереей
 */
export interface EntityWithGallery extends BaseEntity {
    galleryImgSrc: string[]
}

/**
 * Базовый интерфейс репозитория
 */
export interface BaseRepository<T extends BaseEntity> {
    getData(): Promise<T[]>
    setData(data: T[]): Promise<void>
    getNextId(): Promise<number>
}

/**
 * Данные для сохранения сущности
 */
export type SaveEntityData<T extends BaseEntity> = Omit<T, 'id'> & { id?: string }

/**
 * Сохранение сущности (создание или обновление)
 */
export async function saveEntity<T extends BaseEntity>({
    repository,
    data,
}: {
    repository: BaseRepository<T>,
    data: SaveEntityData<T>,
}) {
    let { id } = data
    const isCreating = !id

    if (!id) {
        id = (await repository.getNextId()).toString()
    }

    const currentList = await repository.getData()
    const existingIndex = currentList.findIndex(item => item.id === id)

    const newItem = { ...data, id } as T

    if (existingIndex === -1) {
        currentList.push(newItem)
    } else {
        currentList[existingIndex] = newItem
    }

    await repository.setData(currentList)

    return { id, isCreating }
}

/**
 * Удаление сущности
 */
export async function deleteEntity<T extends BaseEntity>({
    repository,
    id,
    onBeforeDelete,
}: {
    repository: BaseRepository<T>,
    id: string,
    onBeforeDelete?: (entity: T) => Promise<void>,
}) {
    const currentList = await repository.getData()
    const entityIndex = currentList.findIndex(item => item.id === id)

    if (entityIndex === -1) {
        return
    }

    const entity = currentList[entityIndex]

    if (onBeforeDelete) {
        await onBeforeDelete(entity)
    }

    currentList.splice(entityIndex, 1)

    await repository.setData(currentList)
}

/**
 * Удаление сущности с галереей (удаляет все фото)
 */
export async function deleteEntityWithGallery<T extends EntityWithGallery>({
    repository,
    id,
}: {
    repository: BaseRepository<T>,
    id: string,
}) {
    return deleteEntity({
        repository,
        id,
        onBeforeDelete: async (entity) => {
        for (const galleryImgSrc of entity.galleryImgSrc) {
            try {
                const imgPath = getImgPathFromUrl(galleryImgSrc)

                await deleteFile(imgPath)
            } catch {
                // Игнорируем ошибки удаления файлов
            }
        }
    }
    })
}

/**
 * Добавление фото в галерею
 */
export async function addGalleryPhoto<T extends EntityWithGallery>({
    repository,
    entityName,
    entityId,
    img,
    notFoundMessage = 'Запись не найдена',
}: {
    repository: BaseRepository<T>,
    entityName: string,
    entityId: string,
    img: File,
    notFoundMessage?: string,
}) {
    const currentList = await repository.getData()
    const entityIndex = currentList.findIndex(item => item.id === entityId)

    if (entityIndex === -1) {
        throw new Error(notFoundMessage)
    }

    const entity = currentList[entityIndex]
    const galleryImgSrc = entity.galleryImgSrc || []

    const nextNum = 1 + galleryImgSrc.reduce((max, url) => {
        const parse = url.match(/\.gallery\.(\d+)/)

        if (!parse) {
            return max
        }

        const num = parseInt(parse[1], 10)

        return Number.isNaN(num) ? max : Math.max(max, num)
    }, -1)

    const fileRepo = await SafeImage.create(
        entityName,
        `${entityId}.gallery.${nextNum.toString().padStart(3, '0')}`,
        img,
    )

    try {
        currentList[entityIndex] = {
            ...entity,
            galleryImgSrc: [...galleryImgSrc, fileRepo.getUrl()],
        }

        await repository.setData(currentList)
        await fileRepo.cleanup()
    } catch (e) {
        await fileRepo.rollback()

        throw e
    }

    return { photoUrl: fileRepo.getUrl() }
}

/**
 * Изменение порядка фото в галерее
 */
export async function reorderGalleryPhotos<T extends EntityWithGallery>({
    repository,
    entityId,
    newOrder,
    notFoundMessage = 'Запись не найдена',
}: {
    repository: BaseRepository<T>,
    entityId: string,
    newOrder: string[],
    notFoundMessage?: string,
}) {
    const currentList = await repository.getData()
    const entityIndex = currentList.findIndex(item => item.id === entityId)

    if (entityIndex === -1) {
        throw new Error(notFoundMessage)
    }

    const entity = currentList[entityIndex]
    const currentPhotos = entity.galleryImgSrc || []

    if (newOrder.length !== currentPhotos.length) {
        throw new Error('Количество фотографий не совпадает')
    }

    const currentSet = new Set(currentPhotos)

    for (const url of newOrder) {
        if (!currentSet.has(url)) {
            throw new Error('В новом порядке есть неизвестная фотография')
        }
    }

    currentList[entityIndex] = {
        ...entity,
        galleryImgSrc: newOrder,
    }

    await repository.setData(currentList)
}

/**
 * Удаление фото из галереи
 */
export async function deleteGalleryPhoto<T extends EntityWithGallery>({
    repository,
    entityId,
    photoUrl,
    notFoundMessage = 'Запись не найдена',
}: {
    repository: BaseRepository<T>,
    entityId: string,
    photoUrl: string,
    notFoundMessage?: string,
}) {
    const currentList = await repository.getData()
    const entityIndex = currentList.findIndex(item => item.id === entityId)

    if (entityIndex === -1) {
        throw new Error(notFoundMessage)
    }

    const entity = currentList[entityIndex]
    const galleryImgSrc = entity.galleryImgSrc || []

    if (!galleryImgSrc.includes(photoUrl)) {
        throw new Error('Фотография в галерее не найдена')
    }

    currentList[entityIndex] = {
        ...entity,
        galleryImgSrc: galleryImgSrc.filter(url => url !== photoUrl),
    }

    await repository.setData(currentList)

    const photoPath = getImgPathFromUrl(photoUrl)

    await deleteFile(photoPath)
}
