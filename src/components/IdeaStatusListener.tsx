'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IdeaStatus {
  message: string;
  progress: number;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

export function IdeaStatusListener({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<IdeaStatus>({
    message: 'Starting persona generation...',
    progress: 0,
    status: 'pending'
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const runId = localStorage.getItem('activeRunId');
    if (!runId || !token) {
      console.error('No run ID or auth token found');
      return;
    }

    const url = new URL('/api/proxy', window.location.origin);
    url.searchParams.append('path', `/threads/${threadId}/runs/stream`);
    url.searchParams.append('authorization', `Bearer ${token}`);
    
    const eventSource = new EventSource(url.toString());
    
    eventSource.onmessage = (event) => {
      try {
        console.log('Raw SSE data:', event.data); // Debug log
        const rawData = event.data.toString();
        let data;
        
        // Check if this is a metadata message
        if (rawData.includes('"run_id"')) {
          data = JSON.parse(rawData);
          setStatus({
            message: 'Starting persona generation...',
            progress: 10,
            status: 'generating'
          });
          return;
        }

        // Parse the actual data
        data = JSON.parse(rawData);

        // Handle persona data
        if (Array.isArray(data.persona)) {
          // Store personas in local storage
          localStorage.setItem('generated_personas', JSON.stringify(data.persona));
          
          setStatus({
            message: 'Personas generated successfully!',
            progress: 100,
            status: 'completed'
          });

          // Clean up and redirect after a short delay
          setTimeout(() => {
            eventSource.close();
            router.push(`/ideas/${threadId}/analytics`);
          }, 1500);
          return;
        }

        // Handle progress updates
        if (data.status === 'completed') {
          setStatus(prev => ({
            message: 'Finalizing personas...',
            progress: 90,
            status: 'generating'
          }));
        } else {
          setStatus(prev => ({
            message: 'Generating personas...',
            progress: Math.min(prev.progress + 10, 80),
            status: 'generating'
          }));
        }
      } catch (error) {
        console.error('Error processing event:', {
          error,
          rawData: event.data,
          eventType: event.type
        });
        
        // Only set error state if we're not in the middle of processing
        if (status.status !== 'generating') {
          setStatus({
            message: 'Error processing server response',
            progress: 0,
            status: 'failed'
          });
        }
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      
      // Only close and show error if we haven't completed
      if (status.status !== 'completed') {
        eventSource.close();
        setStatus({
          message: 'Lost connection to server',
          progress: 0,
          status: 'failed'
        });
      }
    };

    return () => {
      eventSource.close();
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