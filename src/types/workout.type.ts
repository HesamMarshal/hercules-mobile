import { Exercise } from './exercise';
import { Practice } from './practice';

export interface Workout {
  id: string;
  name: string;
  order: number;
  day_of_week: string; //enum
  // TODO: replace with practice
  exercises?: Exercise[];
  practices?: Practice[];
}

export interface ExerciseListResponse {
  workoutes: Workout[];
  total: number;
  page: number;
  limit: number;
}
