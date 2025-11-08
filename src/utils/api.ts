import axios from 'axios';
import { Idea, IdeaSubmission } from '@/types/idea';
import { getAuth0Token } from '@/utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

// Add error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const ApiClient = {
  submitIdea: async (idea: IdeaSubmission): Promise<Idea> => {
    try {
      const { data } = await api.post<Idea>('/ideas', idea);
      return data;
    } catch (error) {
      console.error('Failed to submit idea:', error);
      throw error;
    }
  },

  getIdeas: async (page = 1, limit = 10): Promise<{ ideas: Idea[]; total: number }> => {
    try {
      const { data } = await api.get(`/ideas?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
      throw error;
    }
  },

  getIdea: async (id: string): Promise<Idea> => {
    try {
      const { data } = await api.get(`/ideas/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch idea ${id}:`, error);
      throw error;
    }
  },

  requeueIdea: async (id: string): Promise<Idea> => {
    try {
      const { data } = await api.post(`/ideas/${id}/requeue`);
      return data;
    } catch (error) {
      console.error(`Failed to requeue idea ${id}:`, error);
      throw error;
    }
  }
};