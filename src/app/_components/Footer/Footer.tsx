import Link from 'next/link'

import styles from './Footer.module.scss'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.pcContainer}>
                <Link className={styles.logo} href={''}>
                    <div>
                        <img className={styles.logo_img} src="/logo.png" alt="logo"/>
                    </div>
                </Link>
                <Link className={styles.politica} href={'/politica'}>
                    Политика конфиденциальности
                </Link>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A84d2f5de53be3141496bc21587185c2fbadbd1bf5742cb9ff7edb0b1996981b2&amp;source=constructor"
                    width="250" height="250" frameBorder="0">
                </iframe>
            </div>
        </footer>
    )
}
