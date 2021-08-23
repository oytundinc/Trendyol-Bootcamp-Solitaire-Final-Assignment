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
            stack.push(createCard(i, "♠️", isFaceDown, !isFaceDown));
        }
        index = index + 4;
        first.push(stack);
    }

    return first;
}

function createCard(rank, suit, isFaceDown, isDraggable) {
    return {
            rank : rank, 
            suit : suit, 
            isFaceDown : isFaceDown,
            isDraggable : isDraggable};
}

function relocateCards(sourceStack, destinationStack, source, destination) {
    const sourceClone = Array.from(sourceStack);
    const destClone = Array.from(destinationStack);

    const removed = sourceClone.splice(source.index, (sourceStack.length - source.index));
    destClone.push(...removed);
    const result = [];

    result[source.droppableId] = sourceClone;
    result[destination.droppableId] = destClone;

    return result;
}

function checkIfLastCardNeedsToBeFacedUp(stack) {
    const lastCard = stack[stack.length -1];
    if (stack.length > 0 && lastCard.isFaceDown === true) {
        lastCard.isFaceDown = false;
    }
}

function getStartingIndexOfOrderedCards(stack) {
    let startingIndexOfOrderedCards = null;
    if(stack.length > 0) {
        for(let i = 0; i < stack.length; i++) {
            let card = stack[i];
            if (card.isFaceDown || i === (stack.length - 1)) {
                continue;
            }
            let nextCard  = stack[i + 1];
            if ((card.rank + 1) !== nextCard.rank) {
                startingIndexOfOrderedCards = null;
                continue;
            } else {
                if (startingIndexOfOrderedCards === null) {
                    startingIndexOfOrderedCards = i
                }
            }
        }
    }
    return startingIndexOfOrderedCards;
}

function updateStack(stack, startingIndexOfOrderedCards) {
    if (startingIndexOfOrderedCards === null) {
        const lastCard = stack[stack.length -1];
        lastCard.isDraggable = true;
    } else {
        for(let i = startingIndexOfOrderedCards; i < stack.length; i++) {
            stack[i].isDraggable = true;
        }
    }
}

function HomePage() {

    // 700px ----> 400 px 

    // UI - Droppable area fit content???

    // UI - Game Bottom deal section 

    // Create cards, shuffle, deal them

    // Check completed arrays and increase 

    // Dialogs warning dialog, success dialog

    // Naming conventions, check variable names, check const let usage, function names, SOLID
    
    // Unit Test

    // Cypress UI test

    // try-catch and logs
    

    const[stacks, setStacks] = useState(init());

    const[selectedIndexes, setSelectedIndexes] = useState([]);

    const[selectedStackId, setSelectedStackId] = useState("");

    function onDragStart(dragStartedEvent) {
        const source = dragStartedEvent.source;
        const sourceStackId = dragStartedEvent.source.droppableId;
        let sourceStack = stacks[sourceStackId];
        const newSelectedIndexes = [];
        for(let i = source.index; i < sourceStack.length; i++) {
            newSelectedIndexes.push(i);
        }
        setSelectedStackId(sourceStackId);
        setSelectedIndexes(newSelectedIndexes);
    }

    function onDragEnd(dragEndedEvent) {
        setSelectedStackId("");
        setSelectedIndexes([]);
        const source = dragEndedEvent.source;
        const destination = dragEndedEvent.destination;

        if(destination === null) {
            // Show can't move dialog
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
        updateStack(newStack[sourceStackId], getStartingIndexOfOrderedCards(newStack[sourceStackId]));
        updateStack(newStack[sourceStackId], getStartingIndexOfOrderedCards(newStack[destinationStackId]));
        setStacks(newStack);
    }

    return (
        <div className="home-page">
            <Navbar></Navbar>
            <div className="game-container">
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}>
                    {stacks.map((stack, index) => (
                        <StackHolder id={index} cards={stack} key={index} selectedIndexes={selectedIndexes} selectedStackId={selectedStackId}></StackHolder>
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}

export default HomePage;
