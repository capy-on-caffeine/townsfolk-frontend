'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { ApiClient } from '@/utils/api';
import { Button } from '@/components/Button';

export default function NewIdea() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: '',
    mvpLink: ''
  });

  if (!isAuthenticated && !isLoading) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const idea = await ApiClient.submitIdea(formData);
      router.push(`/ideas/${idea._id}`);
    } catch (error) {
      console.error('Error submitting idea:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Submit New Idea</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Idea Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9b0e0e]"
            placeholder="Enter a clear, concise title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9b0e0e]"
            placeholder="Describe your idea in detail. What problem does it solve? How does it work?"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium mb-2">
            Target Audience
          </label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            required
            className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9b0e0e]"
            placeholder="Who is this product/service for?"
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="mvpLink" className="block text-sm font-medium mb-2">
            MVP/Demo Link (Optional)
          </label>
          <input
            type="url"
            id="mvpLink"
            name="mvpLink"
            className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9b0e0e]"
            placeholder="https://..."
            value={formData.mvpLink}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Idea'}
          </Button>
        </div>
      </form>
    </div>
  );
}