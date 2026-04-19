'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Startup {
  id: string;
  companyName: string;
  headline: string;
  stage: string;
  fundingGoal: number;
  equityOffered: number;
  industries: string[];
  location?: string;
  website?: string;
  kittyScore: number;
  profileViews: number;
  investorInterest: number;
  userId: string;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    stage: '',
    industry: '',
    minBudget: '',
    maxBudget: ''
  });

  const isInvestor = session?.user?.role === 'INVESTOR';

  useEffect(() => {
    const loadStartups = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.stage) queryParams.set('stage', filters.stage);
        if (filters.industry) queryParams.set('industry', filters.industry);
        if (filters.minBudget) queryParams.set('minBudget', filters.minBudget);
        if (filters.maxBudget) queryParams.set('maxBudget', filters.maxBudget);
        if (isInvestor && session?.user?.id) {
          queryParams.set('investorId', session.user.id);
        }

        const response = await fetch(`/api/startups?${queryParams.toString()}`);
        const data = await response.json();
        setStartups(data.listings || []);
      } catch (error) {
        console.error('Failed to load startups:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStartups();
  }, [filters, isInvestor, session?.user?.id]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">
                {isInvestor ? 'Discover Startups' : 'Browse Projects'}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {isInvestor
                  ? 'Find promising startup opportunities that match your investment criteria.'
                  : 'Explore innovative projects and connect with potential investors.'
                }
              </p>
            </div>
            {session?.user && (
              <div className="flex gap-3">
                {isInvestor && (
                  <Link href="/portfolio-sorting">
                    <Button variant="secondary">My Portfolio</Button>
                  </Link>
                )}
                <Link href="/bookmark">
                  <Button variant="secondary">Saved</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white mb-4">Filters</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={filters.stage}
              onChange={(e) => handleFilterChange('stage', e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            >
              <option value="">All Stages</option>
              <option value="IDEA">Idea</option>
              <option value="POC">Proof of Concept</option>
              <option value="MVP">MVP</option>
              <option value="GROWTH">Growth</option>
            </select>

            <input
              type="text"
              placeholder="Industry"
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />

            <input
              type="number"
              placeholder="Min Funding ($)"
              value={filters.minBudget}
              onChange={(e) => handleFilterChange('minBudget', e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />

            <input
              type="number"
              placeholder="Max Funding ($)"
              value={filters.maxBudget}
              onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {/* Startups Grid */}
        {loading ? (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-300">Loading startups...</p>
            </div>
          </div>
        ) : startups.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-300">No startups found matching your criteria.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map((startup) => (
              <div
                key={startup.id}
                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                      {startup.companyName}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {startup.headline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                      {startup.stage}
                    </span>
                    {startup.industries.slice(0, 2).map((industry) => (
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
                        {formatFunding(startup.fundingGoal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Equity:</span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {startup.equityOffered}%
                      </span>
                    </div>
                    {startup.location && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Location:</span>
                        <span className="font-semibold text-slate-950 dark:text-white">
                          {startup.location}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Score: {startup.kittyScore} | Views: {startup.profileViews}
                    </div>
                    <Link href={`/crowdfunding-single?id=${startup.id}`}>
                      <Button>View Details</Button>
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
