export const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const asyncTimeout = (i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, i);
    })
}

export const getMyAge = () => {
    const birthDate = new Date(2001, 7, 27)
    const diffms = Date.now() - birthDate.getTime()

    return new Date(diffms).getUTCFullYear() - 1970
}