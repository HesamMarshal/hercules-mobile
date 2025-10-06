// src/screens/Practice/PracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
  RefreshControl,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, Card, Title, Button, FAB, Menu, Divider } from 'react-native-paper';
import { practiceAPI } from '@/services/practiceApi';
import { colors } from '@/theme/properties/colors';
import { PracticeScreenRouteProp, PracticeScreenNavigationProp } from '@/types/navigation.type';
import { Practice, SetType, PracticeStatus } from '@/interfaces/practice.interface';
import Loading from '@/components/common/Loading';
import { practiceStyles } from '@/theme/practice.style';

const isRTL = I18nManager.isRTL;

interface PracticeScreenProps {
  route: PracticeScreenRouteProp;
  navigation: PracticeScreenNavigationProp;
}

// Helper function to get practice code
const getPracticeCode = (practice: Practice, index: number): string => {
  if (practice.exercise?.name) {
    return practice.exercise.name.charAt(0).toUpperCase();
  }
  return String.fromCharCode(65 + (index % 26));
};

// Helper function to get set type display text
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

// Helper function to get status display text
const getStatusDisplay = (status: PracticeStatus): string => {
  switch (status) {
    case PracticeStatus.PLANNED:
      return 'برنامه‌ریزی شده';
    case PracticeStatus.IN_PROGRESS:
      return 'در حال انجام';
    case PracticeStatus.COMPLETED:
      return 'تکمیل شده';
    case PracticeStatus.SKIPPED:
      return 'رد شده';
    default:
      return status;
  }
};

const PracticeScreen = ({ route, navigation }: PracticeScreenProps) => {
  const { workoutId, workoutName, planId } = route.params;
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState<{ [key: string]: boolean }>({});
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
      // Sort by order and set_number
      const sortedPractices =
        practicesData?.sort((a, b) => {
          if (a.order !== b.order) return a.order - b.order;
          return a.set_number - b.set_number;
        }) || [];
      setPractices(sortedPractices);
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
    navigation.navigate('ActiveWorkout', {
      workoutId: workoutId,
      workoutName: workoutName,
      planId: planId,
    });
  };

  const handleAddPractice = () => {
    navigation.navigate('CreatePracticeScreen', {
      workoutId: workoutId,
      workoutName: workoutName,
      onPracticeCreated: () => {
        loadPractices(true);
      },
    });
  };

  const handleEditPractice = (practice: Practice) => {
    setMenuVisible({ ...menuVisible, [practice.id]: false });
    navigation.navigate('EditPracticeScreen', {
      practiceId: practice.id.toString(),
      workoutId: workoutId,
      workoutName: workoutName,
      onPracticeUpdated: () => loadPractices(true),
    });
  };

  const handleDeletePractice = (practice: Practice) => {
    setMenuVisible({ ...menuVisible, [practice.id]: false });

    Alert.alert(
      'حذف ست',
      `آیا از حذف ست ${practice.set_number} از "${practice.exercise?.name}" اطمینان دارید؟`,
      [
        { text: 'لغو', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => deletePractice(practice.id),
        },
      ]
    );
  };

  const deletePractice = async (practiceId: number) => {
    try {
      await practiceAPI.deletePractice(practiceId.toString());
      setPractices(practices.filter((practice) => practice.id !== practiceId));
      Alert.alert('موفقیت', 'ست با موفقیت حذف شد');
    } catch (error: any) {
      console.error('Error deleting practice:', error);
      Alert.alert('خطا', 'خطا در حذف ست. لطفاً مجدداً تلاش کنید.');
    }
  };

  const toggleMenu = (practiceId: number) => {
    setMenuVisible({
      ...menuVisible,
      [practiceId]: !menuVisible[practiceId],
    });
  };

  const closeAllMenus = () => {
    setMenuVisible({});
  };

  const renderPracticeItem = ({ item, index }: { item: Practice; index: number }) => (
    <TouchableOpacity onPress={closeAllMenus} activeOpacity={0.9}>
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
                  ست {item.set_number} - {item.exercise?.name}
                </Text>
                <View style={practiceStyles.practiceMeta}>
                  <Text style={practiceStyles.practiceCategory}>{item.exercise?.category}</Text>
                  <Text style={practiceStyles.setType}>• {getSetTypeDisplay(item.set_type)}</Text>
                  <Text style={practiceStyles.status}>• {getStatusDisplay(item.status)}</Text>
                </View>
              </View>

              {/* Practice Metrics */}
              <View style={practiceStyles.practiceMetrics}>
                {item.previous_weight !== null && item.previous_weight !== undefined && (
                  <Text style={practiceStyles.practiceMetricText}>
                    قبلی: {item.previous_weight} کیلوگرم
                  </Text>
                )}
                {item.previous_reps !== null && item.previous_reps !== undefined && (
                  <Text style={practiceStyles.practiceMetricText}>{item.previous_reps} تکرار</Text>
                )}
                {item.previous_rest !== null && item.previous_rest !== undefined && (
                  <Text style={practiceStyles.practiceMetricText}>
                    استراحت: {item.previous_rest} ثانیه
                  </Text>
                )}
              </View>
            </View>

            {/* Menu Button */}
            <View style={practiceStyles.menuContainer}>
              <Menu
                visible={!!menuVisible[item.id]}
                onDismiss={() => setMenuVisible({ ...menuVisible, [item.id]: false })}
                anchor={
                  <TouchableOpacity
                    onPress={() => toggleMenu(item.id)}
                    style={practiceStyles.menuButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialIcons name="more-vert" size={24} color="#666" />
                  </TouchableOpacity>
                }
                contentStyle={practiceStyles.menuContent}
              >
                <Menu.Item
                  onPress={() => handleEditPractice(item)}
                  title="ویرایش"
                  leadingIcon="pencil"
                  style={practiceStyles.menuItem}
                />
                <Divider />
                <Menu.Item
                  onPress={() => handleDeletePractice(item)}
                  title="حذف"
                  leadingIcon="delete"
                  titleStyle={practiceStyles.deleteMenuText}
                  style={practiceStyles.menuItem}
                />
              </Menu>
            </View>
          </View>

          {/* Notes */}
          {item.notes && (
            <View style={practiceStyles.notesContainer}>
              <Text style={practiceStyles.notesLabel}>یادداشت:</Text>
              <Text style={practiceStyles.notesText}>{item.notes}</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loading message="در حال بارگذاری ست‌ها..." />;
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
              <View style={practiceStyles.headerTitleContainer}>
                <Title style={practiceStyles.workoutTitle}>{workoutName}</Title>
                <Text style={practiceStyles.practiceCount}>{practices.length} ست</Text>
              </View>

              {/* Add Practice Button in Header */}
              <Button
                mode="contained"
                onPress={handleAddPractice}
                style={practiceStyles.addButton}
                icon="plus"
                compact
              >
                افزودن ست
              </Button>
            </Card.Content>
          </Card>

          {/* Practices List */}
          <FlatList
            data={practices}
            renderItem={renderPracticeItem}
            keyExtractor={(item) => item.id.toString()}
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
                <Text style={practiceStyles.emptyText}>هیچ ستی برای این workout تعریف نشده</Text>
                <Text style={practiceStyles.emptySubtext}>
                  اولین ست را به این workout اضافه کنید
                </Text>
                <Button
                  mode="contained"
                  onPress={handleAddPractice}
                  style={practiceStyles.emptyButton}
                  icon="plus"
                >
                  افزودن ست
                </Button>
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
