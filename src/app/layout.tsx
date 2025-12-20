import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { Header } from './_components/Header'
import { Footer } from './_components/Footer'

import  '../../src/app/global.scss'

export const metadata: Metadata = {
    title: 'ОГХ',
    description: 'ОГХ',
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="ru">
            <body>
                <Header />

                {children}

                <Toaster position="top-right" richColors />

                <Footer />
            </body>
        </html>
    )
}
