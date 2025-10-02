export interface Workout {
  id: string;
  name: string;
  order: number;
  day_of_week: string; //enum
}

export interface ExerciseListResponse {
  workoutes: Workout[];
  total: number;
  page: number;
  limit: number;
}
