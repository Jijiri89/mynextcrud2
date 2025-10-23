import React from 'react'

export default function Practice() {
    function addNumbers(num1:number,num2:number):number{
    return num1+num2
}
let numbers =[2,3,6,7]
let obj={"name":"Joe","id":2,"email":"joe@gmail.com"}

  return (
    <div>{addNumbers(6,9)}
    <br />
    <span>{numbers[2]}</span>
     <br />
    <span>{obj.name}</span>
    </div>
  )
}
