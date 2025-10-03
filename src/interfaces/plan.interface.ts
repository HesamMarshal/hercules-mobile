import { Exercise } from './exercise.interface';
import { Workout } from './workout.interface';

export interface Plan {
  id: string;
  name: string;
  order: number;
  start_date: string;
  end_date: string;
  workouts?: Workout[];
}

export interface ExerciseListResponse {
  plans: Plan[];
  total: number;
  page: number;
  limit: number;
}
