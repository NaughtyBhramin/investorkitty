'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-lg shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Sign in to InvestorsKitty</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Login fast with email/password or one-click Google / Microsoft authentication.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <Button type="button" className="w-full" onClick={() => signIn('credentials', { email, password, callbackUrl: '/onboarding' })}>
            Sign in with email
          </Button>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button type="button" variant="secondary" onClick={() => signIn('google', { callbackUrl: '/onboarding' })}>
              Continue with Google
            </Button>
            <Button type="button" variant="secondary" onClick={() => signIn('github', { callbackUrl: '/onboarding' })}>
              Continue with GitHub
            </Button>
            <Button type="button" variant="secondary" onClick={() => signIn('azure-ad', { callbackUrl: '/onboarding' })}>
              Continue with Microsoft
            </Button>
          </div>
          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            New to InvestorsKitty?{' '}
            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-500">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
