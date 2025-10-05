// src/services/practiceApi.ts
import { Practice } from '@/interfaces/practice.interface';
import { api } from './api';

export const practiceAPI = {
  // Get practices by workout ID
  getPracticesByWorkoutId: async (workoutId: string): Promise<Practice[]> => {
    const response = await api.get(`/practices/workout/${workoutId}`);
    return response.data.data || response.data;
  },

  // Get practice by ID with exercise details
  getPracticeById: async (practiceId: string): Promise<Practice> => {
    const response = await api.get(`/practices/${practiceId}`);
    return response.data.data || response.data;
  },

  // Create a new practice
  createPractice: async (practiceData: {
    workoutId: string;
    exerciseId: string;
    sets: number;
    reps: number;
    weight: number;
    rest_time: number;
    order: number;
  }): Promise<Practice> => {
    const response = await api.post('/practices', practiceData);
    return response.data.data || response.data;
  },

  // Update a practice
  updatePractice: async (
    practiceId: string,
    practiceData: Partial<Practice>
  ): Promise<Practice> => {
    const response = await api.put(`/practices/${practiceId}`, practiceData);
    return response.data.data || response.data;
  },

  // Update practice with PATCH
  patchPractice: async (practiceId: string, practiceData: Partial<Practice>): Promise<Practice> => {
    const response = await api.patch(`/practices/${practiceId}`, practiceData);
    return response.data.data || response.data;
  },

  // Delete a practice
  deletePractice: async (practiceId: string): Promise<void> => {
    await api.delete(`/practices/${practiceId}`);
  },
};
