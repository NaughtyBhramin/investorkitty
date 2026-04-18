'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', name: '', password: '', role: 'SEEKER' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    setStatus('saving');
    setMessage('');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      const payload = await response.json();
      setStatus('error');
      setMessage(payload?.error || 'Unable to register account.');
      return;
    }

    setStatus('success');
    await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: '/onboarding'
    });
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-lg shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Create your InvestorsKitty account</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Choose your role, create a quick profile, or use Google / Microsoft one-click registration.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Choose a secure password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">I am a</label>
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="SEEKER">Founder / Seeker</option>
              <option value="INVESTOR">Investor</option>
            </select>
          </div>
          <Button type="button" className="w-full" onClick={handleRegister} disabled={status === 'saving'}>
            {status === 'saving' ? 'Creating account…' : 'Register account'}
          </Button>
          {message ? (
            <p className={`text-center text-sm ${status === 'error' ? 'text-rose-600' : 'text-emerald-600'}`}>{message}</p>
          ) : null}
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
            Already have an account?{' '}
            <Link href="/sign-in" className="font-semibold text-brand-600 hover:text-brand-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
