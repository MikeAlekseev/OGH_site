import { ListRepository } from './ListRepository'
import { Vacancy, vacancySchema } from './types'

export class VacancyListRepository extends ListRepository<Vacancy> {
    constructor() {
        super('vacancy', vacancySchema)
    }
}

export const vacancyListRepository = new VacancyListRepository()
