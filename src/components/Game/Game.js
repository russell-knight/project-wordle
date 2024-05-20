import React, { useState } from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessList, setGuessList] = useState([]);

  const addGuess = (guess) => {
    setGuessList([...guessList, guess]);
  };

  const hasLost = guessList.length === NUM_OF_GUESSES_ALLOWED;
  const hasWon = guessList.includes(answer);

  return (
    <>
      <GuessList guessList={guessList} />
      {hasWon ? (
        <HappyBanner numOfGuesses={guessList.length} />
      ) : hasLost ? (
        <SadBanner answer={answer} />
      ) : (
        <GuessInput addGuess={addGuess} />
      )}
    </>
  );
}

function GuessList({ guessList }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((index) => {
        return (
          <p key={index} className="guess">
            {index < guessList.length ? (
              <Guess word={guessList[index]} />
            ) : (
              <EmptyGuess />
            )}
          </p>
        );
      })}
    </div>
  );
}

function Guess({ word }) {
  const letterStatus = checkGuess(word, answer);
  return letterStatus.map((char, index) => {
    return (
      <span key={index} className={`cell ${char.status}`}>
        {char.letter}
      </span>
    );
  });
}

function EmptyGuess() {
  return range(5).map((_, index) => {
    return <span key={index} className="cell"></span>;
  });
}

function GuessInput({ addGuess }) {
  const [guessInput, setGuessInput] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addGuess(guessInput);
    setGuessInput("");
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        // minLength={5}
        // maxLength={5}
        pattern="[a-zA-Z]{5}"
        title="5-letter word."
        value={guessInput}
        onChange={(event) => setGuessInput(event.target.value.toUpperCase())}
      />
      <button>Submit</button>
    </form>
  );
}

function HappyBanner({ numOfGuesses }) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{numOfGuesses} guesses</strong>.
      </p>
    </div>
  );
}

function SadBanner({ answer }) {
  return (
    <div class="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}

export default Game;
