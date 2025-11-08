export interface IdeaFeedback {
  personaId: string;
  personaType: string;
  personaProfile: string;
  feedback: string;
  rating?: number;
}

export interface Idea {
  _id: string;
  title: string;
  description: string;
  targetAudience: string;
  mvpLink?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  aiFeedback: IdeaFeedback[];
  jobId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdeaSubmission {
  title: string;
  description: string;
  targetAudience: string;
  mvpLink?: string;
}