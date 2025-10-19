import { DifficultyLevel } from '@/types/difficulty.enum';
import { EquipmentType } from '@/types/equipment.enum';
import { MetricType } from '@/types/metric.enum';
import { MuscleGroup } from '@/types/muscleGroup.enum';

export interface Exercise {
  id: string;
  name_en: string;
  name_fa?: string;
  slug: string;
  instruction_en?: string;
  instruction_fa?: string;
  equipment?: EquipmentType; // from EquipmentType enum
  muscle_group?: MuscleGroup; // from MuscleGroup enum
  metric_type?: MetricType; // from MetricType enum (adjust if different)
  difficulty: DifficultyLevel;
  video_link?: string;
  image?: string;
  image_key?: string;
}

export interface ExerciseListResponse {
  exercises: Exercise[];
  total: number;
  page: number;
  limit: number;
}
