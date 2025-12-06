export function validateMessage(value: string) {
    if (typeof value !== 'string') return 'Введите сообщение'
    if (value.length < 1) return 'Будем рады знать что Вы думаете'
    if (value.length > 1000) return 'Слишком длинное обращение'

    return ''
}

export function getPhoneDigits(value: string) {
    const digits = value.match(/\d/g)

    if (digits) {
        return digits.join('')
    }

    return ''
}

export function validatePhone(value: string) {
    if (typeof value !== 'string')  return 'Введите телефон'

    const phone = getPhoneDigits(value)

    if (!phone)  return 'Введите телефон'
    if (phone.length !== 11)  return 'Введен некорректный номер телефона'

    return ''
}
