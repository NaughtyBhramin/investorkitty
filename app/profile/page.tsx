'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { DashboardProfileEditor } from '@/components/dashboard/profile-editor';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">Loading profile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/sign-in');
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Your Profile</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Keep your profile information up to date to improve your matchmaking experience.
            </p>
          </div>
        </div>

        <DashboardProfileEditor />
      </div>
    </section>
  );
}
