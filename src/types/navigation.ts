// src/types/navigation.ts
export type RootStackParamList = {
  PlansScreen: undefined;
  WorkoutScreen: {
    planId: string;
    planName: string;
  };
  PracticeScreen: {
    workoutId: string;
    workoutName: string;
    planId: string;
  };
  // Add other screens as needed
};

// Use this for route prop typing
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type WorkoutScreenRouteProp = RouteProp<RootStackParamList, 'WorkoutScreen'>;
export type PracticeScreenRouteProp = RouteProp<RootStackParamList, 'PracticeScreen'>;

export type WorkoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutScreen'>;
export type PracticeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PracticeScreen'
>;
