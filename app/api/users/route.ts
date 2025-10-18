// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { name, email } = await req.json();
  if (!name || !email) {
    return NextResponse.json({ error: 'name and email are required' }, { status: 400 });
  }
  const user = await prisma.user.create({ data: { name, email } });
  return NextResponse.json(user, { status: 201 });
}
