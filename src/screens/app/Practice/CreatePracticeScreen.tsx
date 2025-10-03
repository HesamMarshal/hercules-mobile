// src/screens/CreatePracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, I18nManager, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Card,
  ActivityIndicator,
  Chip,
  SegmentedButtons,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { workoutAPI } from '@/services/workoutsApi';

const isRTL = I18nManager.isRTL;

interface Exercise {
  id: string;
  name: string;
  description: string;
  video_url: string;
  primary_muscle_group: string;
  secondary_muscle_group: string;
  equipment: string;
  difficulty: string;
}

interface CreatePracticeScreenProps {
  route: any;
  navigation: any;
}

const CreatePracticeScreen = ({ route, navigation }: CreatePracticeScreenProps) => {
  const { workoutId, onPracticeCreated } = route.params;
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [formData, setFormData] = useState({
    sets: '3',
    reps: '10',
    weight: '0',
    rest_time: '60',
    order: '1',
  });

  const { token } = useAuth();

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [searchQuery, selectedMuscleGroup, exercises]);

  const loadExercises = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    try {
      setLoading(true);
      // Assuming we have an API method to get all exercises
      const exercisesData = await workoutAPI.getAllExercises();
      setExercises(exercisesData || []);
    } catch (error: any) {
      Alert.alert('خطا', 'خطا در بارگذاری تمرین‌ها');
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by muscle group
    if (selectedMuscleGroup !== 'all') {
      filtered = filtered.filter(
        (exercise) =>
          exercise.primary_muscle_group === selectedMuscleGroup ||
          exercise.secondary_muscle_group === selectedMuscleGroup
      );
    }

    setFilteredExercises(filtered);
  };

  const muscleGroups = ['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full body'];

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleFormSubmit = async () => {
    if (!selectedExercise) {
      Alert.alert('خطا', 'لطفاً یک تمرین انتخاب کنید');
      return;
    }

    if (!formData.sets || !formData.reps || !formData.rest_time || !formData.order) {
      Alert.alert('خطا', 'لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    try {
      setLoading(true);

      const practiceData = {
        workout_id: workoutId,
        exercise_id: selectedExercise.id,
        sets: parseInt(formData.sets),
        reps: parseInt(formData.reps),
        weight: parseFloat(formData.weight),
        rest_time: parseInt(formData.rest_time),
        order: parseInt(formData.order),
      };

      await workoutAPI.createPractice(practiceData);

      Alert.alert('موفقیت', 'تمرین با موفقیت اضافه شد', [
        {
          text: 'باشه',
          onPress: () => {
            onPracticeCreated?.();
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('خطا', 'خطا در ایجاد تمرین');
      console.error('Error creating practice:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderExerciseItem = (exercise: Exercise) => (
    <Card
      key={exercise.id}
      style={[
        styles.exerciseCard,
        selectedExercise?.id === exercise.id && styles.selectedExerciseCard,
      ]}
      onPress={() => handleExerciseSelect(exercise)}
    >
      <Card.Content>
        <View style={styles.exerciseHeader}>
          <Text style={[styles.exerciseName, styles.text]}>{exercise.name}</Text>
          {selectedExercise?.id === exercise.id && (
            <MaterialIcons name="check-circle" size={24} color="#007AFF" />
          )}
        </View>

        <Text style={[styles.exerciseDescription, styles.text]} numberOfLines={2}>
          {exercise.description}
        </Text>

        <View style={styles.exerciseTags}>
          <Chip mode="outlined" style={styles.tagChip} textStyle={styles.tagText}>
            {exercise.primary_muscle_group}
          </Chip>
          <Chip mode="outlined" style={styles.tagChip} textStyle={styles.tagText}>
            {exercise.difficulty}
          </Chip>
          <Chip mode="outlined" style={styles.tagChip} textStyle={styles.tagText}>
            {exercise.equipment}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={[styles.title, styles.text]}>افزودن تمرین جدید</Title>

          {/* Exercise Selection Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.text]}>انتخاب تمرین</Text>

            {/* Search Bar */}
            <TextInput
              label="جستجو در تمرین‌ها"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.input}
              mode="outlined"
              right={<TextInput.Icon icon="magnify" />}
            />

            {/* Muscle Group Filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.muscleGroupScroll}
              contentContainerStyle={styles.muscleGroupContainer}
            >
              {muscleGroups.map((muscle) => (
                <Chip
                  key={muscle}
                  selected={selectedMuscleGroup === muscle}
                  onPress={() => setSelectedMuscleGroup(muscle)}
                  style={styles.muscleChip}
                  mode={selectedMuscleGroup === muscle ? 'flat' : 'outlined'}
                >
                  {muscle === 'all' ? 'همه' : muscle}
                </Chip>
              ))}
            </ScrollView>

            {/* Exercises List */}
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            ) : filteredExercises.length > 0 ? (
              <View style={styles.exercisesList}>{filteredExercises.map(renderExerciseItem)}</View>
            ) : (
              <Text style={[styles.noExercisesText, styles.text]}>هیچ تمرینی یافت نشد</Text>
            )}
          </View>

          {/* Practice Parameters Section */}
          {selectedExercise && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, styles.text]}>
                پارامترهای تمرین: {selectedExercise.name}
              </Text>

              <View style={styles.formRow}>
                <TextInput
                  label="تعداد ست‌ها"
                  value={formData.sets}
                  onChangeText={(value) => updateFormData('sets', value)}
                  style={styles.halfInput}
                  mode="outlined"
                  keyboardType="number-pad"
                />
                <TextInput
                  label="تعداد تکرار"
                  value={formData.reps}
                  onChangeText={(value) => updateFormData('reps', value)}
                  style={styles.halfInput}
                  mode="outlined"
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.formRow}>
                <TextInput
                  label="وزن (کیلوگرم)"
                  value={formData.weight}
                  onChangeText={(value) => updateFormData('weight', value)}
                  style={styles.halfInput}
                  mode="outlined"
                  keyboardType="decimal-pad"
                />
                <TextInput
                  label="زمان استراحت (ثانیه)"
                  value={formData.rest_time}
                  onChangeText={(value) => updateFormData('rest_time', value)}
                  style={styles.halfInput}
                  mode="outlined"
                  keyboardType="number-pad"
                />
              </View>

              <TextInput
                label="ترتیب در workout"
                value={formData.order}
                onChangeText={(value) => updateFormData('order', value)}
                style={styles.input}
                mode="outlined"
                keyboardType="number-pad"
                description="تعیین ترتیب نمایش این تمرین در workout"
              />
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
              disabled={loading}
            >
              لغو
            </Button>
            <Button
              mode="contained"
              onPress={handleFormSubmit}
              loading={loading}
              disabled={!selectedExercise || loading}
              style={styles.submitButton}
            >
              افزودن تمرین
            </Button>
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
  text: {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    marginBottom: 12,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  formRow: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    marginBottom: 12,
  },
  muscleGroupScroll: {
    marginBottom: 12,
  },
  muscleGroupContainer: {
    paddingVertical: 8,
  },
  muscleChip: {
    marginHorizontal: 4,
  },
  exercisesList: {
    maxHeight: 300,
  },
  exerciseCard: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedExerciseCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#f0f8ff',
  },
  exerciseHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  exerciseTags: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    margin: 2,
    height: 28,
  },
  tagText: {
    fontSize: 12,
  },
  loader: {
    marginVertical: 20,
  },
  noExercisesText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  actionButtons: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  submitButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default CreatePracticeScreen;
