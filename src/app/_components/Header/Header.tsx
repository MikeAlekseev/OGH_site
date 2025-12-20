import Link from 'next/link'


import { Menu } from '../Menu'


import styles from './Header.module.scss'


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
                        <div>контакный номер</div>
                        <div>мейл</div>
                        <div>тг</div>
                        <div>вк</div>
                    </div>
                </div>
                <Menu />
            </div>
        </header>
    )
}
