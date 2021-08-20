import './HomePage.css';
import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Card from "../../components/card/Card"
import StackHolder from '../../components/stackHolder/StackHolder';

function HomePage() {

    function createCard(rank, suit) {
        return <Card rank={rank} suit={suit} />;
    }
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <StackHolder initialCards={[createCard("6", "♠️"), createCard("6", "♠️"), createCard("6", "♠️"), createCard("6", "♠️")]}></StackHolder>
            <StackHolder></StackHolder>
        </div>
    )
    

}

export default HomePage;
