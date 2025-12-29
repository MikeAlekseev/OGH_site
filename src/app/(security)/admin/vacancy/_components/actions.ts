'use server'

import { VacancyFull } from '@/repository/types'
import { vacancyListRepository } from '@/repository/vacancyListRepository'
import { vacancyFullRepository } from '@/repository/vacancyFullRepository'

const NOT_FOUND_MESSAGE = 'Вакансия не найдена'

export interface SaveVacancyActionData {
    id?: string
    title: string
    price: string
    text: string
}

export async function saveVacancyAction(data: SaveVacancyActionData) {
    let { id } = data
    const isCreating = !id

    if (!id) {
        id = (await vacancyListRepository.getNextId()).toString()
    } else {
        const existing = await vacancyFullRepository.getData(id)

        if (!existing) {
            throw new Error(NOT_FOUND_MESSAGE)
        }
    }

    const finalData: VacancyFull = {
        id,
        title: data.title,
        price: data.price,
        text: data.text,
    }

    await vacancyFullRepository.setData(finalData)

    return { id, isCreating }
}

export async function deleteVacancyAction(id: string) {
    return vacancyFullRepository.deleteData(id)
}
