import { getRandomInt } from "../utils";

export class Particles {
    constructor(canvas){
        this.x=getRandomInt(0,canvas.width)
        this.y=getRandomInt(0,canvas.height)
        this.size=getRandomInt(1,5)
        
        this.lifeTime=100
        this.dead=false
    }
    live(){
        this.lifeTime--
        this.y--

        if(this.lifeTime===0){
            this.dead=true
        }
    }
}