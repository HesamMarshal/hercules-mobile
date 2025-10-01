import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Translation resources
const resources = {
  fa: {
    translation: {
      // Common
      welcome: 'خوش آمدید',
      loading: 'در حال بارگذاری...',
      error: 'خطا',
      success: 'موفقیت',
      retry: 'تلاش مجدد',
      cancel: 'انصراف',
      save: 'ذخیره',
      delete: 'حذف',

      // Authentication
      login: 'ورود',
      logout: 'خروج',
      mobileNumber: 'شماره موبایل',
      enterMobileNumber: 'شماره موبایل خود را وارد کنید',
      sendVerificationCode: 'ارسال کد تأیید',
      verificationCode: 'کد تأیید',
      enterVerificationCode: 'کد تأیید را وارد کنید',
      verify: 'تأیید',
      resendCode: 'ارسال مجدد کد',
      changeMobileNumber: 'تغییر شماره موبایل',

      // Navigation
      profile: 'پروفایل',
      workouts: 'تمرینات',
      exercises: 'حرکات ورزشی',
      settings: 'تنظیمات',

      // Exercises
      searchExercises: 'جستجوی حرکات ورزشی',
      difficulty: 'سطح سختی',
      beginner: 'مبتدی',
      intermediate: 'متوسط',
      advanced: 'پیشرفته',
      equipment: 'تجهیزات',
      instructions: 'دستورالعمل',
      watchVideo: 'تماشای ویدیو',
      noExercisesFound: 'هیچ حرکت ورزشی یافت نشد',

      // Workouts
      duration: 'مدت زمان',
      minutes: 'دقیقه',
      createWorkout: 'ایجاد تمرین',

      // Profile
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      email: 'ایمیل',
      role: 'نقش',
      client: 'کاربر',
      trainer: 'مربی',
      admin: 'مدیر',

      // Settings
      language: 'زبان',
      persian: 'فارسی',
      english: 'انگلیسی',
      notifications: 'اعلان‌ها',
      privacy: 'حریم خصوصی',
      terms: 'قوانین',
      about: 'درباره',
      version: 'نسخه',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fa', // Default to Persian
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
