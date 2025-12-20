import { Banner } from '@/app/_components/Banner'

import '../global.scss'

export default async function page() {
    return (
        <div className="main">
            <Banner />
            <div className="pc-container">
                Главная страница

            </div>
        </div>
    )
}
