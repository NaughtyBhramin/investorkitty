'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface StartupCard {
  id: string;
  userId: string;
  companyName: string;
  headline: string;
  stage: string;
  fundingGoal: number;
  equityOffered: number;
  industries: string[];
  website?: string;
  location?: string;
}

export default function InvestorDiscoveryPage() {
  const { data: session, status } = useSession();
  const [startups, setStartups] = useState<StartupCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStartups = async () => {
      if (status !== 'authenticated') {
        setLoading(false);
        return;
      }

      setLoading(true);
      const query = session?.user?.id ? `?investorId=${encodeURIComponent(session.user.id)}` : '';
      const response = await fetch(`/api/startups${query}`);
      const data = await response.json();
      setStartups(data.listings || []);
      setLoading(false);
    };

    fetchStartups();
  }, [session?.user?.id, status]);

  const handleAction = async (startup: StartupCard, action: 'investor_like' | 'investor_pass') => {
    if (!session?.user?.id) {
      setMessage('Sign in to take action on startups.');
      return;
    }

    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seekerId: startup.userId, investorId: session.user.id, action })
    });

    if (!response.ok) {
      const result = await response.json();
      setMessage(result?.error || 'Unable to update match.');
      return;
    }

    setMessage(action === 'investor_like' ? 'Interest recorded — keep exploring!' : 'Startup skipped.');
    setStartups(startups.filter((item) => item.id !== startup.id));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Startup discovery</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Discover matched startups</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Swipe through recommended founders and choose the startups you want to connect with.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-white">{loading ? 'Loading…' : `${startups.length} startup(s) available`}</div>
          </div>
          {message ? <div className="mt-6 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">{message}</div> : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {startups.map((startup) => (
            <div key={startup.id} className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-600">{startup.stage}</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{startup.companyName}</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">{startup.equityOffered}%</span>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{startup.headline}</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                <p><strong>Funding goal:</strong> ${startup.fundingGoal.toLocaleString()}</p>
                <p><strong>Industries:</strong> {startup.industries.join(', ') || 'None listed'}</p>
                <p><strong>Location:</strong> {startup.location || 'Remote / not specified'}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="w-full" onClick={() => handleAction(startup, 'investor_like')}>Interested</Button>
                <Button variant="secondary" className="w-full" onClick={() => handleAction(startup, 'investor_pass')}>Pass</Button>
              </div>
            </div>
          ))}
          {!loading && startups.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-300">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">No more recommendations for now</p>
              <p className="mt-3">Update your investor profile or come back later to refresh the feed.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
