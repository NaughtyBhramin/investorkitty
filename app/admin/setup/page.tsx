'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminSetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [accounts, setAccounts] = useState<any[]>([]);

  const handleSetupDemo = async () => {
    setStatus('loading');
    setMessage('Setting up demo accounts...');

    try {
      const response = await fetch('/api/setup-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-setup-token': 'dev-token' // For development
        }
      });

      if (!response.ok) {
        const error = await response.json();
        setStatus('error');
        setMessage(`Error: ${error.error || 'Failed to set up demo accounts'}`);
        return;
      }

      const data = await response.json();
      setStatus('success');
      setMessage('Demo accounts created successfully!');
      setAccounts(data.accounts || []);
    } catch (error: any) {
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-lg shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Admin Setup</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Initialize demo accounts for testing the platform
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Note:</strong> This creates test accounts with predefined credentials. Use these to explore the platform features.
            </p>
          </div>

          <Button
            onClick={handleSetupDemo}
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Setting up...' : 'Create Demo Accounts'}
          </Button>

          {message && (
            <div className={`rounded-2xl p-4 text-sm ${
              status === 'error'
                ? 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-200'
                : status === 'success'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-200'
                : 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-200'
            }`}>
              {message}
            </div>
          )}

          {accounts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Demo Accounts Created</h2>
              {accounts.map((account, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {account.role === 'SEEKER' ? 'Demo Founder' : 'Demo Investor'}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <strong>Email:</strong> <code className="bg-slate-200 px-2 py-1 dark:bg-slate-800">{account.email}</code>
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    <strong>Password:</strong> <code className="bg-slate-200 px-2 py-1 dark:bg-slate-800">{account.password}</code>
                  </p>
                  <Link
                    href="/sign-in"
                    className="mt-3 inline-block rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-600"
                  >
                    Sign In →
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Demo Accounts</h2>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>
                <strong>Founder Account:</strong>
                <br />
                Email: demo-founder@investorkitty.com
                <br />
                Password: DemoPassword123!
              </p>
              <p>
                <strong>Investor Account:</strong>
                <br />
                Email: demo-investor@investorkitty.com
                <br />
                Password: DemoPassword123!
              </p>
            </div>
          </div>

          <Link
            href="/sign-in"
            className="block rounded-2xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Go to Sign In →
          </Link>
        </div>
      </div>
    </section>
  );
}
