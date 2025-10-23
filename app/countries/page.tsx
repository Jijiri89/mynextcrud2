"use client"
import  { useEffect, useState } from 'react'
type Country={
        name:string;
        code:string;
        id:number
    }
export default function Countries() {
    
    const[countries,setCountries]=useState<Country[]>([]);


    const loadCountries  = async () =>{
        const res =await fetch ('/api/countries')
        const data =await res.json()
        setCountries(data);
    }

    useEffect(function(){
        loadCountries()
    },[]);

    

  return (
  <div>
    <h2>Countries</h2>
    {countries.map(p=>(
         <ul key={p.id}>
            <li>{p.id}</li>
             <li>{p.name}</li>
              <li>{p.code}</li>
    
    </ul>

    ))}
   
  </div>
);

}
