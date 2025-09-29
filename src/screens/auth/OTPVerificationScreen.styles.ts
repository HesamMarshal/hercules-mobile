import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '@/theme/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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

// Additional theme constants for OTP screen
export const otpColors = {
  inputBackground: colors.surface,
  inputBorder: colors.border,
  success: colors.success,
  error: colors.error,
};

export const otpSpacing = {
  inputPadding: spacing.md,
  buttonPadding: spacing.sm,
};
