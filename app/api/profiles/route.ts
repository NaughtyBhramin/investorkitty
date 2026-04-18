import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    console.log('[PROFILES-GET] Fetching user profile');
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    
    if (!email) {
      console.warn('[PROFILES-GET] Missing email query parameter');
      return NextResponse.json({ error: 'Email query is required' }, { status: 400 });
    }

    console.log('[PROFILES-GET] Looking up user:', email);
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        seekerProfile: true,
        investorProfile: true
      }
    });

    if (!user) {
      console.log('[PROFILES-GET] User not found:', email);
    } else {
      console.log('[PROFILES-GET] User found:', email);
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('[PROFILES-GET] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('[PROFILES-POST] Updating user profile');
    const body = await request.json();
    const { userId, role, profile } = body;

    if (!userId || !role || !profile) {
      console.warn('[PROFILES-POST] Missing required fields', { userId: !!userId, role: !!role, profile: !!profile });
      return NextResponse.json({ error: 'userId, role, and profile are required' }, { status: 400 });
    }

    console.log('[PROFILES-POST] Updating', role, 'profile for userId:', userId);

    if (role === 'SEEKER') {
      const seekerProfile = await prisma.seekerProfile.upsert({
        where: { userId },
        create: { userId, ...profile },
        update: { ...profile }
      });
      console.log('[PROFILES-POST] Seeker profile updated:', userId);
      return NextResponse.json({ seekerProfile });
    }

    const investorProfile = await prisma.investorProfile.upsert({
      where: { userId },
      create: { userId, ...profile },
      update: { ...profile }
    });
    console.log('[PROFILES-POST] Investor profile updated:', userId);
    return NextResponse.json({ investorProfile });
  } catch (error) {
    console.error('[PROFILES-POST] Error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
