import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  I18nManager,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useRTLStyles } from '@/utils/rtlStyles';
import { authStyles as styles } from '@/theme/styles';

export function AuthScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [isLoading, setIsLoading] = useState(false);
  const { requestOTP, verifyOTP, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const rtlStyles = useRTLStyles();

  // Redirect when authenticated (has tokens)
  useEffect(() => {
    // TODO: Use Message.enum
    console.log('AuthScreen - isAuthenticated changed:', isAuthenticated);
    if (isAuthenticated) {
      console.log('User has tokens, navigating to Profile...');
      navigation.replace('Profile');
    }
  }, [isAuthenticated, navigation]);

  const handleRequestOTP = async () => {
    const mobileDigits = mobile.replace(/\D/g, '');

    if (!mobileDigits.trim() || mobileDigits.length < 10) {
      Alert.alert(t('error'), 'لطفاً یک شماره موبایل معتبر وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      await requestOTP(mobileDigits);
      setStep('otp');
      Alert.alert(t('success'), 'کد تأیید به شماره موبایل شما ارسال شد');
    } catch (error: any) {
      console.error('OTP Request Error:', error);
      Alert.alert(t('error'), error.message || 'ارسال کد تأیید ناموفق بود');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!code.trim() || code.length < 4) {
      Alert.alert(t('error'), 'لطفاً یک کد تأیید معتبر وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      const mobileDigits = mobile.replace(/\D/g, '');
      // console.log('Starting OTP verification...');
      await verifyOTP({ mobile: mobileDigits, code });
      // console.log('OTP verification function completed');
      // Navigation will be handled by the useEffect above
    } catch (error: any) {
      console.error('OTP Verification Error:', error);
      Alert.alert(t('error'), error.message || 'کد تأیید نامعتبر است');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMobileNumber = (input: string) => {
    const digits = input.replace(/\D/g, '');

    // Persian mobile number format
    if (digits.length <= 4) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    } else {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
    }
  };

  const handleMobileChange = (text: string) => {
    const formatted = formatMobileNumber(text);
    setMobile(formatted);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.title}>Hercules Fitness</Text> */}
        <Text style={[styles.title, rtlStyles.text]}>{t('welcome')}</Text>
        {/* TODO : USE t() for hercules  */}
        <Text style={[styles.subtitle, rtlStyles.text]}>هرکولس فیتنس</Text>

        {step === 'mobile' ? (
          <View style={styles.form}>
            <Text style={styles.instruction}>{t('enterMobileNumber')}</Text>
            <TextInput
              style={styles.input}
              placeholder="09XX XXX XXXX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={handleMobileChange}
              maxLength={13}
              autoFocus={true}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            {/* TODO: CAn be used:
             <Button 
              mode="contained" 
              onPress={handleRequestOTP}
              loading={isLoading}
              disabled={isLoading || mobile.replace(/\D/g, '').length < 10}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >              */}
            <TouchableOpacity
              style={[
                styles.button,
                (isLoading || mobile.replace(/\D/g, '').length < 10) && styles.buttonDisabled,
              ]}
              onPress={handleRequestOTP}
              disabled={isLoading || mobile.replace(/\D/g, '').length < 10}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'در حال ارسال...' : t('sendVerificationCode')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={[styles.subtitle]}>{t('enterVerificationCode')}</Text>
            <Text style={[styles.mobileNumber]}>{mobile}</Text>
            <TextInput
              style={styles.input}
              placeholder="کد 5 رقمی را وارد کنید"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
              maxLength={5}
              autoFocus={true}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />

            {/* TODO: can be replaced:
            
            <Button 
              mode="contained" 
              onPress={handleVerifyOTP}
              loading={isLoading}
              disabled={isLoading || code.length < 4}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              {isLoading ? 'در حال تأیید...' : t('verify')}
            </Button>
            */}
            <TouchableOpacity
              style={[styles.button, (isLoading || code.length < 4) && styles.buttonDisabled]}
              onPress={handleVerifyOTP}
              disabled={isLoading || code.length < 4}
            >
              <Text style={styles.buttonText}>{isLoading ? 'در حال تأیید...' : t('verify')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStep('mobile');
                setCode('');
              }}
              style={styles.backButton}
            >
              <Text style={[styles.backText, rtlStyles.text]}>{t('changeMobileNumber')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
