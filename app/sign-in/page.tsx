'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect authenticated users to their role-specific dashboard
  if (session?.user) {
    const role = session.user.role;
    if (role === 'ADMIN') {
      router.push('/dashboard/admin');
    } else if (role === 'INVESTOR') {
      router.push('/dashboard/investor');
    } else {
      router.push('/dashboard/seeker');
    }
    return null;
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (!result?.ok) {
        setError(result?.error || 'Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect after successful sign in
      router.push('/dashboard/seeker');
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError('An error occurred during sign in. Please try again.');
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setError('');
    setLoading(true);

    try {
      const result = await signIn(provider, {
        redirect: false
      });

      if (!result?.ok) {
        setError(`Failed to sign in with ${provider}`);
        setLoading(false);
        return;
      }

      // Redirect after successful sign in
      router.push('/dashboard/seeker');
    } catch (error: any) {
      console.error(`OAuth sign in error for ${provider}:`, error);
      setError(`An error occurred while signing in with ${provider}`);
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'INVESTOR' | 'SEEKER') => {
    setError('');
    setLoading(true);

    try {
      // Demo credentials
      const demoCredentials = {
        email: role === 'INVESTOR' ? 'demo-investor@investorkitty.com' : 'demo-founder@investorkitty.com',
        password: 'DemoPassword123!'
      };

      const result = await signIn('credentials', {
        email: demoCredentials.email,
        password: demoCredentials.password,
        redirect: false
      });

      if (!result?.ok) {
        setError('Demo account not found. Please create a demo account first.');
        setLoading(false);
        return;
      }

      // Redirect based on role
      const redirectPath = role === 'INVESTOR' ? '/dashboard/investor' : '/dashboard/seeker';
      router.push(redirectPath);
    } catch (error: any) {
      console.error('Demo login error:', error);
      setError('An error occurred during demo login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-lg shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Sign in to InvestorsKitty</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Login with email/password or use OAuth services for quick access.</p>

        {error && (
          <div className="mt-6 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 dark:bg-rose-950/20 dark:text-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-900 dark:disabled:text-slate-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-900 dark:disabled:text-slate-400"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in with email'}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-slate-600 dark:bg-slate-900 dark:text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOAuthSignIn('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOAuthSignIn('github')}
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOAuthSignIn('azure-ad')}
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              Microsoft
            </Button>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="mb-3 text-center text-sm font-medium text-slate-700 dark:text-slate-300">Try demo accounts</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleDemoLogin('SEEKER')}
              disabled={loading}
              className="text-sm"
            >
              Demo: Founder
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleDemoLogin('INVESTOR')}
              disabled={loading}
              className="text-sm"
            >
              Demo: Investor
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          New to InvestorsKitty?{' '}
          <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-500">
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}
