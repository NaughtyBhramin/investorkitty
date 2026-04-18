import './globals.css';
import type { Metadata } from 'next';
import Providers from './providers';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'InvestorsKitty | Startup fundraising marketplace',
  description: 'InvestorsKitty connects founders, businesses and investors with curated matchmaking, messaging, and deal tracking.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-secondary dark:text-white">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
