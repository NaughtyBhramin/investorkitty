import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardIndex() {
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Dashboard home</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Choose your role and manage your profile, matches, and messages.</p>
          </div>
          <Link href="/dashboard/matches">
            <Button>Demo complete application</Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link href="/dashboard/seeker" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-center font-semibold text-slate-900 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
            Seeker
          </Link>
          <Link href="/dashboard/investor" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-center font-semibold text-slate-900 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
            Investor
          </Link>
          <Link href="/dashboard/admin" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-center font-semibold text-slate-900 transition hover:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
            Admin
          </Link>
        </div>
      </div>
    </section>
}
