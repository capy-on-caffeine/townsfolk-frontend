import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  // TODO: Replace with actual database query
  const { id } = await context.params;
  const mockData = {
    targetGroups: [
      { group: 'Young Professionals', count: 150, sentiment: 85 },
      { group: 'Small Business Owners', count: 120, sentiment: 78 },
      { group: 'Tech Enthusiasts', count: 200, sentiment: 92 },
      { group: 'Students', count: 80, sentiment: 70 },
      { group: 'Remote Workers', count: 160, sentiment: 88 },
    ],
    sentimentOverTime: [
      { date: '2025-11-01', avgSentiment: 75 },
      { date: '2025-11-02', avgSentiment: 82 },
      { date: '2025-11-03', avgSentiment: 79 },
      { date: '2025-11-04', avgSentiment: 85 },
      { date: '2025-11-05', avgSentiment: 88 },
      { date: '2025-11-06', avgSentiment: 92 },
      { date: '2025-11-07', avgSentiment: 90 },
      { date: '2025-11-08', avgSentiment: 91 },
    ],
    keyInsights: [
      {
        category: 'Product Market Fit',
        positive: [
          'Strong alignment with target market needs',
          'Unique value proposition',
          'Clear competitive advantage',
        ],
        negative: [
          'Price point concerns for small businesses',
          'Feature set might be overwhelming for new users',
        ],
      },
      {
        category: 'User Experience',
        positive: [
          'Intuitive interface design',
          'Quick feedback generation',
          'Helpful persona insights',
        ],
        negative: [
          'More customization options needed',
          'Additional export formats requested',
        ],
      },
    ],
    overallConsensus: {
      positive: 75,
      neutral: 15,
      negative: 10,
    },
  };

  return NextResponse.json(mockData);
}