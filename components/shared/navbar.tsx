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
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${
      theme === 'dark' 
        ? 'border-slate-800/80 bg-secondary' 
        : 'border-slate-200/80 bg-white/90'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className={`flex items-center gap-3 font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          <img src="/investorskittylogo.png" alt="Investors Kitty Logo" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm font-medium transition ${
              theme === 'dark' 
                ? 'text-slate-300 hover:text-brand-400' 
                : 'text-slate-600 hover:text-brand-600'
            }`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            theme === 'dark' 
              ? 'border-slate-600 bg-secondary text-white hover:border-brand-500 hover:text-brand-400' 
              : 'border-slate-300 bg-white text-slate-900 hover:border-brand-500 hover:text-brand-600'
          }`}>
            Sign in
          </Link>
          <button
            aria-label="Toggle theme"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
              theme === 'dark' 
                ? 'border-slate-600 bg-secondary text-white hover:border-brand-500' 
                : 'border-slate-300 bg-white text-slate-800 hover:border-brand-500'
            }`}
            onClick={toggleTheme}
          >
            {mounted && (theme === 'dark' ? '☀️' : '🌙')}
          </button>
        </div>
      </div>
    </header>
  );
}
