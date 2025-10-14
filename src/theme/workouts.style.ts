// src/theme/workouts.styles.ts
import { I18nManager, StyleSheet } from 'react-native';
import { colors } from './properties/colors';
import { fontSizes, typography } from './properties/typography';
import { spacing } from './properties/spacing';

const isRTL = I18nManager.isRTL;

export const workoutStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    color: colors.text,
    flex: 1,
    flexDirection: isRTL ? 'row-reverse' : 'row',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    marginHorizontal: 8,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  listContainer: {
    paddingBottom: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },

  workoutCard: {
    marginBottom: 12,
    elevation: 2,
  },
  workoutName: {
    fontSize: fontSizes.bodyLarge,
    marginBottom: 8,
  },
  workoutDescription: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: fontSizes.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  practicesSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginBottom: 16,
  },
  practicesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  practicesList: {
    width: '100%',
  },
  practiceItemContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  practiceItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    flex: 1,
  },
  practiceIcon: {
    marginHorizontal: 8,
  },
  practiceText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  practiceDetails: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  practiceDetailText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 4,
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  loadingPractices: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  morePracticesText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    textAlign: isRTL ? 'right' : 'left',
  },
  noPracticesText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: isRTL ? 'right' : 'left',
  },

  card: {
    backgroundColor: '#fff',
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
  workoutHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  workoutTitleContainer: {
    flex: 1,
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: isRTL ? 'flex-end' : 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginTop: 4,
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
  exercisesSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginBottom: 16,
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  exercisesList: {
    width: '100%',
  },
  exerciseItemContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  exerciseItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    flex: 1,
  },
  exerciseIcon: {
    marginHorizontal: 8,
  },
  exerciseText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  exerciseDetails: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  exerciseDetailText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 4,
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyBadge: {
    backgroundColor: colors.activeTintColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  moreExercisesText: {
    fontSize: 12,
    color: colors.activeTintColor,
    marginTop: 4,
    textAlign: isRTL ? 'right' : 'left',
  },
  noExercisesText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: isRTL ? 'right' : 'left',
  },
  loadingExercises: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },

  actionButtons: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  detailButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  startButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#28a745',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: isRTL ? undefined : 0,
    left: isRTL ? 0 : undefined,
    bottom: 0,
    backgroundColor: colors.activeTintColor,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
    marginRight: 8,
  },
  menuContent: {
    borderRadius: 8,
  },
  menuItem: {
    paddingHorizontal: 8,
  },
  deleteMenuText: {
    color: '#FF3B30', // Red color for delete
  },
  // New styles for practice items
  practiceItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  practiceCodeContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  practiceCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  practiceDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  practiceCategory: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
});

export const createWorkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  radioButton: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
});
