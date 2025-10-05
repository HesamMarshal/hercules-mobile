import { Exercise } from './exercise.interface';

export interface Practice {
  id: string;
  workout_id: string;
  exercise_id: string;
  sets: number;
  reps: number;
  weight: number;
  rest_time: number;
  order: number;
  exercise?: Exercise;
}
