'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const seekerStages = ['IDEA', 'POC', 'MVP', 'GROWTH'];
const industryOptions = ['Fintech', 'Healthtech', 'SaaS', 'Web3', 'Climate', 'Edtech', 'AI/ML'];
const investmentRanges = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth'];
const ticketSizes = ['$25k-$100k', '$100k-$500k', '$500k-$1M', '+$1M'];

function parseArray(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProfileOnboardingForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const role = session?.user?.role || 'SEEKER';
  const [seekerValues, setSeekerValues] = useState({
    companyName: '',
    headline: '',
    stage: 'IDEA',
    fundingGoal: 250000,
    equityOffered: 10,
    industries: '',
    website: '',
    linkedIn: '',
    location: ''
  });
  const [investorValues, setInvestorValues] = useState({
    firmName: '',
    investmentRange: 'Seed',
    preferredIndustries: '',
    ticketSize: '$100k-$500k',
    website: '',
    linkedin: '',
    location: ''
  });

  const selectedRole = useMemo(() => role, [role]);

  if (status === 'loading') {
    return <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-600 dark:bg-slate-950 dark:text-slate-300">Loading profile details…</div>;
  }

  if (!session?.user) {
    return (
      <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-700 dark:bg-slate-950 dark:text-slate-300">
        <p className="text-lg font-semibold">You need to sign in first.</p>
        <p className="mt-3 text-sm">Please sign in to continue your onboarding journey.</p>
        <Button className="mt-6" variant="secondary" onClick={() => signIn()}>Sign in</Button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setSaving(true);
    setMessage('');

    const profilePayload = selectedRole === 'SEEKER'
      ? {
          companyName: seekerValues.companyName,
          headline: seekerValues.headline,
          stage: seekerValues.stage,
          fundingGoal: Number(seekerValues.fundingGoal),
          equityOffered: Number(seekerValues.equityOffered),
          industries: parseArray(seekerValues.industries),
          website: seekerValues.website,
          linkedIn: seekerValues.linkedIn,
          location: seekerValues.location
        }
      : {
          firmName: investorValues.firmName,
          investmentRange: investorValues.investmentRange,
          preferredIndustries: parseArray(investorValues.preferredIndustries),
          ticketSize: investorValues.ticketSize,
          website: investorValues.website,
          linkedin: investorValues.linkedin,
          location: investorValues.location
        };

    const response = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, role: selectedRole, profile: profilePayload })
    });

    if (!response.ok) {
      const result = await response.json();
      setMessage(result?.error || 'Unable to save profile.');
      setSaving(false);
      return;
    }

    setMessage('Profile saved successfully. Redirecting to your dashboard…');
    setSaving(false);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-8 dark:border-slate-800/80 dark:bg-slate-950">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Logged in as {session.user.email}</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Finish your {selectedRole === 'SEEKER' ? 'Founder' : 'Investor'} profile</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Complete the fields below so the platform can tailor matches, messaging, and deal flow.</p>
      </div>

      {selectedRole === 'SEEKER' ? (
        <div className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Company name
              <input type="text" value={seekerValues.companyName} onChange={(event) => setSeekerValues({ ...seekerValues, companyName: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Your startup name" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Headline
              <input type="text" value={seekerValues.headline} onChange={(event) => setSeekerValues({ ...seekerValues, headline: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="What makes your startup unique?" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Stage
              <select value={seekerValues.stage} onChange={(event) => setSeekerValues({ ...seekerValues, stage: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                {seekerStages.map((stage) => (<option key={stage} value={stage}>{stage}</option>))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Funding goal
              <input type="number" value={seekerValues.fundingGoal} onChange={(event) => setSeekerValues({ ...seekerValues, fundingGoal: Number(event.target.value) })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="250000" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Equity offered (%)
              <input type="number" value={seekerValues.equityOffered} onChange={(event) => setSeekerValues({ ...seekerValues, equityOffered: Number(event.target.value) })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="10" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Industries
              <input type="text" value={seekerValues.industries} onChange={(event) => setSeekerValues({ ...seekerValues, industries: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Fintech, AI, SaaS" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Location
              <input type="text" value={seekerValues.location} onChange={(event) => setSeekerValues({ ...seekerValues, location: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="City, country" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Website
              <input type="url" value={seekerValues.website} onChange={(event) => setSeekerValues({ ...seekerValues, website: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="https://" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              LinkedIn / AngelList
              <input type="text" value={seekerValues.linkedIn} onChange={(event) => setSeekerValues({ ...seekerValues, linkedIn: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Profile or startup listing" />
            </label>
          </div>
        </div>
      ) : selectedRole === 'INVESTOR' ? (
        <div className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Firm name
              <input type="text" value={investorValues.firmName} onChange={(event) => setInvestorValues({ ...investorValues, firmName: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Your investment firm" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Investment preference
              <select value={investorValues.investmentRange} onChange={(event) => setInvestorValues({ ...investorValues, investmentRange: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                {investmentRanges.map((option) => (<option key={option} value={option}>{option}</option>))}
              </select>
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Preferred industries
              <input type="text" value={investorValues.preferredIndustries} onChange={(event) => setInvestorValues({ ...investorValues, preferredIndustries: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Fintech, Healthtech" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Ticket size
              <select value={investorValues.ticketSize} onChange={(event) => setInvestorValues({ ...investorValues, ticketSize: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                {ticketSizes.map((option) => (<option key={option} value={option}>{option}</option>))}
              </select>
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Location
              <input type="text" value={investorValues.location} onChange={(event) => setInvestorValues({ ...investorValues, location: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="City, country" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Website
              <input type="url" value={investorValues.website} onChange={(event) => setInvestorValues({ ...investorValues, website: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="https://" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              LinkedIn
              <input type="text" value={investorValues.linkedin} onChange={(event) => setInvestorValues({ ...investorValues, linkedin: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="LinkedIn profile" />
            </label>
            <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">
              <p className="font-semibold">Tip:</p>
              <p className="mt-2">Add a portfolio summary so founders know your typical deal size and sector focus.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-300">Admin accounts can manage users, review content, and moderate the platform.</p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving profile…' : 'Save profile and continue'}
        </Button>
        <p className="text-sm text-slate-600 dark:text-slate-300">You can update this information later from your dashboard.</p>
      </div>

      {message ? <p className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">{message}</p> : null}
    </div>
  );
}
