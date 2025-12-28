import Link from 'next/link'

import { contactRepository } from '@/repository/contactsRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from './_components/EditForm'

export default async function ContactsAdminPage() {
    const contacts = await contactRepository.getData()

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Редактирование контактов</h1>
            </div>

            <EditForm initial={contacts} />
        </>
    )
}
