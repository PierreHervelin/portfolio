import { getRandomInt } from "../utils"

export class speedParticle {
    constructor(canvas,config={direction:'left',speed:30,size:[1,3]}){
        //config :

        if(!config.size){
            config.size=[1,3]
        }
        if(!config.speed){
            config.speed=30
        }

        this.canvas=canvas

        const width=canvas.width
        const height=canvas.height

        const centerX=Math.round(width/2)
        const centerY=Math.round(height/2)

        this.x=centerX
        this.y=centerY

        if(['bottom','top'].includes(config.direction)){
            this.direction=[
                config.direction,
                getRandomInt(0,1)?'left':'right'
            ]
        }else{
            this.direction=[
                config.direction,
                getRandomInt(0,1)?'top':'bottom'
            ]
        }
        this.step=getRandomInt(0,30)
        this.lifeTime=0
        this.size=getRandomInt(config.size[0],config.size[1])
        this.speed=config.speed
        this.dead=false
    }

    live(){
        switch (this.direction[0]) {
            case 'top':
                if(this.direction[1]==='left'){
                    this.x-=this.step
                }else{
                    this.x+=this.step
                }
                this.y-=this.speed
                break
            case 'bottom':
                if(this.direction[1]==='left'){
                    this.x-=this.step
                }else{
                    this.x+=this.step
                }
                this.y+=this.speed
                break
            case 'left':
                if(this.direction[1]==='top'){
                    this.y-=this.step
                }else{
                    this.y+=this.step
                }
                this.x-=this.speed
                break
            case 'right':
                if(this.direction[1]==='top'){
                    this.y-=this.step
                }else{
                    this.y+=this.step
                }
                this.x+=this.speed
                break
            default:
                break
        }
        if(this.speed<15){
            this.lifeTime+=0.1
        }else if(this.speed<20){
            this.lifeTime+=0.2
        }else if(this.speed<30){
            this.lifeTime++
        }else{
            this.lifeTime+=2
        }

        if(this.lifeTime%4===0){
            this.size++
        }

        if(
            this.x>this.canvas.width ||
            this.x<0 ||
            this.y>this.canvas.height ||
            this.y<0
        ){
            this.dead=true
        }
    }

}