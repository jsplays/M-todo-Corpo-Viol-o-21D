import React, { useState } from 'react';
import { PROGRAM_DAYS, WORKOUT_SESSIONS } from '../data/workouts';
import { ProgramDay, UserProfile, WorkoutType } from '../types/workout';
import { CheckCircle2, Play, Calendar as CalendarIcon, Info, Dumbbell, Coffee, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  profile: UserProfile;
  onSelectDayToWorkout: (day: ProgramDay) => void;
}

export const CalendarView: React.FC<Props> = ({
  profile,
  onSelectDayToWorkout,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(
    profile.currentDay <= 7 ? 1 : profile.currentDay <= 14 ? 2 : 3
  );
  const [inspectionDay, setInspectionDay] = useState<ProgramDay | null>(null);

  const daysInWeek = PROGRAM_DAYS.filter((d) => d.week === selectedWeek);

  const getStatus = (dayNum: number) => {
    if (profile.completedDays[dayNum]) return 'completed';
    if (dayNum === profile.currentDay) return 'current';
    if (dayNum < profile.currentDay) return 'missed_or_past';
    return 'upcoming';
  };

  return (
    <div className="space-y-5 pb-20 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          Calendário de 21 Dias
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          3 sessões de força por semana com dias de recuperação e descanso ativo.
        </p>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((w) => (
          <button
            key={w}
            onClick={() => setSelectedWeek(w)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
              selectedWeek === w
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-600 border-stone-200/90 hover:bg-stone-50'
            }`}
          >
            <span>Semana {w}</span>
            <span className="block text-[10px] font-normal opacity-80 mt-0.5">
              {w === 1 ? 'Dias 1–7' : w === 2 ? 'Dias 8–14' : 'Dias 15–21'}
            </span>
          </button>
        ))}
      </div>

      {/* Weekly Progress Guidance */}
      <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200/70 text-xs text-stone-700 space-y-1">
        <div className="flex items-center justify-between font-semibold text-stone-900">
          <span>
            {selectedWeek === 1
              ? 'Semana 1: 30s esforço / 30s pausa'
              : selectedWeek === 2
              ? 'Semana 2: 35s esforço / 25s pausa'
              : 'Semana 3: 40s esforço / 20s pausa'}
          </span>
          <span className="text-[11px] text-emerald-800 font-medium">Ritmo gradual</span>
        </div>
        <p className="text-[11px] text-stone-600 leading-relaxed">
          {selectedWeek === 1 && 'Aprenda os movimentos e ajuste as versões com apoio sempre que sentir necessidade.'}
          {selectedWeek === 2 && 'Aumente o tempo de esforço apenas se conseguir manter a técnica com total controle.'}
          {selectedWeek === 3 && 'Use esse nível só se continuar confortável e estável. Repetir o nível anterior também é ótimo.'}
        </p>
      </div>

      {/* Days List for Active Week */}
      <div className="space-y-2.5">
        {daysInWeek.map((day) => {
          const status = getStatus(day.dayNumber);
          const completion = profile.completedDays[day.dayNumber];
          const isWorkoutDay = day.type === 'workout';

          return (
            <div
              key={day.dayNumber}
              onClick={() => setInspectionDay(day)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                status === 'current'
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                  : status === 'completed'
                  ? 'bg-white border-stone-200 opacity-90'
                  : 'bg-white border-stone-200/80 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : status === 'current'
                      ? 'bg-stone-900 text-white'
                      : isWorkoutDay
                      ? 'bg-stone-100 text-stone-600'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isWorkoutDay ? (
                    <Dumbbell className="w-4 h-4" />
                  ) : (
                    <Coffee className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      Dia {day.dayNumber}
                    </span>
                    {status === 'current' && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded">
                        Hoje
                      </span>
                    )}
                    {completion?.effortRating && (
                      <span className="text-[10px] text-stone-500 capitalize">
                        · {completion.effortRating}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs text-stone-700 font-medium mt-0.5 line-clamp-1">
                    {day.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">
                    {day.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </div>
          );
        })}
      </div>

      {/* Day Inspector Modal */}
      {inspectionDay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-stone-900 border border-stone-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Dia {inspectionDay.dayNumber} · Semana {inspectionDay.week}
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  {inspectionDay.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectionDay(null)}
                className="text-stone-400 hover:text-stone-600 text-xs p-1"
              >
                Fechar
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/70">
              {inspectionDay.description}
            </p>

            {/* If completed, show completion details */}
            {profile.completedDays[inspectionDay.dayNumber] && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Sessão Registrada</span>
                </div>
                {profile.completedDays[inspectionDay.dayNumber].effortRating && (
                  <p className="text-[11px]">
                    Sensação de esforço: <strong className="capitalize">{profile.completedDays[inspectionDay.dayNumber].effortRating}</strong>
                  </p>
                )}
                {profile.completedDays[inspectionDay.dayNumber].notes && (
                  <p className="text-[11px] italic text-stone-600 pt-1">
                    "{profile.completedDays[inspectionDay.dayNumber].notes}"
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {inspectionDay.type === 'workout' && (
              <button
                onClick={() => {
                  const targetDay = inspectionDay;
                  setInspectionDay(null);
                  onSelectDayToWorkout(targetDay);
                }}
                className="w-full h-11 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {profile.completedDays[inspectionDay.dayNumber]
                    ? 'Repetir Treino de 12 min'
                    : 'Iniciar Treino de 12 min'}
                </span>
              </button>
            )}

            {inspectionDay.type !== 'workout' && (
              <div className="text-center py-2 text-xs text-stone-500">
                Dia reservado para descanso e recuperação dos músculos.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
