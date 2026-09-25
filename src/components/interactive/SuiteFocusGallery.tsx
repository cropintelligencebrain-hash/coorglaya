import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Play,
  Pause,
} from 'lucide-react';
import { SuiteSpecData } from '../3d/SuiteInspectionCard3D';

interface SuiteFocusGalleryProps {
  suites: SuiteSpecData[];
  onBookNow: (suiteId: string) => void;
}

const DURATION_MS = 5500; // 5.5s luxury viewing interval per suite
const TICK_MS = 50;

export const SuiteFocusGallery: React.FC<SuiteFocusGalleryProps> = ({
  suites,
  onBookNow,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Mouse Interaction state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleNext = useCallback(() => {
    setProgress(0);
    setActiveIdx((prev) => (prev + 1) % suites.length);
  }, [suites.length]);

  const handlePrev = useCallback(() => {
    setProgress(0);
    setActiveIdx((prev) => (prev - 1 + suites.length) % suites.length);
  }, [suites.length]);

  const handleSelectSuite = (index: number) => {
    setProgress(0);
    setActiveIdx(index);
  };

  // IntersectionObserver: auto-advances only when visible in viewport
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Living Storyboard Auto-Advance Timer (pauses on hover or manual toggle)
  useEffect(() => {
    if (!isPlaying || !isInView || isHovered) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_MS / DURATION_MS) * 100;
        if (next >= 100) {
          setActiveIdx((curr) => (curr + 1) % suites.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isPlaying, isInView, isHovered, suites.length]);

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation support
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
  }, [handleNext, handlePrev]);

  const activeSuite = suites[activeIdx] || suites[0];

  return (
    <div
      ref={cardRef}
      className="w-full select-none space-y-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        STORYBOARD SEGMENTED PROGRESS TIMELINE (4 LUXURY SEGMENTS)
        Visually displays auto-advancing progress across all 4 suites.
        1-tap jump to any suite with instant progress sync.
      */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3.5 px-1">
        {suites.map((suite, idx) => {
          const isCurrent = activeIdx === idx;
          const isPassed = idx < activeIdx;
          const fillWidth = isPassed ? 100 : isCurrent ? progress : 0;

          return (
            <button
              key={suite.id}
              onClick={() => handleSelectSuite(idx)}
              className="group text-left space-y-1.5 cursor-pointer py-1"
              aria-label={`Jump to suite 0${idx + 1} ${suite.name}`}
            >
              {/* Segmented Fill Bar */}
              <div className="h-1.5 rounded-full bg-[#E5DDD0] overflow-hidden relative border border-[#DFD3C0]/60">
                <div
                  className={`h-full rounded-full transition-all duration-75 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#137586] to-[#1EA3BA]'
                      : isPassed
                      ? 'bg-[#137586]/70'
                      : 'bg-transparent'
                  }`}
                  style={{ width: `${fillWidth}%` }}
                />
              </div>

              {/* Segment Caption */}
              <div className="flex items-center justify-between text-[11px] text-[#586E6B] group-hover:text-[#132422] transition-colors">
                <span className={`font-mono font-bold text-[10px] ${isCurrent ? 'text-[#137586]' : ''}`}>
                  0{idx + 1}
                </span>
                <span className={`hidden sm:inline text-xs font-semibold truncate max-w-[140px] ${
                  isCurrent ? 'text-[#132422]' : ''
                }`}>
                  {suite.name.replace(' Suite', '')}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 
        MAIN CLEAN SPLIT CARD (ZERO OVERLAPPING BOXES & ZERO SCROLL HIJACKING):
        100% natural, buttery page scroll with 0 blank space traps.
      */}
      <div className="rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border-2 border-[#E4D9C8] transition-all duration-300 p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          
          {/* 
            LEFT COLUMN (60%): 100% CLEAN, UNOBSTRUCTED ROOM PHOTOGRAPHY
            Zero HUD boxes covering the bed, headboard, or wardrobe.
            Features 3D Perspective Window Tilt on mouse hover!
          */}
          <div className="lg:col-span-7">
            <motion.div
              onMouseMove={handleMouseMove}
              style={{ perspective: 1100 }}
              className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8DFD1] shadow-lg group cursor-pointer"
            >
              <motion.div
                animate={{
                  rotateX: isHovered ? mousePos.y * -8 : 0,
                  rotateY: isHovered ? mousePos.x * 8 : 0,
                  scale: isHovered ? 1.015 : 1,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSuite.id}
                    initial={{ scale: 1.05, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ scale: 0.97, opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeSuite.image}
                      alt={activeSuite.name}
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    />

                    {/* Soft edge vignette only — center bed and room remain 100% clean and clear */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                    {/* Small category tag in top-left (stays completely away from furniture) */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="uppercase tracking-wide">
                        0{activeIdx + 1} · {activeSuite.category}
                      </span>
                    </motion.div>

                    {/* Small seasonal tariff chip in bottom-right */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#137586]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md"
                    >
                      <span>Tariff on Enquiry · Seasonal</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* 
            RIGHT COLUMN (40%): BESIDE-IMAGE DOSSIER
            Cleanly houses all suite details in the empty space beside the image.
            Features masked typographic reveals and staggered metric cards!
          */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuite.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0, y: 12 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      staggerChildren: 0.05,
                      delayChildren: 0.04,
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -10,
                    transition: { duration: 0.22, ease: 'easeIn' },
                  },
                }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Header Classification */}
                <div>
                  <motion.div
                    variants={{ initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } }}
                    className="flex items-center gap-2 text-xs font-bold text-[#A3733E] uppercase tracking-wider mb-1"
                  >
                    <BedDouble className="w-4 h-4" />
                    <span>
                      Sanctuary Suite Quarters · 0{activeIdx + 1} of 0{suites.length}
                    </span>
                  </motion.div>

                  {/* Masked Typographic Reveal */}
                  <div className="overflow-hidden py-0.5">
                    <motion.h3
                      variants={{
                        initial: { y: '100%', opacity: 0 },
                        animate: {
                          y: '0%',
                          opacity: 1,
                          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131E1C] tracking-tight"
                    >
                      {activeSuite.name}
                    </motion.h3>
                  </div>

                  <motion.p
                    variants={{ initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } }}
                    className="text-xs sm:text-sm text-[#2C413E] leading-relaxed mt-2 font-normal prose-pretty"
                  >
                    {activeSuite.description}
                  </motion.p>
                </div>

                {/* 3 Cascading Metric Cards */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {[
                    { label: 'Floor Area', val: activeSuite.sqft, isMono: true },
                    { label: 'Capacity', val: activeSuite.capacity, isMono: false },
                    { label: 'Bedding', val: activeSuite.bedType.split('+')[0], isMono: false },
                  ].map((metric) => (
                    <motion.div
                      key={metric.label}
                      variants={{
                        initial: { opacity: 0, y: 10, scale: 0.95 },
                        animate: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left transition-shadow hover:shadow-sm"
                    >
                      <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                        {metric.label}
                      </span>
                      <span className={`text-sm font-bold text-[#131E1C] block mt-0.5 truncate ${metric.isMono ? 'font-mono' : ''}`}>
                        {metric.val}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Highlights Checklist */}
                <motion.div
                  variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
                  className="space-y-2 pt-1 border-t border-[#E4D9C8]/80"
                >
                  {activeSuite.highlights.slice(0, 3).map((hl, hIdx) => (
                    <motion.div
                      key={hIdx}
                      variants={{ initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 } }}
                      className="flex items-center gap-2 text-xs font-medium text-[#131E1C]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#E5F3F5] text-[#137586] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{hl}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Reservation Action Button with Luxury Shimmer & Micro-Press Physics */}
                <motion.div
                  variants={{ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }}
                  className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                >
                  <button
                    onClick={() => onBookNow(activeSuite.id)}
                    className="relative group/btn overflow-hidden px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#137586] hover:bg-[#105B69] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]"
                  >
                    {/* Luxury diagonal shimmer sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    <span className="relative z-10">Reserve {activeSuite.name}</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#2D4744] font-medium px-2 py-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct Concierge · &lt;15 min reply</span>
                  </div>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 
        CENTERED ARROWS, SUITE TABS & LIVING LOOKBOOK CONTROLS
        Features Framer Motion layoutId magnetic gliding spring indicator!
      */}
      <div className="flex flex-col items-center justify-center gap-2.5 pt-1 pb-2">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Suite"
            className="w-8 h-8 rounded-full bg-[#EFE8DC] border border-[#DFD3C0] text-[#132422] hover:bg-white hover:border-[#137586] flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Numbered Suite Tabs with Magnetic Gliding Pill */}
          <div className="flex items-center gap-1.5 px-2 relative">
            {suites.map((suite, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={suite.id}
                  onClick={() => handleSelectSuite(idx)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer flex items-center gap-1.5 z-10 ${
                    isSelected
                      ? 'text-white'
                      : 'text-[#586E6B] hover:text-[#132422]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSuiteGlider"
                      className="absolute inset-0 bg-[#137586] rounded-full shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="font-mono text-[10px]">0{idx + 1}</span>
                  <span className="hidden md:inline">{suite.name.replace(' Suite', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next Suite"
            className="w-8 h-8 rounded-full bg-[#EFE8DC] border border-[#DFD3C0] text-[#132422] hover:bg-white hover:border-[#137586] flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient Tour Status & Play/Pause Control */}
        <div className="flex items-center gap-3 text-[11px] text-[#586E6B]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] hover:border-[#137586] text-[#2C413E] transition-all cursor-pointer shadow-xs active:scale-95"
            title={isPlaying ? 'Pause Auto-Advancing Lookbook' : 'Resume Auto-Advancing Lookbook'}
          >
            {isPlaying && !isHovered ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">Living Lookbook · Auto-Advancing</span>
                <Pause className="w-3 h-3 text-[#586E6B] ml-0.5" />
              </>
            ) : isHovered ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-medium text-amber-800">Paused for Room Inspection</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-stone-400" />
                <span className="font-medium">Auto-Advance Paused</span>
                <Play className="w-3 h-3 text-[#137586] ml-0.5" />
              </>
            )}
          </button>

          <span className="hidden sm:inline text-[#8C7A65]">·</span>

          <span className="hidden sm:inline font-mono text-[11px] text-[#8C7A65]">
            Suite 0{activeIdx + 1} of 0{suites.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuiteFocusGallery;
