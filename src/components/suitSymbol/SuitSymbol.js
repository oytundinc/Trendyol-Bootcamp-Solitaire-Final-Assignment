import React from 'react'
import "../suitSymbol/SuitSymbol.css"


function SuitSymbol ({suit, className}) {

    return (
        <div className={className}>
            {suit}
        </div>
    )
}

export default SuitSymbol;