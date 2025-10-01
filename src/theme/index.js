import { colors, lightColors, darkColors } from './colors';
import { typography, fontFamily, fontWeights, lineHeights } from './typography';
import { spacing, layout } from './spacing';
import { buttonThemes } from './components/button';
import { inputThemes } from './components/input';
import { cardThemes } from './components/card';

// Safe component theme creator
const createComponentTheme = (themeCreator, colors, isRTL) => {
  try {
    const theme = themeCreator(colors, isRTL);
    return theme || {};
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

  // Safe typography
  let typographyStyles;
  try {
    typographyStyles = typography(isRTL);
  } catch (error) {
    console.error('Error creating typography:', error);
    typographyStyles = {
      title: { medium: { fontSize: 16, fontWeight: '500' } },
      body: { medium: { fontSize: 14 } },
      label: { large: { fontSize: 14, fontWeight: '500' } },
    };
  }

  return {
    // Color system
    colors: baseColors,

    // Typography system
    typography: typographyStyles,
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
