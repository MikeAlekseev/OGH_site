import Link from 'next/link'

export default function AdminPage() {
    return (
        <>
            <h1 className="block__header">Админ-панель</h1>

            <ul className="flex-col-gap-16">
                <li><Link href="/admin/news" className="primary-button">Новости</Link></li>
                <li><Link href="/admin/improvement" className="primary-button">Благоустройство</Link></li>
                <li><Link href="/admin/highway" className="primary-button">Дороги</Link></li>
                <li><Link href="/admin/doc" className="primary-button">Документы</Link></li>
                <li><Link href="/admin/contacts" className="primary-button">Контакты</Link></li>
                <li><Link href="/admin/vacancy" className="primary-button">Вакансии</Link></li>
            </ul>
        </>
    )
}
