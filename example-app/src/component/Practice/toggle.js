import React, { useState } from 'react'

export default function Toggle() {
    const [state, setState] = useState(false);

    const message = state === true ? "Turn on" : "Turn off";

    return (
        <button
            onClick={ ()=>{setState(prev => !prev);}}>            
            {message}
        </button>
    )
}
   