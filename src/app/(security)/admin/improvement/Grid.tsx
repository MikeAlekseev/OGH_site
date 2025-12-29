'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Improvement } from '@/repository/types'

import { deleteImprovementAction } from './_components/actions'

interface GridProps {
    list: Improvement[]
}

export function Grid({ list }: GridProps) {
    const router = useRouter()
    const [pending, setPending] = useState(false)

    if (list.length === 0) {
        return <i>Записей пока нет.</i>
    }

    return (
        <table className="simple-grid">
            <thead>
                <tr>
                    <th scope="col">Заголовок</th>
                    <th scope="col" style={{ width: 120 }}>Картинка</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                {list.map(item => {
                    const firstImage = item.galleryImgSrc[0]

                    return (
                        <tr
                            key={item.id}
                            className="clickable"
                            tabIndex={0}
                            onDoubleClick={() => router.push(`/admin/improvement/${item.id}`)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.push(`/admin/improvement/${item.id}`)
                                }
                            }}
                        >
                            <td>{item.title || ''}</td>
                            <td>
                                {firstImage ? (
                                    <Image
                                        src={firstImage}
                                        alt={item.title || item.id}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: 'contain' }}
                                    />
                                ) : null}
                            </td>
                            <td>
                                <div className="buttons-wrapper">
                                    <Link
                                        href={`/admin/improvement/${item.id}`}
                                        className="primary-button"
                                    >
                                        Редактировать
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (confirm('Удалить запись?')) {
                                                setPending(true)
                                                await deleteImprovementAction(item.id)
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
                    )
                })}
            </tbody>
        </table>
    )
}
