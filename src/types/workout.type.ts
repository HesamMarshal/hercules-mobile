import { Exercise } from './exercise';

export interface Workout {
  id: string;
  name: string;
  order: number;
  day_of_week: string; //enum
  // TODO: replace with practice
  exercises?: Exercise[];
}

export interface ExerciseListResponse {
  workoutes: Workout[];
  total: number;
  page: number;
  limit: number;
}
