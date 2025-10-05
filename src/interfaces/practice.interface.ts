import { Exercise } from './exercise.interface';

export interface Practice {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  rest_time: number;
  order: number;
  exercise?: Exercise;
}
