import React from 'react';
import { Link } from "react-router-dom";
import './WelcomePage.css';


function WelcomePage() {
    return (
        <React.Fragment>
            <div className="welcome-page">                
                <div className="box">
                    <h3>Reversed Spider Solitaire</h3>
                    <br></br>
                    <p>
                        <Link className="link" to="/HomePage">Start Game</Link>
                    </p>
                </div>
            </div>
        </React.Fragment> 
    )
}

export default WelcomePage;