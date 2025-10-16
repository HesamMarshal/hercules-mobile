import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { List, Button, Divider, Text } from 'react-native-paper';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useRTL } from '@/contexts/RTLContext';
import { settingsStyles as styles } from '@/theme/styles';
import { colors } from '@/theme/properties/colors';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { language, changeLanguage } = useRTL();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
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
        <List.Subheader style={styles.subHeader}>Account</List.Subheader>
        <List.Item
          title="Edit Profile"
          titleStyle={styles.listItem}
          description="Update your personal information"
          descriptionStyle={styles.itemDescription}
          left={(props) => (
            <List.Icon {...props} icon="account-edit" color={colors.textSecondary} />
          )}
          onPress={() => {
            /* Navigate to edit profile */
          }}
        />
        <List.Item
          title="Change Password"
          titleStyle={styles.listItem}
          description="Update your password"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="lock-reset" color={colors.textSecondary} />}
          onPress={() => {
            /* Navigate to change password */
          }}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader style={styles.subHeader}>{t('language')}</List.Subheader>
        <List.Item
          title={t('persian')}
          titleStyle={styles.listItem}
          description="فارسی"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="earth" color={colors.textSecondary} />}
          right={(props) =>
            language === 'fa' ? (
              <List.Icon {...props} icon="check" color={colors.textSecondary} />
            ) : null
          }
          onPress={() => changeLanguage('fa')}
        />
        <List.Item
          title={t('english')}
          titleStyle={styles.listItem}
          description="English"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="earth" color={colors.textSecondary} />}
          right={(props) =>
            language === 'en' ? (
              <List.Icon {...props} icon="check" color={colors.textSecondary} />
            ) : null
          }
          onPress={() => changeLanguage('en')}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader style={styles.subHeader}>Preferences</List.Subheader>
        <List.Item
          title="Notifications"
          titleStyle={styles.listItem}
          description="Manage your notification preferences"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="bell" color={colors.textSecondary} />}
          onPress={() => {
            /* Navigate to notifications */
          }}
        />

        <List.Item
          title="Units"
          titleStyle={styles.listItem}
          description="Metric (kg, cm)"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="ruler" color={colors.textSecondary} />}
          onPress={() => {
            /* Navigate to units settings */
          }}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader style={styles.subHeader}>Support</List.Subheader>
        <List.Item
          title="Help & Support"
          titleStyle={styles.listItem}
          description="Get help with the app"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="help-circle" color={colors.textSecondary} />}
          onPress={() => {
            /* Navigate to help */
          }}
        />
        <List.Item
          title="Contact Us"
          description="Get in touch with our team"
          titleStyle={styles.listItem}
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="email" color={colors.textSecondary} />}
          onPress={() => {
            /* Navigate to contact */
          }}
        />
        <List.Item
          title="About"
          titleStyle={styles.listItem}
          description="App version and information"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="information" color={colors.textSecondary} />}
          onPress={() => {
            /* Navigate to about */
          }}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader style={styles.subHeader}>Data</List.Subheader>
        <List.Item
          title="Clear Cache"
          titleStyle={styles.listItem}
          description="Free up storage space"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="delete" color={colors.textSecondary} />}
          onPress={handleClearCache}
        />
        <List.Item
          title="Export Data"
          titleStyle={styles.listItem}
          description="Download your workout data"
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="download" color={colors.textSecondary} />}
          onPress={() => {
            /* Implement data export */
          }}
        />
      </List.Section>

      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor={colors.error}
        >
          Logout
        </Button>

        <Text style={styles.versionText}>Arnad Fitness v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
