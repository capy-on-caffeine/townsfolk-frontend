'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { ApiClient } from '@/utils/api';
import { Idea as ImportedIdea } from '@/types/idea';

interface DashboardIdea extends Omit<ImportedIdea, 'status'> {
  status: 'pending' | 'generating' | 'completed' | 'failed';
}
import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';
import { IdeaStatusListener } from '@/components/IdeaStatusListener';

function DashboardContent() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<DashboardIdea[]>([]);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true);

  // Check for active thread ID in localStorage
  const [activeThreadId, setActiveThreadId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeThreadId');
    }
    return null;
  });

  // Convert API status to dashboard status
  const convertStatus = (status: ImportedIdea['status']): DashboardIdea['status'] => {
    if (status === 'processing') return 'generating';
    return status as DashboardIdea['status'];
  };

  // Load ideas
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const result = await ApiClient.getIdeas();
        setIdeas(result.ideas.map(idea => ({
          ...idea,
          status: convertStatus(idea.status)
        })));
      } catch (error) {
        console.error('Error loading ideas:', error);
      } finally {
        setIsLoadingIdeas(false);
      }
    };

    loadIdeas();
  }, []);

  // Clear active thread when persona generation is complete
  useEffect(() => {
    const personas = localStorage.getItem('generated_personas');
    if (personas && activeThreadId) {
      localStorage.removeItem('activeThreadId');
      setActiveThreadId(null);
      
      // Refresh ideas list to show updated status
      const loadIdeas = async () => {
        try {
          const result = await ApiClient.getIdeas();
          setIdeas(result.ideas.map(idea => ({
            ...idea,
            status: convertStatus(idea.status)
          })));
        } catch (error) {
          console.error('Error refreshing ideas:', error);
        }
      };
      loadIdeas();
    }
  }, [activeThreadId]);

  // Handle retrying failed idea generation
  const handleRequeueIdea = async (id: string) => {
    try {
      await ApiClient.requeueIdea(id);
      const result = await ApiClient.getIdeas();
      setIdeas(result.ideas.map(idea => ({
        ...idea,
        status: convertStatus(idea.status)
      })));
    } catch (error) {
      console.error('Error requeueing idea:', error);
    }
  };

  // Refresh ideas list periodically when there's an active generation
  useEffect(() => {
    if (activeThreadId) {
      const interval = setInterval(async () => {
        try {
          const result = await ApiClient.getIdeas();
          setIdeas(result.ideas.map(idea => ({
            ...idea,
            status: convertStatus(idea.status)
          })));
        } catch (error) {
          console.error('Error refreshing ideas:', error);
        }
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [activeThreadId]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Ideas</h1>
          <Button onClick={() => router.push('/ideas/new')}>
            Submit New Idea
          </Button>
        </div>

        {isLoadingIdeas ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-t-2 border-[#9b0e0e] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading ideas...</p>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400 mb-4">You haven't submitted any ideas yet.</p>
            <Button onClick={() => router.push('/ideas/new')}>
              Submit Your First Idea
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea: DashboardIdea) => (
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

      {/* Show status overlay when there's an active thread */}
      {activeThreadId && <IdeaStatusListener threadId={activeThreadId} />}
    </>
  );
}

// Main component wrapper to handle authentication
export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-t-2 border-[#9b0e0e] rounded-full animate-spin" />
      </div>
    );
  }

  return <DashboardContent />;
}