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
  getExerciseById: async (id: string): Promise<Exercise> => {
    const response = await api.get(`/exercise/${id}`);
    return response.data.data || response.data;
  },

  // Search exercises
  searchExercises: async (query: string): Promise<Exercise[]> => {
    const response = await api.get(`/exercise/search?q=${encodeURIComponent(query)}`);
    return response.data.data || response.data;
  },

  // Create new exercise (if needed for trainers/admins)
  createExercise: async (exerciseData: Partial<Exercise>): Promise<Exercise> => {
    const response = await api.post('/exercise', exerciseData);
    return response.data.data || response.data;
  },

  // Update exercise
  updateExercise: async (id: string, exerciseData: Partial<Exercise>): Promise<Exercise> => {
    const response = await api.patch(`/exercise/${id}`, exerciseData);
    return response.data.data || response.data;
  },

  // Delete exercise
  deleteExercise: async (id: string): Promise<void> => {
    await api.delete(`/exercise/${id}`);
  },

  // Get exercises by muscle group
  getExercisesByMuscleGroup: async (muscleGroup: string): Promise<Exercise[]> => {
    const response = await api.get(`/exercises/muscle-group/${encodeURIComponent(muscleGroup)}`);
    return response.data.data || response.data;
  },
};
