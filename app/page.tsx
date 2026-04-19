import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Startup discovery',
    description: 'Find investors and startups with smart filters, industry tags, and pitch matching.'
  },
  {
    title: 'Mutual matchmaking',
    description: 'Investors and founders connect only when both parties express interest.'
  },
  {
    title: 'Secure deal chat',
    description: 'Real-time messaging and file sharing keep investment conversations in one place.'
  },
  {
    title: 'Analytics dashboard',
    description: 'Track views, matches, progress stages, and syndicate opportunities.'
  }
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:shadow-emerald-900">
            Shape Your Vision with Confidence
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Invest in bold founders, build smarter syndicates, and track every deal with InvestorsKitty.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A founder/investor marketplace designed for early-stage startups, real investors, and admin-led growth with pitch rooms, smart notifications, and deal status tracking.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/sign-in">
              <Button>Start with sign in</Button>
            </Link>
            <Link href="/register" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
              Create an account →
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-brand-500/10 to-white dark:from-brand-500/10 dark:to-slate-900">
            <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">InvestorsKitty dashboard</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">One platform for founders, investors, and admins</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Manage your startup profile, match with investors, schedule meetings, and track progress on a single secure portal.</p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div id="explore" className="mt-24 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Explore</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Launch-ready categories for investor discovery</h2>
          </div>
          <Link href="/sign-in" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
            Join InvestorsKitty
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Real Estate', 'Technology', 'Medical & Health', 'Education', 'Fashion', 'Hospitality'].map((category) => (
            <Card key={category} className="border-brand-100 bg-brand-50/60 dark:border-slate-800">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Category</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{category}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Curated startup deals and investor preferences for {category.toLowerCase()}.</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
