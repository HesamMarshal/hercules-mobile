export const cardThemes = (colors, isRTL = true) => ({
  base: {
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      ...colors.shadows.medium,
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    title: {
      ...typography(isRTL).title.medium,
      color: colors.text,
      textAlign: isRTL ? 'right' : 'left',
      flex: 1,
    },
    subtitle: {
      ...typography(isRTL).body.medium,
      color: colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
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
        ...colors.shadows.medium,
      },
    },
    outlined: {
      container: {
        shadowColor: 'transparent',
        elevation: 0,
        borderWidth: 1,
        borderColor: colors.border,
      },
    },
    filled: {
      container: {
        shadowColor: 'transparent',
        elevation: 0,
        backgroundColor: colors.surfaceVariant,
      },
    },
  },
});
