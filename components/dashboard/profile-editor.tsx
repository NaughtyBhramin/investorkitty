'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const seekerStages = ['IDEA', 'POC', 'MVP', 'GROWTH'];
const investorRanges = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth'];
const ticketSizes = ['$25k-$100k', '$100k-$500k', '$500k-$1M', '+$1M'];

const parseCsv = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const buildCsv = (items: string[] | undefined) => (items ? items.join(', ') : '');

interface SeekerProfileData {
  companyName: string;
  headline: string;
  stage: string;
  fundingGoal: number;
  equityOffered: number;
  industries: string;
  website: string;
  linkedIn: string;
  location: string;
}

interface InvestorProfileData {
  firmName: string;
  investmentRange: string;
  preferredIndustries: string;
  ticketSize: string;
  website: string;
  linkedin: string;
  location: string;
}

const seekerDefaults: SeekerProfileData = {
  companyName: '',
  headline: '',
  stage: 'IDEA',
  fundingGoal: 250000,
  equityOffered: 10,
  industries: '',
  website: '',
  linkedIn: '',
  location: ''
};

const investorDefaults: InvestorProfileData = {
  firmName: '',
  investmentRange: 'Seed',
  preferredIndustries: '',
  ticketSize: '$100k-$500k',
  website: '',
  linkedin: '',
  location: ''
};

const requiredSeekerFields: (keyof SeekerProfileData)[] = [
  'companyName',
  'headline',
  'stage',
  'fundingGoal',
  'equityOffered',
  'industries'
];

const requiredInvestorFields: (keyof InvestorProfileData)[] = [
  'firmName',
  'investmentRange',
  'ticketSize',
  'preferredIndustries'
];

function countFilled<T extends object>(fields: (keyof T)[], values: T) {
  return fields.reduce((count, key) => {
    const value = values[key];
    if (typeof value === 'number') {
      return value > 0 ? count + 1 : count;
    }
    return value ? count + 1 : count;
  }, 0);
}

export function DashboardProfileEditor() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfileData>(seekerDefaults);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfileData>(investorDefaults);
  const [isComplete, setIsComplete] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const role = session?.user?.role || 'SEEKER';

  const completionScore = useMemo(() => {
    if (role === 'INVESTOR') {
      return Math.round((countFilled(requiredInvestorFields, investorProfile) / requiredInvestorFields.length) * 100);
    }
    return Math.round((countFilled(requiredSeekerFields, seekerProfile) / requiredSeekerFields.length) * 100);
  }, [investorProfile, seekerProfile, role]);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadProfile = async () => {
      setLoading(true);
      setMessage('');
      try {
        const email = session.user.email;
        if (!email) {
          setMessage('Missing email address.');
          setLoading(false);
          return;
        }

        const url = `/api/profiles?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data?.user) {
          if (role === 'INVESTOR') {
            setInvestorProfile({
              firmName: data.user.investorProfile?.firmName ?? '',
              investmentRange: data.user.investorProfile?.investmentRange ?? 'Seed',
              preferredIndustries: buildCsv(data.user.investorProfile?.preferredIndustries ?? []),
              ticketSize: data.user.investorProfile?.ticketSize ?? '$100k-$500k',
              website: data.user.investorProfile?.website ?? '',
              linkedin: data.user.investorProfile?.linkedin ?? '',
              location: data.user.investorProfile?.location ?? ''
            });
          } else {
            setSeekerProfile({
              companyName: data.user.seekerProfile?.companyName ?? '',
              headline: data.user.seekerProfile?.headline ?? '',
              stage: data.user.seekerProfile?.stage ?? 'IDEA',
              fundingGoal: data.user.seekerProfile?.fundingGoal ?? 250000,
              equityOffered: data.user.seekerProfile?.equityOffered ?? 10,
              industries: buildCsv(data.user.seekerProfile?.industries ?? []),
              website: data.user.seekerProfile?.website ?? '',
              linkedIn: data.user.seekerProfile?.linkedIn ?? '',
              location: data.user.seekerProfile?.location ?? ''
            });
          }
        }
      } catch (error) {
        setMessage('Unable to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [session?.user?.email, role]);

  useEffect(() => {
    setIsComplete(completionScore >= 90);
  }, [completionScore]);

  useEffect(() => {
    const stored = window.localStorage.getItem(`onboardingBannerDismissedTimestamp-${role}`);
    if (!stored) {
      setBannerDismissed(false);
      return;
    }

    const timestamp = Number(stored);
    const elapsedMs = Date.now() - timestamp;
    const oneDayMs = 24 * 60 * 60 * 1000;
    setBannerDismissed(elapsedMs < oneDayMs);
  }, [role]);

  const handleDismissBanner = () => {
    window.localStorage.setItem(`onboardingBannerDismissedTimestamp-${role}`, String(Date.now()));
    setBannerDismissed(true);
  };

  const restoreBanner = () => {
    window.localStorage.removeItem(`onboardingBannerDismissedTimestamp-${role}`);
    setBannerDismissed(false);
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;
    setSaving(true);
    setMessage('');

    const profilePayload = role === 'INVESTOR' ? {
      firmName: investorProfile.firmName,
      investmentRange: investorProfile.investmentRange,
      preferredIndustries: parseCsv(investorProfile.preferredIndustries),
      ticketSize: investorProfile.ticketSize,
      website: investorProfile.website,
      linkedin: investorProfile.linkedin,
      location: investorProfile.location
    } : {
      companyName: seekerProfile.companyName,
      headline: seekerProfile.headline,
      stage: seekerProfile.stage,
      fundingGoal: seekerProfile.fundingGoal,
      equityOffered: seekerProfile.equityOffered,
      industries: parseCsv(seekerProfile.industries),
      website: seekerProfile.website,
      linkedIn: seekerProfile.linkedIn,
      location: seekerProfile.location
    };

    const response = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, role, profile: profilePayload })
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result?.error || 'Unable to save profile.');
      setSaving(false);
      return;
    }

    if (!isComplete) {
      restoreBanner();
    }

    setMessage('Profile updated successfully.');
    setSaving(false);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 text-center text-slate-700 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300">
        Loading your profile…
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 text-center text-slate-700 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-lg font-semibold">Please sign in to manage your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Profile completion</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{role === 'INVESTOR' ? 'Investor' : 'Founder'} profile</h2>
        </div>
        <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <span className={isComplete ? 'text-emerald-600' : 'text-amber-600'}>{isComplete ? 'Onboarding complete' : 'Complete your profile'}</span>
          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-900 dark:bg-slate-700 dark:text-white">{completionScore}%</span>
        </div>
      </div>

      {!isComplete && !bannerDismissed ? (
        <div className="relative rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 text-slate-950 shadow-sm dark:border-amber-500/20 dark:bg-amber-900/10 dark:text-amber-100">
          <button
            type="button"
            onClick={handleDismissBanner}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Dismiss onboarding banner"
          >
            ×
          </button>
          <p className="text-sm font-semibold">Onboarding incomplete</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-amber-100/90">Finish your profile setup to improve matching, unlock investor introductions, and see higher-quality deal recommendations.</p>
        </div>
      ) : null}

      <div className="rounded-[1.75rem] bg-slate-50 p-6 dark:bg-slate-950">
        <p className="text-sm text-slate-600 dark:text-slate-300">A complete profile improves match quality and helps investors find your startup faster.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(role === 'INVESTOR' ? requiredInvestorFields : requiredSeekerFields).map((field) => (
            <div key={field} className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
              <p className="font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1')}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{field === 'industries' || field === 'preferredIndustries' ? 'Add comma-separated values.' : 'Fill this field to improve profile visibility.'}</p>
            </div>
          ))}
        </div>
      </div>

      {role === 'INVESTOR' ? (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Firm name
              <input value={investorProfile.firmName} onChange={(event) => setInvestorProfile({ ...investorProfile, firmName: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Investment range
              <select value={investorProfile.investmentRange} onChange={(event) => setInvestorProfile({ ...investorProfile, investmentRange: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                {investorRanges.map((option) => (<option key={option} value={option}>{option}</option>))}
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Preferred industries
              <input value={investorProfile.preferredIndustries} onChange={(event) => setInvestorProfile({ ...investorProfile, preferredIndustries: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Fintech, Healthtech" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Ticket size
              <select value={investorProfile.ticketSize} onChange={(event) => setInvestorProfile({ ...investorProfile, ticketSize: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                {ticketSizes.map((option) => (<option key={option} value={option}>{option}</option>))}
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Website
              <input value={investorProfile.website} onChange={(event) => setInvestorProfile({ ...investorProfile, website: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              LinkedIn
              <input value={investorProfile.linkedin} onChange={(event) => setInvestorProfile({ ...investorProfile, linkedin: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            Location
            <input value={investorProfile.location} onChange={(event) => setInvestorProfile({ ...investorProfile, location: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Company name
              <input value={seekerProfile.companyName} onChange={(event) => setSeekerProfile({ ...seekerProfile, companyName: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Headline
              <input value={seekerProfile.headline} onChange={(event) => setSeekerProfile({ ...seekerProfile, headline: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Stage
              <select value={seekerProfile.stage} onChange={(event) => setSeekerProfile({ ...seekerProfile, stage: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                {seekerStages.map((stage) => (<option key={stage} value={stage}>{stage}</option>))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Funding goal
              <input type="number" value={seekerProfile.fundingGoal} onChange={(event) => setSeekerProfile({ ...seekerProfile, fundingGoal: Number(event.target.value) })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Equity offered
              <input type="number" value={seekerProfile.equityOffered} onChange={(event) => setSeekerProfile({ ...seekerProfile, equityOffered: Number(event.target.value) })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Industries
              <input value={seekerProfile.industries} onChange={(event) => setSeekerProfile({ ...seekerProfile, industries: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Fintech, AI, SaaS" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Location
              <input value={seekerProfile.location} onChange={(event) => setSeekerProfile({ ...seekerProfile, location: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              Website
              <input value={seekerProfile.website} onChange={(event) => setSeekerProfile({ ...seekerProfile, website: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              LinkedIn / AngelList
              <input value={seekerProfile.linkedIn} onChange={(event) => setSeekerProfile({ ...seekerProfile, linkedIn: event.target.value })} className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </Button>
        {message ? <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p> : null}
      </div>
    </div>
  );
}
