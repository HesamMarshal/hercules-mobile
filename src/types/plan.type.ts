import { Exercise } from './exercise';
import { Practice } from './practice';
import { Workout } from './workout.type';

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
