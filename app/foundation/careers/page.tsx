import { SectionPage } from '@/components/shared/section-page';

export default function CareersPage() {
  return (
    <SectionPage
      title="Careers"
      description="Explore career opportunities at InvestorsKitty and join the team driving startup-investor matchmaking."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          View open roles, team culture highlights, and how we hire for growth, operations, product, and customer success.
        </p>
      </div>
    </SectionPage>
  );
}
