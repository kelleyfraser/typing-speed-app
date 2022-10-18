import React, {useState, useEffect} from "react";

const ScoreCard = ({characters, charIndex}) => {
  const [accuracy, setAccuracy] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    calculateResults();
  }, []);

  const calculateResults = () => {
    let count = 0;
    let mistakes = 0;

    for (let i = 0; i < charIndex; i++) {
      if (characters[i].content === " ") {
        count++;
      } else if (i === charIndex - 1 && characters[i + 1].content === " ") {
        count++;
      }

      if (characters[i].isCorrect === false) {
        mistakes++;
      }
    }

    setAccuracy(((1 - mistakes / (charIndex - 1)) * 100).toFixed(2));
    setWordCount(count);
  }


  return (
    <div className="score-card">
      <div><h2>WPM:</h2><h3>{wordCount}</h3></div>
      <div><h2>Accuracy:</h2><h3>{accuracy + "%"}</h3></div>
    </div>
  );
}

export default ScoreCard;