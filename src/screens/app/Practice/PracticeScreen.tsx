// src/screens/practice/PracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, Card, Title, Button } from 'react-native-paper';
import { practiceAPI } from '@/services/practiceApi';
import { colors } from '@/theme/properties/colors';
import { PracticeScreenRouteProp, PracticeScreenNavigationProp } from '@/types/navigation.type';
import { Practice } from '@/interfaces/practice.interface';
import Loading from '@/components/common/Loading';
import { practiceStyles } from '@/theme/practice.style';

const isRTL = I18nManager.isRTL;

interface PracticeScreenProps {
  route: PracticeScreenRouteProp;
  navigation: PracticeScreenNavigationProp;
}

// Helper function to get practice code (first letter of exercise name or category)
const getPracticeCode = (practice: Practice, index: number): string => {
  if (practice.exercise?.name) {
    return practice.exercise.name.charAt(0).toUpperCase();
  }
  // Fallback: use letters in sequence A, B, C, D...
  return String.fromCharCode(65 + (index % 26));
};

// Helper function to get practice category
const getPracticeCategory = (practice: Practice): string => {
  if (practice.exercise?.category) {
    return practice.exercise.category;
  }
  if (practice.exercise?.body_part) {
    return practice.exercise.body_part;
  }
  return 'Other';
};

const PracticeScreen = ({ route, navigation }: PracticeScreenProps) => {
  const { workoutId, workoutName, planId } = route.params;
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      title: workoutName || 'تمرین‌ها',
    });
    loadPractices();
  }, [workoutId, workoutName]);

  const loadPractices = async (forceRefresh = false) => {
    if (!token) {
      setError('لطفاً برای مشاهده تمرین‌ها وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const practicesData = await practiceAPI.getPracticesByWorkoutId(workoutId);
      setPractices(practicesData || []);
    } catch (error: any) {
      console.error('Error loading practices:', error);
      setError('خطا در بارگذاری تمرین‌ها');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPractices(true);
  };

  const handleStartWorkout = () => {
    // Navigate to active workout screen
    navigation.navigate('ActiveWorkout', {
      workoutId: workoutId,
      workoutName: workoutName,
      planId: planId,
    });
  };

  const handleEditPractice = (practice: Practice) => {
    // Navigate to edit practice screen
    navigation.navigate('EditPracticeScreen', {
      practiceId: practice.id,
      workoutId: workoutId,
      workoutName: workoutName,
      onPracticeUpdated: () => loadPractices(true),
    });
  };

  const renderPracticeItem = ({ item, index }: { item: Practice; index: number }) => (
    <Card style={practiceStyles.practiceCard} mode="elevated">
      <Card.Content style={practiceStyles.practiceContent}>
        <View style={practiceStyles.practiceItemRow}>
          {/* Practice Code Circle */}
          <View style={practiceStyles.practiceCodeContainer}>
            <Text style={practiceStyles.practiceCode}>{getPracticeCode(item, index)}</Text>
          </View>

          {/* Practice Details */}
          <View style={practiceStyles.practiceDetailsContainer}>
            <View style={practiceStyles.practiceTextContainer}>
              <Text style={practiceStyles.practiceName}>
                {item.sets} × {item.exercise?.name || `تمرین ${item.id}`}
              </Text>
              <Text style={practiceStyles.practiceCategory}>{getPracticeCategory(item)}</Text>
            </View>

            {/* Practice Metrics */}
            <View style={practiceStyles.practiceMetrics}>
              {item.reps > 0 && (
                <Text style={practiceStyles.practiceMetricText}>{item.reps} تکرار</Text>
              )}
              {item.weight > 0 && (
                <Text style={practiceStyles.practiceMetricText}>{item.weight} کیلوگرم</Text>
              )}
              {item.rest_time > 0 && (
                <Text style={practiceStyles.practiceMetricText}>
                  استراحت: {item.rest_time} ثانیه
                </Text>
              )}
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            onPress={() => handleEditPractice(item)}
            style={practiceStyles.editButton}
          >
            <MaterialIcons name="edit" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return <Loading message="در حال بارگذاری تمرین‌ها..." />;
  }

  return (
    <View style={practiceStyles.container}>
      {error ? (
        <View style={practiceStyles.errorContainer}>
          <Text style={practiceStyles.errorText}>{error}</Text>
          <Button
            mode="contained"
            onPress={() => loadPractices(true)}
            style={practiceStyles.button}
          >
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <>
          {/* Workout Header */}
          <Card style={practiceStyles.headerCard}>
            <Card.Content style={practiceStyles.headerContent}>
              <Title style={practiceStyles.workoutTitle}>{workoutName}</Title>
              <Text style={practiceStyles.practiceCount}>{practices.length} تمرین</Text>
            </Card.Content>
          </Card>

          {/* Practices List */}
          <FlatList
            data={practices}
            renderItem={renderPracticeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={practiceStyles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.activeTintColor]}
              />
            }
            ListEmptyComponent={
              <View style={practiceStyles.emptyContainer}>
                <MaterialIcons name="fitness-center" size={64} color="#999" />
                <Text style={practiceStyles.emptyText}>هیچ تمرینی برای این workout تعریف نشده</Text>
                <Text style={practiceStyles.emptySubtext}>
                  اولین تمرین را به این workout اضافه کنید
                </Text>
              </View>
            }
          />

          {/* Start Workout Button */}
          {practices.length > 0 && (
            <View style={practiceStyles.startButtonContainer}>
              <Button
                mode="contained"
                onPress={handleStartWorkout}
                style={practiceStyles.startButton}
                icon="play"
              >
                شروع تمرین
              </Button>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default PracticeScreen;
