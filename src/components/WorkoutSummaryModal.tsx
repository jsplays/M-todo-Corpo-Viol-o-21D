import React, { useState } from 'react';
import { EffortRating, WellBeingState, ProgramDay } from '../types/workout';
import { CheckCircle2, ThumbsUp, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  day: ProgramDay;
  usedEasierVersion?: boolean;
  initialWellBeing?: WellBeingState;
  onSave: (effort?: EffortRating, notes?: string) => void;
  onClose: () => void;
}

export const WorkoutSummaryModal: React.FC<Props> = ({
  day,
  usedEasierVersion,
  initialWellBeing,
  onSave,
  onClose,
}) => {
  const [effort, setEffort] = useState<EffortRating>('adequado');
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl text-stone-900 border border-stone-200">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100/80 rounded-2xl flex items-center justify-center text-emerald-800 mx-auto shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block">
            Dia {day.dayNumber} · Ciclo 21D
          </span>
          <h2 className="text-xl font-bold tracking-tight text-stone-900">
            Sessão concluída
          </h2>
          <p className="text-xs text-stone-600">
            Obrigada(o) por se movimentar no seu ritmo.
          </p>
        </div>

        {/* Question: Como foi hoje? */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="text-xs font-semibold text-stone-800 block">
            Como foi hoje para você?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'leve', label: 'Leve' },
              { id: 'adequado', label: 'Adequado' },
              { id: 'dificil', label: 'Difícil' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEffort(item.id as EffortRating)}
                className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-colors ${
                  effort === item.id
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Supportive note if "Difícil" */}
          {effort === 'dificil' && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2 mt-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Na próxima sessão, você pode reduzir o tempo de esforço ou escolher a versão mais fácil. O objetivo é a constância, nunca a exaustão.
              </span>
            </div>
          )}
        </div>

        {/* Optional Personal Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 block">
            Observações pessoais (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Como o corpo reagiu, sensações ou adaptações usadas..."
            rows={2}
            className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-400 bg-stone-50/50 resize-none text-stone-800"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => onSave(effort, notes)}
          className="w-full h-12 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
        >
          <span>Salvar e continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
