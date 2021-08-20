import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../stackHolder/StackHolder.css'

class StackHolder extends React.Component {

    constructor({id, initialCards}) {
        super();
        this.state = {
            id : id,
            cards : (initialCards != null && initialCards.length > 0) ? initialCards : [],
        }
    }

    addCard(card) {
        this.setState({ cards : [...this.state.cards, card]})
    }

    removeCard() {
        return this.state.cards.pop();
    }

    render() {
        return (
                <Droppable droppableId={"" + this.state.id}>
                    {(provided, snapshot) => (
                        <ul
                            className="card-holder"
                            ref={provided.innerRef}>
                            {this.state.cards.map((card, index) => (
                                this.state.cards.length > index + 1 ? 
                                <li key={index}>{card}</li> :
                                <Draggable
                                    key={index}
                                    draggableId={(this.state.id + "/" +index)}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            {card}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
        )
    }
}

export default StackHolder;