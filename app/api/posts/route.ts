import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(){
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
}
export async function POST(req:Request){
    const {name,auther}= await req.json();
    if(!name||!auther){
        return NextResponse.json({error:'name and auther are required'});
    }
    const post=await prisma.post.create({data:{name,auther}});
    return NextResponse.json(post)
}