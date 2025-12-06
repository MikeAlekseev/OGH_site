import { join } from 'node:path'

export const PROJECT_ROOT = process.cwd()
export const DB_PATH = 'data'
export const IMG_DIR = 'images'

export function getImgPath(entity: string, imgName: string) {
    return join(PROJECT_ROOT, DB_PATH, IMG_DIR, entity, imgName)
}

export function getImgUrl(entity: string, imgName: string) {
    return `/${IMG_DIR}/${entity}/${imgName}`
}

export function getImgPathFromUrl(imgUrl: string) {
    if (!imgUrl.startsWith(`/${IMG_DIR}/`)) {
        throw new Error('Invalid img url')
    }

    const urlParts = imgUrl.split('?').at(0)!.split('/')
    const imgName = urlParts.at(-1)
    const entity = urlParts.at(-2)

    if (!imgName || !entity) {
        throw new Error('Invalid img url parts')
    }

    return getImgPath(entity, imgName)
}
