// src/services/exerciseApi.ts
import { Exercise } from '@/interfaces/exercise.interface';
import { api } from './api';

export const exerciseAPI = {
  // Get all exercises
  getAllExercises: async (): Promise<Exercise[]> => {
    const response = await api.get('/exercise');
    return response.data.data || response.data;
  },

  // Get exercise by ID
  getExerciseById: async (exerciseId: string): Promise<Exercise> => {
    const response = await api.get(`/exercise/${exerciseId}`);
    return response.data.data || response.data;
  },

  // Search exercises
  searchExercises: async (query: string): Promise<Exercise[]> => {
    const response = await api.get(`/exercise/search?q=${query}`);
    return response.data.data || response.data;
  },

  // Create a new exercise
  createExercise: async (exerciseData: {
    name: string;
    category: string;
    description?: string;
    difficulty?: string;
    equipment?: string;
    muscle_group?: string;
  }): Promise<Exercise> => {
    const response = await api.post('/exercise', exerciseData);
    return response.data.data || response.data;
  },

  // Update an exercise
  updateExercise: async (
    exerciseId: string,
    exerciseData: Partial<Exercise>
  ): Promise<Exercise> => {
    const response = await api.put(`/exercise/${exerciseId}`, exerciseData);
    return response.data.data || response.data;
  },

  // Delete an exercise
  deleteExercise: async (exerciseId: string): Promise<void> => {
    await api.delete(`/exercise/${exerciseId}`);
  },
};
