// src/screens/Practice/CreatePracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, FlatList, TouchableOpacity, Text } from 'react-native';
import {
  Button,
  TextInput,
  Title,
  Card,
  Searchbar,
  ActivityIndicator,
  Menu,
  Divider,
} from 'react-native-paper';
import { practiceAPI } from '@/services/practiceApi';
import { exerciseAPI } from '@/services/exerciseApi';
import { useAuth } from '@/contexts/AuthContext';
import {
  CreatePracticeScreenRouteProp,
  CreatePracticeScreenNavigationProp,
} from '@/types/navigation.type';
import { Exercise } from '@/interfaces/exercise.interface';
import { SetType, PracticeStatus } from '@/interfaces/practice.interface';
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
    order: 1,
    set_number: 1,
    set_type: SetType.WORKING,
    previous_weight: 0,
    previous_reps: 0,
    previous_rest: 60,
    notes: '',
  });

  const [setTypeMenuVisible, setSetTypeMenuVisible] = useState(false);

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
        order: formData.order,
        set_number: formData.set_number,
        set_type: formData.set_type,
        previous_weight: formData.previous_weight,
        previous_reps: formData.previous_reps,
        previous_rest: formData.previous_rest,
        notes: formData.notes,
      });

      Alert.alert('موفقیت', 'ست با موفقیت ایجاد شد');
      onPracticeCreated();
      navigation.goBack();
    } catch (error: any) {
      console.error('Error creating practice:', error);
      Alert.alert('خطا', 'خطا در ایجاد ست. لطفاً مجدداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const getSetTypeDisplay = (setType: SetType): string => {
    switch (setType) {
      case SetType.WARMUP:
        return 'گرم کردن';
      case SetType.WORKING:
        return 'اصلی';
      case SetType.DROPSET:
        return 'دراپ ست';
      case SetType.FAILURE:
        return 'تا شکست';
      default:
        return setType;
    }
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
            <Title style={createPracticeStyles.title}>افزودن ست جدید</Title>

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
                  جزئیات ست: {selectedExercise.name}
                </Text>

                <View style={createPracticeStyles.formRow}>
                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="ترتیب در تمرین"
                      value={formData.order.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, order: parseInt(text) || 1 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>

                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="شماره ست"
                      value={formData.set_number.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, set_number: parseInt(text) || 1 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>
                </View>

                {/* Set Type Selection */}
                <View style={createPracticeStyles.formRow}>
                  <View style={createPracticeStyles.formField}>
                    <Menu
                      visible={setTypeMenuVisible}
                      onDismiss={() => setSetTypeMenuVisible(false)}
                      anchor={
                        <TouchableOpacity
                          onPress={() => setSetTypeMenuVisible(true)}
                          style={createPracticeStyles.setTypeSelector}
                        >
                          <TextInput
                            label="نوع ست"
                            value={getSetTypeDisplay(formData.set_type)}
                            mode="outlined"
                            editable={false}
                            pointerEvents="none"
                            right={<TextInput.Icon icon="menu-down" />}
                          />
                        </TouchableOpacity>
                      }
                    >
                      <Menu.Item
                        onPress={() => {
                          setFormData({ ...formData, set_type: SetType.WARMUP });
                          setSetTypeMenuVisible(false);
                        }}
                        title="گرم کردن"
                      />
                      <Divider />
                      <Menu.Item
                        onPress={() => {
                          setFormData({ ...formData, set_type: SetType.WORKING });
                          setSetTypeMenuVisible(false);
                        }}
                        title="اصلی"
                      />
                      <Divider />
                      <Menu.Item
                        onPress={() => {
                          setFormData({ ...formData, set_type: SetType.DROPSET });
                          setSetTypeMenuVisible(false);
                        }}
                        title="دراپ ست"
                      />
                      <Divider />
                      <Menu.Item
                        onPress={() => {
                          setFormData({ ...formData, set_type: SetType.FAILURE });
                          setSetTypeMenuVisible(false);
                        }}
                        title="تا شکست"
                      />
                    </Menu>
                  </View>
                </View>

                <Text style={createPracticeStyles.subSectionTitle}>عملکرد قبلی (اختیاری)</Text>

                <View style={createPracticeStyles.formRow}>
                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="وزن قبلی (کیلوگرم)"
                      value={formData.previous_weight.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, previous_weight: parseFloat(text) || 0 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>

                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="تکرارهای قبلی"
                      value={formData.previous_reps.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, previous_reps: parseInt(text) || 0 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>
                </View>

                <View style={createPracticeStyles.formRow}>
                  <View style={createPracticeStyles.formField}>
                    <TextInput
                      label="زمان استراحت قبلی (ثانیه)"
                      value={formData.previous_rest.toString()}
                      onChangeText={(text) =>
                        setFormData({ ...formData, previous_rest: parseInt(text) || 60 })
                      }
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>
                </View>

                <TextInput
                  label="یادداشت (اختیاری)"
                  value={formData.notes}
                  onChangeText={(text) => setFormData({ ...formData, notes: text })}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={createPracticeStyles.notesInput}
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
            ایجاد ست
          </Button>
        </View>
      )}
    </View>
  );
};

export default CreatePracticeScreen;
