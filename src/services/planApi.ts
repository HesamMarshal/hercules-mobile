// src/services/planApi.ts
import { Plan } from '@/interfaces/plan.interface';
import { api } from './api'; // Import the axios instance

export const planAPI = {
  // Create new plan
  createPlan: async (planData: Partial<Plan>): Promise<Plan> => {
    const response = await api.post('/plan', planData);
    return response.data.data || response.data;
  },

  // Get all plans with authentication
  getAllPlans: async (): Promise<Plan[]> => {
    const response = await api.get('/plan');
    return response.data.data || response.data;
  },

  // Get single plan by ID with authentication
  getPlanById: async (id: string): Promise<Plan> => {
    const response = await api.get(`/plan/${id}`);
    return response.data.data;
  },

  // Update plan
  updatePlan: async (id: string, planData: Partial<Plan>): Promise<Plan> => {
    const response = await api.patch(`/plan/${id}`, planData);
    return response.data.data || response.data;
  },

  // Delete plan
  deletePlan: async (id: string): Promise<void> => {
    await api.delete(`/plan/${id}`);
  },
};
