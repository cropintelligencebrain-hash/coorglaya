import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { LayaHeroLogo } from '../common/LayaHeroLogo';

interface LayaVideoHeroSectionProps {
  onOpenEnquiry: () => void;
}

export const LayaVideoHeroSection: React.FC<LayaVideoHeroSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Handle ambient nature sound toggle
  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/BirdsAudio.mpeg');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.warn('Audio autoplay blocked by browser policy:', err);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('rooms-section') || document.getElementById('rooms');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative w-full h-[100dvh] min-h-[460px] max-h-[1200px] overflow-hidden bg-[#131E1C] select-none text-[#FAF7F2] flex items-center justify-center"
      aria-label="Coorg Laya Resort Hero"
    >
      {/* 1. DYNAMIC ORIENTATION-ADAPTIVE VIDEO BACKGROUND */}
      {!prefersReducedMotion ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 object-center"
          aria-hidden="true"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
          <img 
            src="/videos/hero-poster.jpg" 
            alt="Coorg Laya Resort morning ambiance" 
            className="w-full h-full object-cover object-center"
          />
        </video>
      ) : (
        <img 
          src="/videos/hero-poster.jpg" 
          alt="Coorg Laya Resort morning ambiance" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* 2. DELICATE LUMINESCENT SCRIM (Keeps morning video bright, sunlit & vivid while maintaining logo readability) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* 3. CENTERED PURE LAYA BRANDING (Dynamic Fluid Sizing on Rotation) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(3rem,env(safe-area-inset-bottom))] sm:py-0">
        
        {/* The Master Handcrafted Laya Calligraphic SVG Logo */}
        <div className="w-full flex justify-center py-1 sm:py-2">
          <LayaHeroLogo 
            className="w-full max-w-[min(85vw,310px)] portrait:max-w-[min(84vw,340px)] landscape:max-w-[min(55vw,460px)] md:landscape:max-w-[560px] lg:max-w-[620px] max-h-[min(38dvh,280px)] landscape:max-h-[min(38dvh,240px)] md:landscape:max-h-[min(50dvh,500px)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]" 
            color="#FAF6EF" 
            accentColor="#D4AF37" 
          />
        </div>

        {/* Minimal Luxury CTA - Direct WhatsApp Booking */}
        <div className="mt-4 sm:mt-8 flex items-center justify-center">
          <a
            href="https://wa.me/917411695533?text=Hello%20Coorg%20Laya%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#FAF6EF]/95 hover:bg-white text-[#131E1C] font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span>Book Your Stay</span>
            <ArrowUpRight className="w-4 h-4 text-[#734B29] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 4. DISCRETE AMBIENT AUDIO TOGGLE (Safe-Area Anchored) */}
      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-20">
        <button
          onClick={toggleAudio}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/80 transition-all duration-200"
          title={isPlayingAudio ? "Mute forest birdsong" : "Play ambient Coorg birdsong"}
          aria-label={isPlayingAudio ? "Mute ambient audio" : "Play ambient audio"}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E7B86E] animate-pulse" />
              <span className="hidden sm:inline text-white/90 text-[0.7rem] uppercase tracking-wider">Birdsong On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
              <span className="hidden sm:inline text-white/60 group-hover:text-white text-[0.7rem] uppercase tracking-wider">Sound Off</span>
            </>
          )}
        </button>
      </div>

      {/* 5. MINIMAL SCROLL CUE (Bottom Center) */}
      <div 
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-20 hidden xs:flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors cursor-pointer"
        onClick={scrollToNext}
        aria-label="Scroll to explore resort"
      >
        <span className="text-[0.6rem] tracking-[0.25em] uppercase font-light">Explore</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
};
