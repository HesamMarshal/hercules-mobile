import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

interface User {
  id: string;
  mobileNumber: string;
  role: 'admin' | 'trainer' | 'client';
  firstName?: string;
  lastName?: string;
  email?: string;
}

const ProfileScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError('');

      // logout();
      const response = await fetch(`${API_BASE_URL}/user/my`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (!response.ok) {
        logout();
        throw new Error('Failed  to fetch user profile');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
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
          <Title style={styles.title}>Profile</Title>

          {user ? (
            <>
              <View style={styles.infoSection}>
                <Text style={styles.label}>Mobile Number:</Text>
                <Text style={styles.value}>{user.mobileNumber}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.label}>Role:</Text>
                <Text style={styles.value}>{user.role}</Text>
              </View>

              {user.firstName && (
                <View style={styles.infoSection}>
                  <Text style={styles.label}>First Name:</Text>
                  <Text style={styles.value}>{user.firstName}</Text>
                </View>
              )}

              {user.lastName && (
                <View style={styles.infoSection}>
                  <Text style={styles.label}>Last Name:</Text>
                  <Text style={styles.value}>{user.lastName}</Text>
                </View>
              )}

              {user.email && (
                <View style={styles.infoSection}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{user.email}</Text>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.noData}>No user data available</Text>
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

      <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  button: {
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
