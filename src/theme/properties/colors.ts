export const palette = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Secondary colors
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef', // Main secondary
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },

  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
};

//TODO :  Use Palette Colors
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
  text2: '#333',
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

  shadow: palette.neutral[900],
  // OTP Specific colors
  otpBackground: '#f8f9fa',
  otpBorder: '#dee2e6',
  otpText: '#495057',

  //   TODO: Create good colors
  body_part: '#fff8e1',
  activeTintColor: palette.info[600], // '#007AFF',
  inactiveTintColor: 'gray',
  tabBackgroundColor: 'white',
  tabBorderTopColor: '#f0f0f0',
  tabHeaderTintColor: 'white',
  buttonDisabled: '#ccc',
};

export const otpColors = {
  inputBackground: colors.surface,
  inputBorder: colors.border,
  success: colors.success,
  error: colors.error,
};

// Light theme color mapping
export const lightColors = {
  // Primary
  primary: palette.primary[500],
  primaryContainer: palette.primary[100],
  onPrimary: '#ffffff',
  onPrimaryContainer: palette.primary[900],

  // Secondary
  secondary: palette.secondary[500],
  secondaryContainer: palette.secondary[100],
  onSecondary: '#ffffff',
  onSecondaryContainer: palette.secondary[900],

  // Background
  background: palette.neutral[50],
  surface: '#ffffff',
  surfaceVariant: palette.neutral[100],

  // Foreground
  onBackground: palette.neutral[900],
  onSurface: palette.neutral[900],
  onSurfaceVariant: palette.neutral[700],

  // Text
  text: palette.neutral[900],
  textSecondary: palette.neutral[700],
  textTertiary: palette.neutral[500],
  textDisabled: palette.neutral[400],

  // Border
  border: palette.neutral[300],
  borderLight: palette.neutral[200],
  borderDark: palette.neutral[400],

  // Semantic
  success: palette.success[500],
  successContainer: palette.success[100],
  warning: palette.warning[500],
  warningContainer: palette.warning[100],
  error: palette.error[500],
  errorContainer: palette.error[100],
  info: palette.info[500],
  infoContainer: palette.info[100],

  // States
  hover: palette.neutral[100],
  pressed: palette.neutral[200],
  focus: palette.primary[500],
  disabled: palette.neutral[300],

  // Shadows
  shadow: palette.neutral[900],

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.3)',
};

// Dark theme color mapping
export const darkColors = {
  // Primary
  primary: palette.primary[400],
  primaryContainer: palette.primary[800],
  onPrimary: palette.neutral[900],
  onPrimaryContainer: palette.primary[100],

  // Secondary
  secondary: palette.secondary[400],
  secondaryContainer: palette.secondary[800],
  onSecondary: palette.neutral[900],
  onSecondaryContainer: palette.secondary[100],

  // Background
  background: palette.neutral[900],
  surface: palette.neutral[800],
  surfaceVariant: palette.neutral[700],

  // Foreground
  onBackground: palette.neutral[50],
  onSurface: palette.neutral[50],
  onSurfaceVariant: palette.neutral[300],

  // Text
  text: palette.neutral[50],
  textSecondary: palette.neutral[300],
  textTertiary: palette.neutral[400],
  textDisabled: palette.neutral[600],

  // Border
  border: palette.neutral[600],
  borderLight: palette.neutral[700],
  borderDark: palette.neutral[500],

  // Semantic
  success: palette.success[400],
  successContainer: palette.success[800],
  warning: palette.warning[400],
  warningContainer: palette.warning[800],
  error: palette.error[400],
  errorContainer: palette.error[800],
  info: palette.info[400],
  infoContainer: palette.info[800],

  // States
  hover: palette.neutral[700],
  pressed: palette.neutral[600],
  focus: palette.primary[400],
  disabled: palette.neutral[700],

  // Shadows
  shadow: palette.neutral[50],

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};
