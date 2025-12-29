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
}

export const highwayListRepository = new HighwayListRepository()
