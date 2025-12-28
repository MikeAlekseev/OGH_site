import Link from 'next/link'

import { newsListRepository } from '@/repository/newsListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { Grid } from './Grid'

export default async function NewsAdminPage() {
    const { list } = await newsListRepository.getActualData()

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Новости</h1>

                <Link href="/admin/news/new" className="primary-button">
                    Добавить
                </Link>
            </div>

            <Grid list={list} />
        </>
    )
}
