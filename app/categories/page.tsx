"use client"
import { useState, useEffect } from "react"

import React from 'react'

type Category={
    name:string;
    color:string;
    id:number
}
export default function Category() {
    const [categoriess,setCategories] = useState<Category[]>([]);

    async function loadCates(){
        const categories=await fetch('/api/categories');
        const res =await categories.json();
        setCategories(res)



    }
    useEffect(function(){
        loadCates()
    },[]);

  return (
    <div>Category

        {categoriess.map(p=>(
            <ul key={p.id}>
                <li>{p.id}</li>
                 <li>{p.name}</li>
                  <li>{p.color}</li>


            </ul>
        ))}

    </div>
  )
}
