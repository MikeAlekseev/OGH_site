import Link from 'next/link'

import { highwayListRepository } from '@/repository/highwayListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

export default async function EditHighwayPage(props: PageProps<'/admin/highway/[highwayId]'>) {
    const { highwayId } = await props.params
    const list = await highwayListRepository.getData()
    const initial = list.find(item => item.id === highwayId) ?? null

    if (!initial) {
        return <div>Запись не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/highway" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Редактирование записи</h1>
            </div>

            <EditForm initial={initial} />
        </>
    )
}
