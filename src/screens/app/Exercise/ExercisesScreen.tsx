// src/screens/ExercisesScreen.tsx
import { useAuth } from '@/contexts/AuthContext';
import { exerciseAPI } from '@/services/exerciseApi';
import { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Chip, Searchbar, Button } from 'react-native-paper';
import { exerciseStyles as styles } from '@/theme/styles';
import { useTranslation } from 'react-i18next';
import { useRTLStyles } from '@/utils/rtlStyles';
import { colors } from '@/theme/properties/colors';
import { Exercise } from '@/interfaces/exercise.interface';

export const ExercisesScreen = ({ navigation }: any) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [error, setError] = useState<string>('');
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const rtlStyles = useRTLStyles();

  // Muscle groups for filtering
  const muscle_groups = [
    'all',
    'arms',
    'back',
    'chest',
    'core',
    'legs',
    'shoulders',
    'cardio',
    'other',
  ];

  const bodyPartTranslations: { [key: string]: string } = {
    all: 'همه',
    arms: 'بازو',
    back: 'کمر',
    chest: 'سینه',
    core: 'میانه بدن',
    legs: 'پاها',
    shoulders: 'شانه',
    cardio: 'قلبی',
    Other: 'other',
  };

  useEffect(() => {
    if (!authLoading) {
      loadExercises();
    }
  }, [authLoading]);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchQuery, selectedMuscleGroup]);

  const loadExercises = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('لطفاً برای مشاهده حرکات ورزشی وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const data = await exerciseAPI.getAllExercises();
      setExercises(data);
    } catch (error: any) {
      console.error('Error loading exercises:', error);

      if (error.response?.status === 401) {
        setError('نشست شما منقضی شده است. لطفاً مجدداً وارد شوید');
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        setError('بارگذاری حرکات ورزشی ناموفق بود. لطفاً مجدداً تلاش کنید');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadExercises();
  };

  const filterExercises = () => {
    let filtered = exercises;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (exercise) =>
          exercise.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exercise.name_fa && exercise.name_fa.includes(searchQuery)) ||
          (exercise.instruction_en &&
            exercise.instruction_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.instruction_fa && exercise.instruction_fa.includes(searchQuery)) ||
          (exercise.muscle_group &&
            exercise.muscle_group.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply muscle group filter
    if (selectedMuscleGroup !== 'all') {
      filtered = filtered.filter(
        (exercise) => exercise.muscle_group?.toLowerCase() === selectedMuscleGroup.toLowerCase()
      );
    }

    setFilteredExercises(filtered);
  };

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate('ExerciseDetail', { exerciseId: exercise.id });
  };

  // TODO: Move to a utility file, and beterr translations mechanism
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return styles.beginnerChip;
      case 'intermediate':
        return styles.intermediateChip;
      case 'advanced':
        return styles.advancedChip;
      default:
        return {};
    }
  };

  const getDifficultyTranslation = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return t('beginner') || 'مبتدی';
      case 'intermediate':
        return t('intermediate') || 'متوسط';
      case 'advanced':
        return t('advanced') || 'پیشرفته';
      default:
        return difficulty;
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <Card style={styles.exerciseCard} mode="elevated">
        <Card.Content>
          <View style={styles.exerciseHeader}>
            <Title style={styles.exerciseName}>{item.name_fa}</Title>
            {item.difficulty && (
              <Chip
                mode="outlined"
                style={[styles.difficultyChip, getDifficultyStyle(item.difficulty)]}
              >
                {getDifficultyTranslation(item.difficulty)}
              </Chip>
            )}
          </View>
          {/* 
          {item.muscle_group && (
            <Chip mode="flat" style={styles.muscleGroupChip} textStyle={styles.muscleGroupText}>
              {muscleGroupTranslations[item.muscle_group] || item.muscle_group}
            </Chip>
          )} */}

          {item.instruction_fa && (
            <Paragraph numberOfLines={2} style={[styles.exerciseDescription, rtlStyles.text]}>
              {item.instruction_fa}
            </Paragraph>
          )}

          {/* {item.equipment && (
            <View style={[styles.equipmentContainer, rtlStyles.container]}>
              <Paragraph style={[styles.equipmentLabel, rtlStyles.text]}>تجهیزات:</Paragraph>
              <Paragraph style={[styles.equipmentValue, rtlStyles.text]}>
                {item.equipment}
              </Paragraph>
            </View>
          )} */}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderMuscleGroupFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={muscle_groups}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Chip
            mode={selectedMuscleGroup === item ? 'flat' : 'outlined'}
            selected={selectedMuscleGroup === item}
            onPress={() => setSelectedMuscleGroup(item)}
            textStyle={{ color: colors.text }}
            style={styles.muscleGroupFilterChip}
          >
            {bodyPartTranslations[item] || item}
          </Chip>
        )}
      />
    </View>
  );

  if (authLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Paragraph style={[styles.loadingText, rtlStyles.text]}>
          در حال بررسی احراز هویت...
        </Paragraph>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Paragraph style={[styles.errorText, rtlStyles.text]}>
          لطفاً برای مشاهده حرکات ورزشی وارد شوید
        </Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('Auth')}>
          {t('login') || 'ورود'}
        </Button>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Paragraph style={[styles.loadingText, rtlStyles.text]}>
          در حال بارگذاری حرکات ورزشی...
        </Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="جستجوی حرکات ورزشی..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        inputStyle={{ color: colors.textSecondary }}
        style={styles.searchBar}
      />

      {renderMuscleGroupFilter()}

      {error ? (
        <View style={styles.errorContainer}>
          <Paragraph style={[styles.errorText, rtlStyles.text]}>{error}</Paragraph>
          <Button mode="contained" onPress={loadExercises} style={styles.retryButton}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.activeTintColor]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Paragraph style={[styles.emptyText, rtlStyles.text]}>
                {searchQuery || selectedMuscleGroup !== 'all'
                  ? 'هیچ حرکت ورزشی مطابق با معیارهای شما یافت نشد'
                  : 'هیچ حرکت ورزشی موجود نیست'}
              </Paragraph>
            </View>
          }
        />
      )}
    </View>
  );
};
