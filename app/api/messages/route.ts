import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    console.log('[MESSAGES-GET] Fetching conversation');
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const peerId = url.searchParams.get('peerId');

    if (!userId || !peerId) {
      console.warn('[MESSAGES-GET] Missing parameters', { userId: !!userId, peerId: !!peerId });
      return NextResponse.json({ error: 'userId and peerId are required' }, { status: 400 });
    }

    console.log('[MESSAGES-GET] Loading messages between:', userId, 'and', peerId);
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: peerId },
          { senderId: peerId, receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'asc' }
    });

    console.log('[MESSAGES-GET] Found', messages.length, 'messages');
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('[MESSAGES-GET] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('[MESSAGES-POST] Creating new message');
    const body = await request.json();
    const { senderId, receiverId, content, attachmentUrl } = body;

    if (!senderId || !receiverId || !content) {
      console.warn('[MESSAGES-POST] Missing fields', { senderId: !!senderId, receiverId: !!receiverId, content: !!content });
      return NextResponse.json({ error: 'senderId, receiverId, and content are required' }, { status: 400 });
    }

    console.log('[MESSAGES-POST] Message from', senderId, 'to', receiverId);
    const threadId = [senderId, receiverId].sort().join('-');
    const message = await prisma.message.create({
      data: { senderId, receiverId, content, attachmentUrl, threadId }
    });

    console.log('[MESSAGES-POST] Message created:', message.id);
    return NextResponse.json({ message });
  } catch (error) {
    console.error('[MESSAGES-POST] Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
