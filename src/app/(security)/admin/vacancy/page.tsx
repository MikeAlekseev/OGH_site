import Link from 'next/link'

import { vacancyListRepository } from '@/repository/vacancyListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { Grid } from './Grid'

export default async function VacancyAdminPage() {
    const list = await vacancyListRepository.getData()

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Вакансии</h1>

                <Link href="/admin/vacancy/new" className="primary-button">
                    Добавить
                </Link>
            </div>

            <Grid list={list} />
        </>
    )
}
