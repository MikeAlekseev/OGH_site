import Link from 'next/link'

import { Menu } from '../Menu'

import styles from './Header.module.scss'

import 'bootstrap-icons/font/bootstrap-icons.css'

import { FaVk } from 'react-icons/fa'



export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.pcContainer}>
                <div className={styles.header__up}>
                    <Link className={styles.logo} href="/">
                        <div>
                            <img className={styles.logo_img} src="/logo.png" alt="logo" />
                        </div>
                        <div className={styles.logo_txt}>
                            Объединенное городское хозяйство
                        </div>
                    </Link>
                    <div className={styles.contacts}>
                        <div className={styles.contactsList}>
                            <a  href="tel:+79011863119">
                                <i className="bi bi-telephone"></i> Звонок
                            </a>
                        </div>
                        <div className={styles.contactsList}>
                            <a href="mailto:ogh.himki@yandex.ru">
                                <i className="bi bi-envelope"></i> Почта
                            </a>
                        </div>
                        <div className={styles.contactsList}>
                            <a href="https://t.me/mbu_ogh">
                                <i className="bi bi-telegram"></i> TG
                            </a>
                        </div>
                        <div className={styles.contactsList}>
                            <a href="https://vk.ru/club217665222" target="_blank" rel="noopener noreferrer">
                                <FaVk /> ВКонтакте
                            </a>
                        </div>
                        <div className={styles.contactsList}>
                            <a
                                href="https://max.ru/u/f9LHodD0cOLqG7Zi_4XkAUa252iLAa6hinNTjpEPd2NI8SGVw7ArSBhbPJ0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                💬 MAX
                            </a>
                        </div>
                    </div>
                </div>
                <Menu />
            </div>
        </header>
    )
}
