import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { List, Button, Divider, Text } from 'react-native-paper';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useRTL } from '@/contexts/RTLContext';
import { settingsStyles as styles } from '@/theme/styles';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { language, changeLanguage } = useRTL();
  const { t } = useTranslation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'This will clear all cached data. Continue?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear',
        onPress: () => {
          // TODO: Implement cache clearing
          Alert.alert('Success', 'Cache cleared successfully');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Edit Profile"
          description="Update your personal information"
          left={(props) => <List.Icon {...props} icon="account-edit" />}
          onPress={() => {
            /* Navigate to edit profile */
          }}
        />
        <List.Item
          title="Change Password"
          description="Update your password"
          left={(props) => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => {
            /* Navigate to change password */
          }}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader>Preferences</List.Subheader>
        <List.Item
          title="Notifications"
          description="Manage your notification preferences"
          left={(props) => <List.Icon {...props} icon="bell" />}
          onPress={() => {
            /* Navigate to notifications */
          }}
        />
        <List.Item
          title="Language"
          description="English"
          left={(props) => <List.Icon {...props} icon="translate" />}
          onPress={() => {
            /* Navigate to language settings */
          }}
        />
        <List.Item
          title="Units"
          description="Metric (kg, cm)"
          left={(props) => <List.Icon {...props} icon="ruler" />}
          onPress={() => {
            /* Navigate to units settings */
          }}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader>Support</List.Subheader>
        <List.Item
          title="Help & Support"
          description="Get help with the app"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          onPress={() => {
            /* Navigate to help */
          }}
        />
        <List.Item
          title="Contact Us"
          description="Get in touch with our team"
          left={(props) => <List.Icon {...props} icon="email" />}
          onPress={() => {
            /* Navigate to contact */
          }}
        />
        <List.Item
          title="About"
          description="App version and information"
          left={(props) => <List.Icon {...props} icon="information" />}
          onPress={() => {
            /* Navigate to about */
          }}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader>Data</List.Subheader>
        <List.Item
          title="Clear Cache"
          description="Free up storage space"
          left={(props) => <List.Icon {...props} icon="delete" />}
          onPress={handleClearCache}
        />
        <List.Item
          title="Export Data"
          description="Download your workout data"
          left={(props) => <List.Icon {...props} icon="download" />}
          onPress={() => {
            /* Implement data export */
          }}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>{t('language')}</List.Subheader>
        <List.Item
          title={t('persian')}
          description="فارسی"
          left={(props) => <List.Icon {...props} icon="earth" />}
          right={(props) => (language === 'fa' ? <List.Icon {...props} icon="check" /> : null)}
          onPress={() => changeLanguage('fa')}
        />
        <List.Item
          title={t('english')}
          description="English"
          left={(props) => <List.Icon {...props} icon="earth" />}
          right={(props) => (language === 'en' ? <List.Icon {...props} icon="check" /> : null)}
          onPress={() => changeLanguage('en')}
        />
      </List.Section>
      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor="#d32f2f"
        >
          Logout
        </Button>

        <Text style={styles.versionText}>Hercules Fitness v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
