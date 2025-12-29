import Link from 'next/link'

import { improvementListRepository } from '@/repository/improvementListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { Grid } from './Grid'

export default async function ImprovementAdminPage() {
    const { list } = await improvementListRepository.getActualData()

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Благоустройство</h1>

                <Link href="/admin/improvement/new" className="primary-button">
                    Добавить
                </Link>
            </div>

            <Grid list={list} />
        </>
    )
}
