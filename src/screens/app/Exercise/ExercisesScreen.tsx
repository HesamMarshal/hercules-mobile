import { useAuth } from '@/contexts/AuthContext';
import { exerciseAPI } from '@/services/exerciseApi';
import { Exercise } from '@/types/exercise';
import { useState, useEffect, useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Card, Title, Paragraph, Chip, Searchbar, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useRTLStyles } from '@/utils/rtlStyles';
import { useTheme } from '@/theme/context/ThemeContext'; // Import new theme hook

export const ExercisesScreen = ({ navigation }: any) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  // TODO: Fix loading and isLoading
  const [loading, setLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedbody_part, setSelectedbody_part] = useState<string>('all');
  const [error, setError] = useState<string>('');
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const rtlStyles = useRTLStyles();
  const { theme } = useTheme(); // Use new theme hook

  // console.log('Theme object:', theme);
  // console.log('Theme colors:', theme.colors);
  // console.log('Theme utils:', theme.utils);
  // console.log('Theme spacing:', theme.spacing);

  // Generate dynamic styles based on theme
  const styles = useMemo(() => createStyles(theme), [theme]);

  // const styles = useThemeStyles((theme) => ({
  //   container: {
  //     flex: 1,
  //     backgroundColor: theme.colors.background,
  //   },
  // }));

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
    all: t('all') || 'همه',
    arms: t('arms') || 'بازو',
    back: t('back') || 'کمر',
    chest: t('chest') || 'سینه',
    core: t('core') || 'میانه بدن',
    legs: t('legs') || 'پاها',
    shoulders: t('shoulders') || 'شانه',
    cardio: t('cardio') || 'قلبی',
    other: t('other') || 'سایر',
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
      setError(t('login_required') || 'لطفاً برای مشاهده حرکات ورزشی وارد شوید');
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
        setError(t('session_expired') || 'نشست شما منقضی شده است. لطفاً مجدداً وارد شوید');

        // Optionally auto-logout after 2 seconds
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        setError(
          t('load_exercises_failed') || 'بارگذاری حرکات ورزشی ناموفق بود. لطفاً مجدداً تلاش کنید'
        );
      }
    } finally {
      setLoading(false);
      setScreenLoading(false);
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
      <Card
        style={styles.exerciseCard}
        // mode="elevated"
      >
        <Card.Content>
          <View style={[styles.exerciseHeader, theme.utils.rtlFlexDirection('row')]}>
            {/* TODO : Deprecated */}
            <Title style={styles.exerciseName}>{item.name}</Title>
            <Chip
              mode="outlined"
              style={[styles.difficultyChip, getDifficultyStyle(item.difficulty)]}
              textStyle={styles.difficultyText}
            >
              {getDifficultyTranslation(item.difficulty)}
            </Chip>
          </View>

          <Chip mode="flat" style={styles.bodyPartChip} textStyle={styles.bodyPartText}>
            {bodyPartTranslations[item.body_part] || item.body_part}
          </Chip>
          {/* TODO : Deprecated */}
          <Paragraph
            numberOfLines={2}
            style={[styles.exerciseDescription, theme.utils.rtlTextAlign()]}
          >
            {item.instruction}
          </Paragraph>

          {item.exercise_type && (
            <View style={[styles.exerciseTypeContainer, theme.utils.rtlFlexDirection('row')]}>
              <Paragraph style={[styles.exerciseTypeLabel, theme.utils.rtlTextAlign()]}>
                {t('exercise_type') || 'نوع تمرین'}:{' '}
              </Paragraph>
              <Paragraph style={[styles.exerciseTypeValue, theme.utils.rtlTextAlign()]}>
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
            style={[
              styles.bodyPartFilterChip,
              selectedbody_part === item && styles.bodyPartFilterChipSelected,
            ]}
            textStyle={[
              styles.bodyPartFilterText,
              selectedbody_part === item && styles.bodyPartFilterTextSelected,
            ]}
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
        <Paragraph style={[styles.loadingText, theme.utils.rtlTextAlign()]}>
          {t('checking_authentication') || 'در حال بررسی احراز هویت...'}
        </Paragraph>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Paragraph style={[styles.errorText, theme.utils.rtlTextAlign()]}>
          {t('login_required_exercises') || 'لطفاً برای مشاهده حرکات ورزشی وارد شوید'}
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Auth')}
          style={styles.loginButton}
          labelStyle={styles.buttonText}
        >
          {t('login') || 'ورود'}
        </Button>
      </View>
    );
  }

  // if (screenLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={theme.colors.primary} />
  //       <Paragraph style={[styles.loadingText, theme.utils.rtlTextAlign()]}>
  //         {t('loading_exercises') || 'در حال بارگذاری حرکات ورزشی...'}
  //       </Paragraph>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('search_exercises') || 'جستجوی حرکات ورزشی...'}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        inputStyle={[styles.searchInput, theme.utils.rtlTextAlign()]}
        placeholderTextColor={theme.colors.textTertiary}
      />

      {renderbody_partFilter()}

      {error ? (
        <View style={styles.errorContainer}>
          <Paragraph style={[styles.errorText, theme.utils.rtlTextAlign()]}>{error}</Paragraph>
          <Button
            mode="contained"
            onPress={loadExercises}
            style={styles.retryButton}
            labelStyle={styles.buttonText}
          >
            {t('retry') || 'تلاش مجدد'}
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
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Paragraph style={[styles.emptyText, theme.utils.rtlTextAlign()]}>
                {searchQuery || selectedbody_part !== 'all'
                  ? t('no_exercises_found') || 'هیچ حرکت ورزشی مطابق با معیارهای شما یافت نشد'
                  : t('no_exercises_available') || 'هیچ حرکت ورزشی موجود نیست'}
              </Paragraph>
            </View>
          }
        />
      )}
    </View>
  );
};

// Create styles function that uses the theme
const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    loadingText: {
      marginTop: theme.spacing.md,
      ...theme.typography.body.large,
      color: theme.colors.text,
    },
    errorText: {
      ...theme.typography.body.large,
      color: theme.colors.error,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    retryButton: {
      marginTop: theme.spacing.md,
      backgroundColor: theme.colors.primary,
    },
    loginButton: {
      marginTop: theme.spacing.md,
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      ...theme.typography.label.large,
      color: theme.colors.onPrimary,
    },
    searchBar: {
      margin: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    searchInput: {
      ...theme.typography.body.large,
      color: theme.colors.text,
    },
    filterContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    bodyPartFilterChip: {
      marginHorizontal: theme.spacing.xs,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    bodyPartFilterChipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    bodyPartFilterText: {
      ...theme.typography.label.medium,
      color: theme.colors.text,
    },
    bodyPartFilterTextSelected: {
      color: theme.colors.onPrimary,
    },
    listContainer: {
      padding: theme.spacing.md,
      paddingTop: theme.spacing.sm,
    },
    exerciseCard: {
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      // ...theme.shadows.medium,
    },
    exerciseHeader: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    exerciseName: {
      flex: 1,
      ...theme.typography.headline.small,
      color: theme.colors.text,
      marginBottom: 0, // Remove default margin from Paper Title
    },
    difficultyChip: {
      borderWidth: 1,
    },
    difficultyText: {
      ...theme.typography.label.small,
      fontWeight: '500',
    },
    beginnerChip: {
      backgroundColor: theme.colors.successContainer,
      borderColor: theme.colors.success,
    },
    intermediateChip: {
      backgroundColor: theme.colors.warningContainer,
      borderColor: theme.colors.warning,
    },
    advancedChip: {
      backgroundColor: theme.colors.errorContainer,
      borderColor: theme.colors.error,
    },
    bodyPartChip: {
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.primary + '15', // 15% opacity
    },
    bodyPartText: {
      ...theme.typography.label.small,
      color: theme.colors.primary,
    },
    exerciseDescription: {
      ...theme.typography.body.medium,
      color: theme.colors.textSecondary,
      lineHeight: theme.typography.body.medium.lineHeight,
    },
    exerciseTypeContainer: {
      marginTop: theme.spacing.sm,
      alignItems: 'center',
    },
    exerciseTypeLabel: {
      ...theme.typography.body.small,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    exerciseTypeValue: {
      ...theme.typography.body.small,
      color: theme.colors.text,
      fontWeight: '400',
      marginLeft: theme.spacing.xs,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xxl,
    },
    emptyText: {
      ...theme.typography.body.large,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
