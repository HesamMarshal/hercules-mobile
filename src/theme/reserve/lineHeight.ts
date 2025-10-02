// Line heights - based on 4px grid system with meaningful names
export const lineHeights = {
  // Tight line heights - for compact text
  tight: 12,
  tightPlus: 14,
  tightLarge: 16,

  // Normal line heights - for comfortable reading
  normal: 18,
  normalPlus: 20,
  normalLarge: 22,

  // Loose line heights - for spacious text
  loose: 24,
  loosePlus: 26,
  looseLarge: 28,

  // Extra loose - for large display text
  xloose: 30,
  xloosePlus: 32,
  xlooseLarge: 36,

  // Hero line heights - for very large text
  hero: 40,
  heroPlus: 44,
  heroLarge: 48,

  // Jumbo line heights - for massive text
  jumbo: 52,
  jumboPlus: 56,
  jumboLarge: 64,
};

// Alternative: Semantic naming for specific use cases
export const semanticLineHeights = {
  // Compact text
  compact: 12,
  dense: 14,
  cozy: 16,

  // Reading text
  readable: 18,
  comfortable: 20,
  spacious: 22,

  // Display text
  display: 24,
  displayComfortable: 28,
  displaySpacious: 32,

  // Hero text
  hero: 36,
  heroComfortable: 40,
  heroSpacious: 44,
};

// Complete line height scale with ratios
export const lineHeightScale = {
  // Tight ratios (1.0-1.2) - for single lines, labels
  micro: {
    value: 12,
    ratio: 1.2, // 10px font × 1.2 = 12px line height
  },
  tiny: {
    value: 14,
    ratio: 1.27, // 11px font × 1.27 = 14px line height
  },

  // Normal ratios (1.3-1.4) - for body text
  small: {
    value: 16,
    ratio: 1.33, // 12px font × 1.33 = 16px line height
  },
  smallPlus: {
    value: 18,
    ratio: 1.38, // 13px font × 1.38 = 18px line height
  },

  // Comfortable ratios (1.4-1.5) - for comfortable reading
  body: {
    value: 20,
    ratio: 1.43, // 14px font × 1.43 = 20px line height
  },
  bodyPlus: {
    value: 22,
    ratio: 1.47, // 15px font × 1.47 = 22px line height
  },
  bodyLarge: {
    value: 24,
    ratio: 1.5, // 16px font × 1.5 = 24px line height
  },

  // Spacious ratios (1.5-1.6) - for headings
  heading: {
    value: 24,
    ratio: 1.33, // 18px font × 1.33 = 24px line height
  },
  headingPlus: {
    value: 26,
    ratio: 1.3, // 20px font × 1.3 = 26px line height
  },
  headingLarge: {
    value: 28,
    ratio: 1.27, // 22px font × 1.27 = 28px line height
  },

  // Display ratios (1.2-1.3) - for large display text
  display: {
    value: 30,
    ratio: 1.25, // 24px font × 1.25 = 30px line height
  },
  displayPlus: {
    value: 34,
    ratio: 1.21, // 28px font × 1.21 = 34px line height
  },
  displayLarge: {
    value: 38,
    ratio: 1.19, // 32px font × 1.19 = 38px line height
  },

  // Hero ratios (1.1-1.2) - for very large text
  hero: {
    value: 42,
    ratio: 1.17, // 36px font × 1.17 = 42px line height
  },
  heroPlus: {
    value: 46,
    ratio: 1.15, // 40px font × 1.15 = 46px line height
  },
  heroLarge: {
    value: 54,
    ratio: 1.13, // 48px font × 1.13 = 54px line height
  },
};

// Component-specific line heights
export const componentLineHeights = {
  // Button text
  button: {
    small: 12,
    medium: 14,
    large: 16,
  },

  // Input text
  input: {
    small: 16,
    medium: 20,
    large: 24,
    label: 14,
    helper: 12,
  },

  // Card text
  card: {
    title: 20,
    subtitle: 18,
    body: 18,
    caption: 14,
  },

  // Navigation
  navigation: {
    tab: 12,
    label: 14,
    header: 24,
  },

  // List items
  list: {
    title: 20,
    subtitle: 18,
    body: 18,
    meta: 14,
  },
};

// Platform-specific line heights
export const platformLineHeights = {
  ios: {
    ...lineHeights,
    // iOS typically uses slightly tighter line heights
    normal: 20,
    normalLarge: 24,
  },
  android: {
    ...lineHeights,
    // Android follows Material Design guidelines
    normal: 20,
    normalLarge: 24,
  },
  web: {
    ...lineHeights,
    // Web can use more granular line heights
    normal: 22,
    normalLarge: 26,
  },
};

// Responsive line heights for different screen sizes
export const responsiveLineHeights = {
  small: {
    // Mobile phones - tighter for small screens
    body: 20,
    heading: 24,
    display: 30,
  },
  medium: {
    // Tablets - normal
    body: 22,
    heading: 26,
    display: 34,
  },
  large: {
    // Desktop - more spacious
    body: 24,
    heading: 28,
    display: 38,
  },
  xlarge: {
    // Large screens - very spacious
    body: 26,
    heading: 30,
    display: 42,
  },
};

// Line height ratios for different content types
export const lineHeightRatios = {
  // Single line text (labels, buttons)
  single: 1.0,
  singleTight: 1.1,
  singleComfortable: 1.2,

  // Multi-line text (paragraphs, body content)
  multi: 1.3,
  multiComfortable: 1.4,
  multiSpacious: 1.5,
  multiVerySpacious: 1.6,

  // Headings
  headingTight: 1.1,
  headingNormal: 1.2,
  headingSpacious: 1.3,

  // Display text
  displayTight: 1.0,
  displayNormal: 1.1,
  displaySpacious: 1.2,

  // Hero text
  heroTight: 0.9,
  heroNormal: 1.0,
  heroSpacious: 1.1,
};

// Line height utilities and helper functions
export const lineHeightUtils = {
  // Calculate line height from font size and ratio
  calculate: (fontSize, ratio = 1.4) => Math.round(fontSize * ratio),

  // Get optimal line height for a given font size and content type
  getOptimal: (fontSize, contentType = 'body') => {
    const ratios = {
      label: 1.2,
      button: 1.2,
      body: 1.4,
      heading: 1.2,
      display: 1.1,
      hero: 1.0,
    };

    const ratio = ratios[contentType] || 1.4;
    return Math.round(fontSize * ratio);
  },

  // Convert line height to relative unit
  toRelative: (lineHeight, fontSize) => lineHeight / fontSize,

  // Check if line height is within optimal range
  isOptimal: (lineHeight, fontSize, minRatio = 1.2, maxRatio = 1.6) => {
    const ratio = lineHeight / fontSize;
    return ratio >= minRatio && ratio <= maxRatio;
  },

  // Get line height category based on ratio
  getCategory: (ratio) => {
    if (ratio < 1.2) return 'tight';
    if (ratio < 1.4) return 'normal';
    if (ratio < 1.6) return 'spacious';
    return 'very-spacious';
  },

  // Generate line height scale from base
  generateScale: (baseLineHeight, scaleFactor = 1.2) => ({
    tight: Math.round(baseLineHeight / scaleFactor),
    normal: baseLineHeight,
    loose: Math.round(baseLineHeight * scaleFactor),
    xloose: Math.round(baseLineHeight * scaleFactor * scaleFactor),
  }),
};

// Complete line height system for typography
export const typographyLineHeights = {
  // For use with fontSizes
  micro: lineHeights.tight, // 12
  tiny: lineHeights.tightPlus, // 14
  small: lineHeights.tightLarge, // 16
  smallPlus: lineHeights.normal, // 18
  body: lineHeights.normalPlus, // 20
  bodyPlus: lineHeights.normalLarge, // 22
  bodyLarge: lineHeights.loose, // 24
  heading: lineHeights.loose, // 24
  headingPlus: lineHeights.loosePlus, // 26
  headingLarge: lineHeights.looseLarge, // 28
  display: lineHeights.xloose, // 30
  displayPlus: lineHeights.xloosePlus, // 32
  displayLarge: lineHeights.xlooseLarge, // 36
  hero: lineHeights.hero, // 40
  heroPlus: lineHeights.heroPlus, // 44
  heroLarge: lineHeights.heroLarge, // 48
};

// Complete export
export default {
  lineHeights,
  semanticLineHeights,
  lineHeightScale,
  componentLineHeights,
  platformLineHeights,
  responsiveLineHeights,
  lineHeightRatios,
  lineHeightUtils,
  typographyLineHeights,
};
