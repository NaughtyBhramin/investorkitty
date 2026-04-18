'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface InvestorCard {
  id: string;
  userId: string;
  firmName: string;
  investmentRange: string;
  preferredIndustries: string[];
  ticketSize: string;
  website?: string;
  location?: string;
}

export default function SeekerDiscoveryPage() {
  const { data: session, status } = useSession();
  const [investors, setInvestors] = useState<InvestorCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInvestors = async () => {
      if (status !== 'authenticated') {
        setLoading(false);
        return;
      }

      setLoading(true);
      const query = session?.user?.id ? `?seekerId=${encodeURIComponent(session.user.id)}` : '';
      const response = await fetch(`/api/investors${query}`);
      const data = await response.json();
      setInvestors(data.investors || []);
      setLoading(false);
    };

    fetchInvestors();
  }, [session?.user?.id, status]);

  const handleAction = async (investor: InvestorCard, action: 'seeker_like' | 'seeker_pass') => {
    if (!session?.user?.id) {
      setMessage('Sign in to take action on investors.');
      return;
    }

    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seekerId: session.user.id, investorId: investor.userId, action })
    });

    if (!response.ok) {
      const result = await response.json();
      setMessage(result?.error || 'Unable to update match.');
      return;
    }

    setMessage(action === 'seeker_like' ? 'Interest sent — await investor response.' : 'Investor skipped.');
    setInvestors(investors.filter((item) => item.id !== investor.id));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Investor discovery</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Find investors matched to your startup</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Review investor preferences and send interest to the best matches.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-white">{loading ? 'Loading…' : `${investors.length} investor(s) available`}</div>
          </div>
          {message ? <div className="mt-6 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">{message}</div> : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {investors.map((investor) => (
            <div key={investor.id} className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-600">{investor.ticketSize}</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{investor.firmName}</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">{investor.investmentRange}</span>
              </div>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                <p><strong>Industries:</strong> {investor.preferredIndustries.join(', ') || 'Any'}</p>
                <p className="mt-2"><strong>Location:</strong> {investor.location || 'Remote / not specified'}</p>
                <p className="mt-2"><strong>Website:</strong> {investor.website || 'Not listed'}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="w-full" onClick={() => handleAction(investor, 'seeker_like')}>Interested</Button>
                <Button variant="secondary" className="w-full" onClick={() => handleAction(investor, 'seeker_pass')}>Pass</Button>
              </div>
            </div>
          ))}
          {!loading && investors.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-300">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">No investors to show right now</p>
              <p className="mt-3">Update your founder profile or return later to refresh your investor matches.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
