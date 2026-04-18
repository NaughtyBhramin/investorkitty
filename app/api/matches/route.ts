import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    console.log('[MATCHES-GET] Fetching user matches');
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      console.warn('[MATCHES-GET] Missing userId query parameter');
      return NextResponse.json({ error: 'userId query is required' }, { status: 400 });
    }

    console.log('[MATCHES-GET] Loading matches for userId:', userId);
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

    console.log('[MATCHES-GET] Found', matches.length, 'matches for userId:', userId);
    return NextResponse.json({ matches });
  } catch (error) {
    console.error('[MATCHES-GET] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('[MATCHES-POST] Creating/updating match');
    const body = await request.json();
    const { seekerId, investorId, action } = body;

    if (!seekerId || !investorId || !action) {
      console.warn('[MATCHES-POST] Missing required fields', { seekerId: !!seekerId, investorId: !!investorId, action: !!action });
      return NextResponse.json({ error: 'seekerId, investorId and action are required' }, { status: 400 });
    }

    console.log('[MATCHES-POST] Processing action:', action, 'for seeker:', seekerId, 'investor:', investorId);
    const existing = await prisma.match.findFirst({ where: { seekerId, investorId } });
    const isLike = action === 'seeker_like' || action === 'investor_like';
    const isPass = action === 'seeker_pass' || action === 'investor_pass';

    if (existing) {
      console.log('[MATCHES-POST] Updating existing match');
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

    console.log('[MATCHES-POST] Creating new match');
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

    console.log('[MATCHES-POST] Match created:', match.id);
    return NextResponse.json({ match });
  } catch (error) {
    console.error('[MATCHES-POST] Error:', error);
    return NextResponse.json({ error: 'Failed to update match' }, { status: 500 });
  }
}
