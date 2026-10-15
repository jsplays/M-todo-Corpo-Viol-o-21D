import React, { useState, useEffect, useRef } from 'react';
import { WorkoutSession, ProgramDay, WellBeingState } from '../types/workout';
import { WARMUP_EXERCISES, GALLERY_IMAGES } from '../data/workouts';
import { ExerciseIllustration } from './ExerciseIllustration';
import { ImageZoomModal } from './ImageZoomModal';
import { soundManager } from '../utils/audio';
import {
  Play,
  Pause,
  SkipForward,
  X,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ZoomIn,
} from 'lucide-react';

interface Props {
  workout: WorkoutSession;
  programDay: ProgramDay;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onFinishWorkout: (result: {
    usedEasierVersion: boolean;
    wellBeing?: WellBeingState;
  }) => void;
  onClose: () => void;
}

type Phase = 'warmup' | 'circuit' | 'cooldown';

export const WorkoutPlayer: React.FC<Props> = ({
  workout,
  programDay,
  soundEnabled,
  onToggleSound,
  onFinishWorkout,
  onClose,
}) => {
  // Phase state
  const [phase, setPhase] = useState<Phase>('warmup');
  const [isPaused, setIsPaused] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [useEasierVersion, setUseEasierVersion] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);

  // Warmup state: 4 exercises x 30s = 120s (2 min)
  const [warmupIndex, setWarmupIndex] = useState(0);

  // Circuit state: 4 stations x 2 rounds = 8 steps.
  // Each step has 'work' then 'rest'.
  const [circuitStationIndex, setCircuitStationIndex] = useState(0); // 0 to 3
  const [circuitRound, setCircuitRound] = useState(1); // 1 or 2
  const [isWorking, setIsWorking] = useState(true); // true = work, false = rest

  // Cooldown state: 2 exercises x 60s = 120s (2 min)
  const [cooldownIndex, setCooldownIndex] = useState(0);
  const [selectedWellBeing, setSelectedWellBeing] = useState<WellBeingState | null>(null);

  // Timer seconds left in current block
  const workSeconds = programDay.workSeconds || 30;
  const restSeconds = programDay.restSeconds || 30;

  const [secondsLeft, setSecondsLeft] = useState(WARMUP_EXERCISES[0].durationSeconds);

  // Keep total elapsed time (up to ~720s = 12 min)
  const [totalElapsed, setTotalElapsed] = useState(0);

  // Refs for audio ticks to prevent double playing
  const lastTickRef = useRef<number>(-1);

  // Cooldown items
  const cooldownSteps = [
    {
      name: 'Desaquecimento & Respiração Serena',
      instructions: 'Caminhe devagar no lugar ou fique em pé respirando com calma pelo nariz e soltando o ar devagar pela boca.',
      visualKey: 'marching',
    },
    {
      name: 'Movimentos Suaves Articulares',
      instructions: 'Faça movimentos suaves de ombros e quadris sem forçar alongamentos excessivos. Permita que a frequência cardíaca diminua gradualmente.',
      visualKey: 'shoulder_circles',
    },
  ];

  // Current active exercise in circuit
  const currentCircuitExercise = workout.exercises[circuitStationIndex];

  // Helper to switch to next step
  const advanceStep = () => {
    if (phase === 'warmup') {
      if (warmupIndex < WARMUP_EXERCISES.length - 1) {
        const next = warmupIndex + 1;
        setWarmupIndex(next);
        setSecondsLeft(WARMUP_EXERCISES[next].durationSeconds);
        soundManager.playPhaseChange(soundEnabled, true);
      } else {
        // Transition to Circuit
        setPhase('circuit');
        setCircuitStationIndex(0);
        setCircuitRound(1);
        setIsWorking(true);
        setSecondsLeft(workSeconds);
        soundManager.playPhaseChange(soundEnabled, true);
      }
    } else if (phase === 'circuit') {
      if (isWorking) {
        // Switch from Work to Rest in current station
        setIsWorking(false);
        setSecondsLeft(restSeconds);
        soundManager.playPhaseChange(soundEnabled, false);
      } else {
        // Switch from Rest to Next Station or Next Round
        if (circuitStationIndex < workout.exercises.length - 1) {
          setCircuitStationIndex((prev) => prev + 1);
          setIsWorking(true);
          setSecondsLeft(workSeconds);
          soundManager.playPhaseChange(soundEnabled, true);
        } else if (circuitRound === 1) {
          // Move to round 2
          setCircuitStationIndex(0);
          setCircuitRound(2);
          setIsWorking(true);
          setSecondsLeft(workSeconds);
          soundManager.playPhaseChange(soundEnabled, true);
        } else {
          // Circuit completed! Move to Cooldown
          setPhase('cooldown');
          setCooldownIndex(0);
          setSecondsLeft(60);
          soundManager.playPhaseChange(soundEnabled, false);
        }
      }
    } else if (phase === 'cooldown') {
      if (cooldownIndex < cooldownSteps.length - 1) {
        setCooldownIndex((prev) => prev + 1);
        setSecondsLeft(60);
        soundManager.playPhaseChange(soundEnabled, true);
      } else {
        // All 12 minutes completed!
        soundManager.playCompletion(soundEnabled);
        onFinishWorkout({
          usedEasierVersion: useEasierVersion,
          wellBeing: selectedWellBeing || 'bem',
        });
      }
    }
  };

  // Main countdown effect
  useEffect(() => {
    if (isPaused || showExitConfirm) return;

    const interval = setInterval(() => {
      setTotalElapsed((t) => t + 1);

      setSecondsLeft((prev) => {
        // Play tick sound at 3, 2, 1
        if (prev <= 4 && prev > 1 && prev !== lastTickRef.current) {
          soundManager.playTick(soundEnabled);
          lastTickRef.current = prev;
        }

        if (prev <= 1) {
          advanceStep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isPaused,
    showExitConfirm,
    phase,
    warmupIndex,
    circuitStationIndex,
    circuitRound,
    isWorking,
    cooldownIndex,
    workSeconds,
    restSeconds,
    soundEnabled,
  ]);

  // Total duration formatted
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Current block max seconds
  const currentMaxSeconds =
    phase === 'warmup'
      ? WARMUP_EXERCISES[warmupIndex].durationSeconds
      : phase === 'circuit'
      ? isWorking
        ? workSeconds
        : restSeconds
      : 60;

  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentMaxSeconds - secondsLeft) / currentMaxSeconds) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-900 text-stone-100 flex flex-col justify-between max-w-md mx-auto shadow-2xl overflow-y-auto no-scrollbar">
      {/* Top Controls Bar */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-stone-800/80 bg-stone-900/90 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-200 transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Encerrar treino"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400">
              {phase === 'warmup'
                ? 'Preparação (2 min)'
                : phase === 'circuit'
                ? `Circuito de Força · Volta ${circuitRound}/2`
                : 'Finalização (2 min)'}
            </span>
            <h2 className="text-sm font-semibold text-stone-200 truncate max-w-[200px]">
              {workout.title} · {workout.focus}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-2 text-stone-400 hover:text-stone-200 transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={soundEnabled ? 'Silenciar áudio' : 'Ativar áudio'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <span className="text-xs font-mono tabular-nums text-stone-400 bg-stone-800/80 px-2 py-1 rounded-md">
            {formatTime(totalElapsed)} / 12:00
          </span>
        </div>
      </header>

      {/* Main Active Workout Display */}
      <main className="flex-1 px-5 py-4 flex flex-col justify-between space-y-4">
        {/* Phase Notification Pill / Status */}
        <div className="flex items-center justify-between text-xs">
          {phase === 'warmup' && (
            <span className="text-amber-400 font-medium">
              Movimento {warmupIndex + 1} de {WARMUP_EXERCISES.length} · Aquecimento
            </span>
          )}
          {phase === 'circuit' && (
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold px-2 py-0.5 rounded-md text-xs ${
                  isWorking ? 'bg-emerald-900/80 text-emerald-300' : 'bg-amber-900/80 text-amber-300'
                }`}
              >
                {isWorking ? 'ESFORÇO CONTROLADO' : 'PAUSA E RECUPERAÇÃO'}
              </span>
              <span className="text-stone-400">
                Estação {circuitStationIndex + 1}/4
              </span>
            </div>
          )}
          {phase === 'cooldown' && (
            <span className="text-sky-400 font-medium">
              Desaquecimento {cooldownIndex + 1} de 2
            </span>
          )}

          <span className="text-stone-400 text-[11px]">
            Dia {programDay.dayNumber} de 21
          </span>
        </div>

        {/* Visual Media (Photo or Diagram) */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-700/60 bg-stone-800/80">
          {(() => {
            const currentImg =
              phase === 'warmup'
                ? WARMUP_EXERCISES[warmupIndex].imageUrl
                : phase === 'circuit'
                ? currentCircuitExercise.imageUrl
                : null;

            if (currentImg && !useEasierVersion) {
              return (
                <div
                  className="relative w-full h-44 cursor-pointer group bg-stone-900 flex items-center justify-center overflow-hidden"
                  onClick={() => setShowImageZoom(true)}
                >
                  <img
                    src={currentImg}
                    alt="Exercício guiado"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-between p-3 pointer-events-none">
                    <span className="text-[10px] bg-black/60 text-emerald-300 px-2 py-0.5 rounded-md backdrop-blur-xs font-medium">
                      Foto do Movimento
                    </span>
                    <span className="text-[11px] bg-black/70 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium shadow-sm">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ampliar</span>
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <ExerciseIllustration
                visualKey={
                  phase === 'warmup'
                    ? WARMUP_EXERCISES[warmupIndex].visualKey
                    : phase === 'circuit'
                    ? currentCircuitExercise.visualKey
                    : cooldownSteps[cooldownIndex].visualKey
                }
                isEasierVersion={useEasierVersion}
                className="w-full h-44 bg-stone-800/70 border-0"
              />
            );
          })()}

          {/* Controls below image / inside card */}
          {phase === 'circuit' && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
              <button
                onClick={() => setUseEasierVersion(!useEasierVersion)}
                className="text-xs font-medium bg-stone-900/90 text-stone-200 border border-stone-700/80 px-2.5 py-1.5 rounded-lg shadow-sm hover:bg-stone-800 flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{useEasierVersion ? 'Ver foto padrão' : 'Ver versão mais fácil'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Big Circular/Bar Timer Display */}
        <div className="text-center py-2 space-y-1">
          <div className="text-5xl font-mono tabular-nums font-bold tracking-tight text-white flex items-center justify-center gap-1">
            <span>{secondsLeft}</span>
            <span className="text-xl text-stone-500 font-normal">s</span>
          </div>

          {/* Visual Progress Line */}
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden mt-3">
            <div
              className={`h-full transition-all duration-300 ${
                phase === 'circuit'
                  ? isWorking
                    ? 'bg-emerald-500'
                    : 'bg-amber-500'
                  : 'bg-teal-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Exercise Information Card */}
        <div className="bg-stone-800/90 border border-stone-700/80 rounded-2xl p-4 space-y-2.5 text-left">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                {phase === 'warmup'
                  ? WARMUP_EXERCISES[warmupIndex].name
                  : phase === 'circuit'
                  ? currentCircuitExercise.name
                  : cooldownSteps[cooldownIndex].name}
              </h3>
              {phase === 'circuit' && (
                <p className="text-xs text-stone-400">
                  {currentCircuitExercise.subtitle}
                </p>
              )}
            </div>
            {phase === 'circuit' && (
              <span className="text-[11px] text-stone-400 bg-stone-700/60 px-2 py-0.5 rounded">
                {currentCircuitExercise.equipment}
              </span>
            )}
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            {phase === 'warmup'
              ? WARMUP_EXERCISES[warmupIndex].instructions
              : phase === 'circuit'
              ? useEasierVersion
                ? `Versão Adaptada: ${currentCircuitExercise.easierVersion}`
                : currentCircuitExercise.instructions
              : cooldownSteps[cooldownIndex].instructions}
          </p>

          {/* Safety Reminder within Card */}
          {phase === 'circuit' && currentCircuitExercise.safetyReminder && (
            <div className="pt-2 border-t border-stone-700/60 flex items-start gap-2 text-[11px] text-amber-300/90">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
              <span>{currentCircuitExercise.safetyReminder}</span>
            </div>
          )}

          {phase === 'warmup' && (
            <p className="text-[11px] text-stone-400 italic">
              Comece devagar. A preparação não precisa cansar você.
            </p>
          )}
        </div>

        {/* Cooldown Well-being Check Question */}
        {phase === 'cooldown' && (
          <div className="p-3.5 bg-stone-800/70 border border-stone-700/80 rounded-xl space-y-2">
            <span className="text-xs font-medium text-stone-300 block">
              Como você está se sentindo agora?
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedWellBeing('bem')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                  selectedWellBeing === 'bem'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-stone-700 text-stone-300 border-stone-600 hover:bg-stone-600'
                }`}
              >
                Bem
              </button>
              <button
                type="button"
                onClick={() => setSelectedWellBeing('pouco_cansada')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                  selectedWellBeing === 'pouco_cansada'
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-stone-700 text-stone-300 border-stone-600 hover:bg-stone-600'
                }`}
              >
                Um pouco cansada(o)
              </button>
              <button
                type="button"
                onClick={() => setSelectedWellBeing('desconforto')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                  selectedWellBeing === 'desconforto'
                    ? 'bg-rose-700 text-white border-rose-600'
                    : 'bg-stone-700 text-stone-300 border-stone-600 hover:bg-stone-600'
                }`}
              >
                Senti desconforto
              </button>
            </div>

            {selectedWellBeing === 'desconforto' && (
              <p className="text-[11px] text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-900/60 leading-relaxed">
                Recomendamos encerrar a atividade agora, repousar e procurar avaliação profissional caso a sensação persista. Nunca force o movimento com dor.
              </p>
            )}
          </div>
        )}

        {/* Motivational Safety Mantra */}
        <p className="text-center text-[11px] text-stone-400 font-normal">
          Movimento controlado vale mais que velocidade. Pare se sentir dor ou mal-estar.
        </p>
      </main>

      {/* Sticky Bottom Control Bar */}
      <footer className="px-5 py-4 bg-stone-900/95 border-t border-stone-800 flex items-center justify-between gap-3">
        {/* Play / Pause Primary Action */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`flex-1 h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
            isPaused
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-stone-100 hover:bg-white text-stone-900'
          }`}
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Retomar treino</span>
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pausar</span>
            </>
          )}
        </button>

        {/* Skip Step */}
        <button
          onClick={advanceStep}
          className="h-12 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors border border-stone-700/80 active:scale-[0.98]"
          title="Pular para próxima etapa"
        >
          <span>Pular</span>
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Finish early */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="h-12 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center justify-center transition-colors border border-stone-700/80"
          title="Encerrar sessão"
        >
          Sair
        </button>
      </footer>

      {/* Confirm Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-5 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl text-left">
            <h4 className="text-base font-bold text-white">Deseja pausar ou encerrar o treino?</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Você pode pausar e retornar quando quiser, ou encerrar a sessão agora. Respeitar o seu ritmo e seus limites é a prioridade deste programa.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  setIsPaused(false);
                }}
                className="w-full py-2.5 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 text-xs font-medium"
              >
                Continuar treinando
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onFinishWorkout({
                    usedEasierVersion: useEasierVersion,
                    wellBeing: selectedWellBeing || 'bem',
                  });
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 text-xs font-medium"
              >
                Concluir e registrar sessão
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl text-stone-400 hover:text-stone-300 text-xs font-medium"
              >
                Sair sem registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Lightbox if requested during workout */}
      {showImageZoom && (
        <ImageZoomModal
          images={GALLERY_IMAGES}
          initialIndex={Math.max(
            0,
            GALLERY_IMAGES.findIndex(
              (g) =>
                g.exerciseName.toLowerCase() ===
                (phase === 'warmup'
                  ? WARMUP_EXERCISES[warmupIndex].name
                  : currentCircuitExercise.name
                ).toLowerCase()
            )
          )}
          onClose={() => setShowImageZoom(false)}
        />
      )}
    </div>
  );
};
