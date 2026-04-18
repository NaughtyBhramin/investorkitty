'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from '@/components/shared/theme-provider';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#explore', label: 'Explore' },
  { href: '/#how-it-works', label: 'How it works' }
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white">IK</span>
          <span>
            <span className="block text-lg">Investors</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Kitty</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            Sign in
          </Link>
          <button
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            onClick={toggleTheme}
          >
            {mounted && (theme === 'dark' ? '☀️' : '🌙')}
          </button>
        </div>
      </div>
    </header>
  );
}
