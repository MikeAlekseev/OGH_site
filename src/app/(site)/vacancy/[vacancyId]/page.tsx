import Link from 'next/link'
import Markdown from 'react-markdown'

import { vacancyFullRepository } from '@/repository/vacancyFullRepository'
import { VacancyApplicationForm } from './VacancyApplicationForm'

export default async function VacancyDetailPage(props: PageProps<'/vacancy/[vacancyId]'>) {
    const { vacancyId } = await props.params
    const vacancy = await vacancyFullRepository.getData(vacancyId)

    if (!vacancy) {
        return (
            <div className="page-content">
                <div className="pc-container">
                    <p>Вакансия не найдена.</p>
                    <Link href="/vacancy">Вернуться к списку вакансий</Link>
                </div>
            </div>
        )
    }

    if (vacancy.isArchived) {
        return (
            <div className="page-content">
                <div className="pc-container">
                    <p>Эта вакансия перенесена в архив.</p>
                    <Link href="/vacancy">Вернуться к списку вакансий</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="page-content">
            <div className="pc-container">
                <h1 className="block__header">{vacancy.title}</h1>

                {vacancy.price && (
                    <p><strong>Зарплата:</strong> {vacancy.price}</p>
                )}

                {vacancy.text && (
                    <div className="markdown-content">
                        <Markdown>{vacancy.text}</Markdown>
                    </div>
                )}

                <VacancyApplicationForm
                    vacancyTitle={vacancy.title}
                    vacancyPrice={vacancy.price}
                />

                <p>
                    <Link href="/vacancy">Вернуться к списку вакансий</Link>
                </p>
            </div>
        </div>
    )
}
