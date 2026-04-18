import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, role } = body;

  if (!email || !password || !role) {
    return NextResponse.json({ error: 'Name, email, password, and role are required.' }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'A user with that email already exists.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: role === 'INVESTOR' ? 'INVESTOR' : 'SEEKER'
    }
  });

  if (role === 'SEEKER') {
    await prisma.seekerProfile.create({
      data: {
        userId: user.id,
        companyName: 'My startup',
        headline: 'Early-stage founder building the next big idea',
        stage: 'IDEA',
        fundingGoal: 100000,
        equityOffered: 10,
        industries: [],
        traction: {},
        teamMembers: [],
        location: '',
        website: '',
        linkedIn: '',
        angelList: ''
      }
    });
  } else {
    await prisma.investorProfile.create({
      data: {
        userId: user.id,
        firmName: 'My investment firm',
        investmentRange: 'Seed to Series A',
        preferredIndustries: [],
        ticketSize: '$50k-$250k',
        portfolio: [],
        website: '',
        location: '',
        linkedin: '',
        angelList: ''
      }
    });
  }

  return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
}
