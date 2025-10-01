import { typography } from '../typography';

export const buttonThemes = (colors, isRTL = true) => {
  // Safe typography access with fallbacks
  let typographyStyles;
  try {
    typographyStyles = typography(isRTL);
  } catch (error) {
    console.error('Error loading typography in button theme:', error);
    // Fallback typography
    typographyStyles = {
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
      title: {
        small: {
          fontSize: 14,
          fontWeight: '500',
          textAlign: 'center',
        },
      },
    };
  }

  const baseStyles = {
    container: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
      paddingVertical: 12,
      paddingHorizontal: 16,
      minHeight: 44,
    },
    text: {
      ...(typographyStyles.label?.large || {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
      }),
    },
    icon: {
      marginRight: isRTL ? 0 : 8,
      marginLeft: isRTL ? 8 : 0,
    },
  };

  return {
    base: baseStyles,

    // Variants
    variants: {
      filled: {
        container: {
          backgroundColor: colors.primary || '#2196f3',
          borderColor: colors.primary || '#2196f3',
        },
        text: {
          color: colors.onPrimary || '#ffffff',
        },
        icon: {
          tintColor: colors.onPrimary || '#ffffff',
        },
        states: {
          disabled: {
            container: {
              backgroundColor: colors.disabled || '#bdbdbd',
              borderColor: colors.disabled || '#bdbdbd',
            },
            text: {
              color: colors.textDisabled || '#9e9e9e',
            },
          },
          pressed: {
            container: {
              backgroundColor: colors.pressed || '#e0e0e0',
            },
          },
        },
      },

      outlined: {
        container: {
          backgroundColor: 'transparent',
          borderColor: colors.primary || '#2196f3',
        },
        text: {
          color: colors.primary || '#2196f3',
        },
        icon: {
          tintColor: colors.primary || '#2196f3',
        },
        states: {
          disabled: {
            container: {
              borderColor: colors.disabled || '#bdbdbd',
            },
            text: {
              color: colors.textDisabled || '#9e9e9e',
            },
          },
          pressed: {
            container: {
              backgroundColor: colors.hover || '#f0f0f0',
            },
          },
        },
      },

      text: {
        container: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        text: {
          color: colors.primary || '#2196f3',
        },
        icon: {
          tintColor: colors.primary || '#2196f3',
        },
        states: {
          disabled: {
            text: {
              color: colors.textDisabled || '#9e9e9e',
            },
          },
          pressed: {
            container: {
              backgroundColor: colors.hover || '#f0f0f0',
            },
          },
        },
      },
    },

    // Sizes
    sizes: {
      small: {
        container: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          minHeight: 36,
        },
        text: {
          ...(typographyStyles.label?.medium || {
            fontSize: 12,
            fontWeight: '500',
            textAlign: 'center',
          }),
        },
        icon: {
          width: 16,
          height: 16,
        },
      },

      medium: {
        container: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          minHeight: 44,
        },
        text: {
          ...(typographyStyles.label?.large || {
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
          }),
        },
        icon: {
          width: 20,
          height: 20,
        },
      },

      large: {
        container: {
          paddingVertical: 16,
          paddingHorizontal: 24,
          minHeight: 52,
        },
        text: {
          ...(typographyStyles.title?.small || {
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
          }),
        },
        icon: {
          width: 24,
          height: 24,
        },
      },
    },
  };
};

export default buttonThemes;
