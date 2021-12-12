export class Planet{
    constructor(){
        this.size=0
        this.stop=false
    }
    live(){
        if(!this.stop){
            this.size++
            if(this.size>300) this.stop=true
        }
    }
}