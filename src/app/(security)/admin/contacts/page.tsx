import { contactRepository } from '@/repository/contactsRepository'

import { EditForm } from './_components/EditForm'

export default async function ContactsAdminPage() {
    const contacts = await contactRepository.getData()

    return (
        <>
            <h1 className="block__header">Редактирование контактов</h1>
            <EditForm initial={contacts} />
        </>
    )
}
