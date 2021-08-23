import React from 'react'
import "../counter/Counter.css"


function Counter ({counter}) {
    return (
        <div className="counter">
            {"Completed : " + counter}
        </div>
    )
}

export default Counter;