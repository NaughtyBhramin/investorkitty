import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email query is required' }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      seekerProfile: true,
      investorProfile: true
    }
  });
  return NextResponse.json({ user });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, role, profile } = body;
  if (!userId || !role || !profile) {
    return NextResponse.json({ error: 'userId, role, and profile are required' }, { status: 400 });
  }

  if (role === 'SEEKER') {
    const seekerProfile = await prisma.seekerProfile.upsert({
      where: { userId },
      create: { userId, ...profile },
      update: { ...profile }
    });
    return NextResponse.json({ seekerProfile });
  }

  const investorProfile = await prisma.investorProfile.upsert({
    where: { userId },
    create: { userId, ...profile },
    update: { ...profile }
  });
  return NextResponse.json({ investorProfile });
}
