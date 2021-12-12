import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const TextAppear = (props) => {
    const [stringArray,setStringArray]=useState([])

    useEffect(()=>{
        console.log(props.text);
        setStringArray(props.text.split(''))
    },[props])

    console.log(stringArray);

    return (
        <div className={props.class}>
            {stringArray.map((letter,i)=>
                <motion.span
                    key={`${props.index}-${i}`}
                    initial={{opacity:0}}
                    animate={{opacity:[0,1,1,0]}}
                    transition={{
                        duration:props.duration?props.duration:5,
                        times:[0,0.05,0.95,1],
                        delay:i*0.1
                    }}
                >
                    {letter}
                </motion.span>
            )}
        </div>
    );
};

export default TextAppear;