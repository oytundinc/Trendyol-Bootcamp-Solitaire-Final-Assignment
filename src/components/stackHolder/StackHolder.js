import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../stackHolder/StackHolder.css'
import Card from '../card/Card';

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

    render() {
        return (
                <Droppable droppableId={"" + this.props.id}>
                    {(provided, snapshot) => (
                        <div className="stack-holder-container">
                            <ul
                                className="stack-holder"
                                ref={provided.innerRef}>
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