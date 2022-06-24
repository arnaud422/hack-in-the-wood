import React, { useState } from 'react';
import "../style/transportButton.css"

const TransportBtn = (props) => {
    const [transport, setTransport] = useState(props.transport)
    const [bgColor, setBgColor] = useState(props.bgColor)

    const btnStyle = {
        background: bgColor
    }
    return (
        <div className='icon' style={btnStyle}>
            <img src={`/icons/${transport}-ico.svg`} alt={transport} />
        </div>
    );
};

export default TransportBtn;