import { join } from 'node:path'

import { z } from 'zod'

import { readJsonFile, writeJsonFile } from '@/utils/files'
import { DB_PATH } from '@/constants'

export class ListRepository<FileListItem> {
    private fileBaseName: string
    private fileDataSchema: z.ZodType

    constructor(fileBaseName: string, fileItemSchema: z.ZodType) {
        this.fileBaseName = fileBaseName
        this.fileDataSchema = z.array(fileItemSchema)
    }

    protected getDefaultValue(): FileListItem[] {
        return []
    }

    protected getFilePath() {
        return join(DB_PATH, `${this.fileBaseName}.json`)
    }

    private async readRawJson(): Promise<unknown> {
        const filePath = this.getFilePath()
        const { json, isFileExists } = await readJsonFile(filePath)

        return isFileExists ? json : this.getDefaultValue()
    }

    private async writeRawJson(data: unknown) {
        const filePath = this.getFilePath()

        await writeJsonFile(filePath, data)
    }

    verifyData(data: unknown) {
        return this.fileDataSchema.parse(data) as FileListItem[]
    }

    async getData({
        filter,
        shift,
        limit,
    }: {
        filter?: (value: FileListItem) => boolean,
        shift?: number,
        limit?: number,
    } = {}) {
        const rawData = await this.readRawJson()
        let data = this.verifyData(rawData)

        if (filter) {
            data = data.filter(filter)
        }

        if (shift) {
            data = data.slice(shift)
        }

        if (limit) {
            data = data.slice(0, limit)
        }

        return data
    }

    async setData(data: FileListItem[]) {
        const validData = this.verifyData(data)

        await this.writeRawJson(validData)
    }
}
