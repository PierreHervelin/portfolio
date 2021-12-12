import { speedParticle } from "./class/SpeedParticle"
import { Star } from "./class/Star"
import { LoopContainer } from "./main"
import { asyncTimeout, getRandomInt } from "./utils"

export const move = (canvas, direction) => {
    const config = {
        border: true,
        state: direction,
        speed: getRandomInt(40, 60),
        step: (getRandomInt(0, 10) * 0.1)
    }

    const time = getRandomInt(500, 800)

    const speedStars = (time) => {
        return new Promise((resolve) => {
            let i = 0
            const intervalID = setInterval(() => {
                if (i > time) {
                    clearInterval(intervalID)
                    resolve()
                    return
                }

                for (let star of LoopContainer.stars) {
                    star.state = config.state
                    star.speed = config.speed
                    star.step = config.step
                }

                i+=25
            }, 25);
        })
    }
    const speedGenerationStars = (time) => {
        return new Promise((resolve) => {
            let i = 0
            const intervalID = setInterval(() => {
                if(i > time){
                    clearInterval(intervalID)
                    resolve()
                    return
                }
                console.log('oui');

                const max = getRandomInt(1, 5)
                for (let j = 0; j < max; j++) {
                    LoopContainer.stars.push(
                        new Star(canvas, config)
                    )
                }
                i += 250 / config.speed
            }, 500 / config.speed);
        })
    }

    return new Promise(async (resolve) => {
        const wait1=speedStars(time)
        const wait2=speedGenerationStars(time)

        await wait1
        await wait2
        resolve()
    })
}

export const infiniteSpeed = (canvas) => {
    return [
        setInterval(() => {
            const directions = ['left', 'right', 'top', 'bottom']

            for (let direction of directions) {
                const config = {
                    direction,
                    speed: 10,
                    size: [0, 1]
                }
                LoopContainer.particles.push(
                    new speedParticle(canvas, config),
                )
            }
            for (let direction of directions) {
                const config = {
                    direction,
                    speed: 15,
                    size: [0, 1]
                }
                LoopContainer.particles.push(
                    new speedParticle(canvas, config),
                )
            }
            for (let direction of directions) {
                const config = {
                    direction,
                    speed: 25,
                    size: [1, 1]
                }
                LoopContainer.particles.push(
                    new speedParticle(canvas, config),
                )
            }
            for (let direction of directions) {
                const config = {
                    direction,
                    speed: 30,
                    size: [1, 2]
                }
                LoopContainer.particles.push(
                    new speedParticle(canvas, config),
                )
            }
            for (let direction of directions) {
                const config = {
                    direction,
                    speed: 40,
                    size: [1, 3]
                }
                LoopContainer.particles.push(
                    new speedParticle(canvas, config),
                )
            }
        }, 20),
        setInterval(() => {
            let direction = ''

            const randomDir = () => {
                switch (getRandomInt(0, 3)) {
                    case 0:
                        direction = 'top'
                        break
                    case 1:
                        direction = 'bottom'
                        break
                    case 2:
                        direction = 'right'
                        break
                    case 3:
                        direction = 'left'
                        break
                    default:
                        break
                }
            }

            randomDir()

            const config1 = {
                direction,
                speed: 40,
                size: [2, 4]
            }

            randomDir()

            const config2 = {
                direction,
                speed: 100,
                size: [10, 12]
            }

            LoopContainer.particles.push(
                new speedParticle(canvas, config1),
                new speedParticle(canvas, config2)
            )
        }, 500)
    ]
}