import { api } from './api';

export const authAPI = {
  sendOTP: async (mobile: string) => {
    const { data } = await api.post('/auth/send-otp', { mobile });
    return data;
  },

  verifyOTP: async (mobile: string, code: string) => {
    const { data } = await api.post('/auth/signin-up', { mobile, code });
    return data;
  },

  resendOTP: async (mobile: string) => {
    const { data } = await api.post('/auth/resend-otp', { mobile });
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  },
};
