import Link from 'next/link';
import { DashboardProfileEditor } from '@/components/dashboard/profile-editor';
import { MatchSummaryCard } from '@/components/dashboard/match-summary';

export default function SeekerDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.85fr]">
        <div className="space-y-6">
          <DashboardProfileEditor />
          <MatchSummaryCard />
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Seeker dashboard</p>
                <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Founder analytics at a glance</h1>
              </div>
              <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                Kitty score: 8.2
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
                <p className="text-sm text-slate-500">Investor interest</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">14</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
                <p className="text-sm text-slate-500">Profile views</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">86</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Investor messages</h2>
              <div className="mt-6 space-y-4">
                {['New message from Patel Capital', 'Meeting request from Sequoia', 'Review update from Avanti Ventures'].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800/70 dark:bg-slate-950">
                    <p className="font-semibold text-slate-900 dark:text-white">{item}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Open chat to negotiate terms and share your pitch deck.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Fundraising progress</h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Update your stage, funding goal, and traction metrics to improve your Kitty Score.</p>
              <div className="mt-6 space-y-3">
                {['Stage: MVP', 'Funding goal: ₹1.2 Cr', 'Equity offered: 12%'].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Quick actions</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <Link href="/dashboard/seeker/discovery" className="block rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 dark:bg-slate-950 dark:text-white">Discover investors</Link>
              <Link href="/dashboard/seeker" className="block rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 dark:bg-slate-950 dark:text-white">Update startup pitch</Link>
              <Link href="/dashboard/matches" className="block rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 dark:bg-slate-950 dark:text-white">View match history</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Growth tip</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Add team metrics and your latest traction chart to increase investor confidence.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
