import React, { useEffect, useRef, useState } from 'react';
import BlackBottom from '../components/BlackBottom';
import BorderProgressEffect from '../components/BorderProgressEffect';
import ExtraspeedEffect from '../components/ExtraspeedEffect';
import Profile from '../components/Profile';
import TextAppear from '../components/TextAppear';
import { LoopContainer } from '../core/main';

let direction=null

const Home = () => {
    const [isStarted,setIsStarted]=useState(false)
    const [messageBottom,setMessageBottom]=useState('')
    const [activeHelp,setActiveHelp]=useState(false)
    const [helpContent,setHelpContent]=useState(null)
    const [page,setPage]=useState(0)
    const [inMove,setInMove]=useState(true)
    
    const ref=useRef({})

    const start=()=>{
        setIsStarted(true)
    }

    const rightPage=()=>{
        setInMove(true)
        direction='right'
        if(page>=4){
            setPage(0)
        }else{
            setPage(page+1)
        }
    }

    const leftPage=()=>{
        setInMove(true)
        direction='left'
        if(page<=0){
            setPage(4)
        }else{
            setPage(page-1)
        }
    }

    const arrivedOnPage=()=>{
        setInMove(false)
    }

    useEffect(()=>{
        setInterval(() => {
            console.log(LoopContainer);
        }, 1000);
    },[])

    useEffect(()=>{
        if(activeHelp){
            if(!helpContent){
                setHelpContent(
                    <Profile/>
                )
            }
        }
    },[activeHelp])

    useEffect(()=>{
        if(isStarted){
            setTimeout(() => {
                setMessageBottom(
                    <TextAppear text='Somewhere, lost in space' index={1} duration={12} class='message-bottom'/>
                )
                setInMove(false)
            }, 1000);
        }
    },[isStarted])

    return (
        <main className='Home'>
            <ExtraspeedEffect 
                stop={start} 
                arrived={arrivedOnPage} 
                page={page} 
                direction={direction}
            />
            <p 
                className={`${isStarted?'':'active'}`}
            >press any key</p>
            <span 
                className={`material-icons helpicon ${isStarted?'started':''} ${activeHelp?'active':''}`}
                onClick={()=>setActiveHelp(!activeHelp)}
            >help_outline</span>
            {messageBottom}
            <div className='help-infos'>
                <BorderProgressEffect active={activeHelp}/>
                {helpContent}
            </div>
            <div className={`arrow-container ${inMove?'in-move':''}`}>
                <span 
                    className='material-icons' 
                    onClick={leftPage}
                >double_arrow</span>
                <span 
                    className='material-icons'
                    onClick={rightPage}
                >double_arrow</span>
            </div>
            <BlackBottom/>
        </main>
    );
};

export default Home;