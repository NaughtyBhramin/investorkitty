import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const peerId = url.searchParams.get('peerId');
  if (!userId || !peerId) {
    return NextResponse.json({ error: 'userId and peerId are required' }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: peerId },
        { senderId: peerId, receiverId: userId }
      ]
    },
    orderBy: { createdAt: 'asc' }
  });

  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { senderId, receiverId, content, attachmentUrl } = body;
  if (!senderId || !receiverId || !content) {
    return NextResponse.json({ error: 'senderId, receiverId, and content are required' }, { status: 400 });
  }

  const threadId = [senderId, receiverId].sort().join('-');
  const message = await prisma.message.create({
    data: { senderId, receiverId, content, attachmentUrl, threadId }
  });

  return NextResponse.json({ message });
}
