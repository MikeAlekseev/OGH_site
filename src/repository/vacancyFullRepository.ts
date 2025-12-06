import { ItemFullRepository } from './ItemFullRepository'
import { vacancyItemRepository } from './vacancyItemRepository'
import { vacancyListRepository } from './vacancyListRepository'
import { VacancyFull, vacancyFullSchema } from './types'

export class VacancyFullRepository extends ItemFullRepository<VacancyFull> {
    constructor() {
        super(vacancyFullSchema, vacancyListRepository, vacancyItemRepository)
    }
}

export const vacancyFullRepository = new VacancyFullRepository()
