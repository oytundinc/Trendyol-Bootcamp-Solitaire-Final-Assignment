import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../stackHolder/StackHolder.css'
import Card from '../card/Card';

class StackHolder extends React.Component {

    getStyle(style, snapshot) {
        if (!snapshot.isDragging) return {};
        if (!snapshot.isDropAnimating) {
          return style;
        }
      
        return {
          ...style,
          // cannot be 0, but make it super tiny
          transitionDuration: `0.001s`
        };
    }

    render() {
        return (
                <Droppable droppableId={"" + this.props.id}>
                    {(provided, snapshot) => (
                        <ul
                            className="card-holder"
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
                                            style={this.getStyle(provided.draggableProps.style, snapshot)}>
                                            <Card rank={card.rank} suit={card.suit} isFaceDown={card.isFaceDown}></Card>
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