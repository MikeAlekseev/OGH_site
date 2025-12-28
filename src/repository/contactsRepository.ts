import { ItemRepository } from './ItemRepository'
import { Contacts, contactsSchema } from './types'

const ID = '0'

export class ContactsRepository extends ItemRepository<Contacts>{
    constructor() {
        super('contacts', contactsSchema, () => ({ text: '', yMap: '' }))
    }

    override async getData() {
        return super.getData(ID)
    }

    // @ts-expect-error - override
    override async setData(contacts: Contacts) {
        return super.setData(ID, contacts)
    }

    override async deleteData() {
        return super.deleteData(ID)
    }
}

export const contactRepository = new ContactsRepository()
