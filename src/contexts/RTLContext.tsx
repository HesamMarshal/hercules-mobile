// src/contexts/RTLContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import i18n from '../locales';

interface RTLContextType {
  isRTL: boolean;
  language: string;
  setIsRTL: (rtl: boolean) => void;
  changeLanguage: (lang: 'fa' | 'en') => void;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

// const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(true); // Default to RTL for Persian
  const [language, setLanguage] = useState('fa');

  useEffect(() => {
    // Force RTL layout
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
    }
  }, [isRTL]);

  const changeLanguage = (lang: 'fa' | 'en') => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsRTL(lang === 'fa');

    // Force RTL for Persian, LTR for English
    I18nManager.forceRTL(lang === 'fa');
  };

  return (
    <RTLContext.Provider value={{ isRTL, setIsRTL, language, changeLanguage }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
