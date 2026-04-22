'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardProfileEditor } from '@/components/dashboard/profile-editor';
import { MatchSummaryCard } from '@/components/dashboard/match-summary';
import { Button } from '@/components/ui/button';

export default function InvestorDashboard() {
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header with Community Button */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Investor Dashboard</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Discover startups, manage your portfolio, and collaborate with other investors.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowCommunityModal(true)}>
                Join Community
              </Button>
              <Link href="/projects">
                <Button>Browse Startups</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Community Modal */}
        {showCommunityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-lg dark:border-slate-800/80 dark:bg-secondary">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Investor Communities</h2>
                  <button
                    onClick={() => setShowCommunityModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <InvestorCommunities onClose={() => setShowCommunityModal(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Profile Editor */}
        <DashboardProfileEditor />

        {/* Match Summary */}
        <MatchSummaryCard />

        {/* Analytics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Active Deals</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">12</p>
              </div>
              <div className="text-3xl">🤝</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">New Startups</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">38</p>
              </div>
              <div className="text-3xl">🚀</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mutual Matches</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">9</p>
              </div>
              <div className="text-3xl">💡</div>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Portfolio Overview</h2>
            <Link href="/portfolio-sorting">
              <Button variant="secondary">View All</Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Fintech Growth Startup', status: 'Due Diligence', amount: '₹2.5 Cr', progress: 75 },
              { name: 'Healthtech MVP', status: 'Reviewing', amount: '₹1.8 Cr', progress: 45 },
              { name: 'Education Platform', status: 'Committed', amount: '₹3.2 Cr', progress: 90 }
            ].map((deal, index) => (
              <div key={index} className="rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800/70 dark:bg-slate-950/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{deal.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    deal.status === 'Committed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    deal.status === 'Due Diligence' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {deal.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{deal.amount}</p>
                <div className="w-full bg-slate-200 rounded-full h-2 dark:bg-slate-700">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${deal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Syndicate Opportunities */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Syndicate Opportunities</h2>
            <Button variant="secondary">Create Syndicate</Button>
          </div>

          <div className="space-y-4">
            {[
              { title: 'AI Startup Co-Investment', investors: 3, target: '₹5 Cr', deadline: '2 days', description: 'Leading AI company seeking co-investors for Series A round.' },
              { title: 'SaaS Platform Syndicate', investors: 5, target: '₹8 Cr', deadline: '1 week', description: 'B2B SaaS company with strong traction looking for syndicate partners.' }
            ].map((syndicate, index) => (
              <div key={index} className="rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800/70 dark:bg-slate-950/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{syndicate.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{syndicate.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{syndicate.target}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{syndicate.deadline} left</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {syndicate.investors} investors committed
                  </p>
                  <Button>Join Syndicate</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestorCommunities({ onClose }: { onClose: () => void }) {
  const communities = [
    {
      name: 'Tech Investors Network',
      members: 245,
      focus: 'Technology, SaaS, AI',
      description: 'A community of tech-focused investors sharing deals and insights.',
      isJoined: true
    },
    {
      name: 'Early Stage Syndicate',
      members: 89,
      focus: 'Seed & Series A',
      description: 'Co-investment opportunities for early-stage startups.',
      isJoined: false
    },
    {
      name: 'Impact Investors Circle',
      members: 156,
      focus: 'Social Impact, Sustainability',
      description: 'Investors focused on companies with positive social impact.',
      isJoined: true
    },
    {
      name: 'Healthcare Investment Group',
      members: 78,
      focus: 'Healthtech, Biotech',
      description: 'Specialized community for healthcare and biotech investments.',
      isJoined: false
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-slate-600 dark:text-slate-300">
        Join communities to connect with other investors, share deal flow, and participate in syndicate investments.
      </p>

      <div className="space-y-4">
        {communities.map((community, index) => (
          <div key={index} className="rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800/70 dark:bg-slate-950/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{community.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{community.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{community.members} members</span>
                  <span>•</span>
                  <span>{community.focus}</span>
                </div>
              </div>
              <Button
                variant={community.isJoined ? "secondary" : "primary"}
                className="ml-4"
              >
                {community.isJoined ? 'Joined' : 'Join'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
}
