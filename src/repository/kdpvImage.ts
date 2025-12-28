import { Buffer } from 'node:buffer'
import { unlink, writeFile, rename, copyFile } from 'node:fs/promises'

import imageType, { minimumBytes } from 'image-type'
import sharp from 'sharp'

import { getImgPath, getImgUrl } from '@/constants'
import { fileExists, ensureFileDirectoryExists } from '@/utils/files'

const BACKUP_SUFFIX = '.backup'

// Максимальные размеры изображения
const MAX_WIDTH = 1000
const MAX_HEIGHT = 800

// Максимальный размер файла (1 МБ)
const MAX_FILE_SIZE = 1024 * 1024

// Начальное качество WebP
const INITIAL_QUALITY = 90

// Шаг уменьшения качества
const QUALITY_STEP = 5

// Минимальное качество
const MIN_QUALITY = 30

/**
 * Обрабатывает изображение:
 * - Уменьшает до максимальных размеров с сохранением пропорций
 * - Конвертирует в WebP
 * - Уменьшает качество, если размер > 1 МБ
 */
async function processImage(buffer: Buffer): Promise<Buffer> {
    let quality = INITIAL_QUALITY

    // Создаём обработчик sharp с ресайзом
    const resizedImage = sharp(buffer)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
            fit: 'inside', // сохраняет пропорции, вписывая в границы
            withoutEnlargement: true, // не увеличивает маленькие изображения
        })

    // Первая попытка конвертации в WebP
    let result = await resizedImage
        .clone()
        .webp({ quality })
        .toBuffer()

    // Если размер > 1 МБ, уменьшаем качество пока не влезет
    while (result.length > MAX_FILE_SIZE && quality > MIN_QUALITY) {
        quality -= QUALITY_STEP

        result = await resizedImage
            .clone()
            .webp({ quality })
            .toBuffer()
    }

    return result
}

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
        const inputBuffer = Buffer.from(arrayBuffer)

        const bufferBileBeginsFrom = inputBuffer.subarray(0, minimumBytes)
        const result = await imageType(bufferBileBeginsFrom)

        if (!result) {
            throw new Error('File is not an supported image type')
        }

        const processedBuffer = await processImage(inputBuffer)

        const filePath = getImgPath(entity, `${name}.webp`)
        const fileUrl = getImgUrl(entity, `${name}.webp?v=${Date.now()}`)
        const backupFilePath = await fileExists(filePath) ? `${filePath}${BACKUP_SUFFIX}` : null

        await ensureFileDirectoryExists(filePath)

        if (backupFilePath) {
            await copyFile(filePath, backupFilePath)
        }

        await writeFile(filePath, processedBuffer)

        return new SafeImage({ filePath, backupFilePath, fileUrl, file: processedBuffer })
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
