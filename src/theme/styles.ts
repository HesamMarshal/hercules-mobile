import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/theme/properties/colors';
import { spacing } from '@/theme/properties/spacing';
import { typography } from '@/theme/properties/typography';

export const exerciseStyles = StyleSheet.create({
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

// TODO : Use Above variable and consts
export const exerciseDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  header: {
    paddingBottom: 0,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  difficultyChip: {
    marginRight: 8,
  },
  difficultyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  body_partChip: {
    backgroundColor: '#e3f2fd',
  },
  divider: {
    marginVertical: 8,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
  },
  videoButton: {
    marginTop: 8,
  },
});

// TODO : Use Above variable and consts
export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  button: {
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 20,
  },
});

const { width, height } = Dimensions.get('window');
// TODO : Use Above variable and consts
export const OTPVerificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  card: {
    marginHorizontal: spacing.sm,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardContent: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  mobileNumber: {
    ...typography.h3,
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: colors.error + '20',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    fontWeight: '500',
  },
  otpContainer: {
    marginBottom: spacing.xl,
  },
  otpInput: {
    backgroundColor: colors.surface,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 2,
  },
  verifyButton: {
    marginBottom: spacing.lg,
    borderRadius: 8,
    elevation: 2,
  },
  verifyButtonContent: {
    paddingVertical: spacing.sm,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
  },
  resendText: {
    ...typography.body,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  resendButton: {
    marginLeft: spacing.xs,
  },
  resendButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  backButton: {
    borderColor: colors.border,
    borderRadius: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  loadingText: {
    ...typography.body,
    marginTop: spacing.md,
    color: colors.text,
  },
});

// TODO : Use Above variable and consts
export const planStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
  },
});

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  divider: {
    marginVertical: 8,
  },
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    marginBottom: 16,
    borderColor: '#d32f2f',
  },
  versionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

// TODO : Use Above variable and consts

export const workoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 16,
  },
  workoutCard: {
    marginBottom: 12,
    elevation: 2,
  },
  workoutName: {
    fontSize: 18,
    marginBottom: 8,
  },
  workoutDescription: {
    color: '#666',
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#888',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

// TODO : Use Above variable and consts
export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
    textAlign: 'center',
  },
  mobileNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#007AFF',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
