// src/interfaces/practice.interface.ts
import { Exercise } from './exercise.interface';
import { Workout } from './workout.interface';

export interface Practice {
  id: number;
  order: number;
  set_number: number;

  // Previous Performance
  previous_weight?: number;
  previous_reps?: number;
  previous_time?: number;
  previous_rest?: number;

  // Current Performance
  current_weight?: number;
  current_reps?: number;
  current_time?: number;
  current_rest?: number;

  set_type: SetType;
  status: PracticeStatus;
  notes?: string;

  created_at: Date;
  updated_at: Date;
  completed_at?: Date;

  workout: Workout;
  exercise: Exercise;

  // Foreign keys (for creating/updating)
  workoutId?: number;
  exerciseId?: number;
}

// TODO: maybe better to uniform these
export enum SetType {
  WARMUP = 'warmup',
  WORKING = 'working',
  DROPSET = 'dropset',
  FAILURE = 'failure',
}

export enum PracticeStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
}
