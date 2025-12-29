'use server'

import nodemailer from 'nodemailer'
import { htmlToText } from 'nodemailer-html-to-text'

import { validatePhone, validateMessage, getPhoneDigits } from '@/utils/userDataValidators'

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
