import { motion } from 'framer-motion';
import React from 'react';

const BlackBottom = () => {
    return (
        <motion.div 
            className='blackbottom'
            initial={{opacity:1}}
            animate={{opacity:0}}
            transition={{
                duration:2,
                delay:1
            }}
        />
    );
};

export default BlackBottom;