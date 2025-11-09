'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { ApiClient } from '@/utils/api';
import { Idea, IdeaFeedback } from '@/types/idea';
import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';

export default function IdeaDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, isLoading } = useAuth0();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [isLoadingIdea, setIsLoadingIdea] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // useEffect(() => {
  useEffect(() => {
    const loadIdea = async () => {
      try {
        // First try to read a locally cached invoke result saved by the
        // frontend when the upstream invoke returns quickly. This allows
        // the detail page to show immediate results even if the backend
        // hasn't persisted the idea to the DB yet.
        const cached = typeof window !== 'undefined' ? localStorage.getItem(`idea_result_${id}`) : null;
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            // Map parsed invoke response to our Idea shape
            const personas = parsed.personas || parsed.persona || [];
            const aiFeedback = personas.map((p: any, idx: number) => ({
              personaId: p.id || p.name || `${id}-p-${idx}`,
              personaType: p.type || 'Persona',
              personaProfile: `${p.name || ''}${p.age ? `, ${p.age}` : ''}${p.occupation ? ` — ${p.occupation}` : ''}${p.bio ? `\n${p.bio}` : ''}`,
              feedback: p.feedback || '',
            }));

            const mapped: any = {
              _id: parsed.thread_id || id,
              title: parsed.title || parsed.name || 'Untitled',
              description: parsed.description || '',
              targetAudience: parsed.target_audience || parsed.targetAudience || '',
              mvpLink: parsed.mvp_link || parsed.mvpLink || '',
              status: parsed.status === 'completed' ? 'completed' : parsed.status || 'processing',
              aiFeedback,
              jobId: parsed.job_id || parsed.jobId,
              createdAt: parsed.created_at || new Date().toISOString(),
              updatedAt: parsed.updated_at || new Date().toISOString(),
            };

            setIdea(mapped as any);
            setIsLoadingIdea(false);
            // Continue and try to refresh from API to get canonical DB state
          } catch (e) {
            console.warn('Failed to parse cached idea result', e);
          }
        }

        if (isAuthenticated && id) {
          try {
            const data = await ApiClient.getIdea(id as string);
            setIdea(data);
          } catch (error) {
            console.error('Error loading idea from API:', error);
          } finally {
            setIsLoadingIdea(false);
          }
        }
      } catch (error) {
        console.error('Error loading idea:', error);
        setIsLoadingIdea(false);
      }
    };

    if (isAuthenticated && id) {
      loadIdea();
    }
  }, [id, isAuthenticated]);

  const handleRequeue = async () => {
    if (!idea) return;
    
    // try {
    //   const updatedIdea = await ApiClient.requeueIdea(idea._id);
    //   setIdea(updatedIdea);
    // } catch (error) {
    //   console.error('Error requeueing idea:', error);
    // }
  };

  if (isLoading || !isAuthenticated) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isLoadingIdea) {
    return <div className="flex justify-center items-center min-h-screen">Loading idea...</div>;
  }

  if (!idea) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Idea not found</h1>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{idea.title}</h1>
          <div className="flex items-center gap-4">
            <StatusBadge status={idea.status} />
            <span className="text-sm text-gray-400">
              Submitted on {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Button onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="bg-black/20 backdrop-blur rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Idea Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Description</h3>
                <p className="mt-1">{idea.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Target Audience</h3>
                <p className="mt-1">{idea.targetAudience}</p>
              </div>
              {idea.mvpLink && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400">MVP/Demo Link</h3>
                  <a 
                    href={idea.mvpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-[#9b0e0e] hover:underline"
                  >
                    {idea.mvpLink}
                  </a>
                </div>
              )}
            </div>
          </section>

          {(idea.status === 'failed' || idea.status === 'completed') && (
            <div className="flex justify-end">
              <Button
                onClick={handleRequeue}
                disabled={false}
              >
                Generate New Feedback
              </Button>
            </div>
          )}
        </div>

        <div>
          <section className="bg-black/20 backdrop-blur rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">AI Persona Feedback</h2>
            {idea.status === 'completed' && idea.aiFeedback?.length > 0 ? (
              <div className="space-y-6">
                {idea.aiFeedback.map((feedback: IdeaFeedback) => (
                  <div 
                    key={feedback.personaId}
                    className="pb-6 border-b border-white/10 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{feedback.personaType}</h3>
                        <p className="text-sm text-gray-400">{feedback.personaProfile}</p>
                      </div>
                      {feedback.rating && (
                        <div className="text-lg font-medium">
                          {feedback.rating}/10
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300">{feedback.feedback}</p>
                  </div>
                ))}
              </div>
            ) : idea.status === 'failed' ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">Failed to generate feedback</p>
                <Button onClick={handleRequeue}>
                  Try Again
                </Button>
              </div>
            ) : idea.status === 'processing' || idea.status === 'pending' ? (
              <div className="text-center py-8">
                <p className="text-gray-400 animate-pulse">Generating AI feedback...</p>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}