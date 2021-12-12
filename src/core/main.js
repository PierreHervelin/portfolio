import { getMyAge } from "./utils"

export const LoopContainer={
    particles:[],
    planets:[],
    stars:[]
}
export const Characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/?-#&@'

export const Me={
    age:getMyAge(),
    firstName:'Pierre',
    lastName:'Hervelin',
    location:'Paris',
    contact:{
        number:'0651211840',
        mail:'hervelinp.code@gmail.com'
    },
    networks:{
        github:'https://github.com/PierreHervelin',
        linkedin:'https://www.linkedin.com/in/pierre-hervelin-a25b60221/'
    }
}
