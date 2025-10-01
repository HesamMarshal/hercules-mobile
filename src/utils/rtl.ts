// src/utils/rtl.ts
import i18n from '@/locales';
import { I18nManager } from 'react-native';

export const initializeRTL = () => {
  // Force RTL for Persian language
  if (i18n.language === 'fa') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
};

// Call this function when your app starts
