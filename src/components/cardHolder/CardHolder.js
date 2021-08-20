import React from 'react'
import '../cardHolder/CardHolder.css'

class CardHolder extends React.Component {

    constructor({initialCards}) {
        super();
        this.state = {
            cards : (initialCards != null && initialCards.length > 0) ? initialCards : []
        }
    }

    addCard(card) {
        this.setState({ cards : [...this.state.cards, card]})
    }

    removeCard() {
        return this.state.cards.pop();
    }

    render() {
        const listItems = this.state.cards.map((card, index) =>
                <li key={index}>{card}</li>
        );
        return (
             <ul className="card-holder">{listItems}</ul>
        )
    }
}

export default CardHolder;