import { typography } from '../typography';

export const inputThemes = (colors, isRTL = true) => {
  // Safe typography access with fallbacks
  let typographyStyles;
  try {
    typographyStyles = typography(isRTL);
  } catch (error) {
    console.error('Error loading typography in input theme:', error);
    // Fallback typography
    typographyStyles = {
      body: {
        large: {
          fontSize: 16,
          textAlign: isRTL ? 'right' : 'left',
        },
        medium: {
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        },
        small: {
          fontSize: 12,
          textAlign: isRTL ? 'right' : 'left',
        },
      },
      title: {
        small: {
          fontSize: 14,
          fontWeight: '500',
          textAlign: isRTL ? 'right' : 'left',
        },
      },
    };
  }

  return {
    base: {
      container: {
        marginBottom: 16,
      },
      label: {
        ...(typographyStyles.body?.medium || {
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        }),
        color: colors.text || '#333333',
        marginBottom: 8,
        textAlign: isRTL ? 'right' : 'left',
      },
      inputContainer: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border || '#e0e0e0',
        borderRadius: 8,
        backgroundColor: colors.surface || '#ffffff',
        paddingHorizontal: 12,
      },
      input: {
        flex: 1,
        ...(typographyStyles.body?.large || {
          fontSize: 16,
          textAlign: isRTL ? 'right' : 'left',
        }),
        color: colors.text || '#333333',
        textAlign: isRTL ? 'right' : 'left',
        paddingVertical: 12,
        writingDirection: isRTL ? 'rtl' : 'ltr',
      },
      icon: {
        marginRight: isRTL ? 0 : 8,
        marginLeft: isRTL ? 8 : 0,
        tintColor: colors.textTertiary || '#999999',
      },
      helperText: {
        ...(typographyStyles.body?.small || {
          fontSize: 12,
          textAlign: isRTL ? 'right' : 'left',
        }),
        color: colors.textTertiary || '#999999',
        marginTop: 4,
        textAlign: isRTL ? 'right' : 'left',
      },
      errorText: {
        ...(typographyStyles.body?.small || {
          fontSize: 12,
          textAlign: isRTL ? 'right' : 'left',
        }),
        color: colors.error || '#f44336',
        marginTop: 4,
        textAlign: isRTL ? 'right' : 'left',
      },
    },

    variants: {
      default: {
        inputContainer: {
          borderColor: colors.border || '#e0e0e0',
        },
      },
      focused: {
        inputContainer: {
          borderColor: colors.primary || '#2196f3',
          borderWidth: 2,
        },
      },
      error: {
        inputContainer: {
          borderColor: colors.error || '#f44336',
        },
        label: {
          color: colors.error || '#f44336',
        },
      },
      disabled: {
        inputContainer: {
          backgroundColor: colors.disabled || '#f5f5f5',
          borderColor: colors.borderLight || '#eeeeee',
        },
        input: {
          color: colors.textDisabled || '#9e9e9e',
        },
        label: {
          color: colors.textDisabled || '#9e9e9e',
        },
      },
    },

    sizes: {
      small: {
        input: {
          paddingVertical: 8,
          ...(typographyStyles.body?.medium || {
            fontSize: 14,
            textAlign: isRTL ? 'right' : 'left',
          }),
        },
        inputContainer: {
          paddingHorizontal: 8,
        },
      },
      medium: {
        input: {
          paddingVertical: 12,
          ...(typographyStyles.body?.large || {
            fontSize: 16,
            textAlign: isRTL ? 'right' : 'left',
          }),
        },
        inputContainer: {
          paddingHorizontal: 12,
        },
      },
      large: {
        input: {
          paddingVertical: 16,
          ...(typographyStyles.title?.small || {
            fontSize: 14,
            fontWeight: '500',
            textAlign: isRTL ? 'right' : 'left',
          }),
        },
        inputContainer: {
          paddingHorizontal: 16,
        },
      },
    },
  };
};

export default inputThemes;
