import React from 'react'
import "../card/Card.css"
import RankSymbol from "../rankSymbol/RankSymbol"
import SuitSymbol from "../suitSymbol/SuitSymbol"
import CardBack from "../../assets/solitaire-card-back.jpeg"

class Card extends React.Component {

    render() {
        return (
            <div className="card">
                {this.props.isFaceDown ? <img draggable={false} src={CardBack} alt="cardBack"/> :
                <div>
                    <div className="card-info-top-left">
                        <RankSymbol rank={this.props.rank} className={"rank"}></RankSymbol>
                        <SuitSymbol suit={this.props.suit} className={"suit"}></SuitSymbol>
                    </div>
                    <div className="card-info-top-right">
                        <RankSymbol rank={this.props.rank} className={"rank"}></RankSymbol>
                        <SuitSymbol suit={this.props.suit} className={"suit"}></SuitSymbol>
                    </div>
                    <SuitSymbol suit={this.props.suit} className={"big_suit_center"}></SuitSymbol>
                    <div className="card-info-bottom-left"> 
                        <SuitSymbol suit={this.props.suit} className={"suit"}></SuitSymbol>
                        <RankSymbol rank={this.props.rank} className={"rank"}></RankSymbol>
                    </div>
                    <div className="card-info-bottom-right">
                        <SuitSymbol suit={this.props.suit} className={"suit"}></SuitSymbol>
                        <RankSymbol rank={this.props.rank} className={"rank"}></RankSymbol>
                    </div>
                </div>              
                }
            </div>
        )
    }
}

export default Card;