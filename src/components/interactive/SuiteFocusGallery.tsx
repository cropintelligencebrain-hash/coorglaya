import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  BedDouble,
  Sparkles,
  Check,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);

  // Calibrated scroll container: 4 suites = 200vh total scroll distance.
  // Each suite gets exactly a 25% scroll window, releasing smoothly with ZERO trailing blank space.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isClickingRef.current) return;
    const count = suites.length;
    const threshold = 1 / count;
    const calculatedIdx = Math.min(
      Math.floor(latest / threshold),
      count - 1
    );
    if (calculatedIdx !== activeIdx && calculatedIdx >= 0) {
      setActiveIdx(calculatedIdx);
    }
  });

  // Smooth scroll jump when clicking middle arrows or suite tabs
  const handleSelectSuite = (index: number) => {
    isClickingRef.current = true;
    setActiveIdx(index);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Position scroll right at the center of the selected suite's bracket
      const targetOffset = ((index + 0.3) / suites.length) * (containerRef.current.offsetHeight - window.innerHeight);
      const targetY = scrollTop + rect.top + targetOffset;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      isClickingRef.current = false;
    }, 700);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % suites.length;
    handleSelectSuite(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + suites.length) % suites.length;
    handleSelectSuite(prevIdx);
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, suites.length]);

  const activeSuite = suites[activeIdx] || suites[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200vh] sm:h-[220vh] select-none"
    >
      {/* 
        STICKY SPLIT-SCREEN STAGE:
        Locks comfortably below the floating navbar (top-24 to top-28).
        Unpins cleanly as soon as Suite 04 finishes, leaving 0 blank space.
      */}
      <div className="sticky top-24 sm:top-28 z-20 w-full min-h-[calc(100vh-7.5rem)] flex flex-col justify-center py-2 sm:py-4">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Main Clean Split-Screen Card */}
          <div className="rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border-2 border-[#E4D9C8] p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
              
              {/* 
                LEFT COLUMN (60%): 100% CLEAN, UNOBSTRUCTED ROOM PHOTOGRAPHY
                Zero HUD boxes covering the bed, headboard, or wardrobe.
              */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8DFD1] shadow-lg group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSuite.id}
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.02, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeSuite.image}
                        alt={activeSuite.name}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />

                      {/* Gentle natural vignette around borders only — room remains 100% visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                      {/* Small, Non-Intrusive Category Badge in Top Left */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="uppercase tracking-wide">
                          0{activeIdx + 1} · {activeSuite.category}
                        </span>
                      </div>

                      {/* Bottom-Right Seasonal Tariff Chip */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#137586]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                        <span>Tariff on Enquiry · Seasonal</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 
                RIGHT COLUMN (40%): BESIDE-IMAGE DOSSIER
                Cleanly houses all details in the empty space beside the image.
              */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSuite.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.38, ease: 'easeOut' }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Header Classification */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#A3733E] uppercase tracking-wider mb-1">
                        <BedDouble className="w-4 h-4" />
                        <span>
                          Sanctuary Suite Quarters · 0{activeIdx + 1} of 0{suites.length}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131E1C] tracking-tight">
                        {activeSuite.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#2C413E] leading-relaxed mt-2 font-normal prose-pretty">
                        {activeSuite.description}
                      </p>
                    </div>

                    {/* 3 Metric Cards */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left">
                        <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                          Floor Area
                        </span>
                        <span className="text-sm font-bold text-[#131E1C] font-mono block mt-0.5">
                          {activeSuite.sqft}
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left">
                        <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                          Capacity
                        </span>
                        <span className="text-sm font-bold text-[#131E1C] block mt-0.5">
                          {activeSuite.capacity}
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left">
                        <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                          Bedding
                        </span>
                        <span className="text-sm font-bold text-[#131E1C] truncate block mt-0.5">
                          {activeSuite.bedType.split('+')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Verified Highlights Checklist */}
                    <div className="space-y-2 pt-1 border-t border-[#E4D9C8]/80">
                      {activeSuite.highlights.slice(0, 3).map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-[#131E1C]">
                          <div className="w-4 h-4 rounded-full bg-[#E5F3F5] text-[#137586] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Reservation Action Button & Trust Badge */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        onClick={() => onBookNow(activeSuite.id)}
                        className="px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#137586] hover:bg-[#105B69] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <span>Reserve {activeSuite.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-[#2D4744] font-medium px-2 py-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Direct Concierge · &lt;15 min reply</span>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* 
            CENTERED ARROWS & PROGRESS CONTROLS (BELOW IN THE MIDDLE)
            Allows immediate 1-tap navigation in addition to smooth vertical scroll.
          */}
          <div className="flex flex-col items-center justify-center gap-2 pt-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous Suite"
                className="w-8 h-8 rounded-full bg-[#EFE8DC] border border-[#DFD3C0] text-[#132422] hover:bg-white hover:border-[#137586] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Numbered Suite Dots / Tabs */}
              <div className="flex items-center gap-1.5 px-2">
                {suites.map((suite, idx) => (
                  <button
                    key={suite.id}
                    onClick={() => handleSelectSuite(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeIdx === idx
                        ? 'bg-[#137586] text-white shadow-sm scale-105'
                        : 'bg-[#EFE8DC]/80 text-[#586E6B] hover:text-[#132422]'
                    }`}
                  >
                    <span className="font-mono text-[10px]">0{idx + 1}</span>
                    <span className="hidden md:inline">{suite.name.replace(' Suite', '')}</span>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next Suite"
                className="w-8 h-8 rounded-full bg-[#EFE8DC] border border-[#DFD3C0] text-[#132422] hover:bg-white hover:border-[#137586] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scroll Hint */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#6E4924] font-mono">
              <Compass className="w-3.5 h-3.5 text-[#137586] animate-pulse" />
              <span>Scroll down or use middle arrows to reveal next suite</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuiteFocusGallery;
