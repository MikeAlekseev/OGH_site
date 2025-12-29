'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Vacancy } from '@/repository/types'

import { deleteVacancyAction } from './_components/actions'

interface GridProps {
    list: Vacancy[]
}

export function Grid({ list }: GridProps) {
    const router = useRouter()
    const [pending, setPending] = useState(false)

    if (list.length === 0) {
        return <i>Вакансий пока нет.</i>
    }

    return (
        <table className="simple-grid">
            <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Зарплата</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                {list.map(item => (
                    <tr
                        key={item.id}
                        className="clickable"
                        tabIndex={0}
                        onDoubleClick={() => router.push(`/admin/vacancy/${item.id}`)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                router.push(`/admin/vacancy/${item.id}`)
                            }
                        }}
                    >
                        <td>{item.title || ''}</td>
                        <td>{item.price || ''}</td>
                        <td>{item.isArchived ? 'В архиве' : 'Активна'}</td>
                        <td>
                            <div className="buttons-wrapper">
                                <Link
                                    href={`/admin/vacancy/${item.id}`}
                                    className="primary-button"
                                >
                                    Редактировать
                                </Link>

                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (confirm('Удалить вакансию?')) {
                                            setPending(true)
                                            await deleteVacancyAction(item.id)
                                            router.refresh()
                                            setPending(false)
                                        }
                                    }}
                                    disabled={pending}
                                    className="dangerous-button"
                                >
                                    Удалить
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
