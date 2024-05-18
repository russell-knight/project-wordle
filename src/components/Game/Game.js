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
    const guessStatus = checkGuess(guess, answer);
    setGuessList([...guessList, guessStatus]);
  };

  return (
    <>
      <GuessList guessList={guessList} />
      <GuessInput addGuess={addGuess} />
    </>
  );
}

function GuessList({ guessList }) {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((index) => {
          return (
          <p key={index} className="guess">
            {index < guessList.length ? <Guess word={guessList[index] ?? undefined} /> : <EmptyGuess />}
          </p>
          )
      })}
    </div>
  );
}

function Guess({ word }) {
  return (
    range(5).map((_, index) => {
      return (
        <span key={index} className={`cell ${word[index].status}`}>
          {word?.letter?.[index]}
        </span>
      )
    })
  )
}

function EmptyGuess() {
  return (
    range(5).map((_, index) => {
      return (
        <span key={index} className="cell"></span>
      )
    })
  )
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
        minLength={5}
        maxLength={5}
        value={guessInput}
        onChange={(event) => setGuessInput(event.target.value.toUpperCase())}
      />
      <button>Submit</button>
    </form>
  );
}

function HappyBanner() {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in<strong>3 guesses</strong>.
      </p>
    </div>
  )
}

function SadBanner({answer}) {
  return (
    <div class="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}

export default Game;
