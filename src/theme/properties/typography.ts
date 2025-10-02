import { Platform } from 'react-native';
import { colors } from './colors';

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

// Font sizes - based on 8px grid system with meaningful names
export const fontSizes = {
  // Micro text - for labels, captions, and fine print
  micro: 12,
  tiny: 13,

  // Small text - for helper text, meta information
  small: 14,
  smallPlus: 15,

  // Body text - for primary content
  body: 16,
  bodyPlus: 17,
  bodyLarge: 18,

  // Heading text - for titles and headings
  heading: 20,
  headingPlus: 24,
  headingLarge: 32,

  // Display text - for prominent headings
  display: 24,
  displayPlus: 28,
  displayLarge: 32,

  // Hero text - for very large headings
  hero: 36,
  heroPlus: 40,
  heroLarge: 48,

  // Jumbo text - for massive display text
  jumbo: 56,
  jumboPlus: 64,
  jumboLarge: 72,
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

// // Line heights
// export const lineHeights = {
//   none: 1,
//   tight: 1.25,
//   normal: 1.5,
//   loose: 1.75,
// };

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

export const typography = {
  h1: {
    fontSize: fontSizes.headingLarge,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: fontSizes.headingPlus,
    fontWeight: 'bold' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: fontSizes.body,
    lineHeight: 24,
  },
  caption: {
    fontSize: fontSizes.small,
    lineHeight: 20,
    color: colors.textSecondary,
  },
};
