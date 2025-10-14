// src/theme/practice.style.ts
import { StyleSheet } from 'react-native';
import { colors } from './properties/colors';

export const practiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  practiceCount: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    marginLeft: 16,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  practiceCard: {
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  practiceContent: {
    paddingVertical: 12,
  },
  practiceItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practiceCodeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  practiceCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  practiceDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceTextContainer: {
    flex: 1,
  },
  practiceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  practiceCategory: {
    fontSize: 14,
    color: '#666',
  },
  practiceMetrics: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  practiceMetricText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  menuContainer: {
    marginLeft: 8,
  },
  menuButton: {
    padding: 4,
  },
  menuContent: {
    borderRadius: 8,
  },
  menuItem: {
    paddingHorizontal: 8,
  },
  deleteMenuText: {
    color: '#ff3b30',
  },
  startButtonContainer: {
    padding: 16,
    paddingTop: 8,
  },
  startButton: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.activeTintColor,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    marginTop: 8,
  },
  practiceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  setType: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  notesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 6,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export const createPracticeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  selectedExerciseCard: {
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  selectedExerciseTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectedExerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  changeExerciseButton: {
    alignSelf: 'flex-start',
  },
  exerciseSelectionSection: {
    marginBottom: 16,
  },
  formSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  searchBar: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  exercisesList: {
    maxHeight: 300,
  },
  exercisesListContent: {
    paddingBottom: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedExerciseItem: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  exerciseMuscle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  exerciseDifficulty: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  exerciseEquipment: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyExercises: {
    alignItems: 'center',
    padding: 40,
  },
  emptyExercisesText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formField: {
    flex: 0.48,
  },
  orderInput: {
    marginBottom: 16,
  },
  createButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  createButton: {
    borderRadius: 8,
  },
  createButtonContent: {
    paddingVertical: 8,
  },

  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  notesInput: {
    marginBottom: 16,
  },
  setTypeSelector: {
    width: '100%',
  },
});

export const editPracticeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  selectedExerciseCard: {
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  selectedExerciseTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectedExerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  changeExerciseButton: {
    alignSelf: 'flex-start',
  },
  exerciseSelectionSection: {
    marginBottom: 16,
  },
  formSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  searchBar: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  exercisesList: {
    maxHeight: 300,
  },
  exercisesListContent: {
    paddingBottom: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedExerciseItem: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  exerciseMuscle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  exerciseDifficulty: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  exerciseEquipment: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyExercises: {
    alignItems: 'center',
    padding: 40,
  },
  emptyExercisesText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formField: {
    flex: 0.48,
  },
  orderInput: {
    marginBottom: 16,
  },
  actionButtonsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 0.3,
    borderColor: '#ff3b30',
  },
  updateButton: {
    flex: 0.65,
    borderRadius: 8,
  },
  updateButtonContent: {
    paddingVertical: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  errorButton: {
    marginTop: 8,
  },
  setTypeSelector: {
    width: '100%',
  },

  notesInput: {
    marginBottom: 16,
  },

  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  currentPerformanceCard: {
    backgroundColor: '#f0f8ff',
    marginBottom: 16,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  currentPerformanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  currentPerformanceText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  completedAtText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
