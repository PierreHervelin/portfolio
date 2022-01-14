import React, { useEffect } from 'react';
import { initSceneTest } from '../core/three';

const Test = () => {
    useEffect(() => {
        initSceneTest()
    }, [])
    return (
        <div className='Home'>
            
        </div>
    );
};

export default Test;