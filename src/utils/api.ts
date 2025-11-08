import axios from 'axios';
import { Idea, IdeaSubmission } from '@/types/idea';
import { getAuth0Token } from '@/utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await getAuth0Token();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ApiClient = {
  // Ideas
  submitIdea: async (idea: IdeaSubmission): Promise<Idea> => {
    const { data } = await api.post<Idea>('/ideas', idea);
    return data;
  },

  getIdeas: async (page = 1, limit = 10): Promise<{ ideas: Idea[]; total: number }> => {
    const { data } = await api.get(`/ideas?page=${page}&limit=${limit}`);
    return data;
  },

  getIdea: async (id: string): Promise<Idea> => {
    const { data } = await api.get(`/ideas/${id}`);
    return data;
  },

  requeueIdea: async (id: string): Promise<Idea> => {
    const { data } = await api.post(`/ideas/${id}/requeue`);
    return data;
  },

  // Jobs
  getJobStatus: async (jobId: string): Promise<{ status: string }> => {
    const { data } = await api.get(`/jobs/${jobId}/status`);
    return data;
  },
};