import { getRandomInt } from "../utils"

export class Star {
    constructor(canvas, config = { border: false, state: 'standby', speed: 0.5, step: 0.5 }) {

        if (!config.state) {
            config.state = 'standby'
            config.speed = 0.5
            config.step = 0.5
        }

        if (config.state === 'standby' && config.speed !== 0.5) {
            config.speed = 0.5
            config.step = 0.5
        }

        const width = canvas.width
        const height = canvas.height

        this.canvas = canvas

        if (config.border) {
            if (config.state === 'standby' || config.state === 'left') {
                if (getRandomInt(0, 1)) {
                    this.x = 0
                    this.y = getRandomInt(0, height)
                } else {
                    this.x = getRandomInt(0, width)
                    this.y = height
                }
            } else {
                if (getRandomInt(0, 1)) {
                    this.x = width
                    this.y = getRandomInt(0, height)
                } else {
                    this.x = getRandomInt(0, width)
                    this.y = height
                }
            }

        } else {
            this.x = getRandomInt(0, width)
            this.y = getRandomInt(0, height)
        }

        this.size = getRandomInt(1, 3)
        this.luminosityMax = getRandomInt(1, 100)
        this.luminosity = 0

        this.dead = false

        this.speed = config.speed
        this.state = config.state
        this.step = config.step

        this.lifeTime = 0
    }
    live() {
        switch (this.state) {
            case 'standby':
                this.x += this.speed
                this.y -= this.speed
                if (this.luminosity < this.luminosityMax) {
                    this.luminosity++
                }
                break
            case 'left':
                this.x += this.speed
                this.y -= this.speed * this.step
                if (this.luminosity < this.luminosityMax) {
                    this.luminosity+=10
                }
                break
            case 'right':
                this.x -= this.speed
                this.y -= this.speed * this.step
                if (this.luminosity < this.luminosityMax) {
                    this.luminosity+=10
                }
                break
            default:
                break
        }

        this.lifeTime++

        if (
            this.x > this.canvas.width ||
            this.x < 0 ||
            this.y > this.canvas.height ||
            this.y < 0
        ) {
            this.dead = true
        }
    }
}