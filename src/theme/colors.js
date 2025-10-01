// Base color palette - following Material Design 3
export const colors = {
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

// Light theme color mapping
export const lightColors = {
  // Primary
  primary: colors.primary[500],
  primaryContainer: colors.primary[100],
  onPrimary: '#ffffff',
  onPrimaryContainer: colors.primary[900],

  // Secondary
  secondary: colors.secondary[500],
  secondaryContainer: colors.secondary[100],
  onSecondary: '#ffffff',
  onSecondaryContainer: colors.secondary[900],

  // Background
  background: colors.neutral[50],
  surface: '#ffffff',
  surfaceVariant: colors.neutral[100],

  // Foreground
  onBackground: colors.neutral[900],
  onSurface: colors.neutral[900],
  onSurfaceVariant: colors.neutral[700],

  // Text
  text: colors.neutral[900],
  textSecondary: colors.neutral[700],
  textTertiary: colors.neutral[500],
  textDisabled: colors.neutral[400],

  // Border
  border: colors.neutral[300],
  borderLight: colors.neutral[200],
  borderDark: colors.neutral[400],

  // Semantic
  success: colors.success[500],
  successContainer: colors.success[100],
  warning: colors.warning[500],
  warningContainer: colors.warning[100],
  error: colors.error[500],
  errorContainer: colors.error[100],
  info: colors.info[500],
  infoContainer: colors.info[100],

  // States
  hover: colors.neutral[100],
  pressed: colors.neutral[200],
  focus: colors.primary[500],
  disabled: colors.neutral[300],

  // Shadows
  shadow: colors.neutral[900],

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.3)',
};

// Dark theme color mapping
export const darkColors = {
  // Primary
  primary: colors.primary[400],
  primaryContainer: colors.primary[800],
  onPrimary: colors.neutral[900],
  onPrimaryContainer: colors.primary[100],

  // Secondary
  secondary: colors.secondary[400],
  secondaryContainer: colors.secondary[800],
  onSecondary: colors.neutral[900],
  onSecondaryContainer: colors.secondary[100],

  // Background
  background: colors.neutral[900],
  surface: colors.neutral[800],
  surfaceVariant: colors.neutral[700],

  // Foreground
  onBackground: colors.neutral[50],
  onSurface: colors.neutral[50],
  onSurfaceVariant: colors.neutral[300],

  // Text
  text: colors.neutral[50],
  textSecondary: colors.neutral[300],
  textTertiary: colors.neutral[400],
  textDisabled: colors.neutral[600],

  // Border
  border: colors.neutral[600],
  borderLight: colors.neutral[700],
  borderDark: colors.neutral[500],

  // Semantic
  success: colors.success[400],
  successContainer: colors.success[800],
  warning: colors.warning[400],
  warningContainer: colors.warning[800],
  error: colors.error[400],
  errorContainer: colors.error[800],
  info: colors.info[400],
  infoContainer: colors.info[800],

  // States
  hover: colors.neutral[700],
  pressed: colors.neutral[600],
  focus: colors.primary[400],
  disabled: colors.neutral[700],

  // Shadows
  shadow: colors.neutral[50],

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};
