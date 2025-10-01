// Spacing scale (based on 4px grid)
export const spacing = {
  // Micro spacing
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Semantic spacing
  screenPadding: 16,
  sectionPadding: 24,
  componentPadding: 16,
  elementMargin: 8,
  groupMargin: 16,
};

// Layout system
export const layout = {
  // Breakpoints (width in dp)
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  // Container max widths
  container: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
  },

  // Grid columns
  grid: {
    columns: 12,
    gutter: spacing.md,
  },

  // Common dimensions
  dimensions: {
    touchTarget: 44,
    icon: {
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    },
    avatar: {
      sm: 32,
      md: 40,
      lg: 56,
      xl: 72,
    },
    button: {
      sm: 32,
      md: 40,
      lg: 48,
    },
  },
};

export default { spacing, layout };
