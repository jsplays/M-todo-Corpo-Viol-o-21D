import React, { useState } from 'react';
import { UserProfile } from '../types/workout';
import { ShieldCheck, Heart, AlertTriangle, ArrowRight, CheckCircle2, Activity } from 'lucide-react';

interface Props {
  onComplete: (updatedProfile: Partial<UserProfile>) => void;
}

export const OnboardingFlow: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Screening questions
  const [isOver18, setIsOver18] = useState<boolean | null>(null);
  const [hasInjuryOrPain, setHasInjuryOrPain] = useState<boolean | null>(null);
  const [hasHealthCondition, setHasHealthCondition] = useState<boolean | null>(null);
  const [isPregnantOrPostpartum, setIsPregnantOrPostpartum] = useState<boolean | null>(null);
  const [termsAcknowledged, setTermsAcknowledged] = useState(false);

  // Setup questions
  const [strengthExperience, setStrengthExperience] = useState<'sim' | 'nao' | 'as_vezes'>('nao');
  const [prefersSupport, setPrefersSupport] = useState<boolean>(true);
  const [preferredTime, setPreferredTime] = useState<'manha' | 'tarde' | 'noite' | 'sem_lembrete'>('manha');

  const hasAnyMedicalFlag =
    isOver18 === false ||
    hasInjuryOrPain === true ||
    hasHealthCondition === true ||
    isPregnantOrPostpartum === true;

  const canProceedStep2 =
    isOver18 !== null &&
    hasInjuryOrPain !== null &&
    hasHealthCondition !== null &&
    isPregnantOrPostpartum !== null &&
    termsAcknowledged;

  const handleFinish = () => {
    onComplete({
      onboardingCompleted: true,
      termsAccepted: true,
      screeningPassed: !hasAnyMedicalFlag,
      screeningFlags: {
        under18: isOver18 === false,
        hasInjuryOrPain: hasInjuryOrPain === true,
        hasHealthCondition: hasHealthCondition === true,
        isPregnantOrPostpartum: isPregnantOrPostpartum === true,
      },
      strengthExperience,
      prefersSupport,
      preferredTime,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between max-w-md mx-auto px-5 py-8 text-stone-800">
      {/* Top Brand Mark */}
      <header className="flex items-center justify-between pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
            Saúde & Bem-Estar
          </span>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Método Corpo Violão 21D
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <span>Passo {step}</span>
          <span>/</span>
          <span>3</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center my-auto">
        {/* TELA 1 — BOAS-VINDAS */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 border border-emerald-200/60 flex items-center justify-center text-emerald-800 shadow-xs">
              <Activity className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
                Seu treino começa no seu ritmo.
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                Um programa de 21 dias com sessões guiadas de força de aproximadamente 12 minutos para fazer em casa.
              </p>
            </div>

            {/* Respectful Highlights */}
            <div className="space-y-2.5 pt-2 border-t border-stone-200/70 text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <span>Movimentos suaves e funcionais para pernas, glúteos e abdômen.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <span>Adaptações mais fáceis com suporte de cadeira e parede.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <span>3 dias de força por semana com recuperação ativa e descanso.</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full h-12 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] mt-6"
            >
              <span>Começar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TELA 2 — AVISO EDUCATIVO & TRIAGEM */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300 max-h-[78vh] overflow-y-auto pr-1 no-scrollbar">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              <h2 className="text-lg">Aviso educativo e de segurança</h2>
            </div>

            {/* Official Educational Disclaimer */}
            <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-200/80 text-xs text-stone-700 space-y-2.5 leading-relaxed">
              <p className="font-medium text-stone-900">
                Aviso importante
              </p>
              <p>
                O Método Corpo Violão 21D é um material educativo de atividade física geral. Não é consulta, diagnóstico, tratamento ou prescrição individualizada e não substitui a orientação de médico, fisioterapeuta ou profissional de educação física.
              </p>
              <p>
                O programa <strong>não promete</strong> perda de gordura, redução da cintura, mudança de medidas, "desinchaço", ganho de massa muscular ou um formato corporal específico em 21 dias. Os resultados variam conforme características individuais, experiência, saúde, rotina e outros fatores. Exercícios para o abdômen não garantem perda de gordura localizada.
              </p>
              <p>
                Faça os movimentos dentro de uma amplitude confortável e priorize a técnica. Pare se sentir dor, mal-estar, tontura ou falta de ar fora do comum. Se tiver uma condição de saúde, lesão, estiver grávida ou no pós-parto, ou não souber se os exercícios são adequados para você, procure orientação profissional antes de começar.
              </p>
            </div>

            {/* Health & Safety Screening */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Triagem rápida de segurança
              </p>

              {/* Q1 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-2">
                <span className="text-xs font-medium text-stone-800 block">
                  Você tem 18 anos ou mais?
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOver18(true)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      isOver18 === true
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOver18(false)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      isOver18 === false
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              {/* Q2 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-2">
                <span className="text-xs font-medium text-stone-800 block">
                  Está com alguma lesão ou dor que limite seus movimentos?
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setHasInjuryOrPain(false)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      hasInjuryOrPain === false
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Não
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasInjuryOrPain(true)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      hasInjuryOrPain === true
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Sim
                  </button>
                </div>
              </div>

              {/* Q3 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-2">
                <span className="text-xs font-medium text-stone-800 block">
                  Tem alguma condição de saúde ou orientação médica para restringir exercícios?
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setHasHealthCondition(false)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      hasHealthCondition === false
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Não
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasHealthCondition(true)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      hasHealthCondition === true
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Sim
                  </button>
                </div>
              </div>

              {/* Q4 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-2">
                <span className="text-xs font-medium text-stone-800 block">
                  Está grávida ou no período pós-parto?
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPregnantOrPostpartum(false)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      isPregnantOrPostpartum === false
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Não
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPregnantOrPostpartum(true)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      isPregnantOrPostpartum === true
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Sim
                  </button>
                </div>
              </div>
            </div>

            {/* Medical Recommendation Alert if flags present */}
            {hasAnyMedicalFlag && (
              <div className="p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-amber-950">Orientação Profissional Recomendada</p>
                  <p>
                    Por favor, consulte seu médico ou profissional de saúde antes de iniciar qualquer programa de exercícios. Pratique somente sob liberação profissional qualificada.
                  </p>
                </div>
              </div>
            )}

            {/* Checkbox acknowledgement */}
            <label className="flex items-start gap-3 cursor-pointer pt-2 select-none">
              <input
                type="checkbox"
                checked={termsAcknowledged}
                onChange={(e) => setTermsAcknowledged(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-0"
              />
              <span className="text-xs text-stone-700 leading-normal">
                Compreendo que este é um programa educativo de exercícios leves a moderados e que devo respeitar meus limites e parar se sentir dor ou desconforto.
              </span>
            </label>

            <button
              disabled={!canProceedStep2}
              onClick={() => setStep(3)}
              className="w-full h-12 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] mt-4"
            >
              <span>Li e quero continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TELA 3 — CONFIGURAÇÃO INICIAL */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-stone-900">
                Configuração inicial
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Ajustes simples para tornar seu treino mais confortável e seguro.
              </p>
            </div>

            {/* Question 1: Experiência */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-800 block">
                Você já costuma fazer exercícios de força?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'sim', label: 'Sim' },
                  { value: 'as_vezes', label: 'Às vezes' },
                  { value: 'nao', label: 'Não' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStrengthExperience(opt.value as 'sim' | 'nao' | 'as_vezes')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                      strengthExperience === opt.value
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Apoio */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-800 block">
                Prefere fazer os movimentos com apoio de cadeira ou parede?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPrefersSupport(true)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                    prefersSupport === true
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  Sim, com apoio (Recomendado)
                </button>
                <button
                  type="button"
                  onClick={() => setPrefersSupport(false)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                    prefersSupport === false
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  Sem apoio
                </button>
              </div>
            </div>

            {/* Question 3: Horário */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-800 block">
                Qual horário ajuda você a manter uma rotina?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'manha', label: 'Manhã' },
                  { value: 'tarde', label: 'Tarde' },
                  { value: 'noite', label: 'Noite' },
                  { value: 'sem_lembrete', label: 'Sem preferência' },
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setPreferredTime(t.value as 'manha' | 'tarde' | 'noite' | 'sem_lembrete')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                      preferredTime === t.value
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transparency Note */}
            <p className="text-[11px] text-stone-500 leading-relaxed border-t border-stone-200/60 pt-3">
              Suas preferências servem apenas para organizar sua tela inicial e destacar versões mais fáceis. O programa não realiza predição de medidas corporais.
            </p>

            <button
              onClick={handleFinish}
              className="w-full h-12 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            >
              <span>Concluir e Ir para o Treino</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Footer reassurance */}
      <footer className="pt-6 text-center text-[11px] text-stone-500">
        Movimento controlado vale mais que velocidade.
      </footer>
    </div>
  );
};
