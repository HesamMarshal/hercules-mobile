import { typography } from '../typography';

export const inputThemes = (colors, isRTL = true) => ({
  base: {
    container: {
      marginBottom: 16,
    },
    label: {
      ...typography(isRTL).body.medium,
      color: colors.text,
      marginBottom: 8,
      textAlign: isRTL ? 'right' : 'left',
    },
    inputContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
    },
    input: {
      flex: 1,
      ...typography(isRTL).body.large,
      color: colors.text,
      textAlign: isRTL ? 'right' : 'left',
      paddingVertical: 12,
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    icon: {
      marginRight: isRTL ? 0 : 8,
      marginLeft: isRTL ? 8 : 0,
      tintColor: colors.textTertiary,
    },
    helperText: {
      ...typography(isRTL).body.small,
      color: colors.textTertiary,
      marginTop: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
    errorText: {
      ...typography(isRTL).body.small,
      color: colors.error,
      marginTop: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
  },

  variants: {
    default: {
      inputContainer: {
        borderColor: colors.border,
      },
    },
    focused: {
      inputContainer: {
        borderColor: colors.primary,
        borderWidth: 2,
      },
    },
    error: {
      inputContainer: {
        borderColor: colors.error,
      },
      label: {
        color: colors.error,
      },
    },
    disabled: {
      inputContainer: {
        backgroundColor: colors.disabled,
        borderColor: colors.borderLight,
      },
      input: {
        color: colors.textDisabled,
      },
      label: {
        color: colors.textDisabled,
      },
    },
  },

  sizes: {
    small: {
      input: {
        paddingVertical: 8,
        ...typography(isRTL).body.medium,
      },
      inputContainer: {
        paddingHorizontal: 8,
      },
    },
    medium: {
      input: {
        paddingVertical: 12,
        ...typography(isRTL).body.large,
      },
      inputContainer: {
        paddingHorizontal: 12,
      },
    },
    large: {
      input: {
        paddingVertical: 16,
        ...typography(isRTL).title.small,
      },
      inputContainer: {
        paddingHorizontal: 16,
      },
    },
  },
});
