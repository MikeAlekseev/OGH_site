import Link from 'next/link'

import { ChevronLeftIcon } from '@/app/(security)/admin/_resources/chevronLeft'

import { EditForm } from '../_components/EditForm'

export default function NewImprovementPage() {
    return (
        <>
            <div className="block__header__wrapper">
                <Link href="/admin/improvement" className="primary-icon-button">
                    <ChevronLeftIcon />
                </Link>

                <h1>Новая запись</h1>
            </div>

            <EditForm />
        </>
    )
}
