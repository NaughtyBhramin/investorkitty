import { SectionPage } from '@/components/shared/section-page';

export default function GalleryPage() {
  return (
    <SectionPage
      title="Gallery"
      description="Browse portfolio highlights and visual summaries of successful campaigns, investor events, and business showcases."
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          The gallery captures our ecosystem through featured campaigns, special events, and founder success stories.
        </p>
      </div>
    </SectionPage>
  );
}
