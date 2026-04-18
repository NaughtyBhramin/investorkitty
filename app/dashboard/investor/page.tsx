import Link from 'next/link';
import { DashboardProfileEditor } from '@/components/dashboard/profile-editor';
import { MatchSummaryCard } from '@/components/dashboard/match-summary';

export default function InvestorDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.85fr]">
        <div className="space-y-6">
          <DashboardProfileEditor />
          <MatchSummaryCard />
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Investor dashboard</p>
                <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Welcome back, investor.</h1>
              </div>
              <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                Active deals: 12
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
                <p className="text-sm text-slate-500">New startups this week</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">38</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
                <p className="text-sm text-slate-500">Mutual matches</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">9</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recent matches</h2>
              <div className="mt-6 space-y-4">
                {['Fintech growth startup', 'Healthtech MVP', 'Education platform'].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800/70 dark:bg-slate-950">
                    <p className="font-semibold text-slate-900 dark:text-white">{item}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Review status, schedule pitch room, or send a message.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Investor CRM</h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Tag startups as reviewing, due diligence, committed, or passed.</p>
              <div className="mt-6 space-y-3">
                {['Reviewing 5', 'Due diligence 2', 'Committed 1'].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Quick links</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <Link href="/dashboard/investor/discovery" className="block rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 dark:bg-slate-950 dark:text-white">Startup discovery</Link>
              <Link href="/dashboard/investor" className="block rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 dark:bg-slate-950 dark:text-white">Saved deals</Link>
              <Link href="/dashboard/investor" className="block rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 dark:bg-slate-950 dark:text-white">Export matched list</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Tips</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Keep your investor profile updated with ticket size and preferred industries to surface higher-quality startups.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
