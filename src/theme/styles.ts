import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { colors } from '@/theme/properties/colors';
import { spacing } from '@/theme/properties/spacing';
import { fontSizes, typography } from '@/theme/properties/typography';
const isRTL = I18nManager.isRTL;
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
    fontSize: fontSizes.micro,
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
    fontSize: fontSizes.small,
    color: colors.text,
  },
  exercise_typeValue: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  // TODO: Make it general
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: fontSizes.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    marginTop: spacing.sm,
  },
  // TODO: General
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: fontSizes.body,
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
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: fontSizes.body,
    color: colors.error,
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
    fontSize: fontSizes.headingPlus,
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
    fontSize: fontSizes.micro,
  },
  body_partChip: {
    backgroundColor: colors.background,
  },
  divider: {
    marginVertical: 8,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: fontSizes.bodyLarge,
    marginBottom: 12,
  },
  description: {
    fontSize: fontSizes.body,
    lineHeight: 24,
    color: colors.text2, // TODO : fix text
  },
  instructions: {
    fontSize: fontSizes.body,
    lineHeight: 24,
    color: colors.text2, // TODO : fix text
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: colors.background,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: fontSizes.body,
    color: colors.text2, // TODO : fix text
  },
  detailValue: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  videoButton: {
    marginTop: 8,
  },
});

// TODO : Use Above variable and consts
export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: fontSizes.body,
    color: colors.error,
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
    fontSize: fontSizes.headingPlus,
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
    borderBottomColor: colors.borderLight,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.text2, // TODO : fix text
  },
  value: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  noData: {
    textAlign: 'center',
    fontSize: fontSizes.body,
    color: colors.textSecondary,
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
    shadowColor: colors.shadow,
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
    fontSize: fontSizes.bodyLarge,
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
export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: colors.error,
  },
  versionText: {
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

// TODO : Use Above variable and consts

export const workoutStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
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
});

// TODO : Use Above variable and consts
export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: fontSizes.displayPlus,
    fontWeight: 'bold',
    marginBottom: 40,
    color: colors.text2, // TODO : fix text
  },
  instruction: {
    fontSize: fontSizes.small,
    marginBottom: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSizes.body,
    marginBottom: 5,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  mobileNumber: {
    fontSize: fontSizes.bodyLarge,
    fontWeight: '600',
    marginBottom: 20,
    color: 'colors.info',
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
    borderColor: colors.border,
    fontSize: fontSizes.body,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.info,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  buttonText: {
    color: 'white',
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backText: {
    color: 'colors.info',
    textAlign: 'center',
    fontSize: fontSizes.body,
  },
});

// TODO : Use Above variable and consts
export const planStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardContent: {
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: isRTL ? 'flex-end' : 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  text: {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 15,
    paddingVertical: 8,
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  planHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
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
  },
  workoutsSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  workoutsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  workoutsList: {
    width: '100%',
  },
  workoutItemContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  workoutItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    flex: 1,
  },
  workoutIcon: {
    marginHorizontal: 8,
  },
  workoutText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  difficultyContainer: {
    marginLeft: isRTL ? 0 : 8,
    marginRight: isRTL ? 8 : 0,
  },
  difficultyBadge: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  moreWorkoutsText: {
    fontSize: 12,
    color: colors.activeTintColor,
    marginTop: 4,
    textAlign: isRTL ? 'right' : 'left',
  },
  noWorkoutsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: isRTL ? 'right' : 'left',
  },
  loadingWorkouts: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  loadingText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: isRTL ? undefined : 0,
    left: isRTL ? 0 : undefined,
    bottom: 0,
    backgroundColor: colors.activeTintColor,
  },
  emptyButton: {
    marginTop: 16,
    alignSelf: 'center',
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: fontSizes.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
