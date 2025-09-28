import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// export const API_BASE_URL = 'http://192.168.1.9:3000/'; // Change to your backend URL
export const API_BASE_URL = 'http://localhost:3000'; // Change to your backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Helper function to get the auth token
const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('access_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Generic fetch function with auth headers
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = await getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token might be expired, you could implement token refresh here
    throw new Error('Unauthorized - Please login again');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response;
};

// Add interceptors for auto-token attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or use AsyncStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls based on your backend
// export const authAPI = {
//   requestOTP: (mobile: string) => api.post('/auth/send-otp', { mobile }),

//   verifyOTP: (mobile: string, code: string) => api.post('/auth/signin-up', { mobile, code }),

//   getProfile: () => api.get('/auth/profile'),
// };

export const authAPI = {
  sendOTP: async (mobile: string) => {
    const response = await fetchWithAuth('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
    });
    return await response.json();
  },

  verifyOTP: async (mobile: string, code: string) => {
    const response = await fetchWithAuth('/auth/signin-up', {
      method: 'POST',
      body: JSON.stringify({ mobile, code }),
    });

    // console.log(response);
    return await response.json();
  },

  resendOTP: async (mobile: string) => {
    const response = await fetchWithAuth('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
    });
    return await response.json();
  },

  // Add logout endpoint if your backend has it
  logout: async () => {
    const response = await fetchWithAuth('/auth/logout', {
      method: 'POST',
    });
    return await response.json();
  },
};
