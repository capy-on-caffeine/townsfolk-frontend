'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { IdeaSubmissionForm } from '@/components/IdeaSubmissionForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewIdea() {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  // Use useEffect to handle client-side redirects
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-t-2 border-[#9b0e0e] rounded-full animate-spin mx-auto mb-4" 
                 role="status"
                 aria-label="Loading..." />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, return null (redirect will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black/50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit Your Idea</h1>
          <p className="text-gray-400 text-base md:text-lg">
            Get instant feedback from AI-generated personas representing your target audience
          </p>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5">
          <IdeaSubmissionForm />
        </div>
      </div>
    </main>
  );
}