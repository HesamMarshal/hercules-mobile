import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // ✅ added for iOS 15+
    shouldShowList: true, // ✅ added for iOS 15+
  }),
});

export const NotificationService = {
  async registerForPushNotifications() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      throw new Error('Permission not granted for notifications');
    }

    // ✅ New Expo SDK requires projectId
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    return token;
  },

  // async scheduleNotification(title: string, body: string, seconds: number = 5) {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title,
  //       body,
  //       sound: true,
  //     },
  //     trigger: {
  //       type: Notifications.TriggerType.TIME_INTERVAL, // ✅ required
  //       seconds,
  //       repeats: false,
  //     },
  //   });
  // },
};

export async function scheduleNotification(title: string, body: string, seconds: number = 5) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true, // plays default notification sound
    },
    // ✅ Just pass an object or number, no TriggerType needed
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: false,
    },
  });
}
