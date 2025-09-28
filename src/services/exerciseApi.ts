import { Exercise } from '../types/exercise';
import { fetchWithAuth } from './api';
// import { fetchWithAuth } from './api';

export const exerciseAPI = {
  // Get all exercises with authentication
  getAllExercises: async (): Promise<Exercise[]> => {
    const response = await fetchWithAuth('/exercise');
    const data = await response.json();
    return data.exercises || data;
  },

  // Get single exercise by ID with authentication
  getExerciseById: async (id: string): Promise<Exercise> => {
    const response = await fetchWithAuth(`/exercise/${id}`);
    return await response.json();
  },

  // Search exercises with authentication
  searchExercises: async (query: string): Promise<Exercise[]> => {
    const response = await fetchWithAuth(`/exercise/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.exercises || data;
  },

  // Create new exercise (if needed for trainers/admins)
  createExercise: async (exerciseData: Partial<Exercise>): Promise<Exercise> => {
    const response = await fetchWithAuth('/exercise', {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
    return await response.json();
  },

  // Update exercise (if needed for trainers/admins)
  updateExercise: async (id: string, exerciseData: Partial<Exercise>): Promise<Exercise> => {
    const response = await fetchWithAuth(`/exercise/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(exerciseData),
    });
    return await response.json();
  },

  // Delete exercise (if needed for trainers/admins)
  deleteExercise: async (id: string): Promise<void> => {
    await fetchWithAuth(`/exercise/${id}`, {
      method: 'DELETE',
    });
  },
};
