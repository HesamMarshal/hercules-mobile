import { typography } from '../typography';

export const cardThemes = (colors, isRTL = true) => {
  // Safe typography access with fallbacks
  let typographyStyles;
  try {
    typographyStyles = typography(isRTL);
  } catch (error) {
    console.error('Error loading typography in card theme:', error);
    // Fallback typography
    typographyStyles = {
      title: {
        medium: {
          fontSize: 16,
          fontWeight: '500',
          textAlign: isRTL ? 'right' : 'left',
        },
      },
      body: {
        medium: {
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        },
      },
    };
  }

  return {
    base: {
      container: {
        backgroundColor: colors.surface || '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: colors.shadow || '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
      },
      header: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
      },
      title: {
        ...(typographyStyles.title?.medium || {
          fontSize: 16,
          fontWeight: '500',
          textAlign: isRTL ? 'right' : 'left',
        }),
        color: colors.text || '#333333',
        flex: 1,
      },
      subtitle: {
        ...(typographyStyles.body?.medium || {
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        }),
        color: colors.textSecondary || '#666666',
        marginTop: 4,
      },
      content: {
        marginTop: 8,
      },
      actions: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 16,
        gap: 8,
      },
    },

    variants: {
      elevated: {
        container: {
          shadowColor: colors.shadow || '#000000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4.65,
          elevation: 6,
        },
      },
      outlined: {
        container: {
          shadowColor: 'transparent',
          elevation: 0,
          borderWidth: 1,
          borderColor: colors.border || '#e0e0e0',
        },
      },
      filled: {
        container: {
          shadowColor: 'transparent',
          elevation: 0,
          backgroundColor: colors.surfaceVariant || '#f5f5f5',
        },
      },
    },
  };
};

export default cardThemes;
