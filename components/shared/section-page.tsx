'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SectionPageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function SectionPage({ title, description, children }: SectionPageProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">InvestorsKitty</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">{title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-slate-950/50">
          {children}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
            Back to homepage
          </Link>
          <Link href="/sign-in" className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
