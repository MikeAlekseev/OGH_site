import { ListRepository } from './ListRepository'
import { Highway, highwaySchema } from './types'

export class HighwayListRepository extends ListRepository<Highway>{
    constructor() {
        super('highway', highwaySchema)
    }

    async getActualData({
        filter,
        shift = 0,
        limit,
    }: {
        filter?: (item: Highway) => boolean,
        shift?: number,
        limit?: number
    } = {}) {
        const list = await this.getData({ filter })

        return ({
            list: list.reverse().slice(shift, limit ? shift + limit : list.length),
            totalCount: list.length,
        })
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

export const highwayListRepository = new HighwayListRepository()
