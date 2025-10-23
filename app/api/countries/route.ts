import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function GET() {
   const countries =await prisma.country.findMany();
   return NextResponse.json(countries);
}

export async function POST(req:Request) {
    const {name, code}=await req.json();
    if(!name||!code){
        return NextResponse.json({error:'name and code are required'},{status:400});
    }
    const country =await prisma.country.create({data:{name,code}});
    return NextResponse.json(country,{status:200})
    
}