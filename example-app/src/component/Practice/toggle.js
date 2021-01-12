import React, { useState } from 'react'

export default function Toggle() {
    const [state, setState] = useState(false);
    return (
        <button
            onClick={ ()=>{setState(prev => !prev);}}>            
            {state === true ? "Turn on" : "Turn off"}
        </button>
    )
}
