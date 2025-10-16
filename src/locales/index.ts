import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fa from './fa.json';

// Translation resources

// const resources = {
//   en: {
//     translation: en,
//   },
//   fa: {
//     translation: fa,
//   },
// };

const resources = {
  fa: {
    translation: {
      // Common
      appName: 'آرناد',
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
      sendVerificationCode: 'ارسال رمز یکبار مصرف',
      verificationCode: 'کد تأیید',
      enterVerificationCode: 'کد تأیید را وارد کنید',
      verify: 'تأیید',
      resendCode: 'ارسال مجدد کد',
      changeMobileNumber: 'تغییر شماره موبایل',

      // Navigation
      profile: 'پروفایل',
      plans: 'برنامه ها',
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
      client: 'ورزشکار',
      trainer: 'مربی',
      admin: 'مدیر',
      age: 'سن',
      years: 'سال',
      days: 'روز',
      score: 'امتیاز',

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
  // fallbackLng: 'fa',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
  react: {
    useSuspense: false,
  },
  // compatibilityJSON: 'v3',
});

export default i18n;
