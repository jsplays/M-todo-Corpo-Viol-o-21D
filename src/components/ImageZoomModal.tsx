import React, { useState } from 'react';
import { GalleryImageItem } from '../data/workouts';
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

interface Props {
  images: GalleryImageItem[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageZoomModal: React.FC<Props> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imgError, setImgError] = useState(false);
  const [useBackup, setUseBackup] = useState(false);

  const currentItem = images[currentIndex] || images[0];

  const handlePrev = () => {
    setZoomLevel(1);
    setImgError(false);
    setUseBackup(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setZoomLevel(1);
    setImgError(false);
    setUseBackup(false);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const zoomIn = () => setZoomLevel((z) => Math.min(3, +(z + 0.5).toFixed(1)));
  const zoomOut = () => setZoomLevel((z) => Math.max(1, +(z - 0.5).toFixed(1)));
  const resetZoom = () => setZoomLevel(1);

  const activeSrc = useBackup ? currentItem.backupUrl : currentItem.imageUrl;

  return (
    <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5 animate-in fade-in select-none">
      {/* Top Header Controls */}
      <header className="flex items-center justify-between text-white pb-3 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
            {currentItem.category} · Imagem {currentIndex + 1} de {images.length}
          </span>
          <h3 className="text-base font-bold text-white truncate max-w-[260px] sm:max-w-md">
            {currentItem.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={currentItem.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-400 hover:text-white transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Abrir no ImgBB"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center bg-stone-800/80 hover:bg-stone-700"
            aria-label="Fechar ampliação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Image Zoom Canvas */}
      <main className="flex-1 relative flex items-center justify-center overflow-auto my-2 p-2">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-20 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700 shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform active:scale-95"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 z-20 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700 shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform active:scale-95"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The Scalable High-Res Image */}
        <div
          className="w-full h-full flex items-center justify-center cursor-zoom-in"
          onClick={() => {
            if (zoomLevel === 1) zoomIn();
            else if (zoomLevel === 3) resetZoom();
            else zoomIn();
          }}
        >
          {!imgError ? (
            <img
              src={activeSrc}
              alt={currentItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
              onError={() => {
                if (!useBackup) {
                  setUseBackup(true);
                } else {
                  setImgError(true);
                }
              }}
            />
          ) : (
            <div className="p-8 text-center bg-stone-900 rounded-2xl border border-stone-800 space-y-3 max-w-sm">
              <span className="text-sm font-semibold text-stone-200 block">
                {currentItem.title}
              </span>
              <p className="text-xs text-stone-400">
                Acesse a imagem diretamente no link original do ImgBB:
              </p>
              <a
                href={currentItem.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-600"
              >
                <span>Visualizar no ImgBB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Control Bar */}
      <footer className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-300">
            Zoom: {Math.round(zoomLevel * 100)}%
          </span>
          {zoomLevel > 1 && (
            <button
              onClick={resetZoom}
              className="px-2 py-1 rounded-md bg-stone-800 text-stone-300 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>100%</span>
            </button>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={zoomLevel <= 1}
            className="p-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-white rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            title="Reduzir zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= 3}
            className="p-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-white rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            title="Ampliar zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
