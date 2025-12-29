import Link from 'next/link'

import { vacancyFullRepository } from '@/repository/vacancyFullRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

export default async function EditVacancyPage(props: PageProps<'/admin/vacancy/[vacancyId]'>) {
    const { vacancyId } = await props.params
    const initial = await vacancyFullRepository.getData(vacancyId)

    if (!initial) {
        return <div>Вакансия не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/vacancy" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Редактирование вакансии</h1>
            </div>

            <EditForm initial={initial} />
        </>
    )
}
