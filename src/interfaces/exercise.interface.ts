export interface Exercise {
  id: string;
  name: string;
  slug: string;
  instruction: string;
  category: string;

  body_part: string;
  //   muscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercise_type: string;
  //   equipment?: string;
  instructions?: string;
  video_link?: string;
  image?: string;
  //   createdAt: string;
  //   updatedAt: string;
}

export interface ExerciseListResponse {
  exercises: Exercise[];
  total: number;
  page: number;
  limit: number;
}
