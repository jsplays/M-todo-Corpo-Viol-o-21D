/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, ProgramDay, EffortRating, WellBeingState } from './types/workout';
import { loadProfile, saveProfile, markDayCompleted, resetProgramCycle } from './utils/storage';
import { WORKOUT_SESSIONS } from './data/workouts';
import { OnboardingFlow } from './components/OnboardingFlow';
import { TodayDashboard } from './components/TodayDashboard';
import { CalendarView } from './components/CalendarView';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { SafetyGuide } from './components/SafetyGuide';
import { ProgressView } from './components/ProgressView';
import { BottomNav, TabType } from './components/BottomNav';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import { Volume2, VolumeX, ShieldCheck, Activity } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [activeWorkoutDay, setActiveWorkoutDay] = useState<ProgramDay | null>(null);
  const [summaryDay, setSummaryDay] = useState<ProgramDay | null>(null);
  const [summaryMeta, setSummaryMeta] = useState<{
    usedEasierVersion?: boolean;
    wellBeing?: WellBeingState;
  }>({});

  // Sync profile state changes to storage
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveProfile(next);
      return next;
    });
  };

  const handleFinishOnboarding = (updated: Partial<UserProfile>) => {
    handleUpdateProfile(updated);
  };

  const handleToggleSound = () => {
    handleUpdateProfile({ soundEnabled: !profile.soundEnabled });
  };

  const handleStartWorkout = (day: ProgramDay) => {
    setActiveWorkoutDay(day);
  };

  const handleFinishWorkout = (result: {
    usedEasierVersion: boolean;
    wellBeing?: WellBeingState;
  }) => {
    if (!activeWorkoutDay) return;
    const finishedDay = activeWorkoutDay;
    setActiveWorkoutDay(null);
    setSummaryMeta(result);
    setSummaryDay(finishedDay);
  };

  const handleSaveSummary = (effort?: EffortRating, notes?: string) => {
    if (!summaryDay) return;
    const updated = markDayCompleted(
      summaryDay.dayNumber,
      effort,
      summaryMeta.wellBeing,
      notes,
      summaryMeta.usedEasierVersion
    );
    setProfile(updated);
    setSummaryDay(null);
  };

  const handleResetCycle = () => {
    const updated = resetProgramCycle();
    setProfile(updated);
  };

  // If onboarding not completed, show full onboarding flow
  if (!profile.onboardingCompleted) {
    return <OnboardingFlow onComplete={handleFinishOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-stone-100/80 text-stone-900 flex justify-center selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      {/* Mobile-First Frame */}
      <div className="w-full max-w-md min-h-screen bg-stone-50 border-x border-stone-200/70 shadow-sm flex flex-col justify-between relative">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-stone-50/90 backdrop-blur-md px-5 py-3.5 border-b border-stone-200/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
              Programa de 21 Dias
            </span>
            <h1 className="text-base font-bold tracking-tight text-stone-900 leading-tight">
              Método Corpo Violão 21D
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleSound}
              className="p-2 text-stone-500 hover:text-stone-800 transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={profile.soundEnabled ? 'Silenciar som' : 'Ativar som'}
              title={profile.soundEnabled ? 'Som ativado' : 'Som silenciado'}
            >
              {profile.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-700" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-400" />
              )}
            </button>
          </div>
        </header>

        {/* Content Views */}
        <main className="flex-1 px-5 pt-4">
          {activeTab === 'today' && (
            <TodayDashboard
              profile={profile}
              onStartWorkout={handleStartWorkout}
              onOpenLibrary={() => setActiveTab('library')}
              onOpenCalendar={() => setActiveTab('calendar')}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              profile={profile}
              onSelectDayToWorkout={handleStartWorkout}
            />
          )}

          {activeTab === 'library' && <ExerciseLibrary />}

          {activeTab === 'safety' && <SafetyGuide />}

          {activeTab === 'progress' && (
            <ProgressView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onResetCycle={handleResetCycle}
            />
          )}
        </main>

        {/* Bottom Tab Bar */}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* Active Workout Player Modal */}
        {activeWorkoutDay && activeWorkoutDay.workoutType && (
          <WorkoutPlayer
            workout={WORKOUT_SESSIONS[activeWorkoutDay.workoutType]}
            programDay={activeWorkoutDay}
            soundEnabled={profile.soundEnabled}
            onToggleSound={handleToggleSound}
            onFinishWorkout={handleFinishWorkout}
            onClose={() => setActiveWorkoutDay(null)}
          />
        )}

        {/* Workout Summary Modal */}
        {summaryDay && (
          <WorkoutSummaryModal
            day={summaryDay}
            usedEasierVersion={summaryMeta.usedEasierVersion}
            initialWellBeing={summaryMeta.wellBeing}
            onSave={handleSaveSummary}
            onClose={() => setSummaryDay(null)}
          />
        )}
      </div>
    </div>
  );
}
