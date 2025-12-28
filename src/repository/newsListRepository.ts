import { ListRepository } from './ListRepository'
import { News, newsSchema } from './types'

export class NewsListRepository extends ListRepository<News>{
    constructor() {
        super('news', newsSchema)
    }

    async getActualData({
        filter,
        shift = 0,
        limit,
    }: {
        filter?: (item: News) => boolean,
        shift?: number,
        limit?: number
    } = {}) {
        const newsList = await this.getData({ filter })

        return ({
            list: newsList.reverse().slice(shift, limit ? shift + limit : newsList.length),
            totalCount: newsList.length,
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

export const newsListRepository = new NewsListRepository()
