'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PortfolioItem {
  id: string;
  seekerId: string;
  seekerProfile: {
    companyName: string;
    headline: string;
    stage: string;
    fundingGoal: number;
    equityOffered: number;
    industries: string[];
    kittyScore: number;
  };
  status: string;
  tagStatus: string;
  createdAt: string;
}

export default function PortfolioSortingPage() {
  const { data: session, status } = useSession();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'stage' | 'funding' | 'score'>('name');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.id) {
      setLoading(false);
      return;
    }

    const loadPortfolio = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/matches?userId=${encodeURIComponent(session.user.id)}`);
        const data = await response.json();
        const matches = Array.isArray(data.matches) ? data.matches : [];
        // Filter to only connected/passed matches for portfolio
        const portfolioItems = matches.filter((match: any) =>
          match.status === 'CONNECTED' || match.status === 'PASSED'
        );
        setPortfolio(portfolioItems);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [session?.user?.id, status]);

  if (status === 'loading') {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">Loading portfolio...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/sign-in');
  }

  if (session?.user?.role !== 'INVESTOR') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">This page is only available for investors.</p>
          </div>
        </div>
      </section>
    );
  }

  const sortedPortfolio = [...portfolio].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.seekerProfile.companyName.localeCompare(b.seekerProfile.companyName);
      case 'stage':
        return a.seekerProfile.stage.localeCompare(b.seekerProfile.stage);
      case 'funding':
        return b.seekerProfile.fundingGoal - a.seekerProfile.fundingGoal;
      case 'score':
        return b.seekerProfile.kittyScore - a.seekerProfile.kittyScore;
      default:
        return 0;
    }
  });

  const filteredPortfolio = filterStatus === 'all'
    ? sortedPortfolio
    : sortedPortfolio.filter(item => item.status === filterStatus);

  const formatFunding = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">My Portfolio</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Manage and organize your investment portfolio.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="secondary">Browse More Startups</Button>
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="name">Sort by Name</option>
                <option value="stage">Sort by Stage</option>
                <option value="funding">Sort by Funding</option>
                <option value="score">Sort by Score</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="CONNECTED">Connected</option>
                <option value="PASSED">Passed</option>
              </select>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {filteredPortfolio.length} companies
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-300">Loading portfolio...</p>
            </div>
          </div>
        ) : filteredPortfolio.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="text-center space-y-4">
              <div className="text-4xl">📊</div>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">No Portfolio Items Yet</h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your portfolio will show startups you've connected with or passed on.
                Start browsing to build your investment portfolio.
              </p>
              <Link href="/projects">
                <Button>Browse Startups</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                      {item.seekerProfile.companyName}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {item.seekerProfile.headline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.status === 'CONNECTED'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {item.status}
                    </span>
                    <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                      {item.seekerProfile.stage}
                    </span>
                    {item.seekerProfile.industries.slice(0, 1).map((industry) => (
                      <span
                        key={industry}
                        className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Funding Goal:</span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {formatFunding(item.seekerProfile.fundingGoal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Equity:</span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {item.seekerProfile.equityOffered}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Score:</span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {item.seekerProfile.kittyScore}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href={`/crowdfunding-single?id=${item.seekerId}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
