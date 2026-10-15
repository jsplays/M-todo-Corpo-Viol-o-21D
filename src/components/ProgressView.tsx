import React, { useState } from 'react';
import { UserProfile } from '../types/workout';
import { PROGRAM_DAYS } from '../data/workouts';
import { CheckCircle2, RotateCcw, Volume2, VolumeX, Shield, Calendar, Heart, Award } from 'lucide-react';

interface Props {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetCycle: () => void;
}

export const ProgressView: React.FC<Props> = ({
  profile,
  onUpdateProfile,
  onResetCycle,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completedCount = Object.keys(profile.completedDays).length;
  const daysRemaining = Math.max(0, 21 - completedCount);

  // Strength sessions completed vs total strength sessions (9 sessions)
  const strengthWorkoutsCompleted = Object.keys(profile.completedDays).filter((d) => {
    const dayObj = PROGRAM_DAYS.find((p) => p.dayNumber === Number(d));
    return dayObj?.type === 'workout';
  }).length;

  // Effort counts
  const effortStats = Object.values(profile.completedDays).reduce(
    (acc, c) => {
      if (c.effortRating) {
        acc[c.effortRating] = (acc[c.effortRating] || 0) + 1;
      }
      return acc;
    },
    { leve: 0, adequado: 0, dificil: 0 } as Record<string, number>
  );

  return (
    <div className="space-y-5 pb-20 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          Progresso & Ajustes
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          Acompanhamento gentil da sua consistência, sem metas estéticas ou contagem calórica.
        </p>
      </div>

      {/* Neutral Stat Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-medium">Dias Concluídos</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
            {completedCount} <span className="text-xs font-normal text-stone-400">/ 21</span>
          </div>
          <span className="text-[11px] text-emerald-800 font-medium block">
            {daysRemaining === 0 ? 'Ciclo finalizado!' : `${daysRemaining} dias restantes`}
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-medium">Treinos de Força</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
            {strengthWorkoutsCompleted} <span className="text-xs font-normal text-stone-400">/ 9</span>
          </div>
          <span className="text-[11px] text-stone-500 block">
            3 sessões guiadas por semana
          </span>
        </div>
      </div>

      {/* Effort Distribution */}
      {completedCount > 0 && (
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Percepção do Esforço
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Leve</span>
              <span className="text-lg font-bold font-mono tabular-nums text-stone-900">
                {effortStats.leve}
              </span>
            </div>
            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Adequado</span>
              <span className="text-lg font-bold font-mono tabular-nums text-emerald-800">
                {effortStats.adequado}
              </span>
            </div>
            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Difícil</span>
              <span className="text-lg font-bold font-mono tabular-nums text-amber-800">
                {effortStats.dificil}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Personal Notes Diary */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          Diário de Sensações & Anotações
        </h4>

        {completedCount === 0 ? (
          <p className="text-xs text-stone-500 py-2">
            Nenhuma anotação ainda. Ao concluir um treino, você pode registrar como seu corpo respondeu.
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
            {Object.entries(profile.completedDays)
              .filter(([_, c]) => c.notes && c.notes.trim().length > 0)
              .map(([dayNum, c]) => (
                <div key={dayNum} className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-semibold text-stone-700">Dia {dayNum}</span>
                    <span>{new Date(c.completedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <p className="text-stone-700 italic">"{c.notes}"</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* App Preferences */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          Preferências do Treino
        </h4>

        {/* Audio Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-stone-100">
          <div>
            <span className="text-xs font-medium text-stone-800 block">Sons do Temporizador</span>
            <span className="text-[11px] text-stone-500">Bipes suaves nos últimos 3 segundos</span>
          </div>
          <button
            onClick={() => onUpdateProfile({ soundEnabled: !profile.soundEnabled })}
            className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
              profile.soundEnabled
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-stone-50 text-stone-600 border-stone-200'
            }`}
          >
            {profile.soundEnabled ? 'Ativado' : 'Silenciado'}
          </button>
        </div>

        {/* Support Preference */}
        <div className="flex items-center justify-between py-2 border-b border-stone-100">
          <div>
            <span className="text-xs font-medium text-stone-800 block">Preferência de Apoio</span>
            <span className="text-[11px] text-stone-500">Exibir versões com cadeira/parede por padrão</span>
          </div>
          <button
            onClick={() => onUpdateProfile({ prefersSupport: !profile.prefersSupport })}
            className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
              profile.prefersSupport
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-stone-50 text-stone-600 border-stone-200'
            }`}
          >
            {profile.prefersSupport ? 'Com apoio' : 'Sem apoio'}
          </button>
        </div>

        {/* Reset Cycle */}
        <div className="pt-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-600 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reiniciar ciclo de 21 dias</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl text-stone-900 border border-stone-200 text-left">
            <h4 className="text-base font-bold">Reiniciar o ciclo de 21 dias?</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              O dia atual voltará para o Dia 1 e o histórico de treinos deste ciclo será redefinido para você recomeçar uma nova rodada.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetCycle();
                }}
                className="flex-1 py-2 rounded-xl bg-rose-700 text-white text-xs font-medium hover:bg-rose-800"
              >
                Sim, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
