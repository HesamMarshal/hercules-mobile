import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.sm,
    ...typography.caption,
  },
  searchBar: {
    marginBottom: spacing.md,
    elevation: 2,
  },
  filterContainer: {
    marginBottom: spacing.md,
  },
  body_partFilterChip: {
    marginRight: spacing.sm,
  },
  listContainer: {
    paddingBottom: spacing.md,
  },
  exerciseCard: {
    marginBottom: spacing.sm,
    elevation: 2,
    backgroundColor: colors.surface,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  exerciseName: {
    flex: 1,
    ...typography.h3,
    marginRight: spacing.sm,
  },
  difficultyChip: {
    alignSelf: 'flex-start',
  },
  beginnerChip: {
    backgroundColor: colors.beginner,
  },
  intermediateChip: {
    backgroundColor: colors.intermediate,
  },
  advancedChip: {
    backgroundColor: colors.advanced,
  },
  body_partChip: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    backgroundColor: colors.body_part,
  },
  body_partText: {
    fontSize: 12,
  },
  exerciseDescription: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  exercise_typeContainer: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  exercise_typeLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  exercise_typeValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    marginTop: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
