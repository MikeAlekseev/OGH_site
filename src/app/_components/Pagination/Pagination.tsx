'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
    offset: number
    pageSize: number
    totalCount: number
}

export function Pagination({ offset, pageSize, totalCount }: PaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentPage = Math.floor(offset / pageSize) + 1
    const totalPages = Math.ceil(totalCount / pageSize)

    if (totalPages <= 1) {
        return null
    }

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())

        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', String(page))
        }

        const queryString = params.toString()

        return queryString ? `${pathname}?${queryString}` : pathname
    }

    return (
        <nav className="pagination" aria-label="Пагинация">
            {currentPage > 1 && (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="pagination__link"
                >
                    Назад
                </Link>
            )}

            <span className="pagination__info">
                Страница {currentPage} из {totalPages}
            </span>

            {currentPage < totalPages && (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="pagination__link"
                >
                    Вперёд
                </Link>
            )}
        </nav>
    )
}
