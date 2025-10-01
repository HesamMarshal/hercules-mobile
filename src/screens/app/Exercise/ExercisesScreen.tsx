import { useAuth } from '@/contexts/AuthContext';
import { exerciseAPI } from '@/services/exerciseApi';
import { Exercise } from '@/types/exercise';
import { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Chip, Searchbar, Button } from 'react-native-paper';
import { exerciseStyles as styles } from '@/theme/styles';
import { useTranslation } from 'react-i18next';
import { useRTLStyles } from '@/utils/rtlStyles';

export const ExercisesScreen = ({ navigation }: any) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedbody_part, setSelectedbody_part] = useState<string>('all');
  const [error, setError] = useState<string>('');
  // TODO: Fix loading and isLoading
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const rtlStyles = useRTLStyles();

  // TODO: read from backend
  const body_parts = [
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
  }, [exercises, searchQuery, selectedbody_part]);

  const loadExercises = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // TODO: Use Message enum
      setError('لطفاً برای مشاهده حرکات ورزشی وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const data = await exerciseAPI.getAllExercises();
      // console.log(data);
      setExercises(data);
    } catch (error: any) {
      console.error('Error loading exercises:', error);

      if (error.message.includes('Unauthorized')) {
        // TODO: Change the message
        setError('نشست شما منقضی شده است. لطفاً مجدداً وارد شوید');

        // Optionally auto-logout after 2 seconds
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

    // if (searchQuery) {
    //   filtered = filtered.filter(
    //     (exercise) =>
    //       exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       exercise.body_part.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    if (selectedbody_part !== 'all') {
      filtered = filtered.filter(
        (exercise) => exercise.body_part.toLowerCase() === selectedbody_part.toLowerCase()
      );
    }

    setFilteredExercises(filtered);
  };

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate('ExerciseDetail', { exerciseId: exercise.id });
  };

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
        return t('beginner');
      case 'intermediate':
        return t('intermediate');
      case 'advanced':
        return t('advanced');
      default:
        return difficulty;
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <Card style={styles.exerciseCard} mode="elevated">
        <Card.Content>
          <View style={styles.exerciseHeader}>
            {/* TODO : Deprecated */}
            <Title style={styles.exerciseName}>{item.name}</Title>
            <Chip
              mode="outlined"
              style={[styles.difficultyChip, getDifficultyStyle(item.difficulty)]}
            >
              {getDifficultyTranslation(item.difficulty)}
            </Chip>
          </View>

          <Chip mode="flat" style={styles.body_partChip} textStyle={styles.body_partText}>
            {item.body_part}
          </Chip>
          {/* TODO : Deprecated */}
          <Paragraph numberOfLines={2} style={[styles.exerciseDescription, rtlStyles.text]}>
            {item.instruction}
          </Paragraph>

          {item.exercise_type && (
            <View style={[styles.exercise_typeContainer, rtlStyles.container]}>
              <Paragraph style={[styles.exercise_typeLabel, rtlStyles.text]}>
                t(exercise_type):{' '}
              </Paragraph>
              <Paragraph style={[styles.exercise_typeValue, rtlStyles.text]}>
                {item.exercise_type}
              </Paragraph>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderbody_partFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={body_parts}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Chip
            mode={selectedbody_part === item ? 'flat' : 'outlined'}
            selected={selectedbody_part === item}
            onPress={() => setSelectedbody_part(item)}
            style={styles.body_partFilterChip}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
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
          {' '}
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
          {t('login')}
        </Button>
      </View>
    );
  }

  // if (screenLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" />
  //       <Paragraph style={[styles.loadingText, rtlStyles.text]}>
  //         در حال بارگذاری حرکات ورزشی...
  //       </Paragraph>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search exercises..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {renderbody_partFilter()}

      {error ? (
        <View style={styles.errorContainer}>
          <Paragraph style={[styles.errorText, rtlStyles.text]}>{error}</Paragraph>
          <Button mode="contained" onPress={loadExercises} style={styles.retryButton}>
            Retry
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
              colors={['#0000ff']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Paragraph style={[styles.emptyText, rtlStyles.text]}>
                {searchQuery || selectedbody_part !== 'all'
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
