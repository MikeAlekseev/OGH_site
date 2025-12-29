import Link from 'next/link'

import { vacancyListRepository } from '@/repository/vacancyListRepository'
import { Pagination } from '@/app/_components/Pagination'

const ITEMS_PER_PAGE = 50

export default async function VacancyPage(props: PageProps<'/vacancy'>) {
    const { page } = await props.searchParams
    const pageStr = Array.isArray(page) ? page[0] : page
    const currentPage = Math.max(1, parseInt(pageStr || '1', 10) || 1)

    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const { list, totalCount } = await vacancyListRepository.getActualData({
        shift: offset,
        limit: ITEMS_PER_PAGE,
    })

    return (
        <div className="page-content">
            <div className="pc-container">
                <h1 className="block__header">Вакансии</h1>

                {totalCount === 0 ? (
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

                <Pagination
                    offset={offset}
                    pageSize={ITEMS_PER_PAGE}
                    totalCount={totalCount}
                />
            </div>
        </div>
    )
}
