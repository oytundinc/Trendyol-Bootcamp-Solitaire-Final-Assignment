import './HomePage.css';
import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import StackHolder from '../../components/stackHolder/StackHolder';
import Button from "../../components/button/Button"
import { DragDropContext } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import CardBack from "../../assets/solitaire-card-back.jpeg"
import {populateCards} from "../../logic/Game"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function relocateCards(sourceStack, destinationStack, source, destination) {
    const sourceClone = Array.from(sourceStack);
    const destClone = Array.from(destinationStack);

    const relocated = sourceClone.splice(source.index, (sourceStack.length - source.index));
    destClone.push(...relocated);
    const result = [];

    result[source.droppableId] = sourceClone;
    result[destination.droppableId] = destClone;

    return result;
}

function moveCard(destinationStack, card) {
    const destClone = Array.from(destinationStack);
    destClone.push(card);

    return destClone;
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

function allowCardsToDrag(stack, startingIndexOfOrderedCards) {
    if (stack.length > 0) {
        if (startingIndexOfOrderedCards === null) {
            startingIndexOfOrderedCards = stack.length - 1;
        }
        for(let i = 0; i < stack.length; i++) {
            if (i < startingIndexOfOrderedCards) {
                stack[i].isDraggable = false;
            } else {
                stack[i].isDraggable = true;
            }
            
        }
    }
}
function isWin(stacks) {
    let isWin = true;
    for(let i = 0; i < stacks.length; i++) {
        if(stacks[i].length > 0) {
            isWin = false;
        }
    }
    return isWin;
}

function checkStackHasCompletedSequence(stack, startingIndexOfOrderedCards) {
    return 13 === (stack.length - startingIndexOfOrderedCards);
}

function HomePage() {

    const[counter, setCounter] = useState(0);

    const [canDeal, setCanDeal] = useState(true);
    
    const[dealStacks, setDealStacks] = useState([]);

    const[stacks, setStacks] = useState([]);

    const[selectedIndexes, setSelectedIndexes] = useState([]);

    const[selectedStackId, setSelectedStackId] = useState("");

    const[needsResetting, setNeedsResetting] = useState(false);

    function startNewGame() {
        const populatedStacks = populateCards();
        for(let i = 0; i < 10; i++) {
            checkIfLastCardNeedsToBeFacedUp(populatedStacks[i]);
            allowCardsToDrag(populatedStacks[i], null);
        }
        setStacks(populatedStacks.slice(0, 10));
        setDealStacks(populatedStacks.slice(10));
        setCounter(0);
        setSelectedStackId("");
        setSelectedIndexes([]);
        setCanDeal(true);
    }

    useEffect(() => {
        startNewGame();
    }, []);

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
            return;
        }
        
        const sourceStackId = source.droppableId;
        const destinationStackId = destination.droppableId;
        if (sourceStackId === destinationStackId) {
            return;
        }
        let sourceStack = stacks[sourceStackId];
        let destinationStack = stacks[destinationStackId];
        if (destinationStack.length !== 0 && destinationStack[destinationStack.length - 1].rank !== (sourceStack[source.index].rank - 1)) {
        toast("Geçersiz hamle!");
            return;
        }
        const result = relocateCards(sourceStack, destinationStack, source, destination);

        let newStacks = [...stacks];
        newStacks[sourceStackId] = result[sourceStackId];
        newStacks[destinationStackId] = result[destinationStackId];
        checkIfLastCardNeedsToBeFacedUp(newStacks[sourceStackId]);
        let startingIndexOfOrderedCardsInSourceStack = getStartingIndexOfOrderedCards(newStacks[sourceStackId]);
        let startingIndexOfOrderedCardsInDestinationStack = getStartingIndexOfOrderedCards(newStacks[destinationStackId]);
        if (checkStackHasCompletedSequence(newStacks[destinationStackId], startingIndexOfOrderedCardsInDestinationStack)) {
            newStacks[destinationStackId].splice(-13);
            checkIfLastCardNeedsToBeFacedUp(newStacks[destinationStackId]);
            startingIndexOfOrderedCardsInDestinationStack = getStartingIndexOfOrderedCards(newStacks[destinationStackId]);
            setCounter(counter + 1);
        };
        allowCardsToDrag(newStacks[sourceStackId], startingIndexOfOrderedCardsInSourceStack);
        allowCardsToDrag(newStacks[destinationStackId], startingIndexOfOrderedCardsInDestinationStack);
        if (isWin(newStacks)) {
            toast.success('YOU WIN!!! :)', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        setStacks(newStacks);
    }

    function dealCards () {
        if (canDeal) {
            let newStacks = [...stacks];
            const [deal] = dealStacks.splice(dealStacks.length - 1);
            for (let i = 0; i < 10; i++) {
                const card = deal[i];
                card.isFaceDown = false;
                const stack = stacks[i];
                const newStack = moveCard(stack, card);      
                newStacks[i] = newStack;
                let startingIndexOfOrderedCardsInStack = getStartingIndexOfOrderedCards(newStack);
                allowCardsToDrag(newStack, startingIndexOfOrderedCardsInStack);
            }
            setStacks(newStacks);
        }
        if (dealStacks.length === 0) {
            setCanDeal(false);
        }
    }

    function handleNewGame() {
        toast.dismiss();
        setNeedsResetting(true);
        startNewGame();
        setTimeout(() => {
            setNeedsResetting(false);
        }, 1);
    }

    return (
        <div>
            <ToastContainer/>
            <Navbar counter={counter} onClick={handleNewGame} needsResetting={needsResetting}></Navbar>
            <div className="game-container">
                <div className="game-row">
                    <DragDropContext
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}>
                        {stacks.map((stack, index) => (
                            <StackHolder id={index} cards={stack} key={index} selectedIndexes={selectedIndexes} selectedStackId={selectedStackId}></StackHolder>
                        ))}
                    </DragDropContext>
                </div>
                {canDeal && <Button className="deal-cards-btn" onClick={dealCards}><img src={CardBack} alt="cardback"/></Button> }
            </div>
        </div>
    )
}

export default HomePage;
