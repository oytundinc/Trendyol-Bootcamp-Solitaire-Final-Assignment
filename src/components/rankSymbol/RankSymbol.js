import React from 'react'
import { Ranks } from "../../constants/GameConstants"
import "../rankSymbol/RankSymbol.css"


function RankSymbol ({rank, className}) {
    return (
        <div className={className}>
            {Ranks[rank + ""]}
        </div>
    )
}

export default RankSymbol;