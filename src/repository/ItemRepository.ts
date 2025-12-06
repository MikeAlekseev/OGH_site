import { join } from 'node:path'

import z from 'zod'

import { readJsonFile, writeJsonFile, deleteFile } from '@/utils/files'
import { idSchema } from '@/utils/zod'
import { DB_PATH } from '@/constants'

export class ItemRepository<Item> {
    private fileBaseName: string
    private fileSchema: z.ZodType
    private getDefaultValue: () => Item

    constructor(fileBaseName: string, fileSchema: z.ZodType, getDefaultValue: () => Item) {
        this.fileBaseName = fileBaseName
        this.fileSchema = fileSchema
        this.getDefaultValue = getDefaultValue
    }

    private getFilePath(id: string) {
        const validId = idSchema.parse(id)

        return join(DB_PATH, `${this.fileBaseName}.${validId}.json`)
    }

    private async readRawJson(id: string): Promise<unknown> {
        const filePath = this.getFilePath(id)
        const { json, isFileExists } = await readJsonFile(filePath)

        return isFileExists ? json : this.getDefaultValue()
    }

    private async writeRawJson(id: string, data: unknown) {
        const filePath = this.getFilePath(id)

        await writeJsonFile(filePath, data)
    }

    verifyData(rawData: unknown) {
        return this.fileSchema.parse(rawData) as Item
    }

    async getData(id: string) {
        const rawData = await this.readRawJson(id)

        return this.verifyData(rawData)
    }

    async setData(id: string, rawData: Item) {
        const data = this.verifyData(rawData)

        await this.writeRawJson(id, data)
    }

    async deleteData(id: string) {
        const filePath = this.getFilePath(id)

        await deleteFile(filePath)
    }
}
