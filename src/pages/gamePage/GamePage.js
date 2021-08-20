import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Card from "../../components/card/Card"

function GamePage() {
    return (
        <div>
            <Navbar></Navbar>
            <Card rank={"6"} suit={"♠️"}></Card>
      
        </div>
    )
    

}

export default GamePage;