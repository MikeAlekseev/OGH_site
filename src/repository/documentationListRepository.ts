import { ListRepository } from './ListRepository'
import { Documentation, documentationSchema } from './types'

export class DocumentationListRepository extends ListRepository<Documentation>{
    constructor() {
        super('documentation', documentationSchema)
    }

    async getNextId() {
        const newsList = await this.getData()
        const lastId = newsList.reduce((maxId, item) => {
            const id = Number(item.id)

            if (Number.isNaN(id)) {
                return maxId
            }

            return Math.max(id, maxId)
        }, -1)

        return lastId + 1
    }
}

export const documentationListRepository = new DocumentationListRepository()
