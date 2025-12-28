import Markdown from 'react-markdown'

import { contactRepository } from '@/repository/contactsRepository'

export default async function ContactsPage() {
    const contacts = await contactRepository.getData()

    return (
        <div className="page-content">
            <div className="pc-container">
                <h1 className="block__header">Контакты</h1>

                <div className="markdown-content">
                    <Markdown>{contacts.text}</Markdown>
                </div>

                {contacts.yMap && (
                    <div className="yandex-map">
                        <iframe
                            src={contacts.yMap}
                            width="100%"
                            height="400"
                            frameBorder="0"
                            title="Карта"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
