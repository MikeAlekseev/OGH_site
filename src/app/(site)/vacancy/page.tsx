import Link from 'next/link'

import { vacancyListRepository } from '@/repository/vacancyListRepository'

export default async function VacancyPage() {
    const list = await vacancyListRepository.getData()

    return (
        <div className="page-content">
            <div className="pc-container">
                <h1 className="block__header">Вакансии</h1>

                {list.length === 0 ? (
                    <p>Вакансий пока нет.</p>
                ) : (
                    <ul>
                        {list.map((item) => (
                            <li key={item.id}>
                                <Link href={`/vacancy/${item.id}`}>
                                    {item.title}
                                </Link>
                                {item.price && (
                                    <span> — {item.price}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
