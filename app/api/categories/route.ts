import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const data =await prisma.category.findMany()
    return NextResponse.json(data);
    
}

export async function POST(req:Request){
    const {name,color}=await req.json();
   let datset =await prisma.category.create({data:{name,color}})
   return NextResponse.json(datset);
}