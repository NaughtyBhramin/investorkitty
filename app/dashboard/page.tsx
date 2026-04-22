'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { MatchSummaryCard } from '@/components/dashboard/match-summary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">Loading dashboard...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/sign-in');
  }

  const user = session?.user;
  const isSeeker = user?.role === 'SEEKER';
  const isInvestor = user?.role === 'INVESTOR';

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {isSeeker ? 'Manage your startup profile and connect with investors.' :
                 isInvestor ? 'Discover promising startups and manage your portfolio.' :
                 'Admin dashboard - oversee platform activity.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/profile">
                <Button variant="secondary">Edit Profile</Button>
              </Link>
              {isSeeker && (
                <Link href="/add-a-project">
                  <Button>Update Startup</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Match Summary */}
        <MatchSummaryCard />

        {/* Quick Actions */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isSeeker ? (
              <>
                <Link href="/projects" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">🔍</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Browse Investors</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Find potential investors for your startup</p>
                </Link>
                <Link href="/bookmark" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">⭐</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Saved Investors</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">View your bookmarked investor profiles</p>
                </Link>
                <Link href="/add-a-project" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Update Profile</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Keep your startup information current</p>
                </Link>
              </>
            ) : isInvestor ? (
              <>
                <Link href="/projects" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">🚀</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Discover Startups</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Browse promising startup opportunities</p>
                </Link>
                <Link href="/portfolio-sorting" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Portfolio</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Manage your investment portfolio</p>
                </Link>
                <Link href="/bookmark" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">⭐</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Saved Startups</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">View your bookmarked startup profiles</p>
                </Link>
              </>
            ) : (
              <>
                <Link href="/projects" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">📈</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Platform Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">View platform usage statistics</p>
                </Link>
                <Link href="/users" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">👥</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">User Management</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Manage platform users</p>
                </Link>
                <Link href="/settings" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
                  <div className="text-2xl mb-2">⚙️</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Platform Settings</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Configure platform settings</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
