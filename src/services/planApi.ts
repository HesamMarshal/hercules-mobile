import { Plan } from '@/types/plan.type';
import { fetchWithAuth } from './api';

export const planAPI = {
  // Create new plan (if needed for trainers/admins)
  createPlan: async (planData: Partial<Plan>): Promise<Plan> => {
    const response = await fetchWithAuth('/plan', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
    return await response.json();
  },

  // Get all plans with authentication
  getAllPlans: async (id: number): Promise<Plan[]> => {
    const response = await fetchWithAuth(`/plans/${id}`);
    const { data } = await response.json();
    return data.data || data;
  },

  // Get single plan by ID with authentication
  getPlanById: async (id: string): Promise<Plan> => {
    const response = await fetchWithAuth(`/plan/${id}`);
    const result = await response.json();
    return result.data;
  },

  // Search plans with authentication
  //   searchPlans: async (query: string): Promise<Plan[]> => {
  //     const response = await fetchWithAuth(`/plan/search?q=${encodeURIComponent(query)}`);
  //     const data = await response.json();
  //     return data.data || data;
  //   },

  // Update plan (if needed for trainers/admins)
  updatePlan: async (id: string, planData: Partial<Plan>): Promise<Plan> => {
    const response = await fetchWithAuth(`/plan/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(planData),
    });
    return await response.json();
  },

  // Delete plan (if needed for trainers/admins)
  deletePlan: async (id: string): Promise<void> => {
    await fetchWithAuth(`/plan/${id}`, {
      method: 'DELETE',
    });
  },
};
