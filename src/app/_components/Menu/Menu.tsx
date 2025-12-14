import Link from 'next/link'

import styles from './Menu.module.scss'

export function Menu() {
    return (
        <div className={styles.menu}>
            Menu

            <ul className={styles.menu_list}>
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
