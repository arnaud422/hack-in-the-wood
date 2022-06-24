import React, { useEffect } from 'react';

const Adapt = () => {
    const vibrate = ()=>{
        console.log('tet')
        window.navigator.vibrate(1000)
    }
    
    useEffect(()=>{
        window.navigator.vibrate([1000,300,1000])
    })
    return (
        <div>       
            <button onClick={vibrate}>test</button>
        </div>
    );
};

export default Adapt;