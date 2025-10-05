// src/screens/Practice/CreatePracticeScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Title, Card } from 'react-native-paper';
import { practiceAPI } from '@/services/practiceApi';
import { useAuth } from '@/contexts/AuthContext';
import {
  CreatePracticeScreenRouteProp,
  CreatePracticeScreenNavigationProp,
} from '@/types/navigation.type';

interface CreatePracticeScreenProps {
  route: CreatePracticeScreenRouteProp;
  navigation: CreatePracticeScreenNavigationProp;
}

const CreatePracticeScreen = ({ route, navigation }: CreatePracticeScreenProps) => {
  const { workoutId, workoutName, onPracticeCreated } = route.params;
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    exerciseId: '',
    sets: 3,
    reps: 10,
    weight: 0,
    rest_time: 60,
    order: 1,
  });

  const handleCreatePractice = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    try {
      setLoading(true);
      console.log(workoutId);
      await practiceAPI.createPractice({
        workoutId: workoutId,
        ...formData,
      });

      Alert.alert('موفقیت', 'تمرین با موفقیت ایجاد شد');
      onPracticeCreated();
      navigation.goBack();
    } catch (error: any) {
      console.error('Error creating practice:', error);
      Alert.alert('خطا', 'خطا در ایجاد تمرین. لطفاً مجدداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Card>
        <Card.Content>
          <Title>افزودن تمرین جدید</Title>

          <TextInput
            label="شناسه تمرین"
            value={formData.exerciseId}
            onChangeText={(text) => setFormData({ ...formData, exerciseId: text })}
            style={{ marginBottom: 16 }}
          />

          <TextInput
            label="تعداد ست‌ها"
            value={formData.sets.toString()}
            onChangeText={(text) => setFormData({ ...formData, sets: parseInt(text) || 0 })}
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />

          <TextInput
            label="تعداد تکرار"
            value={formData.reps.toString()}
            onChangeText={(text) => setFormData({ ...formData, reps: parseInt(text) || 0 })}
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />

          <TextInput
            label="وزن (کیلوگرم)"
            value={formData.weight.toString()}
            onChangeText={(text) => setFormData({ ...formData, weight: parseFloat(text) || 0 })}
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />

          <TextInput
            label="زمان استراحت (ثانیه)"
            value={formData.rest_time.toString()}
            onChangeText={(text) => setFormData({ ...formData, rest_time: parseInt(text) || 0 })}
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />

          <Button
            mode="contained"
            onPress={handleCreatePractice}
            loading={loading}
            disabled={loading}
          >
            ایجاد تمرین
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default CreatePracticeScreen;
