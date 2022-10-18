import React from "react";
import CharacterSpan from "./characterSpan";

const TypingTest = ({ characters, charIndex }) => {

  return (
    <div className="typing-text">
      <p>
        {characters.map(char => (
          <CharacterSpan key={char.id} data={char} charIndex={charIndex} />
        ))}
      </p>
    </div>
  );
}

export default TypingTest;

