'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, LineChart } from '@/components/charts';
import { Skeleton } from '@/components/ui/Skeleton';

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

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/ideas/${params.id}/analytics`);
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
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

  if (!analytics) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-400">
          No analytics data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/50 py-12">
      <div className="max-w-[70%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Feedback Analytics</h1>
            <p className="text-gray-400 text-lg">Comprehensive analysis of your idea's feedback</p>
          </div>

          {/* Top Row: Overview Cards */}
          <div className="grid grid-cols-3 gap-6">
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
              <p className="text-3xl font-bold">
                {Math.round(analytics.targetGroups.reduce((acc, group) => acc + group.sentiment, 0) / analytics.targetGroups.length)}%
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
          <div className="grid grid-cols-2 gap-8">
            {/* Overall Consensus */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5"
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
                  x: new Date(point.date).toLocaleDateString(),
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
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Key Insights</h2>
            <div className="grid grid-cols-2 gap-6">
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
      <div className="max-w-[70%] mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>

        <Skeleton className="h-80 rounded-xl" />

        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-96 rounded-xl" />
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}