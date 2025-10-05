// src/types/navigation.ts

// TODO: add type
export type RootStackParamList = {
  Auth: undefined;

  MainTabs: undefined;
  // Profile, Plans, Exercises, Settings

  PlansScreen: undefined;
  CreatePlan: {
    onPlanCreated: () => void;
  };

  EditPlan: {
    planId: string;
    planName: string;
    startDate: string;
    endDate: string;
    onPlanUpdated: () => void;
  };

  WorkoutScreen: {
    planId: string;
    planName: string;
    refresh?: boolean;
  };
  CreateWorkoutScreen: {
    planId: string;
    onWorkoutCreated: () => void;
  };
  EditWorkoutScreen: {
    workoutId: string;
    planId: string;
    planName: string;
    onWorkoutUpdated: () => void;
  };

  PracticeScreen: {
    workoutId: string;
    workoutName: string;
    planId: string;
  };
  CreatePractice: undefined;

  ExerciseDetail: undefined;
};

// Use this for route prop typing
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type EditPlanRouteProp = RouteProp<RootStackParamList, 'EditPlan'>;
export type EditPlanNavigationProp = StackNavigationProp<RootStackParamList, 'EditPlan'>;

export type WorkoutScreenRouteProp = RouteProp<RootStackParamList, 'WorkoutScreen'>;
export type WorkoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutScreen'>;

export type CreateWorkoutRouteProp = RouteProp<RootStackParamList, 'CreateWorkoutScreen'>;
export type CreateWorkoutNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateWorkoutScreen'
>;

export type EditWorkoutRouteProp = RouteProp<RootStackParamList, 'EditWorkoutScreen'>;
export type EditWorkoutNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditWorkoutScreen'
>;

export type PracticeScreenRouteProp = RouteProp<RootStackParamList, 'PracticeScreen'>;
export type PracticeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PracticeScreen'
>;
