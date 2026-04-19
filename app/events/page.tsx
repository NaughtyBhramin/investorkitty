import { Button } from '@/components/ui/button';

const sampleEvents = [
  {
    id: 1,
    title: 'Tech Startup Pitch Night',
    date: '2024-05-15',
    time: '7:00 PM EST',
    location: 'Virtual',
    description: 'Join us for an exciting evening of pitches from promising tech startups seeking Series A funding.',
    type: 'Pitch Event'
  },
  {
    id: 2,
    title: 'Investor Roundtable: AI & Machine Learning',
    date: '2024-05-20',
    time: '2:00 PM EST',
    location: 'New York, NY',
    description: 'Network with top investors focused on AI and ML investments. Perfect for founders in these sectors.',
    type: 'Networking'
  },
  {
    id: 3,
    title: 'Deal Announcement: GreenTech Funding Round',
    date: '2024-05-10',
    time: '10:00 AM EST',
    location: 'Online',
    description: 'EcoInnovate announces $5M Series A round led by leading climate tech investors.',
    type: 'Deal Announcement'
  },
  {
    id: 4,
    title: 'Healthcare Innovation Showcase',
    date: '2024-05-25',
    time: '6:00 PM EST',
    location: 'Boston, MA',
    description: 'Showcase of breakthrough healthcare startups presenting to a curated group of investors.',
    type: 'Showcase'
  }
];

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">
              Events & Deal Announcements
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Discover new fundraising opportunities, upcoming deal announcements, and investor events curated by InvestorsKitty.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sampleEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                      {event.title}
                    </h3>
                    <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                      {event.type}
                    </span>
                  </div>
                  <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                    <div>{new Date(event.date).toLocaleDateString()}</div>
                    <div>{event.time}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4">
                  <Button>Learn More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events CTA */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center space-y-4">
            <div className="text-4xl">📅</div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Stay Updated</h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              New events and deal announcements are added regularly. Sign up for notifications to never miss an opportunity.
            </p>
            <Button>Subscribe to Updates</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
