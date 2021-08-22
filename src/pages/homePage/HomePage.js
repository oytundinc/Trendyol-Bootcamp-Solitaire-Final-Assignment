import './HomePage.css';
import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import StackHolder from '../../components/stackHolder/StackHolder';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';

function init() {
    let first = [];
    let index = 1;
    for(let i = 0; i < 10; i++) {
        let stack = [];
        for(let y = index; y < (index + 4); y++) {
            let isFaceDown = (y === (index + 3)) ? false : true;
            stack.push(createCard(i, "♠️", isFaceDown));
        }
        index = index + 4;
        first.push(stack);
    }

    return first;
}

function createCard(rank, suit, isFaceDown) {
    return {
            rank : rank, 
            suit : suit, 
            isFaceDown : isFaceDown,};
}

function relocateCards(sourceStack, destinationStack, source, destination) {
    const sourceClone = Array.from(sourceStack);
    const destClone = Array.from(destinationStack);

    const [removed] = sourceClone.splice(source.index, 1);
    destClone.push(removed);

    const result = [];

    result[source.droppableId] = sourceClone;
    result[destination.droppableId] = destClone;

    return result;
}

function checkIfLastCardNeedsToBeFacedUp(stack) {
    if (stack.length > 0 && stack[stack.length -1].isFaceDown === true) {
        stack[stack.length -1].isFaceDown = false;
    }
}

function HomePage() {

    const[stacks, setStacks] = useState(init());

    function onDragStart(dragStartedEvent) {
    }

    function onDragEnd(dragEndedEvent) {
        const source = dragEndedEvent.source;
        const destination = dragEndedEvent.destination;

        if(destination === null) {
            return;
        }
        
        const sourceStackId = source.droppableId;
        const destinationStackId = destination.droppableId;
        if (sourceStackId === destinationStackId) {
            return;
        }
        let sourceStack = stacks[sourceStackId];
        let destinationStack = stacks[destinationStackId];
        if (destinationStack[destinationStack.length - 1].rank !== (sourceStack[source.index].rank - 1)) {
            return;
        }
        const result = relocateCards(sourceStack, destinationStack, source, destination);

        let newStack = [...stacks];
        newStack[sourceStackId] = result[sourceStackId];
        newStack[destinationStackId] = result[destinationStackId];
        checkIfLastCardNeedsToBeFacedUp(newStack[sourceStackId]);
        setStacks(newStack);
    }

    return (
        <div className="home-page">
            <Navbar></Navbar>
            <DragDropContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}>
                    {stacks.map((stack, index) => (
                        <StackHolder id={index} cards={stack} key={index}></StackHolder>
                    ))}
            </DragDropContext>
        </div>
    )
}

export default HomePage;
