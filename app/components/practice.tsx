import React from 'react'
import { useState } from 'react';

const practice = () => {
  const [count, setCount]=useState(0);
  let increaseCount=()=>{
    setCount(c=>c+1)
  }
  const decreaseCount=()=>{
    if(count>0)
      setCount(p=>p-1)
  }
  return (
    <div>
      <span>{count}</span>
      <br />
      <button onClick={increaseCount}>Add</button>
      <br />
       <button onClick={decreaseCount}>Reduce</button>
       <br />
       <input className='bg-blue-700 text-white' type="text" name='count' value={count}  onChange={e => setCount(Math.max(0, Number(e.target.value) || 0))}/>
    </div>
  )
}
export default practice;