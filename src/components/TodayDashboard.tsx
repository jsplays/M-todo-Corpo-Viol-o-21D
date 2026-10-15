import React from 'react';
import { UserProfile, ProgramDay, WorkoutSession } from '../types/workout';
import { PROGRAM_DAYS, WORKOUT_SESSIONS } from '../data/workouts';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  Play,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Coffee,
  HelpCircle,
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onStartWorkout: (day: ProgramDay) => void;
  onOpenLibrary: () => void;
  onOpenCalendar: () => void;
}

export const TodayDashboard: React.FC<Props> = ({
  profile,
  onStartWorkout,
  onOpenLibrary,
  onOpenCalendar,
}) => {
  const currentDayNumber = profile.currentDay;
  const currentDay =
    PROGRAM_DAYS.find((d) => d.dayNumber === currentDayNumber) || PROGRAM_DAYS[0];
  const isCompletedToday = !!profile.completedDays[currentDayNumber];
  const workout: WorkoutSession | undefined = currentDay.workoutType
    ? WORKOUT_SESSIONS[currentDay.workoutType]
    : undefined;

  // Time prompt text
  const getTimePrompt = () => {
    switch (profile.preferredTime) {
      case 'manha':
        return 'Sessão matinal para começar o dia com vitalidade e disposição.';
      case 'tarde':
        return 'Pausa na rotina da tarde para movimentar o corpo e soltar a tensão.';
      case 'noite':
        return 'Momento de relaxamento e força controlada antes do descanso noturno.';
      default:
        return 'Faça no momento do dia em que se sentir com mais disposição.';
    }
  };

  return (
    <div className="space-y-5 pb-20 animate-in fade-in">
      {/* Top Greeting Card */}
      <div className="p-5 bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              Dia {currentDay.dayNumber} de 21
            </span>
            <span className="text-xs text-stone-300">
              Semana {currentDay.week}
            </span>
          </div>

          {isCompletedToday && (
            <span className="flex items-center gap-1 text-xs text-emerald-300 font-medium bg-emerald-900/60 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Concluído hoje</span>
            </span>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {currentDay.title}
          </h2>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            {currentDay.description}
          </p>
        </div>

        {/* Workout Metas: 12 min & Equipment */}
        {currentDay.type === 'workout' && workout && (
          <div className="flex items-center gap-4 text-xs text-stone-300 pt-1 border-t border-stone-700/80">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>~12 minutos</span>
            </div>
            <span>·</span>
            <div>
              <span>4 estações</span>
            </div>
            <span>·</span>
            <div>
              <span>Cadeira & Parede</span>
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        {currentDay.type === 'workout' ? (
          <button
            onClick={() => onStartWorkout(currentDay)}
            className="w-full h-12 rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              {isCompletedToday ? 'Repetir Treino de 12 min' : 'Iniciar Treino de 12 min'}
            </span>
          </button>
        ) : (
          <div className="p-3 bg-stone-800/90 rounded-2xl border border-stone-700/70 text-xs text-stone-300 flex items-start gap-2.5">
            <Coffee className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-100 block">Dia de Recuperação</strong>
              <p className="text-stone-300 mt-0.5">
                {currentDay.optionalActivity || 'Deixe os músculos descansarem para o próximo treino de força.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Routine Time Hint */}
      <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200/70 text-xs text-stone-600 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{getTimePrompt()}</p>
      </div>

      {/* Today's 4 Exercises Preview (if workout day) */}
      {currentDay.type === 'workout' && workout && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Movimentos de Hoje ({workout.exercises.length})
            </h3>
            <button
              onClick={onOpenLibrary}
              className="text-xs font-medium text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Ver movimentos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {workout.exercises.map((ex, index) => (
              <div
                key={ex.id}
                onClick={onOpenLibrary}
                className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:border-stone-300 transition-colors cursor-pointer space-y-2"
              >
                <div className="w-full h-20 rounded-xl bg-stone-100 overflow-hidden p-1 flex items-center justify-center">
                  <ExerciseIllustration
                    visualKey={ex.visualKey}
                    className="w-full h-full p-0 border-0 bg-transparent"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block">0{index + 1}</span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {ex.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {ex.focusMuscles[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice on Screen */}
          <div className="p-3 bg-white rounded-2xl border border-stone-200/80 text-xs text-stone-700 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Lembrete de segurança:</strong> {workout.safetyNote}
            </span>
          </div>
        </div>
      )}

      {/* 21-Day Mini Bar Overview */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Ciclo de 21 Dias
            </h4>
            <span className="text-xs text-stone-500">
              {Object.keys(profile.completedDays).length} de 21 sessões registradas
            </span>
          </div>
          <button
            onClick={onOpenCalendar}
            className="text-xs font-medium text-emerald-800 hover:text-emerald-900"
          >
            Ver calendário
          </button>
        </div>

        {/* 21 Dots / Blocks Grid */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {PROGRAM_DAYS.map((d) => {
            const isDone = !!profile.completedDays[d.dayNumber];
            const isCurrent = d.dayNumber === currentDayNumber;

            return (
              <div
                key={d.dayNumber}
                onClick={onOpenCalendar}
                className={`h-7 rounded-lg text-[10px] font-mono flex items-center justify-center cursor-pointer transition-colors ${
                  isDone
                    ? 'bg-emerald-700 text-white font-bold'
                    : isCurrent
                    ? 'bg-stone-900 text-white font-bold ring-2 ring-emerald-600'
                    : d.type === 'workout'
                    ? 'bg-stone-100 text-stone-700 border border-stone-200/60'
                    : 'bg-stone-50 text-stone-400 border border-stone-100'
                }`}
                title={`Dia ${d.dayNumber}: ${d.title}`}
              >
                {d.dayNumber}
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen Safety Mantra */}
      <div className="text-center py-2">
        <p className="text-xs text-stone-500 font-medium">
          Movimento controlado vale mais que velocidade. Pare se sentir dor ou mal-estar.
        </p>
      </div>
    </div>
  );
};
