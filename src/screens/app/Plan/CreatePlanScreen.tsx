// src/screens/CreatePlanScreen.tsx
import { planAPI } from '@/services/planApi';
import { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Title, Card } from 'react-native-paper';
import { persianToGregorian, toPersianDate } from '@/utils/date.util';
import { createPlanStyles as styles } from '@/theme/plan.style';

const CreatePlanScreen = ({ navigation, route }: any) => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set default dates when component mounts (optional)
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    // Convert to Persian dates for display (optional defaults)
    setStartDate(toPersianDate(today));
    setEndDate(toPersianDate(thirtyDaysLater));
  }, []);

  const handleCreatePlan = async () => {
    if (!planName.trim()) {
      Alert.alert('خطا', 'لطفاً نام پلن را وارد کنید');
      return;
    }

    // Validate Persian date format if provided (YYYY/MM/DD)
    if (startDate && startDate.trim() !== '') {
      const persianDateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (!persianDateRegex.test(startDate)) {
        Alert.alert(
          'خطا',
          'فرمت تاریخ شروع صحیح نیست. لطفاً از فرمت ۱۴۰۳/۰۱/۰۱ استفاده کنید یا فیلد را خالی بگذارید'
        );
        return;
      }
    }

    if (endDate && endDate.trim() !== '') {
      const persianDateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (!persianDateRegex.test(endDate)) {
        Alert.alert(
          'خطا',
          'فرمت تاریخ پایان صحیح نیست. لطفاً از فرمت ۱۴۰۳/۰۱/۰۱ استفاده کنید یا فیلد را خالی بگذارید'
        );
        return;
      }
    }

    setLoading(true);
    try {
      // Convert Persian dates to Gregorian for backend (if provided)
      const startDateGregorian = startDate ? persianToGregorian(startDate) : null;
      const endDateGregorian = endDate ? persianToGregorian(endDate) : null;

      if (startDate && !startDateGregorian) {
        Alert.alert('خطا', 'تاریخ شروع وارد شده معتبر نیست');
        return;
      }

      if (endDate && !endDateGregorian) {
        Alert.alert('خطا', 'تاریخ پایان وارد شده معتبر نیست');
        return;
      }

      // Prepare data for API call
      const planData: any = {
        name: planName.trim(),
      };

      // Only add dates if they are provided and valid
      if (startDateGregorian) {
        planData.start_date = startDateGregorian;
      }

      if (endDateGregorian) {
        planData.end_date = endDateGregorian;
      }

      // API call to create plan
      await planAPI.createPlan(planData);

      // Call the callback to refresh plans list
      // TODO: Go to workout page
      route.params?.onPlanCreated?.();

      // Navigate back
      navigation.goBack();
    } catch (error: any) {
      console.error('Error creating plan:', error);
      Alert.alert(
        'خطا',
        error.response?.data?.message || 'خطا در ایجاد پلن. لطفاً مجدداً تلاش کنید.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (text: string) => {
    // Remove any non-digit and non-slash characters
    const cleanedText = text.replace(/[^\d/]/g, '');

    // Auto-format as user types (YYYY/MM/DD)
    let formattedText = cleanedText;
    if (cleanedText.length > 4 && cleanedText[4] !== '/') {
      formattedText = cleanedText.slice(0, 4) + '/' + cleanedText.slice(4);
    }
    if (cleanedText.length > 7 && cleanedText[7] !== '/') {
      formattedText = formattedText.slice(0, 7) + '/' + formattedText.slice(7);
    }

    setStartDate(formattedText);

    // Optional: If start date changes and end date exists, adjust end date to maintain 30-day interval
    // This is now optional since dates are not required
    if (formattedText.length === 10 && endDate) {
      try {
        const startGregorian = persianToGregorian(formattedText);
        if (startGregorian) {
          const startDateObj = new Date(startGregorian);
          const newEndDate = new Date(startDateObj);
          newEndDate.setDate(startDateObj.getDate() + 30);
          setEndDate(toPersianDate(newEndDate));
        }
      } catch (error) {
        console.error('Error adjusting end date:', error);
      }
    }
  };

  const handleEndDateChange = (text: string) => {
    // Remove any non-digit and non-slash characters
    const cleanedText = text.replace(/[^\d/]/g, '');

    // Auto-format as user types (YYYY/MM/DD)
    let formattedText = cleanedText;
    if (cleanedText.length > 4 && cleanedText[4] !== '/') {
      formattedText = cleanedText.slice(0, 4) + '/' + cleanedText.slice(4);
    }
    if (cleanedText.length > 7 && cleanedText[7] !== '/') {
      formattedText = formattedText.slice(0, 7) + '/' + formattedText.slice(7);
    }

    setEndDate(formattedText);
  };

  const clearStartDate = () => {
    setStartDate('');
  };

  const clearEndDate = () => {
    setEndDate('');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>ایجاد پلن جدید</Title>

          <TextInput
            label="نام پلن *"
            value={planName}
            onChangeText={setPlanName}
            style={styles.input}
            mode="outlined"
            placeholder="نام پلن تمرینی خود را وارد کنید"
            autoFocus
          />

          <TextInput
            label="تاریخ شروع (اختیاری)"
            value={startDate}
            onChangeText={handleStartDateChange}
            style={styles.input}
            mode="outlined"
            placeholder="۱۴۰۳/۰۱/۰۱"
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            right={startDate ? <TextInput.Icon icon="close" onPress={clearStartDate} /> : null}
          />

          <TextInput
            label="تاریخ پایان (اختیاری)"
            value={endDate}
            onChangeText={handleEndDateChange}
            style={styles.input}
            mode="outlined"
            placeholder="۱۴۰۳/۰۱/۳۱"
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            right={endDate ? <TextInput.Icon icon="close" onPress={clearEndDate} /> : null}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={[styles.button, styles.cancelButton]}
              disabled={loading}
            >
              لغو
            </Button>
            <Button
              mode="contained"
              onPress={handleCreatePlan}
              loading={loading}
              disabled={!planName.trim()}
              style={styles.button}
            >
              ایجاد پلن
            </Button>
          </View>

          <View style={styles.noteContainer}>
            <Title style={styles.noteTitle}>نکات:</Title>
            <Text style={styles.noteText}>• فقط نام پلن اجباری است</Text>
            <Text style={styles.noteText}>• تاریخ‌ها اختیاری هستند</Text>
            <Text style={styles.noteText}>• برای پاک کردن تاریخ، روی آیکون ✕ کلیک کنید</Text>
            <Text style={styles.noteText}>• فرمت تاریخ: YYYY/MM/DD (سال/ماه/روز) - شمسی</Text>
            <Text style={styles.noteText}>• تاریخ‌ها به صورت خودکار به میلادی تبدیل می‌شوند</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default CreatePlanScreen;
