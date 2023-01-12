export const generateId = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)
    return random + date
}

export const resetDate = () => {
    const time = Date.now()
    const today = new Date(time)
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return today.toLocaleDateString('es-ES', options)
}