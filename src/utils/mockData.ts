import { Idea } from '@/types/idea';

export const mockIdeas: Idea[] = [
  {
    _id: '1',
    title: 'Meows - Tinder for Cats',
    description: 'A dating app that helps cat owners find compatible matches for both themselves and their cats. Features include cat profiles, playdates, and shared interests in cat breeds and activities.',
    targetAudience: 'Cat owners looking for companionship',
    status: 'completed',
    createdAt: new Date('2025-11-08').toISOString(),
    updatedAt: new Date('2025-11-08').toISOString(),
    aiFeedback: [
      {
        personaId: "690faac0741c62c144a432a9",
        personaType: "Primary User",
        personaProfile: "Emily Carter, 28, Female, Graphic Designer",
        feedback: "As a creative professional with two cats, this app perfectly addresses my needs. The combination of dating and cat socialization is innovative and feels less pressured than traditional dating apps."
      },
      {
        personaId: "690faad3741c62c144a432ab",
        personaType: "Secondary User",
        personaProfile: "Michael Chen, 32, Male, Veterinarian",
        feedback: "From a veterinarian's perspective, the app could help promote healthy socialization for cats while helping their owners find meaningful connections. The focus on pet compatibility is a unique value proposition."
      },
      {
        personaId: "690faadd741c62c144a432ad",
        personaType: "Business Owner",
        personaProfile: "Sarah Thompson, 30, Female, Cat Café Owner",
        feedback: "This app could create valuable partnerships with local cat cafés for meetups. The emphasis on cat-friendly dating spaces aligns perfectly with what many of my customers are looking for."
      }
    ]
  },
  {
    _id: '2',
    title: 'PurrMatch Analytics',
    description: 'An AI-powered feature for Meows that analyzes cat personalities and behaviors to suggest compatible matches for both cats and their owners.',
    targetAudience: 'Existing Meows users looking for better matches',
    status: 'processing',
    createdAt: new Date('2025-11-09').toISOString(),
    updatedAt: new Date('2025-11-09').toISOString(),
    aiFeedback: []
  },
  {
    _id: '3',
    title: 'CatCafe Connections',
    description: 'A feature within Meows that helps users organize and find cat café meetups, creating a safe and comfortable environment for first dates.',
    targetAudience: 'Cat lovers who prefer group settings for first meetings',
    status: 'pending',
    createdAt: new Date('2025-11-09').toISOString(),
    updatedAt: new Date('2025-11-09').toISOString(),
    aiFeedback: []
  }
];