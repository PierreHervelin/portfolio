import { getRandomInt } from "../utils"

export class speedParticle {
    constructor(canvas,direction){
        const width=canvas.width
        const height=canvas.height

        const centerX=Math.round(width/2)
        const centerY=Math.round(height/2)

        this.x=centerX
        this.y=centerY

        if(['bottom','top'].includes(direction)){
            this.direction=[
                direction,
                getRandomInt(0,1)?'left':'right'
            ]
        }else{
            this.direction=[
                direction,
                getRandomInt(0,1)?'top':'bottom'
            ]
        }
        this.step=getRandomInt(0,20)
        this.lifeTime=80
        this.size=getRandomInt(1,5)
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
                this.y-=30
                break
            case 'bottom':
                if(this.direction[1]==='left'){
                    this.x-=this.step
                }else{
                    this.x+=this.step
                }
                this.y+=30
                break
            case 'left':
                if(this.direction[1]==='top'){
                    this.y-=this.step
                }else{
                    this.y+=this.step
                }
                this.x-=30
                break
            case 'right':
                if(this.direction[1]==='top'){
                    this.y-=this.step
                }else{
                    this.y+=this.step
                }
                this.x+=30
                break
            default:
                break
        }
        this.size++
        this.lifeTime--

        if(this.lifeTime===0){
            this.dead=true
        }
    }

}