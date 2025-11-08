'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, LineChart } from '@/components/charts';
import { Skeleton } from '@/components/ui/Skeleton';

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit'
    }).format(date);
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return 'Invalid Date';
  }
};

interface FeedbackAnalytics {
  targetGroups: {
    group: string;
    count: number;
    sentiment: number;
  }[];
  sentimentOverTime: {
    date: string;
    avgSentiment: number;
  }[];
  keyInsights: {
    category: string;
    positive: string[];
    negative: string[];
  }[];
  overallConsensus: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export default function AnalyticsPage({ params }: { params: { id: string } }) {
  const [analytics, setAnalytics] = useState<FeedbackAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError(null);
        const response = await fetch(`/api/ideas/${params.id}/analytics`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Validate required data fields
        if (!data.targetGroups || !data.sentimentOverTime || !data.keyInsights || !data.overallConsensus) {
          throw new Error('Invalid data format received from server');
        }
        setAnalytics(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch analytics data');
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [params.id]);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black/50 py-12">
        <div className="max-w-[70%] mx-auto">
          <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-red-500/20">
            <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-semibold text-red-500 mb-2">Error Loading Analytics</h2>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-black/50 py-12">
        <div className="max-w-[70%] mx-auto">
          <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-white/5">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-200 mb-2">No Analytics Data Available</h2>
            <p className="text-gray-400">There is no feedback data available for this idea yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/50 py-12">
      <div className="max-w-[95%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 lg:space-y-12"
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Feedback Analytics</h1>
            <p className="text-gray-400 text-base md:text-lg">Comprehensive analysis of your idea's feedback</p>
          </div>

          {/* Top Row: Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
            >
              <h3 className="text-lg font-medium text-gray-400 mb-2">Total Feedback</h3>
              <p className="text-3xl font-bold">{analytics.targetGroups.reduce((acc, group) => acc + group.count, 0)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
            >
              <h3 className="text-lg font-medium text-gray-400 mb-2">Average Sentiment</h3>
              <p className="text-3xl font-bold" role="status" aria-label="Average sentiment percentage">
                {analytics.targetGroups.length > 0 
                  ? `${Math.round(analytics.targetGroups.reduce((acc, group) => acc + group.sentiment, 0) / analytics.targetGroups.length)}%`
                  : 'N/A'
                }
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
            >
              <h3 className="text-lg font-medium text-gray-400 mb-2">Target Groups</h3>
              <p className="text-3xl font-bold">{analytics.targetGroups.length}</p>
            </motion.div>
          </div>

          {/* Middle Row: Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Overall Consensus */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/5"
            >
              <h2 className="text-2xl font-semibold mb-6">Overall Consensus</h2>
              <PieChart
                data={[
                  { name: 'Positive', value: analytics.overallConsensus.positive },
                  { name: 'Neutral', value: analytics.overallConsensus.neutral },
                  { name: 'Negative', value: analytics.overallConsensus.negative },
                ]}
                colors={['#22c55e', '#94a3b8', '#ef4444']}
              />
            </motion.section>

            {/* Sentiment Over Time */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
            >
              <h2 className="text-2xl font-semibold mb-6">Sentiment Trends</h2>
              <LineChart
                data={analytics.sentimentOverTime.map(point => ({
                  x: formatDate(point.date),
                  y: point.avgSentiment,
                }))}
                color="#2563eb"
              />
            </motion.section>
          </div>

          {/* Target Groups */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
          >
            <h2 className="text-2xl font-semibold mb-6">Target Groups Feedback</h2>
            <BarChart
              data={analytics.targetGroups.map(group => ({
                name: group.group,
                value: group.sentiment,
              }))}
              color="#8b5cf6"
            />
          </motion.section>

          {/* Key Insights */}
          <section className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {analytics.keyInsights.map((insight, index) => (
                <motion.div
                  key={insight.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
                >
                  <h3 className="text-xl font-semibold mb-4">{insight.category}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-green-500 font-medium mb-2">Strengths</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {insight.positive.map((point, i) => (
                          <li key={i} className="text-gray-300">{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-red-500 font-medium mb-2">Areas for Improvement</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {insight.negative.map((point, i) => (
                          <li key={i} className="text-gray-300">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-black/50 py-12">
      <div className="max-w-[95%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] mx-auto space-y-8 lg:space-y-12">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 md:h-10 w-48 md:w-64 mx-auto" />
          <Skeleton className="h-5 md:h-6 w-64 md:w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 md:h-32 rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Skeleton className="h-64 md:h-80 rounded-xl" />
          <Skeleton className="h-64 md:h-80 rounded-xl" />
        </div>

        <Skeleton className="h-64 md:h-80 rounded-xl" />

        <div className="space-y-4 md:space-y-6">
          <Skeleton className="h-7 md:h-8 w-36 md:w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Skeleton className="h-80 md:h-96 rounded-xl" />
            <Skeleton className="h-80 md:h-96 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}