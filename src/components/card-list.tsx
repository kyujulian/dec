import { useState } from "react";
import type { FlashCard } from "~/utils/types";
import Card from "./card";

export default function CardList({ cards }: { cards: FlashCard[] }) {
  const [currentCard, setCurrentCard] = useState<FlashCard>(cards[0]!);
  const [cardIndex, setCardIndex] = useState<number>(0);

  const incrementIndex = () => {
    if (cardIndex == cards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
    setCurrentCard(cards[cardIndex]!);
  };

  const decrementIndex = () => {
    if (cardIndex == 0) {
      setCardIndex(cards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
    setCurrentCard(cards[cardIndex]!);
  };
  return (
    <>
      <ul className="flex flex-col gap-5">
        {cards.map((card, index) => (
          <li key={card.id}>
            {cardIndex === index && (
              <Card front_text={card.front} back_text={card.back} />
            )}
          </li>
        ))}
      </ul>
      <div className="flex gap-5">
        <button
          className="h-10 w-10 bg-black text-white"
          onClick={incrementIndex}
        >
          {" "}
          inc{" "}
        </button>
        <button
          className="h-10 w-10 bg-black text-white"
          onClick={decrementIndex}
        >
          {" "}
          dec{" "}
        </button>
      </div>
    </>
  );
}
