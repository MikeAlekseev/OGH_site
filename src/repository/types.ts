import z from 'zod'

import { idSchema } from '@/utils/zod'

/* News */

const newsFields = {
    id: idSchema,
    title: z.string().max(512),
    text: z.string().max(50000),
    galleryImgSrc: z.array(z.string().max(512)),
}

export const newsSchema = z.object(newsFields)

export type News = z.infer<typeof newsSchema>

/* Improvement */

const improvementFields = {
    id: idSchema,
    title: z.string().max(512),
    text: z.string().max(50000),
    galleryImgSrc: z.array(z.string().max(512)),
}

export const improvementSchema = z.object(improvementFields)

export type Improvement = z.infer<typeof improvementSchema>

/* Highway */

const highwayFields = {
    id: idSchema,
    title: z.string().max(512),
    text: z.string().max(50000),
    galleryImgSrc: z.array(z.string().max(512)),
}

export const highwaySchema = z.object(highwayFields)

export type Highway = z.infer<typeof highwaySchema>

/* Documentation */

const documentationFields = {
    id: idSchema,
    fileName: z.string().max(512),
    url: z.string().max(512),
}

export const documentationSchema = z.object(documentationFields)

export type Documentation = z.infer<typeof documentationSchema>

/* Contacts */

const contactsFields = {
    text: z.string().max(50000),
    yMap: z.string().max(512),
}

export const contactsSchema = z.object(contactsFields)

export type Contacts = z.infer<typeof contactsSchema>

/* Vacancy */

const vacancyBaseFields = {
    id: idSchema,
    title: z.string().max(512),
    price: z.string().max(512),
}

const vacancyAdditionalFields = {
    text: z.string().max(50000),
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