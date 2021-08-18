import React from 'react'
import "../rankSymbol/RankSymbol.css"


function RankSymbol ({rank, className}) {

    return (
        <div className={className}>
            {rank}
        </div>
    
    )
}

export default RankSymbol;