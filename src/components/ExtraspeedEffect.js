import React, { useEffect, useRef, useState } from 'react';
import { Star } from '../core/class/Star';
import { LoopContainer } from '../core/main';
import { infiniteSpeed, move } from '../core/movements';
import { getRandomInt } from '../core/utils';

const ExtraspeedEffect = (props) => {
    const [isStopped, setIsStopped] = useState(false)
    const [intervals, setIntervals] = useState([])
    const [mainLoop, setMainLoop] = useState(null)
    const canvasRef = useRef(null)

    const movePage=async()=>{
        const canvas = canvasRef.current

        for (let interval of intervals) {
            clearInterval(interval)
        }

        await move(canvas, props.direction)

        const config = {
            border: true
        }
        for (let star of LoopContainer.stars) {
            star.state = 'standby'
            star.speed = 0.5
            star.step = 0.5
        }

        intervals.push(
            setInterval(() => {
                const max = getRandomInt(1, 5)
                for (let i = 0; i < max; i++) {
                    LoopContainer.stars.push(
                        new Star(canvas, { border: true })
                    )
                }
            }, 500)
        )
        setIntervals([...intervals])
        props.arrived()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const intervalsContainer = infiniteSpeed(canvas)

        intervals.push(intervalsContainer[0], intervalsContainer[1])

        setMainLoop(
            setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                for (let i in LoopContainer.particles) {
                    let particle = LoopContainer.particles[i]
                    if (particle.dead) {
                        LoopContainer.particles.splice(i, 1)
                        continue
                    }
                    ctx.fillStyle = `rgba(255,255,255,${particle.lifeTime * 0.01})`
                    ctx.fillRect(
                        particle.x,
                        particle.y,
                        particle.size,
                        particle.size
                    )
                    particle.live()
                }

                for (let i in LoopContainer.stars) {
                    let star = LoopContainer.stars[i]
                    if (star.dead) {
                        LoopContainer.stars.splice(i, 1)
                        continue
                    }

                    ctx.fillStyle = `rgba(255,255,255,${star.luminosity * 0.01})`
                    ctx.fillRect(
                        star.x,
                        star.y,
                        star.size,
                        star.size
                    )

                    star.live()
                }

                for (let i in LoopContainer.planets) {
                    let planet = LoopContainer.planets[i]
                    const centerX = canvas.width / 2
                    const centerY = canvas.height / 2

                    let color = 200

                    for (let j = planet.size; j > 0; j -= 50) {
                        if (j > 0) {
                            ctx.beginPath()
                            ctx.arc(centerX, centerY, j, 0, 2 * Math.PI, false)
                            ctx.fillStyle = `rgb(0,${color <= 255 ? color : 255},0)`
                            ctx.fill()
                            color += 5
                        }
                    }

                    planet.live()
                }
            }, 1000 / 40)
        )

        setIntervals([...intervals])

        window.onkeydown = () => {
            if (!isStopped) {
                setIsStopped(true)
            }
        }

        return () => {
            for (let interval of intervals) {
                clearInterval(interval)
            }
            clearInterval(mainLoop)
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (isStopped) {
            for (let interval of intervals) {
                clearInterval(interval)
            }
            props.stop()

            setTimeout(() => {
                for (let i = 0; i < 100; i++) {
                    LoopContainer.stars.push(
                        new Star(canvas)
                    )
                }
                intervals.push(
                    setInterval(() => {
                        const max = getRandomInt(1, 5)
                        for (let i = 0; i < max; i++) {
                            LoopContainer.stars.push(
                                new Star(canvas, { border: true })
                            )
                        }
                    }, 500)
                )
                setIntervals([...intervals])
            }, 1000);
        }
    }, [isStopped])

    useEffect(() => {
        if (isStopped) {
            movePage()
        }

    }, [props.page])

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={
                () => {
                    if (!isStopped) {
                        setIsStopped(true)
                    }
                }
            }
        />
    );
};

export default ExtraspeedEffect;