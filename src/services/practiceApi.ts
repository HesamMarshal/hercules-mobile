import { fetchWithAuth } from './api';

export const practiceAPI = {
  // Get practices by workout ID
  getPracticesByWorkoutId: async (workoutId: string) => {
    try {
      const response = await fetchWithAuth(`/practices/workout/${workoutId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching practices:', error);
      throw error;
    }
  },

  // Create a new practice
  createPractice: async (practiceData: {
    workout_id: string;
    exercise_id: string;
    sets: number;
    reps: number;
    weight: number;
    rest_time: number;
    order: number;
  }) => {
    try {
      const response = await fetchWithAuth('/practice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(practiceData),
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error creating practice:', error);
      throw error;
    }
  },

  // Update a practice
  updatePractice: async (practiceId: string, practiceData: any) => {
    try {
      const response = await fetchWithAuth(`/practice/${practiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(practiceData),
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error updating practice:', error);
      throw error;
    }
  },

  // Delete a practice
  deletePractice: async (practiceId: string) => {
    try {
      const response = await fetchWithAuth(`/practice/${practiceId}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting practice:', error);
      throw error;
    }
  },
};
