import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { profileStyles as styles } from '@/theme/profile.styles';
import { UserProfile } from '@/interfaces/user.interface';
import { profileAPI } from '@/services/profileApi';
import { t } from 'i18next';
import { calculateAge } from '@/utils/date.util';
import { StyleSheet, I18nManager } from 'react-native';

const ProfileScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();

  const isRTL = I18nManager.isRTL || true;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await profileAPI.getProfile();

      if (!response) {
        logout();
        throw new Error('Failed to fetch user profile');
      }

      setUser(response);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchUserProfile} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {user ? (
            <>
              {user.first_name ? (
                <>
                  <Title style={styles.title}>
                    {user.first_name} {user.last_name}
                  </Title>
                  <View style={styles.infoSection}>
                    <Text style={styles.value}>{t(user.role)}</Text>
                    <Text style={styles.value}>{t('role')}</Text>
                  </View>
                </>
              ) : (
                <Title style={styles.title}>{t('profile')}</Title>
              )}
              <View style={styles.infoSection}>
                <Text style={styles.label}>{t('mobileNumber')}:</Text>
                <Text style={styles.value}>{user.mobile}</Text>
              </View>

              {user.email && (
                <View style={styles.infoSection}>
                  <Text style={styles.label}>{t('email')}:</Text>
                  <Text style={styles.value}>{user.email}</Text>
                </View>
              )}
              {user.birth_date && (
                <View style={styles.infoSection}>
                  <Text style={styles.label}>{t('age')}:</Text>

                  <Text style={styles.value}>
                    {calculateAge(user.birth_date).years} {t('years')},{' '}
                    {calculateAge(user.birth_date).days} {t('days')}{' '}
                  </Text>
                </View>
              )}
              {user.score.toString() && (
                <View style={styles.infoSection}>
                  <Text style={styles.label}>{t('score')}:</Text>
                  <Text style={styles.value}>{user.score}</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <Title style={styles.title}>{t('profile')}</Title>
              <Text style={styles.noData}>No user data available</Text>
            </>
          )}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Exercises')}
        style={styles.button}
      >
        Browse Exercises
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;
