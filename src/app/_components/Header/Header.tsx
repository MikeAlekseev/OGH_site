import Link from 'next/link'


import { Menu } from '../Menu'

import styles from './Header.module.scss'

export function Header() {
    return (
        <header className={styles.module}>
            <div >
                <Link className={styles.logo} href="/">
                <div>
                    <img className={styles.logo_img} src='/logo.png' alt="logo!" />
                </div>
                    <div className={styles.logo_txt}>Объединенное городское хозяйство</div>

                </Link>
            </div>
            <Menu />
        </header>
    )
}
