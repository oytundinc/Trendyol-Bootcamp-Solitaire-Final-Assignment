import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../card/Card';
import '../stackHolder/StackHolder.css'

class StackHolder extends React.Component {

    getStyle(style, snapshot, stackId, selectedStackId, index, selectedIndexes) {
        if (snapshot.isDropAnimating) {
            return {
                ...style,
                // cannot be 0, but make it super tiny
                transitionDuration: `0.001s`
              };
        }

        if (snapshot.isDragging) {
            return style;
        }
        if (stackId === selectedStackId && selectedIndexes.length > 1 && selectedIndexes.includes(index)) {
            return {
                ...style,
                display: 'none',
            };
        }
    }

    getListStyle(style, cards) {
        if (cards === null || cards.length === 0) {
            return style;
        } else {
            if(cards.length > 1) {
                let heightAsNumber = (180 + ((cards.length - 1) * 33));
                return {
                    ...style,
                    height: heightAsNumber + 'px',
                }
            } else {
                return {
                    ...style,
                    height: '150px',
                }
            }
        }
    }

    render() {
        return (
            <Droppable droppableId={"" + this.props.id}>
                {(provided, snapshot) => (
                    <div 
                        className="stack-droppable-area"
                        ref={provided.innerRef}
                        style={this.getListStyle(provided.droppableProps.style, this.props.cards)}>
                        <ul className="stack-holder">
                            {this.props.cards.map((card, index) => (
                                <Draggable
                                    key={(this.props.id + "/" + index)}
                                    draggableId={(this.props.id + "/" + index)}
                                    index={index}
                                    isDragDisabled={card.isFaceDown || !card.isDraggable}>
                                    {(provided, snapshot) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            key={index}
                                            style={this.getStyle(provided.draggableProps.style, snapshot, ("" + this.props.id), this.props.selectedStackId, index, this.props.selectedIndexes)}>
                                            <Card rank={card.rank} suit={card.suit} isFaceDown={card.isFaceDown}></Card>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    </div>
                )}
            </Droppable>
        )
    }
}

export default StackHolder;