import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { colors } from './properties/colors';
import { spacing } from './properties/spacing';
import { fontSizes } from './properties/typography';

const isRTL = I18nManager.isRTL;
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
  menuButton: {
    padding: 4,
    marginLeft: 8,
  },
  menuContent: {
    borderRadius: 8,
  },
  menuItem: {
    paddingHorizontal: 8,
  },
  deleteMenuText: {
    color: '#d32f2f', // Red color for delete
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planTitleContainer: {
    flex: 1,
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
});

export const createPlanStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: '#666',
  },
  noteContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  noteTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
});

export const editPlanstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: '#666',
  },
  noteContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  noteTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
});
