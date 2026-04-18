import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const industry = url.searchParams.get('industry');
  const seekerId = url.searchParams.get('seekerId');

  const filters: any = {};
  if (industry) filters.preferredIndustries = { has: industry };

  const matchedInvestorIds = seekerId
    ? (await prisma.match.findMany({ where: { seekerId }, select: { investorId: true } })).map((match) => match.investorId)
    : [];

  const seekerProfile = seekerId
    ? await prisma.seekerProfile.findUnique({ where: { userId: seekerId } })
    : null;

  const investors = await prisma.investorProfile.findMany({
    where: {
      ...filters,
      userId: seekerId ? { notIn: matchedInvestorIds } : undefined,
      OR: [
        { firmName: { contains: q, mode: 'insensitive' } },
        { preferredIndustries: { has: q } }
      ]
    },
    take: 40,
    orderBy: { updatedAt: 'desc' }
  });

  const recommended = investors
    .map((investor) => {
      const score = seekerProfile?.industries?.filter((industry) => investor.preferredIndustries.includes(industry)).length ?? 0;
      return { ...investor, score };
    })
    .sort((a, b) => b.score - a.score || 0)
    .slice(0, 20);

  return NextResponse.json({ investors: recommended });
}
