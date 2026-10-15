export type WorkoutType = 'A' | 'B' | 'C';

export type ExerciseMuscle = 'gluteos' | 'pernas' | 'abdomen' | 'superior' | 'mobilidade';

export interface Exercise {
  id: string;
  name: string;
  subtitle: string;
  instructions: string;
  easierVersion: string;
  focusMuscles: string[];
  safetyReminder: string;
  equipment: string; // 'Cadeira firme' | 'Parede' | 'Peso corporal'
  visualKey: string;
  imageUrl?: string;
  imageBackupUrl?: string;
  sourcePageUrl?: string;
}

export interface WorkoutSession {
  id: WorkoutType;
  title: string;
  focus: string;
  summary: string;
  exercises: Exercise[];
  safetyNote: string;
}

export interface WarmupExercise {
  id: string;
  name: string;
  durationSeconds: number;
  instructions: string;
  visualKey: string;
  imageUrl?: string;
  imageBackupUrl?: string;
  sourcePageUrl?: string;
}

export interface ProgramDay {
  dayNumber: number;
  type: 'workout' | 'recovery' | 'rest';
  workoutType?: WorkoutType;
  title: string;
  description: string;
  week: number;
  workSeconds: number;
  restSeconds: number;
  optionalActivity?: string;
}

export type EffortRating = 'leve' | 'adequado' | 'dificil';
export type WellBeingState = 'bem' | 'pouco_cansada' | 'desconforto';

export interface DayCompletion {
  completedAt: string;
  effortRating?: EffortRating;
  wellBeing?: WellBeingState;
  notes?: string;
  usedEasierVersion?: boolean;
}

export interface UserProfile {
  onboardingCompleted: boolean;
  termsAccepted: boolean;
  screeningPassed: boolean;
  screeningFlags: {
    under18: boolean;
    hasInjuryOrPain: boolean;
    hasHealthCondition: boolean;
    isPregnantOrPostpartum: boolean;
  };
  strengthExperience: 'sim' | 'nao' | 'as_vezes';
  prefersSupport: boolean;
  preferredTime: 'manha' | 'tarde' | 'noite' | 'sem_lembrete';
  currentDay: number;
  completedDays: Record<number, DayCompletion>;
  soundEnabled: boolean;
}
