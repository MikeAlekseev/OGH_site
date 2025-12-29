import { ListRepository } from './ListRepository'
import { Vacancy, vacancySchema } from './types'

export class VacancyListRepository extends ListRepository<Vacancy> {
    constructor() {
        super('vacancy', vacancySchema)
    }

    async getActualData({
        filter,
        shift = 0,
        limit,
    }: {
        filter?: (item: Vacancy) => boolean,
        shift?: number,
        limit?: number
    } = {}) {
        const list = (await this.getData({ filter })).filter(({ isArchived }) => !isArchived)

        return ({
            list: list.slice(shift, limit ? shift + limit : list.length),
            totalCount: list.length,
        })
    }
}

export const vacancyListRepository = new VacancyListRepository()
