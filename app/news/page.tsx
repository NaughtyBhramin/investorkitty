import { Button } from '@/components/ui/button';

const sampleNews = [
  {
    id: 1,
    title: 'The Rise of AI Startups in 2024',
    excerpt: 'Exploring the trends shaping the AI investment landscape and what investors should know about emerging opportunities.',
    author: 'Sarah Chen',
    date: '2024-04-15',
    category: 'Market Trends',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'How to Build a Winning Pitch Deck',
    excerpt: 'Essential tips from successful founders on creating compelling presentations that capture investor attention.',
    author: 'Mike Johnson',
    date: '2024-04-10',
    category: 'Founder Resources',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'InvestorsKitty Platform Update: New Matching Algorithm',
    excerpt: 'We\'ve enhanced our matching system to provide more accurate investor-founder connections based on your preferences.',
    author: 'InvestorsKitty Team',
    date: '2024-04-05',
    category: 'Product Updates',
    readTime: '3 min read'
  },
  {
    id: 4,
    title: 'Sustainable Investing: The Future of Venture Capital',
    excerpt: 'How climate tech and sustainable startups are attracting record investment and reshaping the VC landscape.',
    author: 'Emma Rodriguez',
    date: '2024-03-28',
    category: 'Industry Insights',
    readTime: '6 min read'
  },
  {
    id: 5,
    title: 'From Idea to IPO: A Founder\'s Journey',
    excerpt: 'The story of how one startup went from a garage project to a successful public company.',
    author: 'David Kim',
    date: '2024-03-20',
    category: 'Success Stories',
    readTime: '10 min read'
  },
  {
    id: 6,
    title: 'Due Diligence Checklist for Angel Investors',
    excerpt: 'A comprehensive guide to evaluating startup opportunities and minimizing investment risks.',
    author: 'Lisa Thompson',
    date: '2024-03-15',
    category: 'Investor Resources',
    readTime: '7 min read'
  }
];

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">
              News & Blog
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Read the latest company news, industry commentary, and thought leadership from InvestorsKitty.
            </p>
          </div>
        </div>

        {/* Featured Article */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-r from-brand-500 to-brand-600 p-8 text-white shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:shadow-slate-900/50">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              Featured
            </span>
            <h2 className="mt-4 text-2xl font-semibold">
              {sampleNews[0].title}
            </h2>
            <p className="mt-2 text-white/90">
              {sampleNews[0].excerpt}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-white/80">
              <span>{sampleNews[0].author}</span>
              <span>•</span>
              <span>{sampleNews[0].readTime}</span>
            </div>
            <Button className="mt-6 bg-white text-brand-600 hover:bg-white/90">
              Read Article
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleNews.slice(1).map((article) => (
            <div
              key={article.id}
              className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50"
            >
              <div className="space-y-4">
                <div>
                  <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                    {article.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>

                <Button variant="secondary" className="w-full">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="text-center space-y-4">
            <div className="text-4xl">📧</div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Stay Informed</h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Get the latest news, insights, and investment opportunities delivered to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
