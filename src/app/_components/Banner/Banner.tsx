import Link from 'next/link'

import styles from './Banner.module.scss'

export function Banner() {
    return (
        <div className={styles.banner}>
            <img src="/banner_ogh.jpg" alt="banner"/>
        </div>
    )
}