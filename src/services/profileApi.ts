// src/services/profileApi.ts
import { api } from './api';
import { UserProfile } from '@/interfaces/user.interface';

export const profileAPI = {
  // Get practices by workout ID
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get(`/user/profile/`);

    return response.data.data || response.data;
  },

  getUserByUsername: async (username: string): Promise<UserProfile[]> => {
    const response = await api.get(`/user/username/${username}`);
    return response.data.data || response.data;
  },

  // Update a practice
  updateUser: async (userId: string, userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.patch(`/user/${userId}`, userData);
    return response.data.data || response.data;
  },

  //   // Update practice with PATCH
  //   patchPractice: async (practiceId: string, practiceData: Partial<Practice>): Promise<Practice> => {
  //     const response = await api.patch(`/practices/${practiceId}`, practiceData);
  //     return response.data.data || response.data;
  //   },

  //   // Delete a practice
  //   deletePractice: async (practiceId: string): Promise<void> => {
  //     await api.delete(`/practices/${practiceId}`);
  //   },
};
