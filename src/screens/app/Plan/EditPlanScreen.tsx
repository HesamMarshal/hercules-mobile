// src/screens/EditPlanScreen.tsx
import { planAPI } from '@/services/planApi';
import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';

const EditPlanScreen = ({ navigation, route }: any) => {
  const {
    planId,
    planName: initialPlanName,
    startDate: initialStartDate,
    endDate: initialEndDate,
    onPlanUpdated,
  } = route.params;

  const [planName, setPlanName] = useState(initialPlanName || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Convert initial Gregorian dates to Persian for display
    if (initialStartDate) {
      try {
        const date = new Date(initialStartDate);
        setStartDate(toPersianDate(date));
      } catch (error) {
        console.error('Error converting initial start date:', error);
        setStartDate('');
      }
    } else {
      setStartDate('');
    }

    if (initialEndDate) {
      try {
        const date = new Date(initialEndDate);
        setEndDate(toPersianDate(date));
      } catch (error) {
        console.error('Error converting initial end date:', error);
        setEndDate('');
      }
    } else {
      setEndDate('');
    }
  }, [initialStartDate, initialEndDate]);

  const handleUpdatePlan = async () => {
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

      // Only add dates if they are provided
      // We'll update the date if it's different from the original OR if it's newly provided
      if (startDateGregorian) {
        planData.start_date = startDateGregorian;
      } else if (initialStartDate && !startDate) {
        // If there was an initial date but now it's empty, we need to clear it
        // This depends on your backend API - if it supports null/empty to clear dates
        planData.start_date = null;
      }

      if (endDateGregorian) {
        planData.end_date = endDateGregorian;
      } else if (initialEndDate && !endDate) {
        // If there was an initial date but now it's empty, we need to clear it
        planData.end_date = null;
      }

      await planAPI.updatePlan(planId, planData);

      onPlanUpdated?.();
      navigation.goBack();

      Alert.alert('موفقیت', 'پلن با موفقیت به‌روزرسانی شد');
    } catch (error: any) {
      console.error('Error updating plan:', error);
      Alert.alert('خطا', error.response?.data?.message || 'خطا در به‌روزرسانی پلن');
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
          <Title style={styles.title}>ویرایش پلن</Title>

          <TextInput
            label="نام پلن *"
            value={planName}
            onChangeText={setPlanName}
            style={styles.input}
            mode="outlined"
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
              onPress={handleUpdatePlan}
              loading={loading}
              disabled={!planName.trim()}
              style={styles.button}
            >
              به‌روزرسانی
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: '#666',
  },
  noteContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  noteTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
});

// Add Text component import
import { Text } from 'react-native';
import { persianToGregorian, toPersianDate } from '@/utils/date.util';

export default EditPlanScreen;
