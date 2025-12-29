import Link from 'next/link'

import { highwayListRepository } from '@/repository/highwayListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { Grid } from './Grid'

export default async function HighwayAdminPage() {
    const { list } = await highwayListRepository.getActualData()

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Автодороги</h1>

                <Link href="/admin/highway/new" className="primary-button">
                    Добавить
                </Link>
            </div>

            <Grid list={list} />
        </>
    )
}
