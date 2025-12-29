import { ListRepository } from './ListRepository'
import { Documentation, documentationSchema } from './types'

export class DocumentationListRepository extends ListRepository<Documentation>{
    constructor() {
        super('documentation', documentationSchema)
    }
}

export const documentationListRepository = new DocumentationListRepository()
