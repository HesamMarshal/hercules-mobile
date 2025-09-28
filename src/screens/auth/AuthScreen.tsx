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
  ScrollView
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export function AuthScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [isLoading, setIsLoading] = useState(false);
  const { requestOTP, verifyOTP, isAuthenticated } = useAuth();

  // Redirect when authenticated (has tokens)
  useEffect(() => {
    console.log('AuthScreen - isAuthenticated changed:', isAuthenticated);
    if (isAuthenticated) {
      console.log('User has tokens, navigating to Profile...');
      navigation.replace('Profile');
    }
  }, [isAuthenticated, navigation]);

  const handleRequestOTP = async () => {
    const mobileDigits = mobile.replace(/\D/g, '');
    
    if (!mobileDigits.trim() || mobileDigits.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    try {
      await requestOTP(mobileDigits);
      setStep('otp');
      Alert.alert('Success', 'OTP sent to your mobile');
    } catch (error: any) {
      console.error('OTP Request Error:', error);
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!code.trim() || code.length < 4) {
      Alert.alert('Error', 'Please enter a valid OTP');
      return;
    }

    setIsLoading(true);
    try {
      const mobileDigits = mobile.replace(/\D/g, '');
      console.log('Starting OTP verification...');
      await verifyOTP({ mobile: mobileDigits, code });
      console.log('OTP verification function completed');
      // Navigation will be handled by the useEffect above
    } catch (error: any) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', error.message || 'Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMobileNumber = (input: string) => {
    const digits = input.replace(/\D/g, '');
    
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
        <Text style={styles.title}>Hercules Fitness</Text>
        
        {step === 'mobile' ? (
          <View style={styles.form}>
            <Text style={styles.instruction}>
              Enter your mobile number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="09XX XXX XXXX"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={handleMobileChange}
              maxLength={13}
              autoFocus={true}
            />
            <TouchableOpacity 
              style={[styles.button, (isLoading || mobile.replace(/\D/g, '').length < 10) && styles.buttonDisabled]}
              onPress={handleRequestOTP}
              disabled={isLoading || mobile.replace(/\D/g, '').length < 10}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.subtitle}>Enter OTP sent to</Text>
            <Text style={styles.mobileNumber}>{mobile}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 5-digit OTP"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
              maxLength={6}
              autoFocus={true}
            />
            <TouchableOpacity 
              style={[styles.button, (isLoading || code.length < 4) && styles.buttonDisabled]}
              onPress={handleVerifyOTP}
              disabled={isLoading || code.length < 4}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setStep('mobile');
                setCode('');
              }}
              style={styles.backButton}
            >
              <Text style={styles.backText}>Change mobile number</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
    textAlign: 'center',
  },
  mobileNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#007AFF',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});