// src/screens/PracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, Button, Card, Title, FAB, Chip } from 'react-native-paper';
import { workoutStyles as styles } from '@/theme/styles';
import { RefreshControl } from 'react-native-gesture-handler';
import { practiceAPI } from '@/services/practiceApi';
import { PracticeScreenRouteProp, PracticeScreenNavigationProp } from '@/types/navigation.type';
import { Practice } from '@/interfaces/practice.interface';

const isRTL = I18nManager.isRTL;

// interface PracticeScreenProps {
//   route: PracticeScreenRouteProp;
//   navigation: PracticeScreenNavigationProp;
// }
interface PracticeScreenProps {
  route: any;
  navigation: any;
}

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

  const loadPractices = async () => {
    if (!token) {
      setError('لطفاً برای مشاهده تمرین‌ها وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      // Assuming we have an API method to get practices by workout ID
      const practicesData = await practiceAPI.getPracticesByWorkoutId(workoutId);
      setPractices(practicesData || []);
    } catch (error: any) {
      setError('خطا در بارگذاری تمرین‌ها');
      console.error('Error loading practices:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPractices();
  };

  const handlePracticePress = (practice: Practice) => {
    navigation.navigate('PracticeDetail', {
      practiceId: practice.id,
      practiceName: practice.exercise.name,
      workoutId: workoutId,
    });
  };

  const handleStartPractice = (practice: Practice) => {
    Alert.alert('شروع تمرین', `آیا می‌خواهید "${practice.exercise.name}" را شروع کنید؟`, [
      { text: 'لغو', style: 'cancel' },
      {
        text: 'شروع',
        onPress: () => {
          navigation.navigate('ActivePractice', {
            practiceId: practice.id,
            practiceName: practice.exercise.name,
          });
        },
      },
    ]);
  };

  const handleAddPractice = () => {
    navigation.navigate('CreatePractice', {
      workoutId: workoutId,
      onPracticeCreated: loadPractices,
    });
  };

  const handleLogSet = (practice: Practice) => {
    navigation.navigate('LogSet', {
      practiceId: practice.id,
      practiceName: practice.exercise.name,
      currentSets: practice.sets,
    });
  };

  const renderPracticeItem = ({ item }: { item: Practice }) => {
    return (
      <Card style={[practiceStyles.card]} mode="elevated">
        <Card.Content style={practiceStyles.cardContent}>
          {/* Practice Header */}
          <TouchableOpacity onPress={() => handlePracticePress(item)}>
            <View style={practiceStyles.practiceHeader}>
              <View style={practiceStyles.practiceTitleContainer}>
                <Title style={[practiceStyles.practiceName, practiceStyles.text]}>
                  {item.exercise.name}
                </Title>
                <View style={practiceStyles.chipsContainer}>
                  <Chip
                    mode="outlined"
                    style={practiceStyles.chip}
                    textStyle={practiceStyles.chipText}
                  >
                    {item.exercise.difficulty}
                  </Chip>
                  <Chip
                    mode="outlined"
                    style={practiceStyles.chip}
                    textStyle={practiceStyles.chipText}
                  >
                    {item.exercise.primary_muscle_group}
                  </Chip>
                </View>
              </View>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color="#666"
                style={isRTL ? {} : { transform: [{ rotate: '180deg' }] }}
              />
            </View>
          </TouchableOpacity>

          {/* Exercise Description */}
          {item.exercise.description && (
            <Text style={[practiceStyles.description, practiceStyles.text]}>
              {item.exercise.description}
            </Text>
          )}

          {/* Practice Details */}
          <View style={practiceStyles.detailsGrid}>
            <View style={practiceStyles.detailItem}>
              <MaterialIcons name="repeat" size={20} color="#007AFF" />
              <Text style={practiceStyles.detailLabel}>ست‌ها</Text>
              <Text style={practiceStyles.detailValue}>{item.sets}</Text>
            </View>

            <View style={practiceStyles.detailItem}>
              <MaterialIcons name="replay" size={20} color="#007AFF" />
              <Text style={practiceStyles.detailLabel}>تکرار</Text>
              <Text style={practiceStyles.detailValue}>{item.reps}</Text>
            </View>

            <View style={practiceStyles.detailItem}>
              <MaterialIcons name="fitness-center" size={20} color="#007AFF" />
              <Text style={practiceStyles.detailLabel}>وزن (kg)</Text>
              <Text style={practiceStyles.detailValue}>{item.weight}</Text>
            </View>

            <View style={practiceStyles.detailItem}>
              <MaterialIcons name="timer" size={20} color="#007AFF" />
              <Text style={practiceStyles.detailLabel}>استراحت (ثانیه)</Text>
              <Text style={practiceStyles.detailValue}>{item.rest_time}</Text>
            </View>
          </View>

          {/* Equipment and Muscle Groups */}
          <View style={practiceStyles.tagsContainer}>
            <View style={practiceStyles.tag}>
              <MaterialIcons name="build" size={14} color="#666" />
              <Text style={practiceStyles.tagText}>{item.exercise.equipment}</Text>
            </View>
            {item.exercise.secondary_muscle_group && (
              <View style={practiceStyles.tag}>
                <MaterialIcons name="sports" size={14} color="#666" />
                <Text style={practiceStyles.tagText}>{item.exercise.secondary_muscle_group}</Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={practiceStyles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => handlePracticePress(item)}
              style={practiceStyles.detailButton}
              icon="information"
            >
              جزئیات
            </Button>
            <Button
              mode="contained"
              onPress={() => handleLogSet(item)}
              style={practiceStyles.logButton}
              icon="plus-circle"
            >
              ثبت ست
            </Button>
            <Button
              mode="contained"
              onPress={() => handleStartPractice(item)}
              style={practiceStyles.startButton}
              icon="play-circle"
            >
              شروع
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, practiceStyles.container]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, practiceStyles.text]}>در حال بارگذاری تمرین‌ها...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, practiceStyles.container]}>
      {error ? (
        <View style={[styles.errorContainer, practiceStyles.container]}>
          <Text style={[styles.errorText, practiceStyles.text]}>{error}</Text>
          <Button mode="contained" onPress={loadPractices} style={practiceStyles.button}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={practices}
            renderItem={renderPracticeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.listContainer, practiceStyles.listContainer]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#007AFF']}
              />
            }
            ListEmptyComponent={
              <View style={[styles.emptyContainer, practiceStyles.container]}>
                <MaterialIcons name="sports-gymnastics" size={64} color="#999" />
                <Text style={[styles.emptyText, practiceStyles.text]}>
                  هیچ تمرینی برای این workout وجود ندارد
                </Text>
                <Text style={[practiceStyles.emptySubtext, practiceStyles.text]}>
                  اولین تمرین را به این workout اضافه کنید
                </Text>
                <Button
                  mode="contained"
                  onPress={handleAddPractice}
                  style={practiceStyles.emptyButton}
                  icon="plus"
                >
                  افزودن تمرین
                </Button>
              </View>
            }
          />

          {/* Floating Action Button */}
          {practices.length > 0 && (
            <FAB style={practiceStyles.fab} icon="plus" onPress={handleAddPractice} color="white" />
          )}
        </>
      )}
    </View>
  );
};

const practiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardContent: {
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  },
  text: {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
  practiceHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  practiceTitleContainer: {
    flex: 1,
  },
  practiceName: {
    fontSize: 18,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginHorizontal: 4,
    marginVertical: 2,
    height: 28,
  },
  chipText: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  detailsGrid: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  detailItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 4,
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  button: {
    marginTop: 16,
    alignSelf: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 16,
  },
  emptyButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  actionButtons: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailButton: {
    flex: 1,
    marginHorizontal: 2,
  },
  logButton: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#28a745',
  },
  startButton: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#007AFF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: isRTL ? undefined : 0,
    left: isRTL ? 0 : undefined,
    bottom: 0,
    backgroundColor: '#007AFF',
  },
});

export default PracticeScreen;
