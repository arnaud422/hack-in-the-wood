import React, { useEffect } from 'react';

const Adapt = () => {
    const vibrate = ()=>{
        window.navigator.vibrate(1000)
    }
    
    return (
        <div>       
            <button onClick={vibrate}>test</button>
        </div>
    );
};

export default Adapt;