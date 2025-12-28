'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

type LoginFormValues = {
    login: string
    password: string
}

export default function LoginPage() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormValues>({
        defaultValues: { login: '', password: '' },
        mode: 'onChange',
    })

    const onSubmit = useCallback(
        async (values: LoginFormValues) => {
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })

                if (res.ok) {
                    const next = new URL(location.href).searchParams.get('next') ?? '/admin'

                    router.replace(next)
                } else {
                    const data = await res.json().catch(() => ({}))

                    setError('root', { type: 'server', message: data.error || 'Ошибка авторизации' })
                }
            } catch (err) {
                console.error(err)
                setError('root', { type: 'fetch', message: 'Сетевая ошибка' })
            }
        },
        [router, setError]
    )

    return (
        <div className="pc-container with-page">
            <div className="big-card">
                <h1 className="title">Вход</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="field">
                        <label htmlFor="login">Логин</label>
                        <input
                            id="login"
                            type="text"
                            autoComplete="username"
                            className={clsx({ errored: errors.login })}
                            {...register('login', { required: 'Введите логин' })}
                            aria-invalid={!!errors.login}
                            aria-describedby={errors.login ? 'login-error' : undefined}
                        />
                        {errors.login && (
                            <div id="login-error" className="error" role="alert">
                                {errors.login.message}
                            </div>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            className={clsx({ errored: errors.password })}
                            {...register('password', { required: 'Введите пароль' })}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                        />
                        {errors.password && (
                            <div id="password-error" className="error" role="alert">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    {errors.root?.message && (
                        <div className="error" role="alert">
                            {errors.root.message}
                        </div>
                    )}

                    <div className="actions">
                        <button
                            className="primary-button"
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                        >
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
