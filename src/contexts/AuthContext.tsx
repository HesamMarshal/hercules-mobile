import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '@/services/api';

interface User {
  id: string;
  mobileNumber: string;
  role: 'admin' | 'trainer' | 'client';
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  loading: boolean;
  isLoading: boolean; // Add this if you want to use isLoading
  isAuthenticated: boolean;

  requestOTP: (mobileNumber: string) => Promise<void>;
  verifyOTP: (params: { mobile: string; code: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('access_token');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: User, authToken: string, refreshToken?: string) => {
    try {
      await AsyncStorage.setItem('access_token', authToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }
      setToken(authToken);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout API if needed
      // await authAPI.logout();
      
      // Clear storage
      await AsyncStorage.multiRemove([
        'access_token',
        'refresh_token',
        'user',
        'user_mobile'
      ]);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


   // Add OTP methods
  const requestOTP = async (mobileNumber: string) => {
    try {
        
      await authAPI.sendOTP(mobileNumber);
      // Store mobile number for verification
      await AsyncStorage.setItem('user_mobile', mobileNumber);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      throw error;
    }
  };

    const verifyOTP = async (params: { mobile: string; code: string }) => {
    try {
      const result = await authAPI.verifyOTP(params.mobile, params.code);
      console.log(result)
      // Store tokens and user data
      await AsyncStorage.setItem('access_token', result.access_token);
      await AsyncStorage.setItem('refresh_token', result.refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      
      // Update auth state
      setToken(result.access_token);
      setUser(result.user);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
     loading, // This is the actual loading state
    isLoading: loading, // Alias for loading if you prefer isLoading
    isAuthenticated: !!token && !!user,
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