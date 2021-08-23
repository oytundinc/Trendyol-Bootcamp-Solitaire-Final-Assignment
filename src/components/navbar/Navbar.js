import Button from "../button/Button"
import Timer from "../timer/Timer"
import Counter from "../counter/Counter"
import "../navbar/Navbar.css"

const Navbar = ({counter, onClick, needsResetting}) => {
    return (
        <div className="navbar">
            <Timer needsResetting={needsResetting}></Timer>
            <Counter counter={counter} className="counter"></Counter>
            <Button className="new-game-btn" onClick={onClick}>New Game</Button>
        </div>        
    )
}

export default Navbar;