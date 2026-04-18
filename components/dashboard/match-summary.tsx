'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface MatchSummary {
  total: number;
  pending: number;
  connected: number;
  passed: number;
}

const initialSummary: MatchSummary = {
  total: 0,
  pending: 0,
  connected: 0,
  passed: 0
};

export function MatchSummaryCard() {
  const { data: session, status } = useSession();
  const [summary, setSummary] = useState<MatchSummary>(initialSummary);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.id) {
      setLoading(false);
      return;
    }

    const loadMatches = async () => {
      setLoading(true);
      const response = await fetch(`/api/matches?userId=${encodeURIComponent(session.user.id)}`);
      const data = await response.json();

      const matches = Array.isArray(data.matches) ? data.matches : [];
      const counts = matches.reduce(
        (acc: MatchSummary, match: any) => {
          acc.total += 1;
          if (match.status === 'PENDING') acc.pending += 1;
          if (match.status === 'CONNECTED') acc.connected += 1;
          if (match.status === 'PASSED') acc.passed += 1;
          return acc;
        },
        { ...initialSummary }
      );

      setSummary(counts);
      setLoading(false);
    };

    loadMatches();
  }, [session?.user?.id, status]);

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Match dashboard</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Your current deal momentum</h2>
        </div>
        <Link href="/dashboard/matches">
          <Button variant="secondary">View all matches</Button>
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {['Total', 'Connected', 'Pending', 'Passed'].map((label, index) => {
          const value = label === 'Total' ? summary.total : label === 'Connected' ? summary.connected : label === 'Pending' ? summary.pending : summary.passed;
          return (
            <div key={label} className="rounded-3xl bg-slate-50 p-5 text-center dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{loading ? '—' : value}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">Keep your profile updated and respond quickly to connected investors or founders to convert matches into deals.</p>
    </div>
  );
}
