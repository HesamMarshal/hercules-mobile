import { Workout } from '@/interfaces/workout.interface';

export const workoutAPI = {
  // Get all workouts with authentication
  getAllWorkoutsByPlanId: async (id: number): Promise<Workout[]> => {
    const response = await fetchWithAuth(`/workouts/byPlan/${id}`);
    const { data } = await response.json();
    return data.workout || data;
  },

  // Get single workout by ID with authentication
  getWorkoutById: async (id: string): Promise<Workout> => {
    const response = await fetchWithAuth(`/workout/${id}`);
    const result = await response.json();
    return result.data;
  },

  // Search workouts with authentication
  searchWorkouts: async (query: string): Promise<Workout[]> => {
    const response = await fetchWithAuth(`/workout/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.data || data;
  },

  // Create new workout (if needed for trainers/admins)
  createWorkout: async (workoutData: Partial<Workout>): Promise<Workout> => {
    const response = await fetchWithAuth('/workout', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    });
    return await response.json();
  },

  // Update workout (if needed for trainers/admins)
  updateWorkout: async (id: string, workoutData: Partial<Workout>): Promise<Workout> => {
    const response = await fetchWithAuth(`/workout/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(workoutData),
    });
    return await response.json();
  },

  // Delete workout (if needed for trainers/admins)
  deleteWorkout: async (id: string): Promise<void> => {
    await fetchWithAuth(`/workout/${id}`, {
      method: 'DELETE',
    });
  },
};
