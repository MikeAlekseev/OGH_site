import Markdown from 'react-markdown'

import { highwayListRepository } from '@/repository/highwayListRepository'
import { Gallery } from '@/app/_components/Gallery'
import { Pagination } from '@/app/_components/Pagination'

const ITEMS_PER_PAGE = 50

export default async function HighwayPage(props: PageProps<'/highway'>) {
    const { page } = await props.searchParams
    const pageStr = Array.isArray(page) ? page[0] : page
    const currentPage = Math.max(1, parseInt(pageStr || '1', 10) || 1)

    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const { list, totalCount } = await highwayListRepository.getActualData({
        shift: offset,
        limit: ITEMS_PER_PAGE,
    })

    return (
        <div className="page-content">
            <div className="pc-container">
                <h1 className="block__header">Автодороги</h1>

                {totalCount === 0 ? (
                    <p>Записей пока нет.</p>
                ) : (
                    <div>
                        {list.map((item) => (
                            <article key={item.id}>
                                <h2>{item.title}</h2>

                                {item.text && (
                                    <div className="markdown-content">
                                        <Markdown>{item.text}</Markdown>
                                    </div>
                                )}

                                <Gallery images={item.galleryImgSrc} title={item.title} />
                            </article>
                        ))}
                    </div>
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
