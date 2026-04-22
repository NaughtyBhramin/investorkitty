'use client';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/90 px-4 py-10 text-slate-600 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90 dark:text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">InvestorsKitty</p>
          <p className="text-sm">Match founders, investors, and syndicate deals with confidence.</p>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} InvestorsKitty. Built for founders, investors, and admins.<br/> Developed by <a href="https://www.meloitte.com/" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300">Meloitte</a></p>
      </div>
    </footer>
  );
}
