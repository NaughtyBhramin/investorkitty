import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  const matches = await prisma.match.findMany({
    where: { investorId: userId, status: 'CONNECTED' },
    include: {
      seeker: {
        include: { seekerProfile: true }
      }
    }
  });

  const csv = ['Company,Stage,Funding goal,Equity,Matched at'];
  matches.forEach((match: any) => {
    const profile = match.seeker.seekerProfile;
    const row = [profile?.companyName ?? '', profile?.stage ?? '', profile?.fundingGoal?.toString() ?? '0', profile?.equityOffered?.toString() ?? '0', match.createdAt.toISOString()];
    csv.push(row.map((value) => `"${value}"`).join(','));
  });

  return new NextResponse(csv.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="matched-startups.csv"'
    }
  });
}
