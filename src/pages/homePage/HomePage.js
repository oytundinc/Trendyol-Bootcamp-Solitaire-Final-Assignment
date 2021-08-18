import './HomePage.css';
import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Card from "../../components/card/Card"

function HomePage() {
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <Card rank={"5"} suit={"♠️"}></Card>
        </div>
    )
    

}

export default HomePage;
