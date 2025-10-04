// src/screens/Workouts/CreateWorkoutScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Text, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { workoutAPI } from '@/services/workoutsApi';
import { Workout } from '@/interfaces/workout.interface';
import { createWorkoutStyles as styles } from '@/theme/workouts.style';
// import { CacheService } from '@/services/CacheService';
import { CreateWorkoutRouteProp, CreateWorkoutNavigationProp } from '@/types/navigation.type';

interface CreateWorkoutScreenProps {
  route: CreateWorkoutRouteProp;
  navigation: CreateWorkoutNavigationProp;
}

const CreateWorkoutScreen = ({ route, navigation }: CreateWorkoutScreenProps) => {
  const { planId, onWorkoutCreated } = route.params;
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    day_of_week: '', //enum
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateWorkout = async () => {
    if (!formData.name.trim()) {
      Alert.alert('خطا', 'لطفاً نام تمرین را وارد کنید');
      return;
    }

    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    setLoading(true);

    try {
      const workoutData: Partial<Workout> = {
        name: formData.name.trim(),
        planId: +planId,
        order: 1,
        ...(formData.day_of_week && { day_of_week: formData.day_of_week }),
      };
      await workoutAPI.createWorkout(workoutData);

      // Call the callback to refresh plans list
      // TODO: Go to workout page
      route.params?.onWorkoutCreated?.();

      // Navigate back
      navigation.goBack();

      //   Alert.alert('موفقیت', 'تمرین جدید با موفقیت ایجاد شد', [
      //     {
      //       text: 'باشه',
      //       onPress: () => {
      //         // Call the callback to refresh workouts list
      //         if (onWorkoutCreated) {
      //           onWorkoutCreated();
      //         }
      //         navigation.goBack();
      //       },
      //     },
      //   ]);
    } catch (error: any) {
      console.error('Error creating workout:', error);
      Alert.alert('خطا', 'در ایجاد تمرین خطایی رخ داد. لطفاً مجدداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>ایجاد تمرین جدید</Title>

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
          <TextInput
            label="توضیحات"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            right={<TextInput.Icon icon="text" />}
          />

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
              disabled={loading}
            >
              انصراف
            </Button>
            <Button
              mode="contained"
              onPress={handleCreateWorkout}
              style={styles.submitButton}
              loading={loading}
              disabled={loading || !formData.name.trim()}
            >
              ایجاد تمرین
            </Button>
          </View>

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>در حال ایجاد تمرین...</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default CreateWorkoutScreen;
