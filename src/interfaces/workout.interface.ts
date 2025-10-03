import { Exercise } from '../interfaces/exercise.interface';
import { Practice } from './practice.interface';

export interface Workout {
  id: string;
  name: string;
  order: number;
  day_of_week: string; //enum
  practices?: Practice[];
}

export interface ExerciseListResponse {
  workoutes: Workout[];
  total: number;
  page: number;
  limit: number;
}
