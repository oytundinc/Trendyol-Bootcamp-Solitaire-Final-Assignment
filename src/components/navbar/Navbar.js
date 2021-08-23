import Button from "../button/Button"
import Timer from "../timer/Timer"
import "../navbar/Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <Timer></Timer>
            <Button className="new-game-btn">New Game</Button>
        </div>        
    )
}

export default Navbar;