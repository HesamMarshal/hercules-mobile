import { colors, lightColors, darkColors } from './colors';
import { typography, fontFamily, fontWeights, lineHeights } from './typography';
import { spacing, layout } from './spacing';
import { buttonThemes } from './components/button';
import { inputThemes } from './components/input';
import { cardThemes } from './components/card';

// Platform-specific adjustments
import { Platform } from 'react-native';

// Safe component theme creator
const createComponentTheme = (themeCreator, colors, isRTL) => {
  try {
    return themeCreator(colors, isRTL);
  } catch (error) {
    console.error('Error creating component theme:', error);
    return {};
  }
};

export const createTheme = (mode = 'light', isRTL = true) => {
  const baseColors = mode === 'light' ? lightColors : darkColors;

  // Create component themes safely
  const buttonTheme = createComponentTheme(buttonThemes, baseColors, isRTL);
  const inputTheme = createComponentTheme(inputThemes, baseColors, isRTL);
  const cardTheme = createComponentTheme(cardThemes, baseColors, isRTL);

  return {
    // Color system
    colors: baseColors,

    // Typography system
    typography: typography(isRTL),
    fontFamily,
    fontWeights,
    lineHeights,

    // Layout system
    spacing,
    layout,

    // Component themes
    components: {
      button: buttonTheme,
      input: inputTheme,
      card: cardTheme,
    },

    // Theme metadata
    mode,
    isRTL,

    // Utility functions
    utils: {
      // RTL-aware spacing
      rtlSpacing: (left, right = left) => ({
        [isRTL ? 'paddingRight' : 'paddingLeft']: left,
        [isRTL ? 'paddingLeft' : 'paddingRight']: right,
      }),

      // RTL-aware margin
      rtlMargin: (left, right = left) => ({
        [isRTL ? 'marginRight' : 'marginLeft']: left,
        [isRTL ? 'marginLeft' : 'marginRight']: right,
      }),

      // RTL-aware border radius
      rtlBorderRadius: (
        topLeft,
        topRight = topLeft,
        bottomRight = topLeft,
        bottomLeft = topRight
      ) => ({
        borderTopLeftRadius: isRTL ? topRight : topLeft,
        borderTopRightRadius: isRTL ? topLeft : topRight,
        borderBottomRightRadius: isRTL ? bottomLeft : bottomRight,
        borderBottomLeftRadius: isRTL ? bottomRight : bottomLeft,
      }),

      // RTL text alignment
      rtlTextAlign: () => ({
        textAlign: isRTL ? 'right' : 'left',
      }),

      // RTL flex direction
      rtlFlexDirection: (direction = 'row') => {
        if (direction === 'row') {
          return { flexDirection: isRTL ? 'row-reverse' : 'row' };
        }
        if (direction === 'row-reverse') {
          return { flexDirection: isRTL ? 'row' : 'row-reverse' };
        }
        return { flexDirection: direction };
      },
    },

    // Shadows
    shadows: {
      small: {
        shadowColor: baseColors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
      },
      medium: {
        shadowColor: baseColors.shadow,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 6,
      },
      large: {
        shadowColor: baseColors.shadow,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8.3,
        elevation: 16,
      },
    },

    // Border radius
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
      full: 9999,
    },
  };
};

// Export individual systems for direct usage
export { colors, lightColors, darkColors, typography, spacing, fontFamily };

// Default export
export default createTheme;
