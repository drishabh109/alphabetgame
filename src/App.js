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
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(true);

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
      setActive(false);
      setPaused(true);
    }
  }

  const handlePenalty = () => {
    setTime(time + 500);
  }

  useEffect(() => {
    let interval = null;
    if (active && paused === false) {
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
  }, [active, paused])

  const highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0;

  const handleStart = () => {
    setActive(true);
    setPaused(false);
  }

  const handleReset = () => {
    setChar("A");
    setInput("A");
    setActive(false);
    setTime(0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Type The Alphabet</h3>
        <h6>Typing game to see how fast you type.Timer<br />starts when you do :)</h6>
        <div className='ab'><h1>{char}</h1></div>
        <h6>Time :<br /> {time / 1000} sec <br /><br />My best time is : {highScore / 1000} sec</h6>
        <footer><input type="type" onKeyUp={onchange} disabled={!active} /> </footer>
        <Button isActive={active || input.length >= 20} handleReset={handleReset} handleStart={handleStart} />
      </header>
    </div>
  );
}

export default App;