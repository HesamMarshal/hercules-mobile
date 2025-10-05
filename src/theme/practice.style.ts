// src/theme/practice.style.ts
import { StyleSheet } from 'react-native';
import { colors } from './properties/colors';

export const practiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
});
