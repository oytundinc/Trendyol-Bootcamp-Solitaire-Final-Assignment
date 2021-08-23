import * as _ from "lodash";
import {RankValues} from "../constants/GameConstants";

export const populateCards = () => {
  let cards = [];
  RankValues.forEach((rank) => {
    for (let i = 1; i <= 8; i++) {
      cards.push(createCard(rank, "SPADES", true, false));
    }
  });
  let shuffledCards = _.shuffle(cards);
  const stackWithSixCards = _.chunk(shuffledCards.slice(0, 24), 6);
  const stackWithFiveCards = _.chunk(shuffledCards.slice(24, 54), 5);
  const dealStacks = _.chunk(shuffledCards.slice(54), 10);
  const stacks = [
                  ...stackWithSixCards,
                  ...stackWithFiveCards,
                  ...dealStacks,]
  return stacks;
};

function createCard(rank, suit, isFaceDown, isDraggable) {
    return {
            rank : rank, 
            suit : suit, 
            isFaceDown : isFaceDown,
            isDraggable : isDraggable};
}