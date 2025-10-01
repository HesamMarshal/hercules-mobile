import { Platform } from 'react-native';

// Font families with Persian support
export const fontFamily = {
  // Persian fonts (Vazir is a popular Persian font)
  persian: {
    regular: 'Vazir',
    medium: 'Vazir-Medium',
    bold: 'Vazir-Bold',
    light: 'Vazir-Light',
    thin: 'Vazir-Thin',
  },

  // English fonts
  english: {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
    light: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
    thin: Platform.OS === 'ios' ? 'System' : 'Roboto-Thin',
  },
};

// Font weights
export const fontWeights = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
};

// Line heights
export const lineHeights = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  loose: 1.75,
};

// Typography scale with RTL support
export const typography = (isRTL = true) => {
  const baseFontFamily = isRTL ? fontFamily.persian : fontFamily.english;

  return {
    // Display styles
    display: {
      large: {
        fontFamily: baseFontFamily.regular,
        fontSize: 32,
        lineHeight: 32 * lineHeights.normal,
        fontWeight: fontWeights.regular,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
      medium: {
        fontFamily: baseFontFamily.regular,
        fontSize: 28,
        lineHeight: 28 * lineHeights.normal,
        fontWeight: fontWeights.regular,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
      small: {
        fontFamily: baseFontFamily.regular,
        fontSize: 24,
        lineHeight: 24 * lineHeights.normal,
        fontWeight: fontWeights.regular,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
    },

    // Headline styles
    headline: {
      large: {
        fontFamily: baseFontFamily.medium,
        fontSize: 20,
        lineHeight: 20 * lineHeights.tight,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
      medium: {
        fontFamily: baseFontFamily.medium,
        fontSize: 18,
        lineHeight: 18 * lineHeights.tight,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
      small: {
        fontFamily: baseFontFamily.medium,
        fontSize: 16,
        lineHeight: 16 * lineHeights.tight,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
    },

    // Title styles
    title: {
      large: {
        fontFamily: baseFontFamily.medium,
        fontSize: 22,
        lineHeight: 28,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
      medium: {
        fontFamily: baseFontFamily.medium,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
      small: {
        fontFamily: baseFontFamily.medium,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0,
      },
    },

    // Body styles
    body: {
      large: {
        fontFamily: baseFontFamily.regular,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: fontWeights.regular,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0.5,
      },
      medium: {
        fontFamily: baseFontFamily.regular,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: fontWeights.regular,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0.25,
      },
      small: {
        fontFamily: baseFontFamily.regular,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: fontWeights.regular,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0.4,
      },
    },

    // Label styles
    label: {
      large: {
        fontFamily: baseFontFamily.medium,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0.1,
      },
      medium: {
        fontFamily: baseFontFamily.medium,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0.5,
      },
      small: {
        fontFamily: baseFontFamily.medium,
        fontSize: 11,
        lineHeight: 16,
        fontWeight: fontWeights.medium,
        textAlign: isRTL ? 'right' : 'left',
        letterSpacing: isRTL ? 0 : 0.5,
      },
    },
  };
};

// Export the typography generator
export default typography;
