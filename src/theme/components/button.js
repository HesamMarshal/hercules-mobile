import typography from '../typography';

export const buttonThemes = (colors, isRTL = true) => ({
  // Base button styles
  base: {
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
      ...typography(isRTL).label.large,
      textAlign: 'center',
    },
    icon: {
      marginRight: isRTL ? 0 : 8,
      marginLeft: isRTL ? 8 : 0,
    },
  },

  // Variants
  variants: {
    filled: {
      container: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      text: {
        color: colors.onPrimary,
      },
      icon: {
        tintColor: colors.onPrimary,
      },
      states: {
        disabled: {
          container: {
            backgroundColor: colors.disabled,
            borderColor: colors.disabled,
          },
          text: {
            color: colors.textDisabled,
          },
        },
        pressed: {
          container: {
            backgroundColor: colors.pressed,
          },
        },
      },
    },

    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
      },
      text: {
        color: colors.primary,
      },
      icon: {
        tintColor: colors.primary,
      },
      states: {
        disabled: {
          container: {
            borderColor: colors.disabled,
          },
          text: {
            color: colors.textDisabled,
          },
        },
        pressed: {
          container: {
            backgroundColor: colors.hover,
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
        color: colors.primary,
      },
      icon: {
        tintColor: colors.primary,
      },
      states: {
        disabled: {
          text: {
            color: colors.textDisabled,
          },
        },
        pressed: {
          container: {
            backgroundColor: colors.hover,
          },
        },
      },
    },

    // Semantic variants
    success: {
      container: {
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
      text: {
        color: colors.onPrimary,
      },
    },

    error: {
      container: {
        backgroundColor: colors.error,
        borderColor: colors.error,
      },
      text: {
        color: colors.onPrimary,
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
        ...typography(isRTL).label.medium,
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
        ...typography(isRTL).label.large,
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
        ...typography(isRTL).title.small,
      },
      icon: {
        width: 24,
        height: 24,
      },
    },
  },

  // Utility function to get button styles
  getButtonStyle: (variant = 'filled', size = 'medium', disabled = false, pressed = false) => {
    const variantStyles = buttonThemes(colors, isRTL).variants[variant];
    const sizeStyles = buttonThemes(colors, isRTL).sizes[size];

    let containerStyle = {
      ...buttonThemes(colors, isRTL).base.container,
      ...variantStyles.container,
      ...sizeStyles.container,
    };

    let textStyle = {
      ...buttonThemes(colors, isRTL).base.text,
      ...variantStyles.text,
      ...sizeStyles.text,
    };

    // Apply state styles
    if (disabled && variantStyles.states?.disabled) {
      containerStyle = { ...containerStyle, ...variantStyles.states.disabled.container };
      textStyle = { ...textStyle, ...variantStyles.states.disabled.text };
    } else if (pressed && variantStyles.states?.pressed) {
      containerStyle = { ...containerStyle, ...variantStyles.states.pressed.container };
    }

    return { container: containerStyle, text: textStyle };
  },
});
