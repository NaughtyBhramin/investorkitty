import { SectionPage } from '@/components/shared/section-page';

export default function CompanyOverviewPage() {
  return (
    <SectionPage
      title="Company Overview"
      description="Review InvestorsKitty's strategy, market focus, and platform capabilities."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          This page describes our service model, the sectors we support, and the value we deliver to both founders and investors.
        </p>
      </div>
    </SectionPage>
  );
}
