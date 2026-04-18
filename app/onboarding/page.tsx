import { ProfileOnboardingForm } from '@/components/onboarding/profile-onboarding-form';

export default function OnboardingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Role-based onboarding</p>
            <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Complete your InvestorKitty profile</h1>
            <p className="max-w-2xl text-slate-600 dark:text-slate-300">
              Finish your founder or investor setup so the platform can match you with the right investors, deals, and founders.
            </p>
          </div>
          <div className="mt-10">
            <ProfileOnboardingForm />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 dark:border-slate-800/80 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Why complete your profile?</h2>
            <ul className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
              <li>• Improve matching against investor interests and startup requirements.</li>
              <li>• Get better visibility in curated deals and discovery feeds.</li>
              <li>• Send richer investor outreach with updated traction and stage metrics.</li>
              <li>• Keep dashboard analytics, messages, and notifications relevant.</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/30 dark:border-slate-800/80 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Next steps</h2>
            <div className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">
              <p>1. Complete onboarding.</p>
              <p>2. Review investor / startup matches.</p>
              <p>3. Start messaging your top matches.</p>
              <p>4. Track deal progress from your dashboard.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
