import { ListRepository } from './ListRepository'
import { Improvement, improvementSchema } from './types'

export class ImprovementListRepository extends ListRepository<Improvement>{
    constructor() {
        super('improvement', improvementSchema)
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

export const improvementListRepository = new ImprovementListRepository()
