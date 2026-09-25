import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Feather, Info, Leaf, Play, Pause, Wind } from 'lucide-react';
import { CinematicReveal } from '../common/CinematicReveal';

export const KiwiBirdNatureSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleBirdAudio = () => {
    setHasInteracted(true);
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/BirdsAudio.mpeg');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.55;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Audio play failed:', err));
    }
  };

  return (
    <section
      id="nature-experience"
      className="relative w-full py-16 sm:py-24 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none border-y border-[#E8DFD1]"
      aria-label="Kiwi Bird Nature & Ambient Avifauna Experience"
    >
      {/* Background Ambient Mist & Soft Woodland Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#137586]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#14422F]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#EBE2D3]/40 blur-2xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-6">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-white px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#14422F] shadow-2xs">
              <Feather className="w-3.5 h-3.5 text-[#A3733E]" />
              <span>Highland Nature Sanctuary</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C1A] leading-tight">
              Awaken to Coorg's Living Nature & Birdsong.
            </h2>
            <p className="text-xs sm:text-sm text-[#223633] font-medium leading-relaxed max-w-xl">
              Immerse yourself in our unhurried morning atmosphere. Listen to natural bird ambience echoing across the bamboo groves, while graceful animated avian visuals soar through the highland mist.
            </p>
          </CinematicReveal>

          {/* Interactive Sound Control Pill */}
          <CinematicReveal delay={0.15}>
            <button
              onClick={toggleBirdAudio}
              type="button"
              className={`group flex items-center gap-3 px-5 py-3 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer border ${
                isPlaying
                  ? 'bg-[#14422F] text-[#FAF6EF] border-[#D4AF37]/50 shadow-md ring-2 ring-[#D4AF37]/30'
                  : 'bg-white text-[#132422] border-[#E0D7C8] hover:border-[#14422F] hover:bg-[#FAF6EF]'
              }`}
              aria-label={isPlaying ? 'Pause nature bird sound' : 'Play natural bird ambience'}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isPlaying ? 'bg-[#D4AF37] text-[#0A261B]' : 'bg-[#E5F3F5] text-[#137586]'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </div>
              <div className="text-left">
                <span className="block text-[11px] uppercase tracking-wider text-inherit font-bold">
                  {isPlaying ? 'Ambience Playing' : 'Natural Bird Ambience'}
                </span>
                <span className="block text-[10px] text-inherit/80 font-normal">
                  {isPlaying ? 'Tap to Pause Sound' : 'Tap to Listen Live'}
                </span>
              </div>
              {isPlaying ? (
                <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#7A6E5F]" />
              )}
            </button>
          </CinematicReveal>
        </div>

        {/* Central Stage: Animated Flying Bird Showcase Canvas + Ambient Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Main Visual Arena (8 Cols on Desktop) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#122822] via-[#0D1F1A] to-[#0A1814] border border-[#2D453E] shadow-xl aspect-[16/9] min-h-[320px] sm:min-h-[420px] flex items-center justify-center">
              {/* Forest Canopy Silhouette Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C473A]/40 via-transparent to-black/60 pointer-events-none" />

              {/* Gentle Floating Mist Layers */}
              <motion.div
                animate={{ x: [-30, 30, -30], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#76A89B]/15 to-transparent pointer-events-none blur-xl"
              />

              {/* Distant Hills & Bamboo Tree Silhouettes SVG */}
              <svg
                className="absolute bottom-0 inset-x-0 w-full h-36 opacity-35 pointer-events-none"
                viewBox="0 0 1200 300"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,300 L0,180 Q200,90 400,160 T800,110 Q1000,70 1200,150 L1200,300 Z"
                  fill="#06120E"
                />
                <path
                  d="M0,300 L0,220 Q300,140 600,210 T1200,190 L1200,300 Z"
                  fill="#030A08"
                  opacity="0.7"
                />
              </svg>

              {/* Animated Floating Leaves */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, 360],
                    x: [0, (i % 2 === 0 ? 40 : -40), 0],
                    rotate: [0, 360],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 10 + i * 2.5,
                    repeat: Infinity,
                    delay: i * 1.8,
                    ease: 'linear',
                  }}
                  className="absolute pointer-events-none text-[#7EA895]/30"
                  style={{ left: `${12 + i * 15}%`, top: '-5%' }}
                >
                  <Leaf className="w-4 h-4" />
                </motion.div>
              ))}

              {/* Kiwi Bird — Premium Realistic Smooth Flight Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Primary Bird Flight Track */}
                <motion.div
                  animate={{
                    x: ['-15%', '115%'],
                    y: ['45%', '22%', '38%', '15%', '35%'],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: [0.45, 0.05, 0.55, 0.95],
                  }}
                  className="absolute flex flex-col items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  style={{ top: 0, left: 0 }}
                >
                  {/* High-Precision Stylized Kiwi Bird Vector */}
                  <motion.div
                    animate={{
                      rotate: [-3, 3, -3],
                      scaleY: [1, 0.92, 1],
                    }}
                    transition={{
                      duration: 0.85,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-28 sm:w-36 h-20 sm:h-24"
                  >
                    <svg
                      viewBox="0 0 160 110"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Left Wing with subtle flap cycle */}
                      <motion.path
                        animate={{
                          d: [
                            'M 65 52 C 50 15, 30 18, 12 36 C 25 50, 48 55, 65 52 Z',
                            'M 65 52 C 55 35, 35 48, 18 62 C 30 65, 52 58, 65 52 Z',
                            'M 65 52 C 50 15, 30 18, 12 36 C 25 50, 48 55, 65 52 Z',
                          ],
                        }}
                        transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
                        fill="#7A5633"
                        stroke="#5A3A1E"
                        strokeWidth="1.5"
                      />

                      {/* Kiwi Compact Plump Body */}
                      <ellipse
                        cx="75"
                        cy="60"
                        rx="36"
                        ry="26"
                        fill="url(#kiwiBodyGradient)"
                        stroke="#4A3119"
                        strokeWidth="1.5"
                      />

                      {/* Feather Texture Accents */}
                      <path
                        d="M 55 58 Q 62 64 70 58 M 65 66 Q 73 72 82 66 M 78 54 Q 85 60 92 54"
                        stroke="#9C734B"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity="0.75"
                      />

                      {/* Tapered Head & Slender Long Downcurved Beak */}
                      <path
                        d="M 98 52 C 104 46, 114 46, 118 53 C 125 55, 154 62, 156 64 C 153 65, 122 61, 114 62 C 108 67, 98 65, 96 58 Z"
                        fill="#8B623B"
                        stroke="#4A3119"
                        strokeWidth="1.2"
                      />

                      {/* Eye with glistening highlight */}
                      <circle cx="108" cy="53" r="2.2" fill="#1A1208" />
                      <circle cx="108.6" cy="52.4" r="0.7" fill="#FFFFFF" />

                      {/* Slender Characteristic Kiwi Beak Highlight */}
                      <path
                        d="M 116 57 Q 138 62 155 64"
                        stroke="#D5B088"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />

                      {/* Right Wing flap motion */}
                      <motion.path
                        animate={{
                          d: [
                            'M 72 58 C 85 30, 105 32, 118 45 C 108 58, 90 62, 72 58 Z',
                            'M 72 58 C 82 45, 100 52, 112 62 C 102 66, 86 64, 72 58 Z',
                            'M 72 58 C 85 30, 105 32, 118 45 C 108 58, 90 62, 72 58 Z',
                          ],
                        }}
                        transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
                        fill="#6B4B2A"
                        stroke="#4A3119"
                        strokeWidth="1.2"
                        opacity="0.9"
                      />

                      {/* Gradients Definition */}
                      <defs>
                        <linearGradient id="kiwiBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8C633C" />
                          <stop offset="60%" stopColor="#6E4A28" />
                          <stop offset="100%" stopColor="#4A3119" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Secondary Playful Bird Gliding in Distance */}
                <motion.div
                  animate={{
                    x: ['115%', '-20%'],
                    y: ['28%', '40%', '24%'],
                  }}
                  transition={{
                    duration: 26,
                    repeat: Infinity,
                    delay: 7,
                    ease: 'easeInOut',
                  }}
                  className="absolute opacity-40 scale-60 filter blur-[0.5px]"
                  style={{ top: 0, left: 0 }}
                >
                  <svg viewBox="0 0 160 110" className="w-20 h-14" fill="#583C20">
                    <ellipse cx="75" cy="60" rx="36" ry="26" />
                    <path d="M 98 52 C 104 46, 114 46, 118 53 C 125 55, 154 62, 156 64 C 153 65, 122 61, 114 62 Z" />
                    <path d="M 65 52 C 50 20, 30 22, 12 36 Z" />
                  </svg>
                </motion.div>
              </div>

              {/* Bottom Canvas Overlay Information Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-white text-xs">
                <div className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-medium text-white/90">
                    Morning Canopy Flight & Living Highland Breeze
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Artistic Nature Representation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sensory Feature Card (4 Cols on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#E0D7C8] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A3733E]">
                  Sanctuary Avifauna
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E5F3F5] text-[#0A5462] border border-[#BCE2E7]">
                  Nature Suite
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#0F1C1A]">
                The Song of the Highland Canopy
              </h3>

              <p className="text-xs text-[#223633] font-medium leading-relaxed">
                Nestled along Kushalnagar's lush riverbeds and bamboo trees, Coorg Laya is visited by over 30 native bird species every dawn. Relax on your private verandah as sunlight breaks through the mist.
              </p>

              {/* Key Features List */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2 text-xs text-[#223633] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14422F] mt-1.5 shrink-0" />
                  <span>Fresh morning estate brew paired with natural dawn birdsong.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#223633] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14422F] mt-1.5 shrink-0" />
                  <span>Protected bamboo grove canopy naturally hosting local wildlife.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#223633] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14422F] mt-1.5 shrink-0" />
                  <span>Quiet walking promenades with birdwatching spots by the lawns.</span>
                </div>
              </div>

              {/* Explicit Artistic Representation Note */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] flex items-start gap-2.5 mt-2">
                <Info className="w-4 h-4 text-[#A3733E] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#4A3B2C] font-semibold leading-relaxed">
                  <strong className="text-[#2A1F13]">Artistic Representation:</strong> The animated Kiwi bird visual and accompanying audio ambience are an artistic creative depiction celebrating the tranquil nature experience of Coorg Laya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KiwiBirdNatureSection;
