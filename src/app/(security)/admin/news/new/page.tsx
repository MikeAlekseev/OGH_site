import Link from 'next/link'

import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

export default function NewNewsPage() {
    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/news" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Новая новость</h1>
            </div>

            <EditForm />
        </>
    )
}
