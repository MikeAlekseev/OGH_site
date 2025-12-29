import { ListRepository } from './ListRepository'
import { Improvement, improvementSchema } from './types'

export class ImprovementListRepository extends ListRepository<Improvement>{
    constructor() {
        super('improvement', improvementSchema)
    }

    async getActualData({
        filter,
        shift = 0,
        limit,
    }: {
        filter?: (item: Improvement) => boolean,
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

export const improvementListRepository = new ImprovementListRepository()
