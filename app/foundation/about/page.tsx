import { SectionPage } from '@/components/shared/section-page';

export default function FoundationAboutPage() {
  return (
    <SectionPage
      title="About InvestorsKitty"
      description="Learn the mission behind InvestorsKitty and how we connect founders, investors, and fundraisers."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          InvestorsKitty is built to make fundraising more transparent and efficient. We help founders find the right investor matches and provide investors with curated opportunities.
        </p>
      </div>
    </SectionPage>
  );
}
