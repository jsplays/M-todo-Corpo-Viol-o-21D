import { UserProfile, DayCompletion, EffortRating, WellBeingState } from '../types/workout';

const STORAGE_KEY = 'corpo_violao_21d_profile_v1';

export const DEFAULT_PROFILE: UserProfile = {
  onboardingCompleted: false,
  termsAccepted: false,
  screeningPassed: false,
  screeningFlags: {
    under18: false,
    hasInjuryOrPain: false,
    hasHealthCondition: false,
    isPregnantOrPostpartum: false,
  },
  strengthExperience: 'nao',
  prefersSupport: true,
  preferredTime: 'manha',
  currentDay: 1,
  completedDays: {},
  soundEnabled: true,
};

export function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // LocalStorage error fallback
  }
}

export function markDayCompleted(
  dayNumber: number,
  effortRating?: EffortRating,
  wellBeing?: WellBeingState,
  notes?: string,
  usedEasierVersion?: boolean
): UserProfile {
  const current = loadProfile();
  const completion: DayCompletion = {
    completedAt: new Date().toISOString(),
    effortRating,
    wellBeing,
    notes,
    usedEasierVersion,
  };

  const updatedCompleted = {
    ...current.completedDays,
    [dayNumber]: completion,
  };

  // Advance currentDay if completing the current one and under 21
  const nextDay = dayNumber < 21 ? Math.max(current.currentDay, dayNumber + 1) : 21;

  const updated: UserProfile = {
    ...current,
    currentDay: nextDay,
    completedDays: updatedCompleted,
  };

  saveProfile(updated);
  return updated;
}

export function resetProgramCycle(): UserProfile {
  const current = loadProfile();
  const updated: UserProfile = {
    ...current,
    currentDay: 1,
    completedDays: {},
  };
  saveProfile(updated);
  return updated;
}
