import z from 'zod'

import { ListRepository } from './ListRepository'
import { ItemRepository } from './ItemRepository'

export class ItemFullRepository<ItemFull extends { id: string }> {
    private itemFullSchema: z.ZodType
    private listRepository: ListRepository<{ id: string }>
    private itemRepository: ItemRepository<{}>

    constructor(
        itemFullSchema: z.ZodType,
        listRepository: ListRepository<{ id: string }>,
        itemRepository: ItemRepository<{}>,
    ) {
        this.itemFullSchema = itemFullSchema
        this.listRepository = listRepository
        this.itemRepository = itemRepository
    }

    async getData(id: string) {
        const [listItem] = await this.listRepository.getData({ filter: item => item.id === id })

        if (!listItem) {
            return null
        }

        const fileItem = await this.itemRepository.getData(id)

        return this.itemFullSchema.parse({ ...listItem, ...fileItem }) as ItemFull
    }

    async setData(itemFull: ItemFull) {
        const { id } = itemFull
        const originalList = await this.listRepository.getData()

        const list = [...originalList]
        const position = list.findIndex(item => item.id === itemFull.id)

        if (position === -1) {
            list.push(itemFull)
        } else {
            list[position] = itemFull
        }

        const listFinal = this.listRepository.verifyData(list)
        const itemFinal = this.itemRepository.verifyData(itemFull)

        await this.listRepository.setData(listFinal)

        try {
            await this.itemRepository.setData(id, itemFinal)
        } catch (e) {
            // Rollback list
            await this.listRepository.setData(originalList)

            throw e
        }
    }

    async deleteData(id: string) {
        const deletedFullItem = await this.getData(id)

        if (!deletedFullItem) {
            return null
        }

        const originalList = await this.listRepository.getData()
        const list = originalList.filter(item => item.id !== id)

        if (list.length === originalList.length) {
            return null
        }

        const listFinal = this.listRepository.verifyData(list)

        await this.listRepository.setData(listFinal)

        try {
            await this.itemRepository.deleteData(id)

            return deletedFullItem
        } catch (e) {
            // Rollback list
            await this.listRepository.setData(originalList)

            throw e
        }
    }
}
