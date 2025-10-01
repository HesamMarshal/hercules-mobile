import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/services/api';
import { OTPVerificationStyles as styles } from '@/theme/styles';

// import { styles } from './OTPVerificationScreen.styles';

const OTPVerificationScreen = ({ route, navigation }: any) => {
  const { mobileNumber } = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length < 4) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authAPI.verifyOTP(mobileNumber, otp);

      // Store tokens and user data
      await AsyncStorage.setItem('access_token', result.access_token);
      await AsyncStorage.setItem('refresh_token', result.refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));

      // Update auth context
      login(result.user, result.access_token);

      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      if (error.message.includes('Unauthorized') || error.message.includes('Invalid OTP')) {
        setError('Invalid verification code. Please try again.');
      } else {
        setError(error.message || 'Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setTimer(60);
    setCanResend(false);
    setError('');

    try {
      await authAPI.resendOTP(mobileNumber);
      Alert.alert('Success', 'Verification code has been resent');
    } catch (error: any) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const formatMobileNumber = (number: string) => {
    // Format as (XXX) XXX-XXXX
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return number;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card} mode="elevated">
          <Card.Content style={styles.cardContent}>
            {/* Header Section */}
            <View style={styles.header}>
              <Title style={styles.title}>Verify Your Number</Title>
              <Paragraph style={styles.subtitle}>Enter the verification code sent to</Paragraph>
              <Paragraph style={styles.mobileNumber}>{formatMobileNumber(mobileNumber)}</Paragraph>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Paragraph style={styles.errorText}>{error}</Paragraph>
              </View>
            ) : null}

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              <TextInput
                label="Verification Code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                style={styles.otpInput}
                maxLength={6}
                disabled={isLoading}
                mode="outlined"
                autoFocus={true}
                placeholder="Enter 5-digit code"
              />
            </View>

            {/* Verify Button */}
            <Button
              mode="contained"
              onPress={handleVerifyOTP}
              loading={isLoading}
              disabled={isLoading || otp.length < 4}
              style={styles.verifyButton}
              contentStyle={styles.verifyButtonContent}
            >
              Verify Code
            </Button>

            {/* Resend OTP Section */}
            <View style={styles.resendContainer}>
              <Paragraph style={styles.resendText}>Didn't receive the code?</Paragraph>
              <Button
                mode="text"
                onPress={handleResendOTP}
                disabled={!canResend || isLoading}
                style={styles.resendButton}
                labelStyle={styles.resendButtonText}
              >
                {canResend ? 'Resend Code' : `Resend in ${timer}s`}
              </Button>
            </View>

            {/* Back Button */}
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              disabled={isLoading}
            >
              Change Mobile Number
            </Button>
          </Card.Content>
        </Card>

        {/* Loading Overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" />
              <Paragraph style={styles.loadingText}>Verifying...</Paragraph>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPVerificationScreen;
