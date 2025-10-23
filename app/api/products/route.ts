import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { error } from "console";


const body={
    name:String,
    price:Number
}
export async function GET(){
    const products =await prisma.product.findMany({orderBy:{id:"asc"}});
    return NextResponse.json(products)
}
export async function POST(req:Request){

    
   
    const {name,price,type}=await req.json()

    if(!name|| !price){
        return NextResponse.json({error:'name and price are required'},{status:400});
    }
    const product=await prisma.product.create({data:{name,price,type}});
    return NextResponse.json(product,{status:200})
}