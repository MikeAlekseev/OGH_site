import { Buffer } from 'node:buffer'
import { unlink, writeFile, rename, copyFile } from 'node:fs/promises'

import imageType, { minimumBytes } from 'image-type'

import { getImgPath, getImgUrl } from '@/constants'
import { fileExists, ensureFileDirectoryExists } from '@/utils/files'

const BACKUP_SUFFIX = '.backup'

export class SafeImage {
    fileUrl: string
    filePath: string
    backupFilePath: string | null = null
    file: Buffer

    private constructor({
        fileUrl,
        filePath,
        backupFilePath,
        file,
    }: {
        fileUrl: string,
        filePath: string,
        backupFilePath: string | null,
        file: Buffer,
    }) {
        this.fileUrl = fileUrl
        this.filePath = filePath
        this.backupFilePath = backupFilePath
        this.file = file
    }

    static async create(entity: string, name: string, file: File): Promise<SafeImage> {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const bufferBileBeginsFrom = buffer.subarray(0, minimumBytes)
        const result = await imageType(bufferBileBeginsFrom)

        if (!result) {
            throw new Error('File is not an supported image type')
        }

        const filePath = getImgPath(entity, `${name}.${result.ext}`)
        const fileUrl = getImgUrl(entity, `${name}.${result.ext}?v=${Date.now()}`)
        const backupFilePath = await fileExists(filePath) ? `${filePath}${BACKUP_SUFFIX}` : null

        await ensureFileDirectoryExists(filePath)

        if (backupFilePath) {
            await copyFile(filePath, backupFilePath)
        }

        await writeFile(filePath, buffer)

        return new SafeImage({ filePath, backupFilePath, fileUrl, file: buffer })
    }

    getUrl() {
        return this.fileUrl
    }

    async cleanup() {
        if (this.backupFilePath) {
            await unlink(this.backupFilePath)
        }
    }

    async rollback() {
        if (this.backupFilePath) {
            await rename(this.backupFilePath, this.filePath)
        } else {
            await unlink(this.filePath)
        }
    }
}
