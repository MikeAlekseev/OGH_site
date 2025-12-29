import Link from 'next/link'

import { newsListRepository } from '@/repository/newsListRepository'
import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

export default async function EditNewsPage(props: PageProps<'/admin/news/[newsId]'>) {
    const { newsId } = await props.params
    const list = await newsListRepository.getData()
    const initial = list.find(item => item.id === newsId) ?? null

    if (!initial) {
        return <div>Новость не найдена</div>
    }

    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/news" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Редактирование новости</h1>
            </div>

            <EditForm initial={initial} />
        </>
    )
}
