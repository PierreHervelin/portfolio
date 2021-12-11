import React, { useEffect, useRef, useState } from 'react';
import { Particles } from '../core/class/Particles';
import { speedParticle } from '../core/class/SpeedParticle';
import { LoopContainer } from '../core/main';

const ExtraspeedEffect = (props) => {
    const canvasRef=useRef(null)

    useEffect(()=>{
        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')

        const generateParticle2=setInterval(() => {
            LoopContainer.particles.push(
                new speedParticle(canvas,'left'),
                new speedParticle(canvas,'right'),
                new speedParticle(canvas,'bottom'),
                new speedParticle(canvas,'top')
            )
        }, 20);

        const mainloop=setInterval(() => {
            ctx.clearRect(0,0,canvas.width,canvas.height)

            for(let i in LoopContainer.particles){
                let particle=LoopContainer.particles[i]
                if(particle.dead){
                    LoopContainer.particles.splice(i,1)
                    continue
                }
                ctx.fillStyle=`rgba(255,255,255,${particle.lifeTime*0.01})`
                ctx.fillRect(
                    particle.x,
                    particle.y,
                    particle.size,
                    particle.size
                )
                particle.live()
            }
        }, 1000/30)

        setTimeout(() => {
            clearInterval(generateParticle2)
            setTimeout(() => {
                props.method()
                setTimeout(() => {
                    const generateParticle=setInterval(() => {
                        LoopContainer.particles.push(
                            new Particles(canvas)
                        )
                    }, 500);
                }, 1000);
            }, 800);
        }, 500);

        return ()=>{
            clearInterval(mainloop)
            clearInterval(generateParticle2)
        }
    },[])

    return (
        <canvas 
            ref={canvasRef} 
            width={window.innerWidth} 
            height={window.innerHeight}
        />
    );
};

export default ExtraspeedEffect;