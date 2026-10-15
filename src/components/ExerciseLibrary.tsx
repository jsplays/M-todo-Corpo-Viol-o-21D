import React, { useState } from 'react';
import { WORKOUT_SESSIONS, WARMUP_EXERCISES, GALLERY_IMAGES, GalleryImageItem } from '../data/workouts';
import { Exercise } from '../types/workout';
import { ExerciseIllustration } from './ExerciseIllustration';
import { ImageZoomModal } from './ImageZoomModal';
import {
  ChevronRight,
  X,
  AlertCircle,
  HelpCircle,
  ZoomIn,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const ExerciseLibrary: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C' | 'preparacao' | 'galeria'>('A');
  const [showEasierInModal, setShowEasierInModal] = useState(false);
  const [viewModeInModal, setViewModeInModal] = useState<'photo' | 'svg'>('photo');

  // Zoom lightbox state
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const openZoomForExercise = (exerciseName: string) => {
    const idx = GALLERY_IMAGES.findIndex(
      (g) => g.exerciseName.toLowerCase() === exerciseName.toLowerCase()
    );
    setZoomIndex(idx >= 0 ? idx : 0);
  };

  return (
    <div className="space-y-5 pb-20 animate-in fade-in">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          Biblioteca de Movimentos
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          Instruções claras com fotos ampliáveis, versões mais fáceis e lembretes de segurança.
        </p>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl overflow-x-auto no-scrollbar">
        {[
          { id: 'A', label: 'Treino A' },
          { id: 'B', label: 'Treino B' },
          { id: 'C', label: 'Treino C' },
          { id: 'preparacao', label: 'Preparação' },
          { id: 'galeria', label: 'Galeria (16 Fotos)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'A' | 'B' | 'C' | 'preparacao' | 'galeria')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
              activeTab === tab.id
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Workout Info Header (when on A, B, or C) */}
      {activeTab !== 'preparacao' && activeTab !== 'galeria' && (
        <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200/70 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-900">
            <span>{WORKOUT_SESSIONS[activeTab].title} — {WORKOUT_SESSIONS[activeTab].focus}</span>
            <span className="text-[11px] text-emerald-800 font-medium">4 exercícios</span>
          </div>
          <p className="text-xs text-stone-600">
            {WORKOUT_SESSIONS[activeTab].summary}
          </p>
          <p className="text-[11px] text-amber-800 pt-1 font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{WORKOUT_SESSIONS[activeTab].safetyNote}</span>
          </p>
        </div>
      )}

      {/* TAB: GALERIA COMPLETA (16 FOTOS AMPLIÁVEIS) */}
      {activeTab === 'galeria' && (
        <div className="space-y-3">
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ZoomIn className="w-4 h-4 text-emerald-700" />
              <span>Fotos dos Movimentos com Zoom</span>
            </div>
            <p className="text-[11px] text-emerald-900 leading-relaxed">
              Toque em qualquer foto para abrir o visualizador ampliado com controles de zoom (até 300%) e navegar em alta definição.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {GALLERY_IMAGES.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setZoomIndex(idx)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = item.backupUrl;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2 bg-black/70 text-white rounded-full">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Foto 0{idx + 1}
                  </span>
                </div>

                <div className="p-2.5">
                  <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider block truncate">
                    {item.category.split('·')[0]}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 truncate mt-0.5">
                    {item.title}
                  </h4>
                  <div className="mt-1 pt-1 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <ZoomIn className="w-3 h-3" />
                      Ampliar
                    </span>
                    <span>Toque</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXERCISE CARDS LIST (FOR A, B, C) */}
      {activeTab !== 'preparacao' && activeTab !== 'galeria' && (
        <div className="space-y-3">
          {WORKOUT_SESSIONS[activeTab].exercises.map((ex, index) => (
            <div
              key={ex.id}
              className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all space-y-2.5"
            >
              <div
                onClick={() => {
                  setSelectedExercise(ex);
                  setShowEasierInModal(false);
                  setViewModeInModal('photo');
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                {/* Photo Thumbnail */}
                <div className="w-16 h-16 shrink-0 rounded-xl bg-stone-100 overflow-hidden relative border border-stone-200/70 group">
                  {ex.imageUrl ? (
                    <img
                      src={ex.imageUrl}
                      alt={ex.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (ex.imageBackupUrl) {
                          (e.currentTarget as HTMLImageElement).src = ex.imageBackupUrl;
                        }
                      }}
                    />
                  ) : (
                    <ExerciseIllustration visualKey={ex.visualKey} className="w-full h-full p-0 border-0 bg-transparent" />
                  )}
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white rounded p-0.5">
                    <ZoomIn className="w-3 h-3" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-stone-400">0{index + 1}</span>
                    <h4 className="text-sm font-semibold text-stone-900 truncate">
                      {ex.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-500 truncate mt-0.5">
                    {ex.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 mt-1 font-medium">
                    <span>{ex.equipment}</span>
                    <span>·</span>
                    <span>{ex.focusMuscles[0]}</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
              </div>

              {/* Action Bar with Quick Zoom Button */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <button
                  onClick={() => openZoomForExercise(ex.name)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar foto do movimento</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedExercise(ex);
                    setShowEasierInModal(false);
                  }}
                  className="text-stone-500 hover:text-stone-800 text-[11px]"
                >
                  Ver instruções
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PREPARAÇÃO CARDS */}
      {activeTab === 'preparacao' && (
        <div className="space-y-3">
          {WARMUP_EXERCISES.map((w, idx) => (
            <div
              key={w.id}
              className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5"
            >
              <div className="flex items-start gap-3">
                <div
                  onClick={() => openZoomForExercise(w.name)}
                  className="w-16 h-16 shrink-0 rounded-xl bg-stone-100 overflow-hidden relative border border-stone-200/70 cursor-pointer"
                >
                  {w.imageUrl ? (
                    <img
                      src={w.imageUrl}
                      alt={w.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (w.imageBackupUrl) {
                          (e.currentTarget as HTMLImageElement).src = w.imageBackupUrl;
                        }
                      }}
                    />
                  ) : (
                    <ExerciseIllustration visualKey={w.visualKey} className="w-full h-full p-0 border-0 bg-transparent" />
                  )}
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white rounded p-0.5">
                    <ZoomIn className="w-3 h-3" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-stone-400">0{idx + 1}</span>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {w.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {w.instructions}
                  </p>
                  <span className="text-[11px] text-stone-400 block mt-1">
                    Duração: {w.durationSeconds} segundos
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <button
                  onClick={() => openZoomForExercise(w.name)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar foto guiada</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL / SHEET */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl text-stone-900 border border-stone-200 no-scrollbar">
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto sm:hidden -mt-1 mb-2" />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Guia do Movimento
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  {selectedExercise.name}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedExercise.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 -mr-2 text-stone-400 hover:text-stone-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Presentation: Photo or Anatomical Diagram with Zoom button */}
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center min-h-[190px]">
                {viewModeInModal === 'photo' && selectedExercise.imageUrl ? (
                  <div className="relative w-full h-52 group cursor-pointer" onClick={() => openZoomForExercise(selectedExercise.name)}>
                    <img
                      src={selectedExercise.imageUrl}
                      alt={selectedExercise.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (selectedExercise.imageBackupUrl) {
                          (e.currentTarget as HTMLImageElement).src = selectedExercise.imageBackupUrl;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <span className="px-3 py-1.5 bg-black/70 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md">
                        <ZoomIn className="w-4 h-4" />
                        <span>Toque para Ampliar</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <ExerciseIllustration
                    visualKey={selectedExercise.visualKey}
                    isEasierVersion={showEasierInModal}
                    className="w-full h-48"
                  />
                )}
              </div>

              {/* View Mode & Zoom Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => openZoomForExercise(selectedExercise.name)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar Foto em Tela Cheia</span>
                </button>

                {selectedExercise.imageUrl && (
                  <button
                    onClick={() => setViewModeInModal(viewModeInModal === 'photo' ? 'svg' : 'photo')}
                    className="py-2 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-medium text-stone-700 flex items-center gap-1"
                  >
                    {viewModeInModal === 'photo' ? 'Ver Guia SVG' : 'Ver Foto'}
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowEasierInModal(!showEasierInModal)}
                className="w-full py-2 px-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {showEasierInModal ? 'Mostrar versão padrão' : 'Alternar para versão mais fácil'}
                </span>
              </button>
            </div>

            {/* Step-by-step instructions */}
            <div className="space-y-2 text-xs">
              <h5 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                Como Fazer
              </h5>
              <p className="text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/70">
                {selectedExercise.instructions}
              </p>
            </div>

            {/* Easier version instruction */}
            <div className="space-y-1.5 text-xs">
              <h5 className="font-semibold text-emerald-900 uppercase tracking-wider text-[11px]">
                Versão Mais Fácil (Iniciantes)
              </h5>
              <p className="text-stone-700 leading-relaxed bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60">
                {selectedExercise.easierVersion}
              </p>
            </div>

            {/* Target Muscles */}
            <div className="space-y-1 text-xs">
              <h5 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                Região Trabalhada
              </h5>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedExercise.focusMuscles.map((m) => (
                  <span
                    key={m}
                    className="text-xs bg-stone-100 border border-stone-200 text-stone-800 rounded-md px-2.5 py-1"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Safety reminder */}
            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{selectedExercise.safetyReminder}</span>
            </div>

            <button
              onClick={() => setSelectedExercise(null)}
              className="w-full h-11 rounded-xl bg-stone-900 text-white font-medium text-xs flex items-center justify-center transition-colors"
            >
              Fechar detalhes
            </button>
          </div>
        </div>
      )}

      {/* FULLSCREEN ZOOM LIGHTBOX MODAL */}
      {zoomIndex !== null && (
        <ImageZoomModal
          images={GALLERY_IMAGES}
          initialIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </div>
  );
};
