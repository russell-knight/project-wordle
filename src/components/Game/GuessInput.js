import React from 'react';

export function GuessInput({ addGuess }) {
  const [guessInput, setGuessInput] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    addGuess(guessInput);
    setGuessInput('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        minLength={5}
        maxLength={5}
        value={guessInput}
        onChange={event => setGuessInput(event.target.value.toUpperCase())} />
      <button>Submit</button>
    </form>
  )
}    
