import { SectionPage } from '@/components/shared/section-page';

export default function TestimonialsPage() {
  return (
    <SectionPage
      title="Testimonials"
      description="Read testimonials from founders and investors who have used InvestorsKitty."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          Testimonials demonstrate how our marketplace simplifies fundraising, improves investor sourcing, and accelerates deal momentum.
        </p>
      </div>
    </SectionPage>
  );
}
