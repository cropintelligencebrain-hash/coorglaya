import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BedDouble,
  Sparkles,
  Check,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Maximize2,
} from 'lucide-react';
import { SuiteSpecData } from '../3d/SuiteInspectionCard3D';

interface SuiteFocusGalleryProps {
  suites: SuiteSpecData[];
  onBookNow: (suiteId: string) => void;
}

export const SuiteFocusGallery: React.FC<SuiteFocusGalleryProps> = ({
  suites,
  onBookNow,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // Keyboard navigation: Left and Right arrow keys cycle through suites
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % suites.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + suites.length) % suites.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [suites.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % suites.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + suites.length) % suites.length);
  };

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  const activeSuite = suites[activeIdx] || suites[0];

  return (
    <div className="w-full select-none">
      {/* 
        OPTION B CINEMA STAGE:
        Single expansive luxury viewport card (h-[76vh] min-h-[580px] max-h-[820px]).
        Zero 320vh height trap — no empty scroll gaps beneath it.
      */}
      <div
        className="relative w-full h-[76vh] min-h-[580px] sm:min-h-[640px] max-h-[820px] rounded-3xl sm:rounded-4xl overflow-hidden border-2 border-[#E4D9C8] shadow-[0_24px_60px_rgba(0,0,0,0.14)] bg-[#132422]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-Bleed High-Res Photography Stage with Smooth Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSuite.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSuite.image}
              alt={activeSuite.name}
              loading="eager"
              className="w-full h-full object-cover object-center filter brightness-[0.92]"
            />

            {/* Cinematic Gradient Overlays to Guarantee Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/50 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Top Control Bar: Suite Selector & Steppers (Floated Gracefully Inside Top Edge) */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between gap-3">
          {/* Numbered Suite Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/55 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-lg overflow-x-auto no-scrollbar max-w-[calc(100%-6rem)] sm:max-w-none">
            {suites.map((suite, idx) => (
              <button
                key={suite.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeIdx === idx
                    ? 'bg-[#137586] text-white shadow-md scale-102'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                <span className="hidden sm:inline">{suite.name.replace(' Suite', '')}</span>
                <span className="sm:hidden">{suite.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-1.5 shrink-0 bg-black/55 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-lg">
            <button
              onClick={handlePrev}
              aria-label="Previous Suite"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-bold text-[#E2BA84] px-1 hidden sm:inline">
              0{activeIdx + 1}/0{suites.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Suite"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 
          OPTION B DETAILS HUD (INSIDE THE IMAGE):
          Floating luxury frosted architectural card in lower-left corner
        */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-20 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSuite.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-3xl bg-[#132422]/85 backdrop-blur-xl border border-white/20 text-white p-5 sm:p-7 shadow-2xl space-y-4"
            >
              {/* Classification Tag */}
              <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E2BA84] uppercase tracking-wider">
                  <BedDouble className="w-4 h-4 text-[#E2BA84]" />
                  <span>Sanctuary Quarters · 0{activeIdx + 1} of 0{suites.length}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider text-[#A7DDD8]">
                  {activeSuite.category}
                </span>
              </div>

              {/* Suite Title & Description */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeSuite.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#BED4D0] leading-relaxed mt-1 font-normal line-clamp-2 sm:line-clamp-3">
                  {activeSuite.description}
                </p>
              </div>

              {/* 3 Metric Pills Inside HUD */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#E2BA84] uppercase block tracking-wider">
                    Floor Area
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-white block mt-0.5">
                    {activeSuite.sqft}
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#E2BA84] uppercase block tracking-wider">
                    Capacity
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    {activeSuite.capacity}
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#E2BA84] uppercase block tracking-wider">
                    Bedding
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block mt-0.5">
                    {activeSuite.bedType.split('+')[0]}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="hidden sm:grid grid-cols-2 gap-2 pt-1 border-t border-white/15">
                {activeSuite.highlights.slice(0, 2).map((hl, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#E2ECE9]">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#137586] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>

              {/* Action Button & Reassurance */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => onBookNow(activeSuite.id)}
                  className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#137586] hover:bg-[#168E9B] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Reserve {activeSuite.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A7DDD8] font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Owner Rates · &lt;15 min reply</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Right: Thumbnail Strip for Quick Visual Switching */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-xl">
          {suites.map((suite, idx) => {
            const isFocused = activeIdx === idx;
            return (
              <button
                key={suite.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isFocused
                    ? 'border-[#D4AF37] scale-105 shadow-md opacity-100'
                    : 'border-white/20 opacity-60 hover:opacity-90 hover:scale-102'
                }`}
                aria-label={`View ${suite.name}`}
              >
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0.5 right-1 font-mono text-[9px] font-bold text-white drop-shadow">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guidance Note: Clean and Concise */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6E4924] font-mono">
        <Compass className="w-3.5 h-3.5 text-[#137586] animate-pulse" />
        <span>Use arrow keys, swipe, or numbered tabs to explore all 15 suites</span>
      </div>
    </div>
  );
};

export default SuiteFocusGallery;
