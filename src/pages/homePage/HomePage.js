import './HomePage.css';
import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Card from "../../components/card/Card"
import StackHolder from '../../components/stackHolder/StackHolder';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';

function HomePage() {

    const[stacks, setStacks] = useState(init());

    function init() {
        let stacks = [];
        for(let i = 0; i < 10; i++) {
            let stack = [];
            stack.push(createCard("" + i, "♠️"));
            stacks.push(stack);
        }

        return stacks;
    }

    function createCard(rank, suit) {
        return <Card rank={rank} suit={suit} />;
    }

    function getStack(id) {
        return stacks[id];
    }

    function getStacks() {
        return stacks;
    }

    function onDragStart(dragStartedEvent) {
        console.log("start");
        console.log(dragStartedEvent);

        console.log(dragStartedEvent.source)
    }

    function onDragEnd(dragEndedEvent) {
        console.log("end");
        console.log(dragEndedEvent);

        const destination = dragEndedEvent.destination;

        if(destination === null) {
            return;
        }

        const sourceStackId = dragEndedEvent.source.droppableId;
        const destinationStackId = destination.droppableId;

        let sourceStack = getStack(sourceStackId);
        console.log(sourceStack);
        let destinationStack = getStack(destinationStackId);
        console.log(destinationStack);

        let cardId = parseInt(dragEndedEvent.draggableId.substring(dragEndedEvent.draggableId.indexOf('/') + 1));
        console.log(cardId);
        destinationStack.push(sourceStack[cardId]);
        console.log(sourceStack[cardId]);
        sourceStack.splice(cardId, 1);

        let stacks = getStacks();
        stacks[sourceStackId] = sourceStack;
        stacks[destinationStackId] = destinationStack;

        setStacks(stacks);
    }


    function relocateCards() {


    }
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <DragDropContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}>
                    {stacks.map((stack, index) => (
                        <StackHolder id={index} initialCards={stack}></StackHolder>
                    ))}
            </DragDropContext>
        </div>
    )
}

export default HomePage;
