// api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { type InternalAxiosRequestConfig } from 'axios';

// export const API_BASE_URL = 'http://192.168.1.9:3000/'; // Change to your backend URL
export const API_BASE_URL = 'http://localhost:3000'; // Change to your backend URL

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// ✅ Request interceptor (attach token automatically)
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (token && config.headers) {
      // Use the set method which is available on AxiosHeaders
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  } catch (e) {
    console.warn('Error attaching token:', e);
  }
  return config;
});

// Optional: response interceptor for 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('access_token');
      // TODO: trigger logout navigation here if needed
    }
    return Promise.reject(error);
  }
);
