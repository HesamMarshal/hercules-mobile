import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export function AuthScreen() {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [isLoading, setIsLoading] = useState(false);
  const { requestOTP, verifyOTP } = useAuth();

  const handleRequestOTP = async () => {
    if (!mobile.trim() || mobile.length !== 11) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    try {
      await requestOTP(mobile);
      setStep('otp');
      Alert.alert('Success', 'OTP sent to your mobile');
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!code.trim() || code.length !== 5) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP({ mobile, code });
      // Navigation happens automatically via auth state change
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hercules Fitness</Text>
      
      {step === 'mobile' ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            maxLength={11}
          />
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRequestOTP}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.subtitle}>Enter OTP sent to {mobile}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
            maxLength={6}
          />
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleVerifyOTP}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep('mobile')}>
            <Text style={styles.backText}>Change mobile number</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
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
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backText: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 15,
  },
});
