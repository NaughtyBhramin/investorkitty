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
          <a
            href="https://wa.me/919876543210?text=Hi%20InvestorsKitty%2C%20I%20need%20support"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Support"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
              theme === 'dark'
                ? 'border-green-600 bg-green-900/20 text-green-400 hover:border-green-500'
                : 'border-green-300 bg-green-50 text-green-600 hover:border-green-500'
            }`}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.411-2.392-1.476-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.514.857-2.752 2.236-3.558 3.862-1.604 3.12-.472 6.75 1.635 8.73 1.17 1.024 2.688 1.678 4.32 1.885 1.632.207 3.318-.026 4.861-.999 2.516-1.694 4.155-4.532 4.113-7.635-.023-1.88-.635-3.646-1.733-5.148-1.098-1.502-2.684-2.659-4.487-3.038z"/>
            </svg>
          </a>
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
                  <Link
                    href="/profile"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Profile
                  </Link>
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
              <a
                href="https://wa.me/919876543210?text=Hi%20InvestorsKitty%2C%20I%20need%20support"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Support"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-green-300 bg-green-50 text-green-600 transition hover:border-green-500 dark:border-green-600 dark:bg-green-900/20 dark:text-green-400"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.411-2.392-1.476-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.514.857-2.752 2.236-3.558 3.862-1.604 3.12-.472 6.75 1.635 8.73 1.17 1.024 2.688 1.678 4.32 1.885 1.632.207 3.318-.026 4.861-.999 2.516-1.694 4.155-4.532 4.113-7.635-.023-1.88-.635-3.646-1.733-5.148-1.098-1.502-2.684-2.659-4.487-3.038z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
