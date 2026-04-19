'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface StartupProfile {
  id: string;
  userId: string;
  companyName: string;
  headline: string;
  pitchDeckUrl?: string;
  stage: string;
  fundingGoal: number;
  equityOffered: number;
  industries: string[];
  traction?: any;
  teamMembers?: any;
  location?: string;
  website?: string;
  linkedIn?: string;
  angelList?: string;
  kittyScore: number;
  profileViews: number;
  investorInterest: number;
  createdAt: string;
  updatedAt: string;
}

export default function CrowdfundingSinglePage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [startup, setStartup] = useState<StartupProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startupId = searchParams.get('id');

  useEffect(() => {
    if (!startupId) {
      setError('No startup ID provided');
      setLoading(false);
      return;
    }

    const loadStartup = async () => {
      setLoading(true);
      try {
        // For now, we'll fetch from profiles API using email, but ideally we'd have a dedicated startup detail API
        // This is a simplified approach - in production you'd want a proper API endpoint
        const response = await fetch(`/api/profiles?email=${encodeURIComponent('placeholder@example.com')}`);
        const data = await response.json();

        if (data.user?.seekerProfile) {
          setStartup(data.user.seekerProfile);
        } else {
          setError('Startup not found');
        }
      } catch (err) {
        console.error('Failed to load startup:', err);
        setError('Failed to load startup details');
      } finally {
        setLoading(false);
      }
    };

    loadStartup();
  }, [startupId]);

  const formatFunding = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">Loading startup details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !startup) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center space-y-4">
            <div className="text-4xl">❌</div>
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Startup Not Found</h1>
            <p className="text-slate-600 dark:text-slate-300">{error || 'The requested startup could not be found.'}</p>
            <Link href="/projects">
              <Button>Browse Other Startups</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const isInvestor = session?.user?.role === 'INVESTOR';

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">
                {startup.companyName}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {startup.headline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                {startup.stage}
              </span>
              {startup.industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {industry}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Funding Goal:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {formatFunding(startup.fundingGoal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Equity Offered:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {startup.equityOffered}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Kitty Score:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {startup.kittyScore}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Profile Views:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {startup.profileViews}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white mb-4">About</h2>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                {startup.location && (
                  <p><strong>Location:</strong> {startup.location}</p>
                )}
                {startup.website && (
                  <p><strong>Website:</strong> <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-500">{startup.website}</a></p>
                )}
                {startup.linkedIn && (
                  <p><strong>LinkedIn:</strong> <a href={startup.linkedIn} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-500">{startup.linkedIn}</a></p>
                )}
                {startup.angelList && (
                  <p><strong>AngelList:</strong> <a href={startup.angelList} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-500">{startup.angelList}</a></p>
                )}
              </div>
            </div>

            {/* Traction */}
            {startup.traction && (
              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white mb-4">Traction</h2>
                <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {JSON.stringify(startup.traction, null, 2)}
                </pre>
              </div>
            )}

            {/* Team */}
            {startup.teamMembers && (
              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white mb-4">Team</h2>
                <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {JSON.stringify(startup.teamMembers, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white mb-4">Actions</h3>
              <div className="space-y-3">
                {isInvestor ? (
                  <>
                    <Button className="w-full">Express Interest</Button>
                    <Button variant="outline" className="w-full">Save to Portfolio</Button>
                    <Button variant="outline" className="w-full">Schedule Meeting</Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full">Connect as Founder</Button>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white mb-4">Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Investor Interest:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {startup.investorInterest}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Profile Views:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {startup.profileViews}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Created:</span>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {new Date(startup.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
