import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.9:3000/'; // Change to your backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Auth API calls based on your backend
export const authAPI = {
  requestOTP: (mobile: string) => api.post('/auth/send-otp', { mobile }),

  verifyOTP: (mobile: string, code: string) => api.post('/auth/signin-up', { mobile, code }),

  getProfile: () => api.get('/auth/profile'),
};

// Add interceptors for auto-token attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or use AsyncStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
