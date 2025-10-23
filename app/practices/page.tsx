"use client";
import React, { useState } from "react";
import Practice from "../components/practice";

const Page = () => {
  // this creates a state variable called counter and a function to change it
  const [counter, setCounter] = useState(0);

  // increase the counter by 1
  const increase = () => setCounter(counter + 1);

  // decrease the counter by 1 but stop at 0
  const decrease = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      alert("Out of range!");
    }
  };

  // when you type in the input, it updates the counter
  const handleInput = (e:any) => {
    setCounter(Number(e.target.value)); // Number() converts string to number
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Counter Example</h2>

      <p>Counter: {counter}</p>

      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>

      <br /><br />

      {/* input connected to counter */}
      <input
        type="number"
        value={counter}
        onChange={handleInput}
        style={{ padding: 5 }}
      />

      <Practice/>
    </div>
  );
};

export default Page;
