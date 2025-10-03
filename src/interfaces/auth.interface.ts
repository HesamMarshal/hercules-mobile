export interface User {
  id: string;
  mobileNumber: string;
  role: 'admin' | 'trainer' | 'client';
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface OTPRequest {
  mobile: string;
}

export interface OTPVerify {
  mobile: string;
  code: string;
}
