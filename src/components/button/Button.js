import React from 'react'
import '../button/Button.css'


function Button({children,...rest}) {
    return (
        <button className="btn" {...rest}>{children}</button>
    )
}


export default Button;