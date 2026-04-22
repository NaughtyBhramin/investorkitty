'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from '@/components/shared/theme-provider';

type SubmenuItem = {
  href: string;
  label: string;
  authOnly?: boolean;
  investorOnly?: boolean;
};

type NavItem = {
  href: string;
  label: string;
  submenu?: SubmenuItem[];
};

const exploreSubmenu: SubmenuItem[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/bookmark', label: 'Bookmark', authOnly: true },
  { href: '/profile', label: 'Profile' },
  { href: '/add-a-project', label: 'Add A Project', authOnly: true },
  { href: '/projects', label: 'Projects Page' },
  { href: '/portfolio-sorting', label: 'Portfolio Sorting', authOnly: true, investorOnly: true },
  { href: '/crowdfunding-single', label: 'Crowdfunding Single' }
];

const foundationSubmenu: SubmenuItem[] = [
  { href: '/foundation/about', label: 'About' },
  { href: '/foundation/company-overview', label: 'Company Overview' },
  { href: '/foundation/team-member', label: 'Team Member' },
  { href: '/foundation/testimonials', label: 'Testimonials' },
  { href: '/foundation/pricing', label: 'Pricing' },
  { href: '/foundation/gallery', label: 'Gallery' },
  { href: '/foundation/careers', label: 'Careers' },
  { href: '/foundation/our-partner', label: 'Our Partner' },
  { href: '/foundation/our-awards', label: 'Our Awards' },
  { href: '/contact-us', label: 'Contact Us' }
];

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Explore', submenu: exploreSubmenu },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/foundation', label: 'Foundation', submenu: foundationSubmenu }
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isAuthenticated = status === 'authenticated' && !!session?.user?.id;
  const isInvestor = session?.user?.role === 'INVESTOR';

  const renderMenuItem = (item: typeof navItems[number]) => {
    const hasSubmenu = !!item.submenu?.length;

    return (
      <div key={item.label} className="relative group">
        <Link
          href={item.href}
          className={`inline-flex items-center gap-1 text-sm font-medium transition ${
            theme === 'dark' ? 'text-slate-300 hover:text-brand-400' : 'text-slate-600 hover:text-brand-600'
          }`}
        >
          {item.label}
          {hasSubmenu ? <span className="text-xs">▾</span> : null}
        </Link>

        {hasSubmenu ? (
          <div className={`absolute left-0 top-full z-50 mt-0 hidden min-w-[220px] rounded-3xl border bg-white p-3 shadow-lg shadow-slate-900/5 transition duration-150 group-hover:block dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20 ${
            theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
          }`}>
            {item.submenu?.map((submenuItem) => {
              if (submenuItem.authOnly && !isAuthenticated) return null;
              if (submenuItem.investorOnly && !isInvestor) return null;

              return (
                <Link
                  key={submenuItem.href}
                  href={submenuItem.href}
                  className="block rounded-2xl px-4 py-2 text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-brand-300"
                >
                  {submenuItem.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${
      theme === 'dark' ? 'border-slate-800/80 bg-secondary' : 'border-slate-200/80 bg-white/90'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className={`flex items-center gap-3 font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            <span className={`rounded-2xl ${theme === 'dark' ? 'bg-white p-1' : ''}`}>
              <img src="/investorskittylogo.png" alt="Investors Kitty Logo" className="h-10 w-auto" />
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-brand-400 md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle mobile menu"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>

        <nav className="hidden items-center gap-8 md:flex">{navItems.map(renderMenuItem)}</nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  theme === 'dark'
                    ? 'border-slate-600 bg-secondary text-white hover:border-brand-500 hover:text-brand-400'
                    : 'border-slate-300 bg-white text-slate-900 hover:border-brand-500 hover:text-brand-600'
                }`}
                onClick={() => signOut({ callbackUrl: '/sign-in' })}
              >
                Logout
              </button>
              <Link
                href="/profile"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  theme === 'dark'
                    ? 'border-slate-600 bg-secondary text-white hover:border-brand-500 hover:text-brand-400'
                    : 'border-slate-300 bg-white text-slate-900 hover:border-brand-500 hover:text-brand-600'
                }`}
              >
                My Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  theme === 'dark'
                    ? 'border-slate-600 bg-secondary text-white hover:border-brand-500 hover:text-brand-400'
                    : 'border-slate-300 bg-white text-slate-900 hover:border-brand-500 hover:text-brand-600'
                }`}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  theme === 'dark'
                    ? 'border-slate-600 bg-secondary text-white hover:border-brand-500 hover:text-brand-400'
                    : 'border-slate-300 bg-white text-slate-900 hover:border-brand-500 hover:text-brand-600'
                }`}
              >
                Sign up
              </Link>
            </>
          )}
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

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <div className="space-y-3">
            {navItems.map((item) =>
              item.submenu ? (
                <details
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.label}
                  </summary>
                  <div className="mt-3 space-y-2">
                    {item.submenu.map((submenuItem) => {
                      if (submenuItem.authOnly && !isAuthenticated) return null;
                      if (submenuItem.investorOnly && !isInvestor) return null;
                      return (
                        <Link
                          key={submenuItem.href}
                          href={submenuItem.href}
                          className="block rounded-2xl px-3 py-2 text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-300"
                          onClick={() => setMobileOpen(false)}
                        >
                          {submenuItem.label}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-3xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    onClick={() => {
                      signOut({ callbackUrl: '/sign-in' });
                      setMobileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                  <Link
                    href="/profile"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
