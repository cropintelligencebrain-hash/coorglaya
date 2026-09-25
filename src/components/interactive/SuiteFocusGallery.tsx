import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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

// 3D Perspective Interactive Room Image Card (100% Clean, Unobstructed Photography)
const InteractiveRoomImage: React.FC<{ suite: SuiteSpecData; idx: number }> = ({ suite, idx }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      style={{ perspective: 1100 }}
      className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8DFD1] shadow-lg group cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? mousePos.y * -7 : 0,
          rotateY: isHovered ? mousePos.x * 7 : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        <img
          src={suite.image}
          alt={suite.name}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
        />

        {/* Soft edge vignette only — center room and furniture remain 100% clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

        {/* Category tag in top-left */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="uppercase tracking-wide">
            0{idx + 1} · {suite.category}
          </span>
        </div>

        {/* Seasonal tariff chip in bottom-right */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#137586]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
          <span>Tariff on Enquiry · Seasonal</span>
        </div>
      </motion.div>
    </div>
  );
};

export const SuiteFocusGallery: React.FC<SuiteFocusGalleryProps> = ({
  suites,
  onBookNow,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Mouse Drag state
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Synchronize active tab based on horizontal scroll position
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.suite-horizontal-card');
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIdx) {
      setActiveIdx(closestIdx);
    }
  }, [activeIdx]);

  // Smooth scroll to a specific suite card
  const scrollToSuite = useCallback((idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.suite-horizontal-card');
    if (cards[idx]) {
      isScrollingRef.current = true;
      setActiveIdx(idx);
      const card = cards[idx];
      const targetScroll = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  }, []);

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % suites.length;
    scrollToSuite(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + suites.length) % suites.length;
    scrollToSuite(prevIdx);
  };

  // Convert mousewheel vertical delta into smooth horizontal scroll over the cards,
  // while allowing natural page vertical scrolling when at track boundaries!
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const isAtStart = container.scrollLeft <= 10;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

      if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.15;
      }
    }
  };

  // Click-and-drag horizontal scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Keyboard arrow keys
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

  return (
    <div className="w-full select-none space-y-4">
      {/* 
        EXPANSIVE HORIZONTAL SCROLL SUITE TRACK:
        Smooth horizontal scroll with snap physics, mousewheel translation, and drag support.
        Next card subtly peeks into view on the right edge.
      */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`flex gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth px-2 sm:px-4 py-3 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {suites.map((suite, idx) => (
          <div
            key={suite.id}
            className="suite-horizontal-card w-[90vw] sm:w-[84vw] lg:w-[1020px] max-w-[1020px] shrink-0 snap-center rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#137586]/40 p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
              
              {/* LEFT COLUMN (60%): 100% CLEAN, UNOBSTRUCTED ROOM PHOTOGRAPHY */}
              <div className="lg:col-span-7">
                <InteractiveRoomImage suite={suite} idx={idx} />
              </div>

              {/* RIGHT COLUMN (40%): BESIDE-IMAGE DOSSIER */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                {/* Header Classification */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#A3733E] uppercase tracking-wider mb-1">
                    <BedDouble className="w-4 h-4" />
                    <span>
                      Sanctuary Suite Quarters · 0{idx + 1} of 0{suites.length}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131E1C] tracking-tight">
                    {suite.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2C413E] leading-relaxed mt-2 font-normal prose-pretty">
                    {suite.description}
                  </p>
                </div>

                {/* 3 Metric Cards: Floor Area REMOVED completely */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left transition-shadow hover:shadow-xs flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                      Capacity
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#131E1C] block mt-0.5 leading-snug">
                      {suite.capacity}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left transition-shadow hover:shadow-xs flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                      Bedding
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#131E1C] block mt-0.5 leading-snug">
                      {suite.bedType.split('+')[0]}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-center sm:text-left transition-shadow hover:shadow-xs flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-[#8C5F2E] uppercase block tracking-wider">
                      Orientation
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#131E1C] block mt-0.5 leading-snug">
                      {suite.view}
                    </span>
                  </div>
                </div>

                {/* Highlights Checklist */}
                <div className="space-y-2 pt-1 border-t border-[#E4D9C8]/80">
                  {suite.highlights.slice(0, 3).map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-[#131E1C]">
                      <div className="w-4 h-4 rounded-full bg-[#E5F3F5] text-[#137586] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Reservation Action Button with Luxury Shimmer */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onBookNow(suite.id)}
                    className="relative group/btn overflow-hidden px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#137586] hover:bg-[#105B69] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]"
                  >
                    {/* Luxury diagonal shimmer sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    <span className="relative z-10">Reserve {suite.name}</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#2D4744] font-medium px-2 py-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct Concierge · &lt;15 min reply</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 
        CENTERED ARROWS & SUITE TABS (BELOW IN THE MIDDLE)
        Provides instant 1-tap horizontal jumping and tracking indicator.
      */}
      <div className="flex flex-col items-center justify-center gap-2.5 pt-2 pb-2">
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
                  onClick={() => scrollToSuite(idx)}
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

        {/* Horizontal Navigation Hint & Progress Readout */}
        <div className="flex items-center gap-2 text-[11px] text-[#6E4924] font-mono">
          <Compass className="w-3.5 h-3.5 text-[#137586] animate-pulse" />
          <span>
            Suite 0{activeIdx + 1} of 0{suites.length} · Scroll or drag horizontally to explore
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuiteFocusGallery;
