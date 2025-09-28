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

      console.log('Stored auth data:', { storedToken: !!storedToken, storedUser: !!storedUser });
      
      // if (storedToken && storedUser) {
      if (storedToken ) {
        setToken(storedToken);
        // setUser(JSON.parse(storedUser));
        //  console.log('User restored from storage:', JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
      console.log('Auth loading completed');
    }
  };

  const login = async (userData: User, authToken: string, refreshToken?: string) => {
    try {
       console.log('Logging in user:', userData);

      await AsyncStorage.setItem('access_token', authToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }

      setToken(authToken);
      setUser(userData);

      console.log('Login successful - user set in context');
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

       console.log('Logging out user');
      await AsyncStorage.multiRemove([
        'access_token',
        'refresh_token',
        'user',
        'user_mobile'
      ]);
      setToken(null);
      setUser(null);
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
        const result = await authAPI.verifyOTP(params.mobile, params.code);
        console.log('OTP verification result:', result);


      // Use the login function to ensure consistent state update
        await login(result.user, result.access_token, result.refresh_token);
        
        
        // Update auth state
        // if (result.access_token) 
          
        setToken(result.access_token);
        // setUser(result.user);

        console.log('OTP verification completed successfully');
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