import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from '@/lib/session'

async function isAuthenticated() {
    const session = await getSession()

    return !!session.login
}

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl
    const authed = await isAuthenticated()

    if (pathname === '/login' && authed) {
        const url = new URL('/admin', req.url)

        return NextResponse.redirect(url)
    }

    if (pathname === '/logout' && !authed) {
        const url = new URL('/', req.url)

        return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/admin')) {
        if (!authed) {
            const loginUrl = new URL('/login', req.url)

            loginUrl.searchParams.set('next', pathname)

            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/logout', '/admin/:path*'],
}
