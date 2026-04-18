import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const stage = url.searchParams.get('stage');
  const industry = url.searchParams.get('industry');
  const minBudget = parseInt(url.searchParams.get('minBudget') || '0', 10);
  const maxBudget = parseInt(url.searchParams.get('maxBudget') || '0', 10);
  const investorId = url.searchParams.get('investorId');

  const filters: any = {};
  if (stage) filters.stage = stage;
  if (industry) filters.industries = { has: industry };
  if (minBudget) filters.fundingGoal = { gte: minBudget };
  if (maxBudget) filters.fundingGoal = { lte: maxBudget };

  const matchedSeekerIds = investorId
    ? (await prisma.match.findMany({ where: { investorId }, select: { seekerId: true } })).map((match: { seekerId: string }) => match.seekerId)
    : [];

  const investorProfile = investorId
    ? await prisma.investorProfile.findUnique({ where: { userId: investorId } })
    : null;

  const listings = await prisma.seekerProfile.findMany({
    where: {
      ...filters,
      userId: investorId ? { notIn: matchedSeekerIds } : undefined,
      OR: [
        { companyName: { contains: query, mode: 'insensitive' } },
        { headline: { contains: query, mode: 'insensitive' } }
      ]
    },
    orderBy: { updatedAt: 'desc' },
    take: 40
  });

  const recommended = listings
    .map((listing: { industries: string[] } & Record<string, unknown>) => {
      const score = investorProfile?.preferredIndustries?.filter((industry: string) => listing.industries.includes(industry)).length ?? 0;
      return { ...listing, score };
    })
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score || 0)
    .slice(0, 20);

  return NextResponse.json({ listings: recommended });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { userId, companyName, headline, stage, fundingGoal, equityOffered, industries, traction, teamMembers, location, website, linkedIn, angelList } = payload;
  if (!userId || !companyName || !headline || !stage) {
    return NextResponse.json({ error: 'Missing required startup profile fields' }, { status: 400 });
  }

  const seekerProfile = await prisma.seekerProfile.upsert({
    where: { userId },
    create: {
      userId,
      companyName,
      headline,
      stage,
      fundingGoal: fundingGoal ?? 0,
      equityOffered: equityOffered ?? 0,
      industries: industries ?? [],
      traction: traction ?? {},
      teamMembers: teamMembers ?? [],
      location,
      website,
      linkedIn,
      angelList,
      kittyScore: 1
    },
    update: {
      companyName,
      headline,
      stage,
      fundingGoal: fundingGoal ?? 0,
      equityOffered: equityOffered ?? 0,
      industries: industries ?? [],
      traction: traction ?? {},
      teamMembers: teamMembers ?? [],
      location,
      website,
      linkedIn,
      angelList
    }
  });

  return NextResponse.json({ seekerProfile });
}
