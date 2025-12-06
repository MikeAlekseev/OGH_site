import z from 'zod'

export const idSchema = z.string()
    .min(1, 'ID не может быть пустым')
    .max(32, 'ID слишком длинный')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Недопустимые символы в ID')
