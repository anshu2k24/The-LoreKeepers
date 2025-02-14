import React, { useState } from "react";
import FlashcardReview from "./FlashcardReview"; // Flashcard Review Component
import FlashcardStats from "./FlashcardStats"; // Stats Component

const FlashcardsPage = () => {
  const [cards, setCards] = useState([
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", answer: "4" },
    { id: 3, question: "Who wrote 'Hamlet'?", answer: "Shakespeare" },
  ]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Flashcards</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card) => (
          <FlashcardReview key={card.id} card={card} />
        ))}
      </div>
      <FlashcardStats />
    </div>
  );
};

export default FlashcardsPage;
