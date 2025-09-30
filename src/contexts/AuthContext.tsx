import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, authAPI } from '@/services/api';

interface User {
  id: string;
  mobileNumber: string;
  role: 'admin' | 'trainer' | 'client';
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  token: string | null;
  refreshToken:string | null;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
  loading: boolean;
  isLoading: boolean; // Add this if you want to use isLoading
  isAuthenticated: boolean;
  requestOTP: (mobileNumber: string) => Promise<void>;
  verifyOTP: (params: { mobile: string; code: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
       const storedToken = await AsyncStorage.getItem('access_token');
      const storedRefreshToken = await AsyncStorage.getItem('refresh_token');
       console.log('Stored tokens:', { 
        accessToken: !!storedToken, 
        refreshToken: !!storedRefreshToken 
      });


     if (storedToken) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        console.log('Tokens restored from storage');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
      console.log('Auth loading completed');
    }
  };

  const login = async (accessToken: string, refreshToken?: string) => {
    try {
      console.log('Storing tokens');
      
      await AsyncStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }
      
      setToken(accessToken);
      setRefreshToken(refreshToken || null);
      
      console.log('Login successful - tokens stored');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

const logout = async () => {
    try {
      console.log('Logging out');
      await AsyncStorage.multiRemove([
        'access_token',
        'refresh_token',
        'user_mobile'
      ]);
      setToken(null);
      setRefreshToken(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

   // Add OTP methods
  const requestOTP = async (mobileNumber: string) => {
    try {
      console.log('Requesting OTP for:', mobileNumber);
      await authAPI.sendOTP(mobileNumber);

      // Store mobile number for verification
      await AsyncStorage.setItem('user_mobile', mobileNumber);
       console.log('OTP request successful');
    } catch (error) {
      console.error('Error requesting OTP:', error);
      throw error;
    }
  };

  // TODO: Change to signin-up 
   const verifyOTP = async (params: { mobile: string; code: string }) => {
    try {
      console.log('Verifying OTP for:', params.mobile);
      
      const response = await fetch(`${API_BASE_URL}/auth/signin-up`    , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: params.mobile,
          code: params.code
        }),
      });
if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }

      const result = await response.json();
      console.log('OTP verification result:', result);

      // Extract tokens from response
      const { accessToken, refreshToken } = result;

      if (!accessToken) {
        throw new Error('No access token received');
      }

      // Store tokens and update state
      await login(accessToken, refreshToken);

      console.log('OTP verification completed successfully');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    
    token,
    refreshToken,
    login,
    logout,
     loading, // This is the actual loading state
    isLoading: loading, // Alias for loading if you prefer isLoading
    isAuthenticated: !!token ,
    requestOTP,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};