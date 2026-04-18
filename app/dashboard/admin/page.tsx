import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Admin panel</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Platform moderation and analytics</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {['Active users', 'Matched deals', 'Reports'].map((stat) => (
              <div key={stat} className="rounded-3xl bg-slate-50 px-5 py-4 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stat === 'Reports' ? '7' : stat === 'Active users' ? '4.6k' : '120'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800/80 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Verify founders</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Approve badge requests, moderate flagged content, and review pending startup listings.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800/80 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">System reports</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Track platform health across total raised, active matches, and user behavior.</p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200/80 bg-white p-6 dark:border-slate-800/80 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Admin quick actions</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {['Flagged content', 'Resource library', 'User verification'].map((action) => (
              <Link key={action} href="/dashboard/admin" className="rounded-3xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 transition hover:bg-brand-50 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800">
                {action}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
