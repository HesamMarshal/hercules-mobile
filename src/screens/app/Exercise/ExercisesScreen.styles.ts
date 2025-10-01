import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { temporarySpacing } from '@/theme/temporarySpacing';

// TODO : Remove after full migration
// Temporary colors until theme migration
const temporaryColors = {
  background: '#f5f5f5',
  surface: '#ffffff',
  primary: '#2196f3',
  error: '#f44336',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: temporaryColors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: temporarySpacing.lg,
  },
  loadingText: {
    marginTop: temporarySpacing.md,
    fontSize: 16,
    color: temporaryColors.text,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: temporaryColors.error,
    textAlign: 'center',
    marginBottom: temporarySpacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: temporarySpacing.lg,
  },
  retryButton: {
    marginTop: temporarySpacing.md,
  },
  searchBar: {
    margin: temporarySpacing.md,
    marginBottom: temporarySpacing.sm,
  },
  filterContainer: {
    paddingHorizontal: temporarySpacing.md,
    paddingVertical: temporarySpacing.sm,
  },
  body_partFilterChip: {
    marginHorizontal: temporarySpacing.xs,
  },
  listContainer: {
    padding: temporarySpacing.md,
    paddingTop: temporarySpacing.sm,
  },
  exerciseCard: {
    marginBottom: temporarySpacing.md,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: temporarySpacing.sm,
  },
  exerciseName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: temporaryColors.text,
  },
  difficultyChip: {
    marginLeft: temporarySpacing.sm,
  },
  beginnerChip: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  intermediateChip: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },
  advancedChip: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  body_partChip: {
    alignSelf: 'flex-start',
    marginBottom: temporarySpacing.sm,
    backgroundColor: temporaryColors.primary + '15', // 15% opacity
  },
  body_partText: {
    color: temporaryColors.primary,
    fontSize: 12,
  },
  exerciseDescription: {
    fontSize: 14,
    color: temporaryColors.textSecondary,
    lineHeight: 20,
    textAlign: 'right', // Default RTL for Persian
  },
  exercise_typeContainer: {
    flexDirection: 'row',
    marginTop: temporarySpacing.sm,
    alignItems: 'center',
  },
  exercise_typeLabel: {
    fontSize: 14,
    color: temporaryColors.textSecondary,
    fontWeight: '500',
  },
  exercise_typeValue: {
    fontSize: 14,
    color: temporaryColors.text,
    fontWeight: '400',
    marginLeft: temporarySpacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: temporarySpacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: temporaryColors.textSecondary,
    textAlign: 'center',
  },
});
