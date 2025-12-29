'use server'

import nodemailer from 'nodemailer'
import { htmlToText } from 'nodemailer-html-to-text'

import { validatePhone, validateEmail, validateMessage, getPhoneDigits } from '@/utils/userDataValidators'

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST
const SMTP_SERVER_PORT = Number(process.env.SMTP_SERVER_PORT)
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD
const EMAIL_SUBJECT = process.env.EMAIL_SUBJECT
const FROM = process.env.EMAIL_FROM
const EMAIL_TO = process.env.EMAIL_TO



const transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: SMTP_SERVER_PORT,
    secure: true,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
}, {
    from: FROM,
})

await transporter.verify()

transporter.use('compile', htmlToText())

export async function sendMail(phone: string, message: string, { subject }: { subject?: string } = {}) {
    const phoneError = validatePhone(phone)

    if (phoneError) {
        throw new Error(phoneError)
    }

    const messageError = validateMessage(message)

    if (messageError) {
        throw new Error(messageError)
    }

    const cleanedPhone = getPhoneDigits(phone)

    try {
        await transporter.sendMail({
            to: EMAIL_TO,
            subject: EMAIL_SUBJECT + (subject ?? 'новое сообщение'),
            text: `Телефон: ${cleanedPhone}\n\n${message || ''}`,
        })
    } catch {
        throw new Error('Прием обращений временно недоступен. Попробуйте написать в telegram')
    }
}

export interface VacancyApplicationData {
    phone: string
    email?: string
    coverLetter?: string
    vacancyTitle: string
    vacancyPrice?: string
}

export async function sendVacancyApplication(data: VacancyApplicationData) {
    const phoneError = validatePhone(data.phone)

    if (phoneError) {
        throw new Error(phoneError)
    }

    if (data.email?.trim()) {
        const emailError = validateEmail(data.email)

        if (emailError) {
            throw new Error(emailError)
        }
    }

    const cleanedPhone = getPhoneDigits(data.phone)

    const lines = [
        `Вакансия: ${data.vacancyTitle}`,
        data.vacancyPrice ? `Зарплата: ${data.vacancyPrice}` : null,
        '',
        `Телефон: ${cleanedPhone}`,
        data.email?.trim() ? `Email: ${data.email}` : null,
    ].filter(line => line !== null)

    if (data.coverLetter?.trim()) {
        lines.push('', 'Сопроводительное письмо:', data.coverLetter.trim())
    }

    try {
        await transporter.sendMail({
            to: EMAIL_TO,
            subject: EMAIL_SUBJECT + `отклик на вакансию: ${data.vacancyTitle}`,
            text: lines.join('\n'),
        })
    } catch {
        throw new Error('Прием обращений временно недоступен. Попробуйте написать в telegram')
    }
}
