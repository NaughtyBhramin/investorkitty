import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId query is required' }, { status: 400 });

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ notifications });
}

export async function POST(request: Request) {
  const { userId, type, title, message, url } = await request.json();
  if (!userId || !type || !title || !message) {
    return NextResponse.json({ error: 'Missing notification fields' }, { status: 400 });
  }
  const notification = await prisma.notification.create({
    data: { userId, type, title, message, url }
  });
  return NextResponse.json({ notification });
}
