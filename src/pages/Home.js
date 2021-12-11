import React, { useEffect, useRef, useState } from 'react';
import ExtraspeedEffect from '../components/ExtraspeedEffect';
import { asyncTimeout } from '../core/utils';

const Home = () => {
    const [start,setStart]=useState(false)
    const [h1Content,setH1Content]=useState([])
    const ref=useRef({})

    const startAnim=()=>{
        ref.current.h1.classList.add('active')
        setTimeout(() => {
            setStart(true)
        }, 3000);
    }

    const disappearH1=async()=>{
        const children=ref.current.h1.children

        console.log(children);

        for(let i in children){
            if(parseInt(i+1)){
                await asyncTimeout(200)
                children[i].classList.add('active')
            }
        }
    }

    useEffect(()=>{
        if(start){
            ref.current.presskey.classList.add('active')
            window.onkeydown=()=>{
                ref.current.presskey.classList.remove('active')
                disappearH1()
            }
        }
    },[start])

    useEffect(()=>{
        const string='PIERRE HERVELIN'
        setH1Content(string.split(''))
    },[])

    return (
        <main className='Home'>
            <h1 ref={el=>ref.current.h1=el}>
                {h1Content.map((item,i)=>
                    <span key={i}>{item}</span>
                )}
            </h1>
            <p ref={el=>ref.current.presskey=el}>press any key</p>
            <ExtraspeedEffect method={startAnim}/>
        </main>
    );
};

export default Home;