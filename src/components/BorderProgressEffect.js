import React, { useEffect, useState } from 'react';

const BorderProgressEffect = (props) => {
    const [config,setConfig]=useState({
        1:false,
        2:false,
        3:false,
        4:false
    })

    const activeBorder=()=>{
        for(let i=getLastActive();i<5;i++){
            const copyConfig={...config}
            copyConfig[i]=true
            setConfig(copyConfig)
        }
    }

    const getLastActive=()=>{
        for(let i in config){
            if(config[i]){
                return Number(i)+1
            }
        }
        return 1
    }

    const desactiveBorder=()=>{
        for(let i=getLastActive()-1;i>0;i--){
            const copyConfig={...config}
            copyConfig[i]=false
            setConfig(copyConfig)
        }
    }

    useEffect(()=>{
        if(props.active){
            activeBorder()
        }else{
            desactiveBorder()
        }
    },[props.active])
    return (
        <div>
            <div className={`top ${config[1]?'active':''}`}/>
            <div className={`right ${config[2]?'active':''}`}/>
            <div className={`bottom ${config[3]?'active':''}`}/>
            <div className={`left ${config[4]?'active':''}`}/>
        </div>

    );
};

export default BorderProgressEffect;