// src/screens/Practice/EditPracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, FlatList, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput, Title, Card, Searchbar, ActivityIndicator } from 'react-native-paper';
import { practiceAPI } from '@/services/practiceApi';
import { exerciseAPI } from '@/services/exerciseApi';
import { useAuth } from '@/contexts/AuthContext';
import {
  EditPracticeScreenRouteProp,
  EditPracticeScreenNavigationProp,
} from '@/types/navigation.type';
import { Practice } from '@/interfaces/practice.interface';
import { Exercise } from '@/interfaces/exercise.interface';
import { editPracticeStyles } from '@/theme/practice.style';
import { MaterialIcons } from '@expo/vector-icons';

interface EditPracticeScreenProps {
  route: EditPracticeScreenRouteProp;
  navigation: EditPracticeScreenNavigationProp;
}

const EditPracticeScreen = ({ route, navigation }: EditPracticeScreenProps) => {
  const { practiceId, workoutId, workoutName, onPracticeUpdated } = route.params;
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [practice, setPractice] = useState<Practice | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [exercisesLoading, setExercisesLoading] = useState(true);
  const [practiceLoading, setPracticeLoading] = useState(true);

  const [formData, setFormData] = useState({
    sets: 0,
    reps: 0,
    weight: 0,
    rest_time: 0,
    order: 1,
  });

  useEffect(() => {
    loadPracticeData();
    loadExercises();
  }, [practiceId]);

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

  const loadPracticeData = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    try {
      setPracticeLoading(true);
      const practiceData = await practiceAPI.getPracticeById(practiceId);
      setPractice(practiceData);
      console.log(practiceData);
      // Pre-fill form data
      setFormData({
        sets: practiceData.sets || 0,
        reps: practiceData.reps || 0,
        weight: practiceData.weight || 0,
        rest_time: practiceData.rest_time || 0,
        order: practiceData.order || 1,
      });

      // If practice has exercise data, set it as selected
      if (practiceData.exercise) {
        setSelectedExercise(practiceData.exercise);
      }
    } catch (error: any) {
      console.error('Error loading practice:', error);
      Alert.alert('خطا', 'خطا در بارگذاری اطلاعات تمرین');
    } finally {
      setPracticeLoading(false);
    }
  };

  const loadExercises = async () => {
    if (!token) {
      return;
    }

    try {
      setExercisesLoading(true);
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

  const handleUpdatePractice = async () => {
    if (!token) {
      Alert.alert('خطا', 'لطفاً ابتدا وارد شوید');
      return;
    }

    if (!selectedExercise) {
      Alert.alert('خطا', 'لطفاً یک تمرین انتخاب کنید');
      return;
    }

    if (!practice) {
      Alert.alert('خطا', 'اطلاعات تمرین یافت نشد');
      return;
    }

    try {
      setLoading(true);
      await practiceAPI.updatePractice(practiceId, {
        exerciseId: selectedExercise.id,
        sets: formData.sets,
        reps: formData.reps,
        weight: formData.weight,
        rest_time: formData.rest_time,
        order: formData.order,
      });

      Alert.alert('موفقیت', 'تمرین با موفقیت بروزرسانی شد');
      onPracticeUpdated();
      navigation.goBack();
    } catch (error: any) {
      console.error('Error updating practice:', error);
      Alert.alert('خطا', 'خطا در بروزرسانی تمرین. لطفاً مجدداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePractice = () => {
    Alert.alert('حذف تمرین', `آیا از حذف این تمرین اطمینان دارید؟`, [
      { text: 'لغو', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: () => deletePractice(),
      },
    ]);
  };

  const deletePractice = async () => {
    try {
      setLoading(true);
      await practiceAPI.deletePractice(practiceId);

      Alert.alert('موفقیت', 'تمرین با موفقیت حذف شد');
      onPracticeUpdated();
      navigation.goBack();
    } catch (error: any) {
      console.error('Error deleting practice:', error);
      Alert.alert('خطا', 'خطا در حذف تمرین. لطفاً مجدداً تلاش کنید.');
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
        editPracticeStyles.exerciseItem,
        selectedExercise?.id === item.id && editPracticeStyles.selectedExerciseItem,
      ]}
    >
      <View style={editPracticeStyles.exerciseInfo}>
        <Text style={editPracticeStyles.exerciseName}>{item.name}</Text>
        <View style={editPracticeStyles.exerciseMeta}>
          {item.category && (
            <Text style={editPracticeStyles.exerciseCategory}>{item.category}</Text>
          )}
          {item.body_part && (
            <Text style={editPracticeStyles.exerciseMuscle}>• {item.body_part}</Text>
          )}
          {item.difficulty && (
            <Text style={editPracticeStyles.exerciseDifficulty}>• {item.difficulty}</Text>
          )}
        </View>
        {/* {item.equipment && (
          <Text style={editPracticeStyles.exerciseEquipment}>تجهیزات: {item.equipment}</Text>
        )} */}
      </View>

      {selectedExercise?.id === item.id && <MaterialIcons name="check" size={24} color="#007AFF" />}
    </TouchableOpacity>
  );

  if (practiceLoading) {
    return (
      <View style={editPracticeStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={editPracticeStyles.loadingText}>در حال بارگذاری اطلاعات تمرین...</Text>
      </View>
    );
  }

  if (!practice) {
    return (
      <View style={editPracticeStyles.errorContainer}>
        <MaterialIcons name="error" size={64} color="#ff3b30" />
        <Text style={editPracticeStyles.errorText}>اطلاعات تمرین یافت نشد</Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={editPracticeStyles.errorButton}
        >
          بازگشت
        </Button>
      </View>
    );
  }

  return (
    <View style={editPracticeStyles.container}>
      <ScrollView style={editPracticeStyles.scrollView}>
        <Card style={editPracticeStyles.card}>
          <Card.Content>
            <Title style={editPracticeStyles.title}>ویرایش تمرین</Title>

            {/* Selected Exercise Display */}
            {selectedExercise && (
              <Card style={editPracticeStyles.selectedExerciseCard}>
                <Card.Content>
                  <Text style={editPracticeStyles.selectedExerciseTitle}>تمرین انتخاب شده:</Text>
                  <Text style={editPracticeStyles.selectedExerciseName}>
                    {selectedExercise.name}
                  </Text>
                  <Button
                    mode="outlined"
                    onPress={() => setSelectedExercise(null)}
                    style={editPracticeStyles.changeExerciseButton}
                  >
                    تغییر تمرین
                  </Button>
                </Card.Content>
              </Card>
            )}

            {/* Exercise Selection Section */}
            {!selectedExercise && (
              <View style={editPracticeStyles.exerciseSelectionSection}>
                <Text style={editPracticeStyles.sectionTitle}>انتخاب تمرین</Text>

                {/* Search Bar */}
                <Searchbar
                  placeholder="جستجوی تمرین..."
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={editPracticeStyles.searchBar}
                />

                {/* Exercises List */}
                {exercisesLoading ? (
                  <View style={editPracticeStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={editPracticeStyles.loadingText}>در حال بارگذاری تمرین‌ها...</Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredExercises}
                    renderItem={renderExerciseItem}
                    keyExtractor={(item) => item.id}
                    style={editPracticeStyles.exercisesList}
                    contentContainerStyle={editPracticeStyles.exercisesListContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                      <View style={editPracticeStyles.emptyExercises}>
                        <MaterialIcons name="fitness-center" size={48} color="#999" />
                        <Text style={editPracticeStyles.emptyExercisesText}>
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
              <View style={editPracticeStyles.formSection}>
                <Text style={editPracticeStyles.sectionTitle}>
                  جزئیات تمرین: {selectedExercise.name}
                </Text>

                <View style={editPracticeStyles.formRow}>
                  <View style={editPracticeStyles.formField}>
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

                  <View style={editPracticeStyles.formField}>
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

                <View style={editPracticeStyles.formRow}>
                  <View style={editPracticeStyles.formField}>
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

                  <View style={editPracticeStyles.formField}>
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
                  style={editPracticeStyles.orderInput}
                />
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Action Buttons */}
      {selectedExercise && (
        <View style={editPracticeStyles.actionButtonsContainer}>
          <View style={editPracticeStyles.buttonsRow}>
            <Button
              mode="outlined"
              onPress={handleDeletePractice}
              loading={loading}
              disabled={loading}
              style={editPracticeStyles.deleteButton}
              textColor="#ff3b30"
              icon="delete"
            >
              حذف
            </Button>

            <Button
              mode="contained"
              onPress={handleUpdatePractice}
              loading={loading}
              disabled={loading}
              style={editPracticeStyles.updateButton}
              contentStyle={editPracticeStyles.updateButtonContent}
              icon="content-save"
            >
              ذخیره تغییرات
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default EditPracticeScreen;
