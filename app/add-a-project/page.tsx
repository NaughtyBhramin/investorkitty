'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { DashboardProfileEditor } from '@/components/dashboard/profile-editor';

export default function AddAProjectPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/sign-in');
  }

  const isSeeker = session?.user?.role === 'SEEKER';
  const isInvestor = session?.user?.role === 'INVESTOR';

  if (isInvestor) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Add Investment Opportunity</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                As an investor, you can create investment opportunities or manage your existing portfolio.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="text-center space-y-4">
              <div className="text-4xl">💼</div>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Investment Management</h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                This section is for managing your investment opportunities and portfolio companies.
                Contact support if you need to add new investment listings.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isSeeker) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Add Your Startup</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Create or update your startup profile to attract investors and get matched.
              </p>
            </div>
          </div>

          <DashboardProfileEditor />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-300">Invalid user role for this page.</p>
        </div>
      </div>
    </section>
  );
}
