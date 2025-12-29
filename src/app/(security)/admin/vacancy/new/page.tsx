import Link from 'next/link'

import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

export default function NewVacancyPage() {
    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/vacancy" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Новая вакансия</h1>
            </div>

            <EditForm />
        </>
    )
}
