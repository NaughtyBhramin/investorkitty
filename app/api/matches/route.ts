import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId query is required' }, { status: 400 });

  const matches = await prisma.match.findMany({
    where: {
      OR: [{ seekerId: userId }, { investorId: userId }]
    },
    include: {
      seeker: { include: { seekerProfile: true } },
      investor: { include: { investorProfile: true } }
    },
    orderBy: { updatedAt: 'desc' }
  });
  return NextResponse.json({ matches });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { seekerId, investorId, action } = body;
  if (!seekerId || !investorId || !action) {
    return NextResponse.json({ error: 'seekerId, investorId and action are required' }, { status: 400 });
  }

  const existing = await prisma.match.findFirst({ where: { seekerId, investorId } });
  const isLike = action === 'seeker_like' || action === 'investor_like';
  const isPass = action === 'seeker_pass' || action === 'investor_pass';

  if (existing) {
    const updated = await prisma.match.update({
      where: { id: existing.id },
      data: {
        seekerLiked: action === 'seeker_like' ? true : action === 'seeker_pass' ? false : existing.seekerLiked,
        investorLiked: action === 'investor_like' ? true : action === 'investor_pass' ? false : existing.investorLiked,
        status: isPass ? 'PASSED' : existing.seekerLiked && existing.investorLiked ? 'CONNECTED' : existing.status
      }
    });

    return NextResponse.json({ match: updated });
  }

  const initialStatus = isLike ? 'PENDING' : 'PASSED';
  const match = await prisma.match.create({
    data: {
      seekerId,
      investorId,
      seekerLiked: action === 'seeker_like',
      investorLiked: action === 'investor_like',
      status: initialStatus
    }
  });

  return NextResponse.json({ match });
}
