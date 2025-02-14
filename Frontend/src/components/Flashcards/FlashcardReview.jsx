import React, { useState } from "react";

const FlashcardReview = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card w-64 h-80 bg-base-100 shadow-xl cursor-pointer transform transition-all duration-300 ease-in-out"
      onClick={() => setFlipped(!flipped)}
      style={{
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        perspective: "1000px",
      }}
    >
      {/* Image Placeholder with Proper Alignment */}
      <figure className="w-full h-32 overflow-hidden">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Flashcard"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body with Flexbox for Proper Alignment */}
      <div
        className={`card-body flex justify-center items-center text-center p-6 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div>
          {/* Front of Card - "Flip to see the answer" */}
          {!flipped && (
            <p className="text-gray-500 text-sm italic">
              Flip to see the answer
            </p>
          )}
          
          {/* Displaying Question or Answer based on flip */}
          <h2 className="card-title text-xl font-semibold text-[#4C1F7A] my-4">
            {flipped ? card.answer : card.question}
          </h2>

          {/* Back of Card - "Flip to see the question" */}
          {flipped && (
            <p className="text-gray-500 text-sm italic">
              Flip to see the question
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardReview;
