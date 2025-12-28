import { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

/**
 * Метаданные для административной панели
 *
 * Запрещаем индексацию админки поисковыми системами:
 * - noindex: страница не будет включена в поисковый индекс
 * - nofollow: поисковые боты не будут переходить по ссылкам
 *
 * Это защищает административные URL от появления в результатах поиска.
 */
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className={clsx('pc-container', 'with-page', 'admin-ui')}>
            {children}
        </div>
    )
}
