// src/screens/Workouts/EditWorkoutScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Text, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { workoutAPI } from '@/services/workoutsApi';
import { Workout } from '@/interfaces/workout.interface';
import { createWorkoutStyles as styles } from '@/theme/workouts.style';
// import { CacheService } from '@/services/CacheService';
import { EditWorkoutRouteProp, EditWorkoutNavigationProp } from '@/types/navigation.type';

interface EditWorkoutScreenProps {
  route: EditWorkoutRouteProp;
  navigation: EditWorkoutNavigationProp;
}

const EditWorkoutScreen = ({ route, navigation }: EditWorkoutScreenProps) => {
  const { workoutId, planId, planName, onWorkoutUpdated } = route.params;
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    // description: '',
    day_of_week: '',
  });

  useEffect(() => {
    loadWorkout();
  }, []);

  const loadWorkout = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      navigation.goBack();
      return;
    }

    setLoading(true);
    try {
      const workoutData = await workoutAPI.getWorkoutById(workoutId);
      setWorkout(workoutData);
      setFormData({
        name: workoutData.name || '',
        // description: workoutData.description || '',

        day_of_week: workoutData.day_of_week || '',
      });
    } catch (error: any) {
      console.error('Error loading workout:', error);
      Alert.alert('خطا', 'در بارگذاری اطلاعات تمرین خطایی رخ داد');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateWorkout = async () => {
    if (!formData.name.trim()) {
      Alert.alert('خطا', 'لطفاً نام تمرین را وارد کنید');
      return;
    }

    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    setUpdating(true);

    try {
      const workoutData: Partial<Workout> = {
        name: formData.name.trim(),
        // description: formData.description.trim(),
        ...(formData.day_of_week && { day_of_week: formData.day_of_week }),
      };

      await workoutAPI.updateWorkout(workoutId, workoutData);

      // Clear cache for workouts of this plan
      const workoutCacheKey = `workouts_by_plan_${planId}`;
      //   await CacheService.remove(workoutCacheKey);

      // Also clear the general plans cache
      //   await CacheService.remove('plans_all');

      // Call the callback to refresh plans list
      // TODO: Go to workout page
      route.params?.onWorkoutUpdated?.();

      // Navigate back
      navigation.goBack();

      //   Alert.alert('موفقیت', 'تمرین با موفقیت به‌روزرسانی شد', [
      //     {
      //       text: 'باشه',
      //       onPress: () => {
      //         // Call the callback to refresh workouts list
      //         if (onWorkoutUpdated) {
      //           onWorkoutUpdated();
      //         }
      //         navigation.goBack();
      //       },
      //     },
      //   ]);
    } catch (error: any) {
      console.error('Error updating workout:', error);
      Alert.alert('خطا', 'در به‌روزرسانی تمرین خطایی رخ داد. لطفاً مجدداً تلاش کنید.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>در حال بارگذاری اطلاعات تمرین...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>ویرایش تمرین</Title>
          <Text style={styles.subtitle}>برای پلن: {planName}</Text>

          {/* Workout Name */}
          <TextInput
            label="نام تمرین *"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="format-letter-case" />}
          />

          {/* Description */}
          {/* <TextInput
            label="توضیحات"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            right={<TextInput.Icon icon="text" />}
          /> */}

          {/* Duration */}
          {/* <TextInput
            label="مدت زمان (دقیقه)"
            value={formData.duration}
            onChangeText={(value) => handleInputChange('duration', value)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            right={<TextInput.Icon icon="clock-outline" />}
          /> */}

          {/* Difficulty */}
          {/* <View style={styles.section}>
            <Text style={styles.label}>سطح سختی</Text>
            <View style={styles.radioGroup}>
              <Button
                mode={formData.difficulty === 'beginner' ? 'contained' : 'outlined'}
                onPress={() => handleInputChange('difficulty', 'beginner')}
                style={styles.radioButton}
              >
                مبتدی
              </Button>
              <Button
                mode={formData.difficulty === 'intermediate' ? 'contained' : 'outlined'}
                onPress={() => handleInputChange('difficulty', 'intermediate')}
                style={styles.radioButton}
              >
                متوسط
              </Button>
              <Button
                mode={formData.difficulty === 'advanced' ? 'contained' : 'outlined'}
                onPress={() => handleInputChange('difficulty', 'advanced')}
                style={styles.radioButton}
              >
                پیشرفته
              </Button>
            </View>
          </View> */}

          {/* Day of Week */}
          <TextInput
            label="روز هفته (اختیاری)"
            value={formData.day_of_week}
            onChangeText={(value) => handleInputChange('day_of_week', value)}
            mode="outlined"
            style={styles.input}
            placeholder="مثلاً: دوشنبه"
            right={<TextInput.Icon icon="calendar" />}
          />

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
              disabled={updating}
            >
              انصراف
            </Button>
            <Button
              mode="contained"
              onPress={handleUpdateWorkout}
              style={styles.submitButton}
              loading={updating}
              disabled={updating || !formData.name.trim()}
            >
              به‌روزرسانی
            </Button>
          </View>

          {updating && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>در حال به‌روزرسانی تمرین...</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default EditWorkoutScreen;
