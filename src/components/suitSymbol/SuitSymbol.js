import React from 'react'
import { Suits } from "../../constants/GameConstants"
import "../suitSymbol/SuitSymbol.css"

function SuitSymbol ({suit, className}) {
    return (
        <div className={className}>
            {Suits[suit]}
        </div>
    )
}

export default SuitSymbol;