import Link from 'next/link'


import { Menu } from '../Menu'

import styles from './Header.module.css'

export function Header() {
    return (
        <header className={styles.module}>
            <p className="logo"><Link href="/">
                <img className="logo" src='logo.png' alt="logo" />
                Объединенное городское хозяйство</Link></p>
            <Menu />
        </header>
    )
}
