'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { ApiClient } from '@/utils/api';
import { Idea } from '@/types/idea';
import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const result = await ApiClient.getIdeas();
        setIdeas(result.ideas);
      } catch (error) {
        console.error('Error loading ideas:', error);
      } finally {
        setIsLoadingIdeas(false);
      }
    };

    if (isAuthenticated) {
      loadIdeas();
    }
  }, [isAuthenticated]);

  const handleRequeueIdea = async (id: string) => {
    try {
      await ApiClient.requeueIdea(id);
      // Refresh ideas list
      const result = await ApiClient.getIdeas();
      setIdeas(result.ideas);
    } catch (error) {
      console.error('Error requeueing idea:', error);
    }
  };

  if (isLoading || !isAuthenticated) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Ideas</h1>
        <Button onClick={() => router.push('/ideas/new')}>
          Submit New Idea
        </Button>
      </div>

      {isLoadingIdeas ? (
        <div className="text-center">Loading ideas...</div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-400 mb-4">You haven't submitted any ideas yet.</p>
          <Button onClick={() => router.push('/ideas/new')}>
            Submit Your First Idea
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-black/20 backdrop-blur rounded-lg border border-white/10 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{idea.title}</h3>
                <StatusBadge status={idea.status} />
              </div>
              <p className="text-gray-300 mb-4 line-clamp-3">{idea.description}</p>
              <p className="text-sm text-gray-400 mb-4">
                Target Audience: {idea.targetAudience}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="secondary" 
                  onClick={() => router.push(`/ideas/${idea._id}`)}
                >
                  View Details
                </Button>
                {idea.status === 'failed' && (
                  <Button
                    onClick={() => handleRequeueIdea(idea._id)}
                  >
                    Retry
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}