import React from 'react'
import "../card/Card.css"
import RankSymbol from "../rankSymbol/RankSymbol"
import SuitSymbol from "../suitSymbol/SuitSymbol"


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rank : props.rank,
            suit : props.suit,
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-info-top-left">
                    <RankSymbol rank={this.state.rank} className={"rank"}></RankSymbol>
                    <SuitSymbol suit={this.state.suit} className={"suit"}></SuitSymbol>
                </div>
                <div className="card-info-top-right">
                    <RankSymbol rank={this.state.rank} className={"rank"}></RankSymbol>
                    <SuitSymbol suit={this.state.suit} className={"suit"}></SuitSymbol>
                </div>
                <SuitSymbol suit={this.state.suit} className={"big_suit_center"}></SuitSymbol>
                <div className="card-info-bottom-left"> 
                    <SuitSymbol suit={this.state.suit} className={"suit"}></SuitSymbol>
                    <RankSymbol rank={this.state.rank} className={"rank"}></RankSymbol>
                </div>
                <div className="card-info-bottom-right">
                    <SuitSymbol suit={this.state.suit} className={"suit"}></SuitSymbol>
                    <RankSymbol rank={this.state.rank} className={"rank"}></RankSymbol>
                </div>
            </div>
        )
    }
}

export default Card;