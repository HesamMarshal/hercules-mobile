// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE = 'http://localhost:3000/api'; // Update with your backend URL

// // Helper function to get the auth token
// const getAuthToken = async (): Promise<string | null> => {
//   try {
//     return await AsyncStorage.getItem('access_token');
//   } catch (error) {
//     console.error('Error getting auth token:', error);
//     return null;
//   }
// };

// // Generic fetch function with auth headers
// const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
//   const token = await getAuthToken();

//   const headers = {
//     'Content-Type': 'application/json',
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...options.headers,
//   };

//   const response = await fetch(`${API_BASE}${url}`, {
//     ...options,
//     headers,
//   });

//   if (response.status === 401) {
//     // Token might be expired, you could implement token refresh here
//     throw new Error('Unauthorized - Please login again');
//   }

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || `HTTP error! status: ${response.status}`);
//   }

//   return response;
// };

// export const authAPI = {
//   sendOTP: async (mobileNumber: string) => {
//     const response = await fetchWithAuth('/auth/send-otp', {
//       method: 'POST',
//       body: JSON.stringify({ mobileNumber }),
//     });
//     return await response.json();
//   },

//   verifyOTP: async (mobileNumber: string, otp: string) => {
//     const response = await fetchWithAuth('/auth/verify-otp', {
//       method: 'POST',
//       body: JSON.stringify({ mobileNumber, otp }),
//     });
//     return await response.json();
//   },

//   resendOTP: async (mobileNumber: string) => {
//     const response = await fetchWithAuth('/auth/resend-otp', {
//       method: 'POST',
//       body: JSON.stringify({ mobileNumber }),
//     });
//     return await response.json();
//   },

//   // Add logout endpoint if your backend has it
//   logout: async () => {
//     const response = await fetchWithAuth('/auth/logout', {
//       method: 'POST',
//     });
//     return await response.json();
//   },
// };
