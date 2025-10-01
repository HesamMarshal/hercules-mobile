// Fallback theme for immediate use while debugging
export const fallbackTheme = {
  colors: {
    primary: '#2196f3',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    border: '#e0e0e0',
    disabled: '#bdbdbd',
    textDisabled: '#9e9e9e',
    hover: '#f0f0f0',
    pressed: '#e0e0e0',
    shadow: '#000000',
    onPrimary: '#ffffff',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  utils: {
    rtlTextAlign: () => ({ textAlign: 'right' }),
    rtlFlexDirection: () => ({ flexDirection: 'row-reverse' }),
  },
  typography: {
    title: {
      medium: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
      },
    },
    body: {
      medium: {
        fontSize: 14,
        textAlign: 'right',
      },
      large: {
        fontSize: 16,
        textAlign: 'right',
      },
      small: {
        fontSize: 12,
        textAlign: 'right',
      },
    },
    label: {
      large: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
      },
      medium: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
      },
    },
  },
};

export default fallbackTheme;
