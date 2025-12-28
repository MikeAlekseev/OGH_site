'use server'

import { Contacts } from '@/repository/types'
import { contactRepository } from '@/repository/contactsRepository'

export interface SaveContactsActionData {
    text: string
    yMap: string
}

export async function saveContactsAction(data: SaveContactsActionData) {
    const contacts: Contacts = {
        text: data.text,
        yMap: data.yMap,
    }

    await contactRepository.setData(contacts)

    return { ok: true }
}
