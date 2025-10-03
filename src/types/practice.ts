export interface Practice {
  id: string;
  exercise_id: string;
  workout_id: string;
  sets: number;
  reps: number;
  weight: number;
  rest_time: number;
  order: number;
  exercise: {
    id: string;
    name: string;
    description: string;
    video_url: string;
    primary_muscle_group: string;
    secondary_muscle_group: string;
    equipment: string;
    difficulty: string;
  };
}
