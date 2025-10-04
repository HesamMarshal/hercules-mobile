// src/services/workoutsApi.ts
import { Workout } from '@/interfaces/workout.interface';
import { api } from './api';

export const workoutAPI = {
  // Get all workouts by plan ID
  getAllWorkoutsByPlanId: async (id: number): Promise<Workout[]> => {
    const response = await api.get(`/workouts/byPlan/${id}`);
    return response.data.data || response.data;
  },

  // Get single workout by ID
  getWorkoutById: async (id: string): Promise<Workout> => {
    const response = await api.get(`/workouts/${id}`);
    return response.data.data || response.data;
  },

  // Search workouts
  searchWorkouts: async (query: string): Promise<Workout[]> => {
    const response = await api.get(`/workouts/search?q=${encodeURIComponent(query)}`);
    return response.data.data || response.data;
  },

  // Create new workout
  createWorkout: async (workoutData: Partial<Workout>): Promise<Workout> => {
    const response = await api.post('/workouts', workoutData);
    return response.data.data || response.data;
  },

  // Update workout
  updateWorkout: async (id: string, workoutData: Partial<Workout>): Promise<Workout> => {
    const response = await api.patch(`/workouts/${id}`, workoutData);
    return response.data.data || response.data;
  },

  // Delete workout
  deleteWorkout: async (id: string): Promise<void> => {
    await api.delete(`/workouts/${id}`);
  },
};
