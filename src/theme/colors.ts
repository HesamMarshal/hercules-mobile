export const colors = {
  // Primary colors
  primary: '#2196f3',
  primaryDark: '#1976d2',
  primaryLight: '#bbdefb',

  // Secondary colors
  secondary: '#ff9800',
  secondaryDark: '#f57c00',
  secondaryLight: '#ffe0b2',

  // Status colors
  success: '#4caf50',
  error: '#d32f2f',
  warning: '#ff9800',
  info: '#2196f3',

  // Background colors
  background: '#f5f5f5',
  surface: '#ffffff',
  paper: '#fafafa',

  // Text colors
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#9e9e9e',

  // Border colors
  border: '#e0e0e0',
  borderLight: '#f5f5f5',

  // Difficulty colors
  beginner: '#e8f5e8',
  intermediate: '#fff3cd',
  advanced: '#f8d7da',

  // Category colors
  chest: '#ffebee',
  back: '#e8eaf6',
  legs: '#e8f5e8',
  shoulders: '#fff3e0',
  arms: '#f3e5f5',
  core: '#e0f2f1',
  cardio: '#fff8e1',

  //   TODO: Create good colors
  body_part: '#fff8e1',

  // OTP Specific colors
  otpBackground: '#f8f9fa',
  otpBorder: '#dee2e6',
  otpText: '#495057',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6c757d',
  },
};
