import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Disc, Sparkles, 
  Music, Music2, Music3, Feather
} from 'lucide-react';

export const VinylBirdsongPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [needleOnRecord, setNeedleOnRecord] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setNeedleOnRecord(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sync play/pause with needle drop animation
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setNeedleOnRecord(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error / Autoplay blocked:', err);
          setIsPlaying(false);
          setNeedleOnRecord(false);
        });
      }
    } else {
      audio.pause();
      setNeedleOnRecord(false);
    }
  }, [isPlaying]);

  // Sync volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-5">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/BirdsAudio.mpeg"
        preload="metadata"
      />

      {/* Turntable Card Header: Status Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E5F3F5] text-[#137586] border border-[#BCE2E7] flex items-center justify-center shadow-xs">
            <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3.2s' }} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A3733E] block">
              Sanctuary Turntable
            </span>
            <span className="text-xs font-serif font-bold text-[#132422]">
              Living Dawn Recording & Birdsong
            </span>
          </div>
        </div>

        {/* Live Audio Waves Visualizer Indicator in Resort Blue */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5F3F5] border border-[#BCE2E7]">
          <div className="h-3 flex items-end gap-0.5">
            {[10, 14, 8, 12, 14, 9].map((maxH, idx) => (
              <motion.div
                key={idx}
                animate={{
                  height: isPlaying ? [3, maxH, 4, maxH * 0.7, 3] : 3,
                }}
                transition={{
                  duration: 0.5 + (idx % 3) * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`w-0.5 rounded-full ${
                  isPlaying ? 'bg-[#137586]' : 'bg-[#A2C9CF]'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold text-[#137586] uppercase">
            {isPlaying ? 'Live Audio' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Centered Stage: Vinyl Turntable (Left) + Floating Notes + Minecraft Dancing Bird (Right, Facing Left) */}
      <div className="relative flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 py-2 overflow-visible">
        
        {/* Radiating Soundwave Ripples when Playing in Blue/Teal */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              className="w-56 h-56 rounded-full border border-[#137586]/35 absolute pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.25, 0] }}
              transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
              className="w-56 h-56 rounded-full border border-[#1A96AA]/30 absolute pointer-events-none"
            />
          </div>
        )}

        {/* 1. TURNTABLE DECK */}
        <div className="relative w-56 h-56 sm:w-60 sm:h-60 rounded-3xl bg-[#EFE8DC] border-2 border-[#DFD3C0] p-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),_0_12px_28px_rgba(19,117,134,0.12)] flex items-center justify-center shrink-0">
          
          {/* Spinning Vinyl Record (River Blue-Black) */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              rotate: {
                duration: 2.8,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              },
            }}
            className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full shadow-[0_8px_24px_rgba(9,46,54,0.4)] flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={togglePlay}
            style={{
              background: `radial-gradient(circle, #0D2630 0%, #081B22 30%, #030E12 55%, #081B22 80%, #0D2630 100%)`,
            }}
          >
            {/* Rotating Anisotropic Specular Light Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: `conic-gradient(from 45deg at 50% 50%, rgba(174,226,232,0.25) 0deg, transparent 55deg, rgba(174,226,232,0.25) 180deg, transparent 235deg, rgba(174,226,232,0.25) 360deg)`,
              }}
            />

            {/* Vinyl Grooves Texture */}
            <div className="absolute inset-2 rounded-full border border-cyan-100/10 pointer-events-none" />
            <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-cyan-100/10 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />

            {/* Blue & Gold Foil Center Label */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#0E4652] via-[#1A96AA] to-[#137586] shadow-md border-2 border-[#E2BA84]/80 flex flex-col items-center justify-center text-center p-1.5 z-10">
              <span className="text-[6.5px] sm:text-[7px] font-extrabold text-white uppercase tracking-tighter leading-tight drop-shadow-xs">
                COORG LAYA
              </span>
              <span className="text-[5.5px] font-mono font-bold text-[#E2BA84] mt-0.5">
                DAWN CHORUS
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#030E12] mt-0.5 border border-white/60" />
            </div>
          </motion.div>

          {/* Mechanical Tonearm */}
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 pointer-events-none">
            {/* Pivot Base */}
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#E5E7EB] via-[#D1D5DB] to-[#9CA3AF] border border-[#9CA3AF] shadow-[0_3px_8px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#092E36] border border-[#137586] shadow-inner" />
              
              {/* Arm Wand */}
              <motion.div
                animate={{
                  rotate: isPlaying ? 26 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="absolute top-3 left-3 origin-top-left"
              >
                {/* Metallic Tonearm Stem */}
                <div className="relative w-1.5 h-[86px] sm:h-[98px] rounded-full shadow-[2px_3px_8px_rgba(0,0,0,0.25)] bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF] border border-[#9CA3AF]/60" />
                
                {/* Cartridge Headshell & Stylus Needle */}
                <motion.div
                  animate={{
                    scale: needleOnRecord ? 0.96 : 1,
                    y: needleOnRecord ? 2 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-2 -left-1.5 w-4 h-5.5 rounded bg-[#092E36] border border-[#E2BA84] shadow-sm flex flex-col items-center justify-between p-0.5"
                >
                  <div className="w-1.5 h-1 bg-[#E2BA84] rounded-full" />
                  <div className="w-1 h-1 rounded-full bg-[#1A96AA]" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Center Play/Pause Floating Action Button */}
          <button
            onClick={togglePlay}
            className="absolute z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#137586] hover:bg-[#105B69] text-white shadow-[0_6px_18px_rgba(19,117,134,0.45)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause Birdsong' : 'Play Birdsong'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
        </div>

        {/* 2. FLOATING MUSIC NOTES (Bridging Vinyl to Dancing Bird) */}
        <div className="relative w-12 h-16 sm:h-44 hidden sm:flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -15, y: 15, scale: 0.6 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    x: [-10, 10, 20], 
                    y: [10, -20, -45],
                    scale: [0.7, 1.1, 0.9] 
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute text-[#137586]"
                >
                  <Music className="w-5 h-5" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10, y: 25, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    x: [-5, 12, 18], 
                    y: [20, -10, -35],
                    scale: [0.6, 1, 0.8] 
                  }}
                  transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute text-[#1A96AA]"
                >
                  <Music2 className="w-4 h-4" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -5, y: 0, scale: 0.6 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    x: [0, 15, 25], 
                    y: [0, -30, -55],
                    scale: [0.5, 0.9, 0.7] 
                  }}
                  transition={{ duration: 2.6, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute text-[#A3733E]"
                >
                  <Music3 className="w-4.5 h-4.5" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* 3. MINECRAFT-STYLE DANCING BIRD (Facing LEFT towards the Vinyl Player) */}
        <div 
          onClick={togglePlay}
          className="relative flex flex-col items-center justify-center p-3 rounded-2xl bg-[#EFE8DC]/60 border border-[#DFD3C0] hover:border-[#137586] transition-all cursor-pointer group select-none shadow-xs hover:shadow-md"
          title="Click to play music and watch the bird dance!"
        >
          {/* Subtle click prompt badge */}
          <div className="mb-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5F3F5] border border-[#BCE2E7] text-[10px] font-bold text-[#137586]">
            <Sparkles className="w-3 h-3 text-[#A3733E]" />
            <span>{isPlaying ? '♪ Dancing to the Beat' : 'Click Bird to Play'}</span>
          </div>

          {/* Minecraft Parrot Dance Stage */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
            
            {/* Pulsing Aura Ring when Dancing */}
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.1, 0.35] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full bg-[#1A96AA]/20 blur-md pointer-events-none"
              />
            )}

            {/* ARTICULATED BIRD SVG (Faces LEFT directly at Vinyl Recorder) */}
            <motion.div
              // Minecraft Parrot dance body: stepped bobbing up/down & horizontal weight shifts
              animate={isPlaying ? {
                y: [0, -7, 0, -5, 0],
                x: [-3, 0, 3, 0, -3],
              } : {
                y: [0, -2, 0],
                x: 0,
              }}
              transition={isPlaying ? {
                duration: 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
              } : {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-28 h-32 flex items-center justify-center"
            >
              <svg 
                viewBox="0 0 100 120" 
                className="w-full h-full drop-shadow-[0_6px_12px_rgba(19,117,134,0.25)]"
              >
                <defs>
                  {/* Resort River Blue Plumage Gradients */}
                  <linearGradient id="birdBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A96AA" />
                    <stop offset="50%" stopColor="#137586" />
                    <stop offset="100%" stopColor="#0E4652" />
                  </linearGradient>

                  <linearGradient id="birdChestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#AEE2E8" />
                    <stop offset="60%" stopColor="#77CDDA" />
                    <stop offset="100%" stopColor="#1A96AA" />
                  </linearGradient>

                  <linearGradient id="wingBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#137586" />
                    <stop offset="50%" stopColor="#0E4652" />
                    <stop offset="100%" stopColor="#092E36" />
                  </linearGradient>

                  <linearGradient id="goldBeakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2BA84" />
                    <stop offset="100%" stopColor="#A3733E" />
                  </linearGradient>
                </defs>

                {/* Perch Branch (Neutral timber & gold ring) */}
                <rect x="10" y="105" width="80" height="7" rx="3.5" fill="#C2B5A0" />
                <line x1="12" y1="108" x2="88" y2="108" stroke="#DFD3C0" strokeWidth="1.5" />

                {/* Bird Feet gripping the branch */}
                <path d="M 46 102 L 44 107 M 49 102 L 49 107 M 52 102 L 54 107" stroke="#8C5F2E" strokeWidth="2" strokeLinecap="round" />
                <path d="M 60 102 L 58 107 M 63 102 L 63 107 M 66 102 L 68 107" stroke="#8C5F2E" strokeWidth="2" strokeLinecap="round" />

                {/* Tail Feathers (Extending toward the right as bird faces left) */}
                <motion.g
                  animate={isPlaying ? {
                    rotate: [-10, 0, 10, 0, -10],
                  } : {
                    rotate: 0,
                  }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '70px 85px' }}
                >
                  <path d="M 68 85 Q 85 95 88 112 Q 78 106 65 92 Z" fill="#092E36" />
                  <path d="M 64 88 Q 80 102 82 116 Q 74 108 60 95 Z" fill="#105B69" />
                </motion.g>

                {/* Main Body */}
                <path 
                  d="M 38 48 C 30 65 30 85 46 98 C 62 104 74 95 72 75 C 70 58 55 45 38 48 Z" 
                  fill="url(#birdBlueGradient)" 
                />

                {/* Soft Light-Blue Chest / Throat Patch */}
                <path 
                  d="M 36 50 C 30 64 32 80 44 92 C 40 80 38 65 44 54 Z" 
                  fill="url(#birdChestGradient)" 
                />

                {/* Articulated Wing: Shrugs / Flaps in Minecraft Beat */}
                <motion.g
                  animate={isPlaying ? {
                    rotate: [0, -18, 0, 14, 0],
                    scaleY: [1, 1.15, 0.95, 1.1, 1],
                  } : {
                    rotate: 0,
                    scaleY: 1,
                  }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '56px 60px' }}
                >
                  <path 
                    d="M 52 56 C 68 56 76 68 74 84 C 68 90 56 86 50 72 C 48 64 50 58 52 56 Z" 
                    fill="url(#wingBlueGradient)" 
                    stroke="#092E36" 
                    strokeWidth="1"
                  />
                  {/* Feather quill highlights */}
                  <path d="M 56 63 Q 66 72 68 81" stroke="#39B3C6" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M 52 68 Q 60 76 62 82" stroke="#39B3C6" strokeWidth="1" fill="none" opacity="0.6" />
                </motion.g>

                {/* Articulated Head & Beak: Minecraft Head Tilt (-16deg to +16deg) */}
                <motion.g
                  animate={isPlaying ? {
                    rotate: [-18, 0, 18, 0, -18],
                    y: [0, -3, 0, -2, 0],
                  } : {
                    rotate: 0,
                    y: 0,
                  }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '48px 45px' }}
                >
                  {/* Head Dome */}
                  <circle cx="46" cy="35" r="18" fill="url(#birdBlueGradient)" />

                  {/* Crest / Feather Crown Accent */}
                  <path d="M 52 20 Q 56 12 52 9 Q 47 16 48 20 Z" fill="#39B3C6" />
                  <path d="M 47 21 Q 48 14 44 11 Q 42 17 44 21 Z" fill="#1A96AA" />

                  {/* Beak (Points LEFT towards the vinyl recorder) */}
                  <path d="M 32 34 L 14 39 L 32 44 Z" fill="url(#goldBeakGradient)" stroke="#8C5F2E" strokeWidth="0.75" />

                  {/* Eye ring & Curious Pupil */}
                  <circle cx="38" cy="32" r="5" fill="#E5F3F5" />
                  <circle cx="37" cy="32" r="3" fill="#092E36" />
                  <circle cx="36" cy="31" r="1" fill="#FFFFFF" />

                  {/* Eye Mask Accent */}
                  <path d="M 33 33 Q 44 33 49 31" stroke="#092E36" strokeWidth="1.2" fill="none" />
                </motion.g>
              </svg>
            </motion.div>
          </div>

          <span className="text-[11px] font-medium text-[#4A5D5A] mt-1 flex items-center gap-1">
            <Feather className="w-3 h-3 text-[#137586]" />
            <span>Indigenous Songbird of Kodagu</span>
          </span>
        </div>

      </div>

      {/* Track Scrubber & Time Display */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-[#635546]">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[10px] font-sans font-bold text-[#137586] uppercase tracking-wider">
            {isPlaying ? '♪ Playing Sanctuary Dawn Audio' : 'Click Vinyl or Bird to Play'}
          </span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.5"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 rounded-lg bg-[#DFD3C0] accent-[#137586] cursor-pointer"
        />
      </div>

      {/* Bottom Controls Bar: Volume & Primary Action Button */}
      <div className="pt-2 border-t border-[#E8DFD1] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="text-[#132422] hover:text-[#137586] transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 sm:w-24 h-1 rounded-lg bg-[#DFD3C0] accent-[#137586] cursor-pointer"
          />
        </div>

        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
            isPlaying
              ? 'bg-[#0E4652] text-white hover:bg-[#092E36]'
              : 'bg-[#137586] text-white hover:bg-[#105B69]'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Play Sound'}</span>
        </button>
      </div>
    </div>
  );
};

export default VinylBirdsongPlayer;
