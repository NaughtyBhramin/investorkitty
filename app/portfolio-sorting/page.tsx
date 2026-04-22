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
  // Enhanced portfolio data
  investmentAmount?: number;
  investmentDate?: string;
  currentValuation?: number;
  returns?: number;
  exitStatus?: 'active' | 'exited';
}

export default function PortfolioSortingPage() {
  const { data: session, status } = useSession();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'stage' | 'funding' | 'score' | 'investment' | 'returns' | 'valuation'>('name');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

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

        // Enhance with mock portfolio data for demonstration
        const enhancedPortfolio = portfolioItems.map((item: any, index: number) => ({
          ...item,
          investmentAmount: Math.floor(Math.random() * 5000000) + 500000, // Random investment between 5L-50L
          investmentDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currentValuation: Math.floor(Math.random() * 50000000) + 10000000, // Random valuation 1-50Cr
          returns: Math.floor(Math.random() * 200) - 50, // Random returns -50% to +150%
          exitStatus: Math.random() > 0.8 ? 'exited' as const : 'active' as const
        }));

        setPortfolio(enhancedPortfolio);
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
      case 'investment':
        return (b.investmentAmount || 0) - (a.investmentAmount || 0);
      case 'returns':
        return (b.returns || 0) - (a.returns || 0);
      case 'valuation':
        return (b.currentValuation || 0) - (a.currentValuation || 0);
      default:
        return 0;
    }
  });

  const filteredPortfolio = filterStatus === 'all'
    ? sortedPortfolio
    : sortedPortfolio.filter(item => item.status === filterStatus || item.exitStatus === filterStatus);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(0)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const totalInvested = portfolio.reduce((sum, item) => sum + (item.investmentAmount || 0), 0);
  const totalValue = portfolio.reduce((sum, item) => sum + (item.currentValuation || 0) * ((item.seekerProfile.equityOffered || 0) / 100), 0);
  const totalReturns = totalValue - totalInvested;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Portfolio Management</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Track your investments, monitor performance, and manage your portfolio.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/investor">
                <Button variant="secondary">Back to Dashboard</Button>
              </Link>
              <Link href="/projects">
                <Button>Browse Startups</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Invested</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Portfolio Value</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">{formatCurrency(totalValue)}</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Returns</p>
                <p className={`text-2xl font-semibold ${totalReturns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {totalReturns >= 0 ? '+' : ''}{formatCurrency(totalReturns)}
                </p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Companies</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">{portfolio.length}</p>
              </div>
              <div className="text-3xl">🏢</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="name">Sort by Name</option>
                <option value="stage">Sort by Stage</option>
                <option value="funding">Sort by Funding Goal</option>
                <option value="score">Sort by Kitty Score</option>
                <option value="investment">Sort by Investment</option>
                <option value="returns">Sort by Returns</option>
                <option value="valuation">Sort by Valuation</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Companies</option>
                <option value="CONNECTED">Connected</option>
                <option value="PASSED">Passed</option>
                <option value="active">Active Investments</option>
                <option value="exited">Exited Investments</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-2 rounded-lg border ${
                    viewMode === 'cards'
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-lg border ${
                    viewMode === 'table'
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {filteredPortfolio.length} companies
            </div>
          </div>
        </div>

        {/* Portfolio Content */}
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
        ) : viewMode === 'cards' ? (
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
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.exitStatus === 'exited'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.exitStatus === 'exited' ? 'Exited' : 'Active'}
                    </span>
                    <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                      {item.seekerProfile.stage}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Investment:</span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {formatCurrency(item.investmentAmount || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Current Value:</span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {formatCurrency((item.currentValuation || 0) * (item.seekerProfile.equityOffered / 100))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Returns:</span>
                      <span className={`font-semibold ${item.returns && item.returns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {item.returns ? `${item.returns >= 0 ? '+' : ''}${item.returns}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Kitty Score:</span>
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
        ) : (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Company</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Stage</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Investment</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Current Value</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Returns</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPortfolio.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{item.seekerProfile.companyName}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{item.seekerProfile.headline}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.seekerProfile.stage}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(item.investmentAmount || 0)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                        {formatCurrency((item.currentValuation || 0) * (item.seekerProfile.equityOffered / 100))}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        <span className={item.returns && item.returns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {item.returns ? `${item.returns >= 0 ? '+' : ''}${item.returns}%` : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium w-fit ${
                            item.status === 'CONNECTED'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {item.status}
                          </span>
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium w-fit ${
                            item.exitStatus === 'exited'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {item.exitStatus === 'exited' ? 'Exited' : 'Active'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/crowdfunding-single?id=${item.seekerId}`}>
                          <Button variant="secondary">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
