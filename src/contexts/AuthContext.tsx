import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, OTPVerify } from '../types';
import { authAPI } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType extends AuthState {
  requestOTP: (mobile: string) => Promise<void>;
  verifyOTP: (data: OTPVerify) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        setState({
          user: JSON.parse(userData),
          token,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestOTP = async (mobile: string) => {
    try {
      await authAPI.requestOTP(mobile);
      // OTP sent successfully
    } catch (error) {
      console.error('OTP request failed:', error);
      throw error;
    }
  };

  const verifyOTP = async ({ mobile, code }: OTPVerify) => {
    try {
      const response = await authAPI.verifyOTP(mobile, code);
      const { user, token } = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('OTP verification failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'userData']);
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      requestOTP,
      verifyOTP,
      logout,
      isLoading,
    }}>
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