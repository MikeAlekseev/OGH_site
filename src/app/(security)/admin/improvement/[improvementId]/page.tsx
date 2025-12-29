import Link from 'next/link'

import { improvementListRepository } from '@/repository/improvementListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

interface PageProps {
    params: Promise<{ improvementId: string }>
}

export default async function EditImprovementPage({ params }: PageProps) {
    const { improvementId } = await params
    const list = await improvementListRepository.getData()
    const initial = list.find(item => item.id === improvementId) ?? null

    if (!initial) {
        return <div>Запись не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/improvement" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Редактирование записи</h1>
            </div>

            <EditForm initial={initial} />
        </>
    )
}
