import { SectionPage } from '@/components/shared/section-page';

export default function PricingPage() {
  return (
    <SectionPage
      title="Pricing"
      description="See how InvestorsKitty supports founders and investors with transparent platform access and service tiers."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          This page explains pricing for premium marketplace access, campaign promotion, and investor syndicate tools.
        </p>
      </div>
    </SectionPage>
  );
}
