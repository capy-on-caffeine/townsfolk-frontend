import axios from 'axios';
import { Idea, IdeaSubmission } from '@/types/idea';
import { getAuth0Token } from '@/utils/auth';

const api = axios.create({
  baseURL: '/api/proxy',
  timeout: 10000, // 10 second timeout
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  try {
    const token = await getAuth0Token();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return Promise.reject(error);
  }
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
      const { data } = await api.post('', { path: '/ideas' }, { params: { path: '/ideas' } });
      return data;
    } catch (error) {
      console.error('Failed to submit idea:', error);
      throw error;
    }
  },

  getIdeas: async (page = 1, limit = 10): Promise<{ ideas: Idea[]; total: number }> => {
    try {
      const { data } = await api.get('', { params: { path: `/ideas?page=${page}&limit=${limit}` } });
      return data;
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
      throw error;
    }
  },

  getIdea: async (id: string): Promise<Idea> => {
    try {
      const { data } = await api.get('', { params: { path: `/ideas/${id}` } });
      return data;
    } catch (error) {
      console.error(`Failed to fetch idea ${id}:`, error);
      throw error;
    }
  },

  requeueIdea: async (id: string): Promise<Idea> => {
    try {
      const { data } = await api.post('', null, { params: { path: `/ideas/${id}/requeue` } });
      return data;
    } catch (error) {
      console.error(`Failed to requeue idea ${id}:`, error);
      throw error;
    }
  }
};