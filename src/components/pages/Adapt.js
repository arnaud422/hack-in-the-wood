import React, { useEffect } from 'react';

const Adapt = () => {
    useEffect(()=>{
        window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]); // Vibre 'SOS' en Morse.
    })
    return (
        <div>
            Cette est page est la page des personnes avec un soucis de vue
        </div>
    );
};

export default Adapt;