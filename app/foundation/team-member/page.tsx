import { SectionPage } from '@/components/shared/section-page';

export default function TeamMemberPage() {
  return (
    <SectionPage
      title="Team Members"
      description="Meet the founders and team members powering InvestorsKitty."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          This page highlights the people behind InvestorsKitty, including leadership, operations, and product teams supporting entrepreneurs and investors.
        </p>
      </div>
    </SectionPage>
  );
}
