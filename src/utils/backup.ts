import fs from 'fs-extra'
import path from 'path'
import { format } from 'date-fns'

import { DB_PATH } from '@/constants'

const DATA_DIR = path.join(process.cwd(), DB_PATH)
const BACKUP_DIR = path.join(process.cwd(), 'data-backup')
const MAX_BACKUPS = 7

/**
 * Получает список всех бэкапов, отсортированных по дате (новые первые)
 */
async function getBackupList(): Promise<string[]> {
    try {
        if (!await fs.pathExists(BACKUP_DIR)) {
            return []
        }

        const entries = await fs.readdir(BACKUP_DIR, { withFileTypes: true })
        const backups = entries
            .filter(entry => entry.isDirectory() && entry.name.startsWith('data-'))
            .map(entry => entry.name)
            .sort()
            .reverse()

        return backups
    } catch (error) {
        console.error('Ошибка при получении списка бэкапов:', error)

        return []
    }
}

/**
 * Удаляет старые бэкапы, оставляя только указанное количество последних
 */
async function cleanupOldBackups(maxBackups: number = MAX_BACKUPS): Promise<void> {
    try {
        const backups = await getBackupList()

        if (backups.length <= maxBackups) {
            return
        }

        const backupsToDelete = backups.slice(maxBackups)

        for (const backup of backupsToDelete) {
            const backupPath = path.join(BACKUP_DIR, backup)

            await fs.remove(backupPath)
        }
    } catch (error) {
        console.error('Ошибка при удалении старых бэкапов:', error)
    }
}

/**
 * Создает резервную копию папки data
 */
export async function backupData(): Promise<void> {
    try {
        if (!await fs.pathExists(DATA_DIR)) {
            return
        }

        await fs.ensureDir(BACKUP_DIR)

        const dateString = format(new Date(), 'yyyy-MM-dd')
        const backupPath = path.join(BACKUP_DIR, `data-${dateString}`)

        if (await fs.pathExists(backupPath)) {
            return
        }

        // Копируем папку data
        await fs.copy(DATA_DIR, backupPath, {
            overwrite: false,
            errorOnExist: true,
        })

        await cleanupOldBackups()
    } catch (error) {
        console.error('Ошибка при создании резервной копии:', error)
    }
}
