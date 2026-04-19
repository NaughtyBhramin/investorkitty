import Link from 'next/link';
import { SectionPage } from '@/components/shared/section-page';
import { Button } from '@/components/ui/button';

export default function ContactUsPage() {
  return (
    <SectionPage
      title="Contact Us"
      description="Reach out to InvestorsKitty for support, partnership inquiries, or questions about fundraising and project discovery."
    >
      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <p>
          Have a question about your account, need help with your campaign, or want to speak with our team? Use the contact information below to get in touch.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">General support</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">support@investorskitty.com</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">Office locations</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Delhi · Noida · Mumbai · Goa</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="mailto:support@investorskitty.com"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            Email support
          </a>
          <Link href="/sign-in" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
            Sign in to manage your profile
          </Link>
        </div>
      </div>
    </SectionPage>
  );
}
