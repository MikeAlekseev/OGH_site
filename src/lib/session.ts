import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
    login: string
}

if (!process.env.SECRET_COOKIE_PASSWORD) {
    throw new Error('SECRET_COOKIE_PASSWORD is not defined')
}
if (process.env.SECRET_COOKIE_PASSWORD.length < 32) {
    throw new Error('Minimum length of SECRET_COOKIE_PASSWORD is 32 characters')
}

export const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'sess',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // Неделя
        sameSite: 'lax' as const,
        path: '/',
    },
}

export async function getSession() {
    return await getIronSession<SessionData>(await cookies(), sessionOptions)
}
