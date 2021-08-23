import React from 'react'
import '../button/Button.css'


function Button({children,...rest}) {
    return (
        <button {...rest}>{children}</button>
    )
}


export default Button;