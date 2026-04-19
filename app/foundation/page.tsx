import Link from 'next/link';
import { SectionPage } from '@/components/shared/section-page';

const foundationPages = [
  { title: 'About', href: '/foundation/about' },
  { title: 'Company Overview', href: '/foundation/company-overview' },
  { title: 'Team Member', href: '/foundation/team-member' },
  { title: 'Testimonials', href: '/foundation/testimonials' },
  { title: 'Pricing', href: '/foundation/pricing' },
  { title: 'Gallery', href: '/foundation/gallery' },
  { title: 'Careers', href: '/foundation/careers' },
  { title: 'Our Partner', href: '/foundation/our-partner' },
  { title: 'Our Awards', href: '/foundation/our-awards' }
];

export default function FoundationPage() {
  return (
    <SectionPage
      title="Foundation"
      description="Explore the core foundation pages for InvestorsKitty, including company positioning, team, and support resources."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {foundationPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </SectionPage>
  );
}
