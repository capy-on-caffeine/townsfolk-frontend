'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { JsonViewer } from '@/components/JsonViewer';

interface IdeaFormData {
  title: string;
  description: string;
  target_audience: string;
  mvpLink?: string;
}

export function IdeaSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [formData, setFormData] = useState<IdeaFormData>({
    title: '',
    description: '',
    target_audience: '',
    mvpLink: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const threadId = crypto.randomUUID();
      
      // Call our new /api/proxy/invoke endpoint
      const response = await fetch('/api/ideas/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thread_id: threadId,
          title: formData.title,
          description: formData.description,
          target_audience: formData.target_audience,
          number: 2,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit idea');
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error in submission process:', error);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Idea Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Enter your idea title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Describe your idea in detail"
        />
      </div>

      <div>
        <label htmlFor="target_audience" className="block text-sm font-medium text-gray-300 mb-2">
          Target Audience
        </label>
        <input
          type="text"
          id="target_audience"
          required
          value={formData.target_audience}
          onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Who is this idea for?"
        />
      </div>

      <div>
        <label htmlFor="mvp_link" className="block text-sm font-medium text-gray-300 mb-2">
          MVP/Demo Link (Optional)
        </label>
        <input
          type="url"
          id="mvp_link"
          value={formData.mvpLink}
          onChange={(e) => setFormData(prev => ({ ...prev, mvpLink: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Starting...' : 'Submit Idea'}
      </Button>

      {/* Show JSON response when available */}
      {response && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Response:</h2>
          <JsonViewer data={response} />
        </div>
      )}
    </motion.form>
  );
}