'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { IdeaStatusListener } from '@/components/IdeaStatusListener';
import { ApiClient } from '@/utils/api';

interface IdeaFormData {
  title: string;
  description: string;
  targetAudience: string;
  mvpLink?: string;
}

export function IdeaSubmissionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [formData, setFormData] = useState<IdeaFormData>({
    title: '',
    description: '',
    targetAudience: '',
    mvpLink: '',
  });

  const startPersonaGeneration = async (formData: IdeaFormData) => {
    const generatedThreadId = "b1413bd1-5a70-4bfc-9e92-434c1b6f694e"; // In production, this should be generated on the server
    
    const payload = {
      assistant_id: "2803ab92-38c4-509a-a3f8-481003ff6437",
      input: {
        ...formData,
        number: 3,
        collection_name: "Personas",
        personas_db_name: "persona",
        persona: [],
        current_persona: null,
        generated_count: 0,
        status: "pending"
      },
      config: {
        configurable: {
          thread_id: generatedThreadId,
          assistant_id: "2803ab92-38c4-509a-a3f8-481003ff6437",
          graph_id: "my_agent"
        }
      },
      stream_mode: ["values"]
    };

    try {
      // First, initiate the request
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/proxy?path=/threads/${generatedThreadId}/runs/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to start persona generation');
      }

      // Set the threadId to trigger the status listener
      localStorage.setItem('activeThreadId', generatedThreadId);
      setThreadId(generatedThreadId);

      // Navigate to dashboard
    //   router.push('/dashboard');

    } catch (error) {
      console.error('Error starting persona generation:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First submit the idea and get back the created idea with its ID
      const createdIdea = await ApiClient.submitIdea(formData);
      
      // Then start persona generation with the idea ID
      const generatedThreadId = "b1413bd1-5a70-4bfc-9e92-434c1b6f694e";
      const token = localStorage.getItem('auth_token');
      
      const payload = {
        assistant_id: "2803ab92-38c4-509a-a3f8-481003ff6437",
        input: {
          ...formData,
          idea_id: createdIdea._id,
          number: 3,
          collection_name: "Personas",
          personas_db_name: "persona",
          persona: [],
          current_persona: null,
          generated_count: 0,
          status: "pending"
        },
        config: {
          configurable: {
            thread_id: generatedThreadId,
            assistant_id: "2803ab92-38c4-509a-a3f8-481003ff6437",
            graph_id: "my_agent"
          }
        },
        stream_mode: ["values"]
      };

      const response = await fetch(`/api/proxy?path=/threads/${generatedThreadId}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to start persona generation');
      }

      // Set up the thread ID for status tracking
      localStorage.setItem('activeThreadId', generatedThreadId);
      setThreadId(generatedThreadId);
      
      // Finally, navigate to dashboard
    //   router.push('/dashboard');
    } catch (error) {
      console.error('Error in submission process:', error);
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
          value={formData.targetAudience}
          onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
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
      {threadId && <IdeaStatusListener threadId={threadId} />}
    </motion.form>
  );
}