import React, { useState, useRef } from 'react';
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

  // Framer-motion scroll-linked focus
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isClickingRef.current) return;
    // Map scroll progress (0.0 to 1.0) into discrete suite indices (0 to suites.length - 1)
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

  const handleSelectSuite = (index: number) => {
    isClickingRef.current = true;
    setActiveIdx(index);

    // Scroll smoothly to the corresponding point in the container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetOffset = (index / suites.length) * (containerRef.current.offsetHeight - window.innerHeight);
      const targetY = scrollTop + rect.top + targetOffset;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % suites.length;
    handleSelectSuite(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + suites.length) % suites.length;
    handleSelectSuite(prevIdx);
  };

  const activeSuite = suites[activeIdx] || suites[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280vh] sm:h-[320vh] select-none"
    >
      {/* Pinned Viewport Stage (Sticky Focus Gallery with Safe Clearance Below Floating Navbar) */}
      <div className="sticky top-24 sm:top-28 z-20 w-full min-h-[calc(100dvh-7.5rem)] flex items-center justify-center py-2 sm:py-4">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Focus Gallery Stage: Clean Integrated Card */}
          <div className="rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border-2 border-[#E4D9C8] p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden">
            
            {/* Integrated Top Suite Switcher Bar (Safe Inside Card, Never Collides with Navbar) */}
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E4D9C8]/80">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                {suites.map((suite, idx) => (
                  <button
                    key={suite.id}
                    onClick={() => handleSelectSuite(idx)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeIdx === idx
                        ? 'bg-[#137586] text-white shadow-sm scale-102'
                        : 'bg-[#EFE8DC]/80 text-[#586E6B] hover:text-[#132422] border border-[#DFD3C0] hover:border-[#137586]/40'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                    <span>{suite.name.replace(' Suite', '')}</span>
                  </button>
                ))}
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Suite"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EFE8DC] border border-[#DFD3C0] text-[#132422] hover:bg-white hover:border-[#137586] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Suite"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EFE8DC] border border-[#DFD3C0] text-[#132422] hover:bg-white hover:border-[#137586] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Visual Stage (Focused Image Pop Forward) */}
              <div className="lg:col-span-6 space-y-3 sm:space-y-4">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8DFD1] shadow-lg group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSuite.id}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.03, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeSuite.image}
                        alt={activeSuite.name}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Focus Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="uppercase tracking-wide">
                          0{activeIdx + 1} · {activeSuite.category}
                        </span>
                      </div>

                      {/* Bottom In-Place Badge: Pure Inquiry Only */}
                      <div className="absolute bottom-3 left-3 px-3.5 py-1 rounded-full bg-[#137586]/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                        <span>Tariff on Enquiry · Seasonal</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Subdued Focus Thumbnails Strip: Clickable Framer-style Focus Switchers */}
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 pt-1">
                  {suites.map((suite, idx) => {
                    const isFocused = activeIdx === idx;
                    return (
                      <button
                        key={suite.id}
                        onClick={() => handleSelectSuite(idx)}
                        className={`relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                          isFocused
                            ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#FAF6EF] border-transparent scale-102 opacity-100 shadow-md'
                            : 'border-[#E4D9C8] opacity-50 hover:opacity-85 hover:scale-101'
                        }`}
                        aria-label={`Focus on ${suite.name}`}
                      >
                        <img
                          src={suite.image}
                          alt={suite.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <span className="absolute bottom-1 right-1.5 font-mono text-[9px] sm:text-[10px] font-bold text-white drop-shadow">
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Beside-Reveal Dossier (Smooth In-Place Text Reveal) */}
              <div className="lg:col-span-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSuite.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: 'easeOut' }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Header Classification */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#A3733E] uppercase tracking-wider mb-1">
                        <BedDouble className="w-3.5 h-3.5" />
                        <span>
                          Sanctuary Suite Quarters · Suite 0{activeIdx + 1} of 0{suites.length}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131E1C] tracking-tight">
                        {activeSuite.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#314240] leading-relaxed mt-1.5 font-normal prose-pretty">
                        {activeSuite.description}
                      </p>
                    </div>

                    {/* 3 Metrics Cards */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
                        <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                          Floor Area
                        </span>
                        <span className="text-sm font-bold text-[#131E1C] font-mono block mt-0.5">
                          {activeSuite.sqft}
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
                        <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                          Guest Capacity
                        </span>
                        <span className="text-sm font-bold text-[#131E1C] block mt-0.5">
                          {activeSuite.capacity}
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
                        <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                          Bedding
                        </span>
                        <span className="text-sm font-bold text-[#131E1C] truncate block mt-0.5">
                          {activeSuite.bedType.split('+')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Highlights Checklist */}
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

                    {/* Reservation Action Row */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        onClick={() => onBookNow(activeSuite.id)}
                        className="px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#137586] hover:bg-[#105B69] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <span>Reserve {activeSuite.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-[#586E6B] font-medium px-2 py-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Direct Concierge Confirmation</span>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Scroll Guidance Indicator */}
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#8C7E6C] font-mono">
            <Compass className="w-3.5 h-3.5 text-[#137586] animate-pulse" />
            <span>Scroll or tap thumbnails to focus suites ({activeIdx + 1}/{suites.length})</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuiteFocusGallery;
