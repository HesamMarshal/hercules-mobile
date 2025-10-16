import { StyleSheet, I18nManager } from 'react-native';
import { colors } from './properties/colors';
import { fontSizes } from './properties/typography';
const isRTL = I18nManager.isRTL || true;

// TODO : Use Above variable and consts
export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    padding: 16,
    // flexDirection: isRTL ? 'row-reverse' : 'row',
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
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: fontSizes.headingPlus,
    color: colors.text,
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
    color: colors.text, // TODO : fix text
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
