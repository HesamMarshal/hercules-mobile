import { I18nManager } from 'react-native';
import { useRTL } from '../contexts/RTLContext';

// Helper function for RTL-aware styles
export const rtlStyle = (rtlStyle: any, ltrStyle: any = {}) => {
  return I18nManager.isRTL ? rtlStyle : ltrStyle;
};

// Common RTL style patterns
export const rtlStyles = {
  // Text alignment
  textAlign: I18nManager.isRTL ? 'right' : 'left',
  textAlignRight: I18nManager.isRTL ? 'left' : 'right',

  // Flex directions
  row: I18nManager.isRTL ? 'row-reverse' : 'row',
  rowReverse: I18nManager.isRTL ? 'row' : 'row-reverse',

  // Margins
  marginLeft: I18nManager.isRTL ? 'marginRight' : 'marginLeft',
  marginRight: I18nManager.isRTL ? 'marginLeft' : 'marginRight',

  // Paddings
  paddingLeft: I18nManager.isRTL ? 'paddingRight' : 'paddingLeft',
  paddingRight: I18nManager.isRTL ? 'paddingLeft' : 'paddingRight',

  // Positioning
  left: I18nManager.isRTL ? 'right' : 'left',
  right: I18nManager.isRTL ? 'left' : 'right',
};

// Hook for RTL-aware styles
export const useRTLStyles = () => {
  const { isRTL } = useRTL();

  return {
    // Text styles
    text: {
      textAlign: isRTL ? 'right' : ('left' as 'right' | 'left' | 'center'),
      writingDirection: isRTL ? 'rtl' : ('ltr' as 'rtl' | 'ltr'),
    },

    // Container styles
    container: {
      flexDirection: isRTL ? 'row-reverse' : ('row' as 'row' | 'row-reverse' | 'column'),
    },

    // Input styles
    input: {
      textAlign: isRTL ? 'right' : ('left' as 'right' | 'left' | 'center'),
      writingDirection: isRTL ? 'rtl' : ('ltr' as 'rtl' | 'ltr'),
    },
  };
};
