'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookmarkPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">Loading your bookmarks...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/sign-in');
  }

  const isInvestor = session?.user?.role === 'INVESTOR';

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">
              {isInvestor ? 'Saved Startups' : 'Saved Investors'}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {isInvestor
                ? 'Your bookmarked startup profiles for quick access and follow-up.'
                : 'Your bookmarked investor profiles for quick access and follow-up.'
              }
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center space-y-4">
            <div className="text-4xl">📚</div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Bookmark Feature Coming Soon</h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              We're working on a comprehensive bookmarking system that will allow you to save and organize
              {isInvestor ? ' startup profiles' : ' investor profiles'} for easy access and follow-up.
            </p>
            <div className="pt-4">
              <Link href="/projects">
                <Button>
                  {isInvestor ? 'Browse Startups' : 'Browse Investors'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
