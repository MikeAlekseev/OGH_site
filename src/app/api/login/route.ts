import { NextResponse } from 'next/server'

import { getSession } from '@/lib/session'

export async function POST(req: Request) {
    const session = await getSession()

    const data = await req.json()
    const login = data.login
    const password = data.password

    const ENV_LOGIN = process.env.USER_LOGIN
    const ENV_PASSWORD = process.env.USER_PASSWORD

    if (!ENV_LOGIN || !ENV_PASSWORD) {
        return NextResponse.json({ error: 'Авторизация не настроена' }, { status: 500 })
    }

    if (login !== ENV_LOGIN || password !== ENV_PASSWORD) {
        return NextResponse.json({ error: 'Не верный логин/пароль' }, { status: 401 })
    }

    session.login = login

    await session.save()

    return NextResponse.json({ ok: true })
}
