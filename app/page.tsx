import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Startup discovery',
    description: 'Find investors and startups with smart filters, industry tags, and pitch matching.'
  },
  {
    title: 'Mutual matchmaking',
    description: 'Investors and founders connect only when both parties express interest.'
  },
  {
    title: 'Secure deal chat',
    description: 'Real-time messaging and file sharing keep investment conversations in one place.'
  },
  {
    title: 'Analytics dashboard',
    description: 'Track views, matches, progress stages, and syndicate opportunities.'
  }
];

const categories = [
  {
    title: 'Real Estate',
    description: 'Residential Projects',
    icon: '🏠',
  },
  {
    title: 'Hotel & Resorts',
    description: 'Hospitality Ventures',
    icon: '🏢',
  },
  {
    title: 'Online Store',
    description: 'E-commerce Businesses',
    icon: '🛒',
  },
  {
    title: 'Education',
    description: 'School, College & University',
    icon: '📚',
  },
  {
    title: 'Technology',
    description: 'App & Software',
    icon: '⚡',
  },
  {
    title: 'Fashion & Brands',
    description: 'Fashion & Other Brands',
    icon: '👕',
  },
  {
    title: 'Video & Films',
    description: 'Media & Production',
    icon: '🎬',
  },
  {
    title: 'Medical & Health',
    description: 'Healthcare Ventures',
    icon: '❤️',
  },
  {
    title: 'Art & Designing',
    description: 'Creative Services',
    icon: '🎨',
  },
  {
    title: 'Food Business',
    description: 'Restaurants & Cloud Kitchen',
    icon: '🍔',
  },
  {
    title: 'Farm & Eco Tourism',
    description: 'Farm Stay & Camping',
    icon: '📈',
  },
  {
    title: 'Other Business',
    description: 'Other Categories',
    icon: '🤝',
  }
];

const projects = [
  {
    title: 'Self Driving Robot for Target Shooting Game',
    category: 'Design & Tech',
    goal: '₹15,000',
    raised: '₹0',
    daysLeft: 0,
  },
  {
    title: 'Scan the Reality into the 3D Digital World',
    category: 'Video & Films',
    goal: '₹20,000',
    raised: '₹0',
    daysLeft: 0,
  },
  {
    title: 'Alva: The Universal Hands-free Lighting Solution',
    category: 'Design & Tech',
    goal: '₹25,000',
    raised: '₹0',
    daysLeft: 213,
  },
  {
    title: 'A Unique Analog-Hybrid Monophonic Synthesizer',
    category: 'Video & Films',
    goal: '₹18,000',
    raised: '₹0',
    daysLeft: 182,
  }
];

const benefits = [
  {
    title: 'Professional and Certified',
    description: 'Our platform is supported by professional and certified officers who verify all investor and venture profiles.'
  },
  {
    title: 'Millions in Funding',
    description: 'We showcase profiles that have secured millions in funding and connect high-potential ventures with seasoned investors.'
  }
];

const blogPosts = [
  {
    title: 'A day in the life of entrepreneur & CEO',
    date: 'Dec 08',
    author: 'investorskitty@gmail.com',
    comments: 3
  },
  {
    title: 'Future where technology creates good jobs',
    date: 'Dec 08',
    author: 'investorskitty@gmail.com',
    comments: 0
  },
  {
    title: 'What you do today can improve your tomorrows',
    date: 'Dec 08',
    author: 'investorskitty@gmail.com',
    comments: 0
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:shadow-emerald-900">
              Shape Your Vision with Confidence
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                Invest in bold founders, build smarter syndicates, and track every deal with InvestorsKitty.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                A founder/investor marketplace designed for early-stage startups, real investors, and admin-led growth with pitch rooms, smart notifications, and deal status tracking.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/sign-in">
                <Button>Start with sign in</Button>
              </Link>
              <Link href="/register" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
                Create an account →
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-brand-500/10 to-white dark:from-brand-500/10 dark:to-slate-900">
              <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">InvestorsKitty dashboard</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">One platform for founders, investors, and admins</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">Manage your startup profile, match with investors, schedule meetings, and track progress on a single secure portal.</p>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Explore Categories</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Investment opportunities across diverse industries</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.title} href="#">
                <Card className="group relative overflow-hidden border border-slate-200 bg-white p-8 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4 inline-flex text-4xl">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 opacity-0 transition-opacity group-hover:opacity-5 dark:from-brand-400 dark:to-brand-500" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About & Stats Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">What We Do</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
                We help present projects to the right investors
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              Welcome to Investors Kitty, where boundless opportunities await both investors and those seeking investment. Our platform is designed to seamlessly connect investors with promising ventures, making it easier for both parties to collaborate and achieve successful outcomes. At Investors Kitty, we believe in fostering growth and prosperity through effortless and fruitful partnerships.
            </p>
            <div className="flex items-center gap-6 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Non-Profit Crowdfunding Agency</h4>
              </div>
            </div>
            <div className="flex items-center gap-6 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">We're a Successful Institute</h4>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6 rounded-lg bg-gradient-to-br from-brand-100 to-brand-50 p-8 dark:from-brand-950 dark:to-brand-900">
              <div className="text-center">
                <span className="text-6xl">📊</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h4 className="text-2xl font-bold text-brand-600 dark:text-brand-400">66,800+</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Projects Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Popular projects</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Explore Our Ventures</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-brand-100 to-slate-100 dark:from-brand-900 dark:to-slate-900" />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-brand-600 dark:text-brand-400">{project.category}</p>
                  <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Raised:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{project.raised}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div className="h-full w-0 rounded-full bg-brand-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Goal:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{project.goal}</span>
                    </div>
                    <div className="pt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                      {project.daysLeft} Days Left
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Insights Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
         <Card className="border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 dark:border-slate-700 dark:from-slate-950 dark:to-slate-900">
            <span className="text-4xl">🏆</span>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Get Funding And Support</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              At Investors Kitty, securing funding and support is seamless and straightforward. Connect with a diverse range of investors and access the resources you need to bring your venture to life.
            </p>
            <Link href="/contact-us">
              <Button className="mt-6">Get Free Quote</Button>
            </Link>
          </Card>
          <Card className="border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 dark:border-slate-700 dark:from-slate-950 dark:to-slate-900">
            <span className="text-4xl">📈</span>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Access Data And Insights</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Gain unparalleled access to comprehensive data and valuable insights. Stay ahead of trends with in-depth analysis and expert guidance to make informed investment decisions.
            </p>
            <Link href="/projects">
              <Button className="mt-6" variant="secondary">
                Explore Data
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Businesses You Can Back</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
                Why Choose Investors Kitty Platform
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              Your gateway to a world of boundless investment opportunities. Our platform is designed to seamlessly connect investors with diverse ventures across various industries.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{benefit.title}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-brand-100 to-slate-100 p-8 dark:from-brand-900 dark:to-slate-900">
              <div className="flex h-full items-center justify-center">
                <span className="text-8xl">👥</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Latest News & Blog</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Get Every Update</h2>
            </div>
            <Link href="/news" className="text-sm font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
              View All Posts →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800" />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      👤 {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      💬 {post.comments}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{post.title}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{post.date}</span>
                    <Link href="#" className="text-sm font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                      Read more →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-gradient-to-r from-brand-50 to-blue-50 p-12 text-center dark:border-slate-700 dark:from-brand-950 dark:to-blue-950">
          <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Not a Member Yet?</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Join us and unlock a world of fascinating opportunities. Access the premier portal for making and securing investments across diverse industries.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
