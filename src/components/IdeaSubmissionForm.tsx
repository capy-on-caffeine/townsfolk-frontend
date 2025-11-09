'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { IdeaStatusListener } from '@/components/IdeaStatusListener';
import { ApiClient } from '@/utils/api';

interface IdeaFormData {
  title: string;
  description: string;
  target_audience: string;
  mvpLink?: string;
}

export function IdeaSubmissionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<IdeaFormData>({
    title: '',
    description: '',
    target_audience: '',
    mvpLink: '',
  });

  // Initialize token from localStorage on client-side only
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      console.error('No auth token available');
      return;
    }
    
    setLoading(true);
    const generatedThreadId = "6846d52c-295a-4805-9200-7bd81f365a65";
    // const generatedThreadId = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    //   ? crypto.randomUUID()
    //   : '6846d52c-295a-4805-9200-7bd81f365a65';

    
    try {
      // First create a run
      // First create a thread if it doesn't exist
      const createThreadResponse = await fetch(`/api/proxy?path=/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });

      if (!createThreadResponse.ok) {
        throw new Error('Failed to create thread');
      }

      const threadData = await createThreadResponse.json();
      const actualThreadId = threadData.id || generatedThreadId;

      // Now create a run
      const payload = {
        assistant_id: "2803ab92-38c4-509a-a3f8-481003ff6437",
        model: "gpt-4-1106-preview",
        instructions: "Generate personas based on the provided idea",
        tools: [],
        metadata: {
          ...formData,
          number: 3,
          collection_name: "Personas",
          personas_db_name: "persona",
          persona: [],
          current_persona: null,
          generated_count: 0,
          status: "pending"
        }
      };

      console.log(payload);
      

      const createRunResponse = await fetch(`/api/proxy?path=/threads/${actualThreadId}/runs/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      // Read the streaming body, accumulate text, and monkey-patch .text() so later code can still call it
      if (createRunResponse.body) {
        const reader = createRunResponse.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulated = '';

        while (!done) {
          const { value, done: d } = await reader.read();
          done = !!d;
          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            accumulated += chunk;
            // handle incremental chunk processing here (e.g. update UI)
            console.log('stream chunk:', chunk);
          }
        }

        // Make createRunResponse.text() return the accumulated text for the later code path
        (createRunResponse as any).text = async () => accumulated;
      } else {
        console.warn('Response has no body stream to read.');
      }
      

      const responseText = await createRunResponse.text();
      let runData;
      try {
        runData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', responseText);
        throw new Error('Invalid response from server');
      }

      if (!createRunResponse.ok || !runData.id) {
        throw new Error(runData.error || 'Failed to create run');
      }

      // Set up thread and run IDs for status tracking
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeThreadId', actualThreadId);
        localStorage.setItem('activeRunId', runData.id);
      }
      setThreadId(actualThreadId);
      
    } catch (error) {
      console.error('Error in submission process:', error);
      // Reset thread ID if there was an error
      setThreadId(null);
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

      {/* Show status overlay when thread is created */}
      {threadId && token && <IdeaStatusListener threadId={threadId} />}
    </motion.form>
  );
}