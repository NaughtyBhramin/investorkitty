'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardProfileEditor } from '@/components/dashboard/profile-editor';
import { MatchSummaryCard } from '@/components/dashboard/match-summary';
import { Button } from '@/components/ui/button';

function BusinessListingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    companyName: '',
    headline: '',
    description: '',
    stage: 'IDEA',
    fundingGoal: '',
    equityOffered: '',
    industries: '',
    location: '',
    website: '',
    pitchDeckUrl: '',
    images: [] as File[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to create business listing
    console.log('Submitting business listing:', formData);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Your Company Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Stage *
          </label>
          <select
            required
            value={formData.stage}
            onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="IDEA">Idea</option>
            <option value="POC">Proof of Concept</option>
            <option value="MVP">MVP</option>
            <option value="GROWTH">Growth</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Headline *
        </label>
        <input
          type="text"
          required
          value={formData.headline}
          onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          placeholder="Brief description of your business"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          placeholder="Detailed description of your business, market opportunity, and traction"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Funding Goal (₹) *
          </label>
          <input
            type="number"
            required
            value={formData.fundingGoal}
            onChange={(e) => setFormData(prev => ({ ...prev, fundingGoal: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="5000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Equity Offered (%) *
          </label>
          <input
            type="number"
            required
            min="1"
            max="100"
            value={formData.equityOffered}
            onChange={(e) => setFormData(prev => ({ ...prev, equityOffered: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Industries *
          </label>
          <input
            type="text"
            required
            value={formData.industries}
            onChange={(e) => setFormData(prev => ({ ...prev, industries: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Fintech, Healthtech, etc. (comma separated)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Pitch Deck URL
          </label>
          <input
            type="url"
            value={formData.pitchDeckUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, pitchDeckUrl: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="https://drive.google.com/..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Business Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Upload up to 5 images of your product, team, or business (max 5MB each)
        </p>
        {formData.images.length > 0 && (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {formData.images.length} image(s) selected
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          Create Listing
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function SeekerDashboard() {
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        {/* Header with Add Business Button */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Founder Dashboard</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Manage your startup profile, track investor interest, and create business listings.
              </p>
            </div>
            <Button onClick={() => setShowBusinessForm(true)}>
              Add Business Listing
            </Button>
          </div>
        </div>

        {/* Business Listing Form Modal */}
        {showBusinessForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-lg dark:border-slate-800/80 dark:bg-secondary">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Create Business Listing</h2>
                  <button
                    onClick={() => setShowBusinessForm(false)}
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <BusinessListingForm onClose={() => setShowBusinessForm(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Profile Editor */}
        <DashboardProfileEditor />

        {/* Match Summary */}
        <MatchSummaryCard />

        {/* Analytics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Kitty Score</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">8.2</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Investor Interest</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">14</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Profile Views</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">86</p>
              </div>
              <div className="text-3xl">👁️</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800/80 dark:bg-secondary dark:shadow-slate-900/50">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { title: 'New message from Patel Capital', desc: 'Open chat to negotiate terms and share your pitch deck.', time: '2 hours ago' },
              { title: 'Meeting request from Sequoia', desc: 'Scheduled for next week - prepare your presentation.', time: '1 day ago' },
              { title: 'Profile update approved', desc: 'Your latest changes are now live on the platform.', time: '3 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800/70 dark:bg-slate-950/50">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-500"></div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">{activity.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{activity.desc}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
