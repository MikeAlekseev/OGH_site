import { ItemRepository } from './ItemRepository'
import { VacancyItem, vacancyItemSchema } from './types'

export class VacancyItemRepository extends ItemRepository<VacancyItem>{
    constructor() {
        super('vacancy', vacancyItemSchema, () => ({ text: '' }))
    }
}

export const vacancyItemRepository = new VacancyItemRepository()
