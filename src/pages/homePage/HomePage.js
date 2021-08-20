import './HomePage.css';
import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Card from "../../components/card/Card"
import CardHolder from '../../components/cardHolder/CardHolder';

function HomePage() {

    function createCard(rank, suit) {
        return <Card rank={rank} suit={suit} />;
    }
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <CardHolder initialCards={[createCard("6", "♠️"), createCard("6", "♠️"), createCard("6", "♠️"), createCard("6", "♠️")]}></CardHolder>
            <CardHolder></CardHolder>
        </div>
    )
    

}

export default HomePage;
