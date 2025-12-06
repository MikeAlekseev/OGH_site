import z from 'zod'

import { idSchema } from '@/utils/zod'

/* News */

const newsFields = {
    id: idSchema,
    title: z.string(),
    text: z.string(),
    galleryImgSrc: z.array(z.string()),
}

export const newsSchema = z.object(newsFields)

export type News = z.infer<typeof newsSchema>

/* Improvement */

const improvementFields = {
    id: idSchema,
    title: z.string(),
    text: z.string(),
    galleryImgSrc: z.array(z.string()),
}

export const improvementSchema = z.object(improvementFields)

export type Improvement = z.infer<typeof improvementSchema>

/* Documentation */

const documentationFields = {
    id: idSchema,
    fileName: z.string(),
    url: z.string(),
}

export const documentationSchema = z.object(documentationFields)

export type Documentation = z.infer<typeof documentationSchema>

/* Contacts */

const contactsFields = {
    text: z.string(),
}

export const contactsSchema = z.object(contactsFields)

export type Contacts = z.infer<typeof contactsSchema>

/* Vacancy */

const vacancyBaseFields = {
    id: idSchema,
    title: z.string().optional(),
    price: z.string(),
}

const vacancyAdditionalFields = {
    text: z.string(),
}

export const vacancySchema = z.object(vacancyBaseFields)

export type Vacancy = z.infer<typeof vacancySchema>

export const vacancyItemSchema = z.object(vacancyAdditionalFields)

export type VacancyItem = z.infer<typeof vacancyItemSchema>

export const vacancyFullSchema = z.object({
    ...vacancyBaseFields,
    ...vacancyAdditionalFields,
})

export type VacancyFull = z.infer<typeof vacancyFullSchema>