import React, { useEffect, useRef, useState } from 'react';
import { Characters } from '../core/main';
import { asyncTimeout, getRandomInt } from '../core/utils';

const TitleRandomEffect = (props) => {
    const [stringArray,setStringArray]=useState([])
    const [index,setIndex]=useState(0)
    const titleRef=useRef(null)

    const addLetter=async(letter,timeout=150)=>{
        if(letter){
            await asyncTimeout(timeout)
            const span=document.createElement('span')

            if(letter===' '){
                span.innerText='a'
            }else{
                span.innerText=letter
            }
            
            titleRef.current.append(span)
        }
        if(index<stringArray.length){
            setIndex(index+1)
        }else{
            printText()
        }
    }

    const printText=async()=>{
        const children=titleRef.current.children

        for(let i=0;i<stringArray.length;i++){
            await asyncTimeout(50)

            if(stringArray[i]!==' '){
                children[i].innerText=stringArray[i]
            }else{
                children[i].innerText='A'
                children[i].classList.add('space')
            }

            for(let j=i+1;j<children.length;j++){
                children[j].innerText=Characters[
                    getRandomInt(0,Characters.length-1)
                ]
            }
        }
    }

    useEffect(()=>{
        setStringArray(props.text.split(''))
        let i=0
        const interval=setInterval(() => {
            const children=titleRef.current.children

            for(let child of children){
                child.innerText=Characters[
                    getRandomInt(0,Characters.length-1)
                ]
            }
            i+=50

            if(i===props.text.length*150){
                clearInterval(interval)
                return
            }

        }, 50);
    },[])

    useEffect(()=>{
        if(stringArray.length){
            addLetter(stringArray[index])
        }
    },[stringArray])

    useEffect(()=>{
        addLetter(stringArray[index])
    },[index])

    return (
        <div className='title' ref={titleRef}>
            
        </div>
    );
};

export default TitleRandomEffect;