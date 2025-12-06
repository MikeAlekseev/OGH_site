export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const cron = (await import('node-cron')).default
        const { backupData } = await import('./utils/backup')

        cron.schedule('0 0 * * *', async () => {
            await backupData()
        }, {
            timezone: 'Europe/Moscow'
        })
    }
}
