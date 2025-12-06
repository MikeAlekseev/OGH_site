import { access, mkdir, readFile, writeFile, unlink } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath)

        return true
    } catch (e) {
        if (e && e instanceof Error && 'code' in e && e.code === 'ENOENT') {
            return false
        }

        throw e
    }
}

export async function ensureFileDirectoryExists(filePath: string): Promise<void> {
    const dir = dirname(filePath)

    await mkdir(dir, { recursive: true })
}

export async function readJsonFile(filePath: string): Promise<{ json: unknown, isFileExists: boolean }> {
    if (!await fileExists(filePath)) {
        return { json: undefined, isFileExists: false }
    }

    const rawData = await readFile(filePath, 'utf-8')

    return ({
        json: JSON.parse(rawData),
        isFileExists: true
    })
}

export async function writeJsonFile(filePath: string, json: unknown) {
    await ensureFileDirectoryExists(filePath)
    await writeFile(filePath, JSON.stringify(json))
}



export async function deleteFile(filePath: string) {
    if (await fileExists(filePath)) {
        await unlink(filePath)
    }
}
