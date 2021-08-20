import React from 'react';
import { Link } from "react-router-dom";
import './GamePage.css';


function GamePage() {
    return (
        <React.Fragment>
            <div className="game-page">                
                <div className="box">
                    <h3>Reversed Spider Solitaire</h3>
                    <br></br>
                    <p>
                        <Link to="/HomePage">Start Game</Link>
                    </p>
                </div>
            </div>
        </React.Fragment> 
    )
}

export default GamePage;