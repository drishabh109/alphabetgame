import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import Button from './button';

function App() {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let random = alphabet[Math.floor(Math.random() * alphabet.length)];
  const [char, setChar] = useState("A");
  const [input, setInput] = useState("A");
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const onchange = (e) => {
    let b = random;
    let a = e.target.value;
    if (input.length <= 20) {
      if (a == input) {
        setChar(b);
        setInput(input + b);
      }
      else {
        handlePenalty();
      }
    }
    else {
      setChar("Sucees");
      setTime(false);
      localStorage.setItem('highScore', time);
      setIsActive(false);
      setIsPaused(true);
    }
  }

  const handlePenalty = () => {
    setTime(time + 500);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10)
    }
    else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [isActive, isPaused])

  const highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0;

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  }

  const handleReset = () => {
    setChar("A");
    setInput("A");
    setIsActive(false);
    setTime(0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Type The Alphabet</h3>
        <h6>Typing game to see how fast you type.Timer<br />starts when you do :)</h6>
        <div className='ab'><h1>{char}</h1></div>
        <h6>Time :<br /> {time / 1000} sec <br /><br />My best time is : {highScore / 1000} sec</h6>
        <footer><input type="type" onKeyUp={onchange} disabled={!isActive} /> </footer>
        <Button isActive={isActive || input.length >= 20} handleReset={handleReset} handleStart={handleStart} />
      </header>
    </div>
  );
}

export default App;