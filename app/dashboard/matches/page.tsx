'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function DashboardMatchesPage() {
  const { data: session, status } = useSession();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [savedPipeline, setSavedPipeline] = useState<Record<string, boolean>>({});

  const handleSendMessage = async (match: any) => {
    if (!session?.user?.id) return;
    const isSeeker = match.seekerId === session.user.id;
    const receiverId = isSeeker ? match.investorId : match.seekerId;
    const content = isSeeker
      ? 'Hi! I liked your profile and would love to explore an introduction.'
      : 'Hello! Your startup looks like a strong fit for our fund. Let’s chat.';

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: session.user.id, receiverId, content })
    });

    if (!response.ok) {
      setActionMessage('Unable to send message right now.');
      return;
    }

    setActionMessage('Message sent. Check your inbox for responses.');
  };

  const handleScheduleMeeting = (_match: any) => {
    setActionMessage('Meeting request created. Send a follow-up to finalize the time.');
  };

  const handleSavePipeline = (match: any) => {
    setSavedPipeline((prev) => ({ ...prev, [match.id]: true }));
    setActionMessage('Match saved to your pipeline. You can revisit it any time.');
  };

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.id) {
      setLoading(false);
      return;
    }

    const loadMatches = async () => {
      setLoading(true);
      const response = await fetch(`/api/matches?userId=${encodeURIComponent(session.user.id)}`);
      const data = await response.json();
      setMatches(Array.isArray(data.matches) ? data.matches : []);
      setLoading(false);
    };

    loadMatches();
  }, [status, session?.user?.id]);

  const role = session?.user?.role;

  const renderCounterparty = (match: any) => {
    const isSeeker = match.seekerId === session?.user?.id;
    const person = isSeeker ? match.investor : match.seeker;
    const profile = isSeeker ? person.investorProfile : person.seekerProfile;
    const title = isSeeker ? profile?.firmName ?? 'Investor firm' : profile?.companyName ?? 'Startup';
    const subtitle = isSeeker ? profile?.preferredIndustries?.join(', ') : profile?.headline;
    return (
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle || (isSeeker ? 'Investor match' : 'Founder match')}</p>
      </div>
    );
  };

  const stats = {
    total: matches.length,
    connected: matches.filter((match) => match.status === 'CONNECTED').length,
    pending: matches.filter((match) => match.status === 'PENDING').length,
    passed: matches.filter((match) => match.status === 'PASSED').length
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Matches</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Your active matches</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Review your current investor or founder match status and follow up on the strongest opportunities.</p>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-brand-600 hover:text-brand-500">Back to dashboard</Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {['Total', 'Connected', 'Pending', 'Passed'].map((label) => {
            const value = label === 'Total' ? stats.total : label === 'Connected' ? stats.connected : label === 'Pending' ? stats.pending : stats.passed;
            return (
              <div key={label} className="rounded-3xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{loading ? '—' : value}</p>
              </div>
            );
          })}
        </div>

        {actionMessage ? (
          <div className="mt-6 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">{actionMessage}</div>
        ) : null}

        <div className="mt-10 space-y-4">
          {status !== 'authenticated' ? (
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-10 text-center dark:border-slate-800/80 dark:bg-slate-950">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">Sign in to view your matches.</p>
            </div>
          ) : loading ? (
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-10 text-center dark:border-slate-800/80 dark:bg-slate-950">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">Loading matches…</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-10 text-center dark:border-slate-800/80 dark:bg-slate-950">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">No matches yet.</p>
              <p className="mt-3">Use the discovery pages to find investors or startups and start building your match pipeline.</p>
              <div className="mt-6 flex justify-center">
                <Link href={role === 'INVESTOR' ? '/dashboard/investor/discovery' : '/dashboard/seeker/discovery'}>
                  <Button>Open discovery</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {matches.map((match) => (
                <div key={match.id} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800/80 dark:bg-slate-950">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>{renderCounterparty(match)}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Status: <span className={match.status === 'CONNECTED' ? 'font-semibold text-emerald-600 dark:text-emerald-300' : match.status === 'PASSED' ? 'font-semibold text-rose-600 dark:text-rose-300' : 'font-semibold text-amber-600 dark:text-amber-300'}>{match.status}</span></div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Button onClick={() => handleSendMessage(match)} className="w-full">Send message</Button>
                      <Button variant="secondary" onClick={() => handleScheduleMeeting(match)} className="w-full">Schedule meeting</Button>
                      <Button variant="secondary" onClick={() => handleSavePipeline(match)} className="w-full">{savedPipeline[match.id] ? 'Saved' : 'Save to pipeline'}</Button>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-slate-600 dark:text-slate-300">Updated {new Date(match.updatedAt).toLocaleDateString()}</div>
                      <Link href="/dashboard/matches">
                        <Button variant="secondary">Review details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
