// src/screens/Practice/CreatePracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, FlatList, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput, Title, Card, Searchbar, ActivityIndicator } from 'react-native-paper';
import { practiceAPI } from '@/services/practiceApi';
import { exerciseAPI } from '@/services/exerciseApi'; // You'll need to create this
import { useAuth } from '@/contexts/AuthContext';
import {
  CreatePracticeScreenRouteProp,
  CreatePracticeScreenNavigationProp,
} from '@/types/navigation.type';
import { Exercise } from '@/interfaces/exercise.interface';
import { createPracticeStyles } from '@/theme/practice.style';
import { MaterialIcons } from '@expo/vector-icons';

interface CreatePracticeScreenProps {
  route: CreatePracticeScreenRouteProp;
  navigation: CreatePracticeScreenNavigationProp;
}

const CreatePracticeScreen = ({ route, navigation }: CreatePracticeScreenProps) => {
  const { workoutId, workoutName, onPracticeCreated } = route.params;
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [exercisesLoading, setExercisesLoading] = useState(true);

  const [formData, setFormData] = useState({
    sets: 3,
    reps: 10,
    weight: 0,
    rest_time: 60,
    order: 1,
  });

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter(
        (exercise) =>
          exercise.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.body_part?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  }, [searchQuery, exercises]);

  const loadExercises = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    try {
      setExercisesLoading(true);
      // Assuming you have an exerciseAPI with getAllExercises method
      const exercisesData = await exerciseAPI.getAllExercises();
      setExercises(exercisesData || []);
      setFilteredExercises(exercisesData || []);
    } catch (error: any) {
      console.error('Error loading exercises:', error);
      Alert.alert('خطا', 'خطا در بارگذاری لیست تمرین‌ها');
    } finally {
      setExercisesLoading(false);
    }
  };

  const handleCreatePractice = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    if (!selectedExercise) {
      Alert.alert('خطا', 'لطفاً یک تمرین انتخاب کنید');
      return;
    }

    try {
      setLoading(true);
      await practiceAPI.createPractice({
        workoutId: workoutId,
        exerciseId: selectedExercise.id,
        sets: formData.sets,
        reps: formData.reps,
        weight: formData.weight,
        rest_time: formData.rest_time,
        order: formData.order,
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

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      onPress={() => handleExerciseSelect(item)}
      style={[
        createPracticeStyles.exerciseItem,
        selectedExercise?.id === item.id && createPracticeStyles.selectedExerciseItem,
      ]}
    >
      <View style={createPracticeStyles.exerciseInfo}>
        <Text style={createPracticeStyles.exerciseName}>{item.name}</Text>
        <View style={createPracticeStyles.exerciseMeta}>
          {item.category && (
            <Text style={createPracticeStyles.exerciseCategory}>{item.category}</Text>
          )}
          {item.body_part && (
            <Text style={createPracticeStyles.exerciseMuscle}>• {item.body_part}</Text>
          )}
          {item.difficulty && (
            <Text style={createPracticeStyles.exerciseDifficulty}>• {item.difficulty}</Text>
          )}
        </View>
        {/* {item.equipment && (
          <Text style={createPracticeStyles.exerciseEquipment}>تجهیزات: {item.equipment}</Text>
        )} */}
      </View>

      {selectedExercise?.id === item.id && <MaterialIcons name="check" size={24} color="#007AFF" />}
    </TouchableOpacity>
  );

  return (
    <View style={createPracticeStyles.container}>
      <ScrollView style={createPracticeStyles.scrollView}>
        <Card style={createPracticeStyles.card}>
          <Card.Content>
            <Title style={createPracticeStyles.title}>افزودن تمرین جدید</Title>

            {/* Selected Exercise Display */}
            {selectedExercise && (
              <Card style={createPracticeStyles.selectedExerciseCard}>
                <Card.Content>
                  <Text style={createPracticeStyles.selectedExerciseTitle}>تمرین انتخاب شده:</Text>
                  <Text style={createPracticeStyles.selectedExerciseName}>
                    {selectedExercise.name}
                  </Text>
                  <Button
                    mode="outlined"
                    onPress={() => setSelectedExercise(null)}
                    style={createPracticeStyles.changeExerciseButton}
                  >
                    تغییر تمرین
                  </Button>
                </Card.Content>
              </Card>
            )}

            {/* Exercise Selection Section */}
            {!selectedExercise && (
              <View style={createPracticeStyles.exerciseSelectionSection}>
                <Text style={createPracticeStyles.sectionTitle}>انتخاب تمرین</Text>

                {/* Search Bar */}
                <Searchbar
                  placeholder="جستجوی تمرین..."
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={createPracticeStyles.searchBar}
                />

                {/* Exercises List */}
                {exercisesLoading ? (
                  <View style={createPracticeStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={createPracticeStyles.loadingText}>
                      در حال بارگذاری تمرین‌ها...
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredExercises}
                    renderItem={renderExerciseItem}
                    keyExtractor={(item) => item.id}
                    style={createPracticeStyles.exercisesList}
                    contentContainerStyle={createPracticeStyles.exercisesListContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                      <View style={createPracticeStyles.emptyExercises}>
                        <MaterialIcons name="fitness-center" size={48} color="#999" />
                        <Text style={createPracticeStyles.emptyExercisesText}>
                          هیچ تمرینی یافت نشد
                        </Text>
                      </View>
                    }
                  />
                )}
              </View>
            )}

            {/* Practice Details Form */}
            {selectedExercise && (
              <View style={createPracticeStyles.formSection}>
                <Text style={createPracticeStyles.sectionTitle}>
                  جزئیات تمرین: {selectedExercise.name}
                </Text>

                <View style={createPracticeStyles.formRow}>
                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="تعداد ست‌ها"
                      value={formData.sets.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, sets: parseInt(text) || 0 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>

                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="تعداد تکرار"
                      value={formData.reps.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, reps: parseInt(text) || 0 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>
                </View>

                <View style={createPracticeStyles.formRow}>
                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="وزن (کیلوگرم)"
                      value={formData.weight.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, weight: parseFloat(text) || 0 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>

                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="زمان استراحت (ثانیه)"
                      value={formData.rest_time.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, rest_time: parseInt(text) || 0 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>
                </View>

                <TextInput
                  label="ترتیب اجرا"
                  value={formData.order.toString()}
                  onChangeText={(text) => setFormData({ ...formData, order: parseInt(text) || 1 })}
                  keyboardType="numeric"
                  mode="outlined"
                  style={createPracticeStyles.orderInput}
                />
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Create Button */}
      {selectedExercise && (
        <View style={createPracticeStyles.createButtonContainer}>
          <Button
            mode="contained"
            onPress={handleCreatePractice}
            loading={loading}
            disabled={loading}
            style={createPracticeStyles.createButton}
            contentStyle={createPracticeStyles.createButtonContent}
          >
            ایجاد تمرین
          </Button>
        </View>
      )}
    </View>
  );
};

export default CreatePracticeScreen;
