export enum AuthMessage {
  InvalidMobileNumber = 'لطفاً یک شماره موبایل معتبر وارد کنید',

  OtpSent = 'کد یکبار مصرف ارسال شد',
  OtpWrong = 'کد یکبار مصرف اشتباه است',
  OtpExpired = 'کد تایید منقضی شده است',
  OtpNotExpired = 'کد تایید منقضی نشده است',

  LoggedIn = 'با موفقیت وارد حساب کاربری خود شدید',
  TryAgain = 'دوباره تلاش کنید',

  MobileExist = 'شماره موبایل وارد شده قبلا ثبت شده است',
  EmailExist = 'ایمیل وارد شده قبلا ثبت شده است',

  LoginAgain = 'مجدد وارد حساب کاربری خود شوید',
  LoginIsRequired = 'وارد حساب کاربری خود شوید',
  AccountNotFound = 'حساب کاربری پیدا نشد.',
}
