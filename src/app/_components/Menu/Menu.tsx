import Link from 'next/link'

export function Menu() {
    return (
        <div>
            Menu

            <ul>
                <li><Link href="/news">Новости</Link></li>
                <li><Link href="/improvement">Благоустройство</Link></li>
                <li><Link href="/highway">Дороги</Link></li>
                <li><Link href="/doc">Документация</Link></li>
                <li><Link href="/contacts">Контакты</Link></li>
                <li><Link href="/vacancy">Вакансии</Link></li>
                <li><Link href="/feedback">Обратная связь</Link></li>
            </ul>
        </div>
    )
}
