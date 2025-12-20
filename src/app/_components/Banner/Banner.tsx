import styles from './Banner.module.scss'

export function Banner() {
    return (
        <div className={styles.banner}>
            <img className={styles.banner} src="/banner_ogh.jpg" alt="banner"/>
        </div>
    )
}