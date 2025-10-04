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
