'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IdeaStatus {
  message: string;
  progress: number;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

interface IdeaPayload {
  title: string;
  description: string;
  target_audience: string;
  threadId: string;
}

export function IdeaStatusListener({ threadId, title, description, target_audience }: IdeaPayload) {
  const router = useRouter();
  const [status, setStatus] = useState<IdeaStatus>({
    message: 'Starting persona generation...',
    progress: 0,
    status: 'pending'
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No auth token found');
      return;
    }

    let isPolling = true;
    let retryCount = 0;
    const MAX_RETRIES = 60; // 1 minute with 1s interval
    
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/ideas/invoke`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            thread_id: threadId,
            title,
            description,
            target_audience,
            number: 2,
            collection_name: 'Chatgpt',
            DB_name: 'persona'
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Invoke response:', data);

        if (data.status === 'completed' && (Array.isArray(data.personas) || Array.isArray(data.persona))) {
          // Normalize personas (support `personas` or `persona` naming)
          const personas = data.personas || data.persona || [];

          // Store full invoke result in localStorage keyed by thread id so
          // the detail page can show it immediately (fallback if DB isn't updated yet).
          try {
            localStorage.setItem(`idea_result_${threadId}`, JSON.stringify(data));
          } catch (e) {
            console.warn('Failed to persist idea result locally', e);
          }

          setStatus({
            message: 'Personas generated successfully!',
            progress: 100,
            status: 'completed'
          });

          // Clean up and redirect to the idea detail page where we'll show
          // the detailed info (the page will prefer DB data but fall back to
          // the local cached result while the backend persists it).
          setTimeout(() => {
            router.push(`/ideas/${threadId}`);
          }, 1500);
          isPolling = false;
          return;
        }

        // Update progress based on status
        if (data.status === 'generating') {
          setStatus(prev => ({
            message: 'Generating personas...',
            progress: Math.min(prev.progress + 10, 80),
            status: 'generating'
          }));
        }
        // If still processing, retry after delay
        // if (isPolling) {
        //   retryCount++;
        //   if (retryCount >= MAX_RETRIES) {
        //     setStatus({
        //       message: 'Generation timed out',
        //       progress: 0,
        //       status: 'failed'
        //     });
        //     isPolling = false;
        //   } else {
        //     setTimeout(checkStatus, 1000); // Poll every second
        //   }
        // }
      } catch (error) {
        console.error('Error checking status:', error);
        
        // Only set error state if we're not in the middle of processing
        if (status.status !== 'generating') {
          setStatus({
            message: 'Error processing server response',
            progress: 0,
            status: 'failed'
          });
        }
        
        // Retry on error
        // if (isPolling) {
        //   retryCount++;
        //   if (retryCount >= MAX_RETRIES) {
        //     setStatus({
        //       message: 'Generation failed',
        //       progress: 0,
        //       status: 'failed'
        //     });
        //     isPolling = false;
        //   } else {
        //     setTimeout(checkStatus, 1000);
        //   }
        // }
      }
    };

    // Start polling
    // checkStatus();

    return () => {
      isPolling = false;
    };
  }, [threadId, router]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-900/80 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            {status.status === 'failed' ? (
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : status.status === 'completed' ? (
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <div className="w-12 h-12 border-4 border-t-[#9b0e0e] rounded-full animate-spin" />
            )}
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{status.message}</h3>
            {status.status !== 'failed' && (
              <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-linear-to-r from-red-600 via-yellow-500 to-green-500 transition-all duration-500"
                  style={{ width: `${status.progress}%` }}
                />
              </div>
            )}
          </div>

          {status.status === 'failed' && (
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}