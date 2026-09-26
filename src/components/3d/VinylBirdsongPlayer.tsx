import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Disc, Sparkles, 
  Music, Music2, Music3
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

      {/* Centered Stage: Vinyl Turntable (Left) + Floating Notes + Hi-Res Pixel Bird (Right, Facing Left) */}
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

        {/* 2. FLOATING MUSIC NOTES (Bridging Vinyl to Dancing Pixel Bird) */}
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

        {/* 3. UPGRADED HIGH-RES ARTICULATED PIXEL BIRD (Facing LEFT towards the Vinyl Player) */}
        <div 
          onClick={togglePlay}
          className="relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-3xl bg-[#FAF6EF] border-2 border-[#DFD3C0] hover:border-[#137586] transition-all cursor-pointer group select-none shadow-sm hover:shadow-lg"
          title="Click to play music and watch each part of the bird dance!"
        >
          {/* Status Badge */}
          <div className="mb-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5F3F5] border border-[#BCE2E7] text-[10px] font-mono font-bold text-[#137586] shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#A3733E]" />
            <span>{isPlaying ? '♪ Dancing with Beat' : 'Click Bird to Play'}</span>
          </div>

          {/* Stepped Pixel Dance Stage (Feet Anchored — Independent Part Motions) */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center overflow-visible">
            
            {/* Pulsing Aura Ring when Dancing */}
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full bg-[#1A96AA]/20 blur-md pointer-events-none"
              />
            )}

            {/* HIGH-RES 64x64 PIXEL BIRD SVG (ANCHORED FEET, MULTI-PART ANIMATION) */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center drop-shadow-[0_8px_18px_rgba(19,117,134,0.25)]">
              <svg 
                viewBox="0 0 64 64" 
                className="w-full h-full"
                style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
              >
                {/* 1. PERCH BRANCH (Static on card) */}
                <g id="perchBranch">
                  {/* Branch Main Wood */}
                  <rect x="8" y="53" width="48" height="4" fill="#B5875B" />
                  <rect x="10" y="57" width="44" height="2" fill="#734B29" />
                  <rect x="12" y="52" width="40" height="1" fill="#D8C3AA" />
                  {/* Bark Knots & Rings */}
                  <rect x="16" y="54" width="3" height="2" fill="#8C5F2E" />
                  <rect x="42" y="54" width="4" height="2" fill="#8C5F2E" />
                  <rect x="44" y="55" width="2" height="1" fill="#5C3A1E" />
                </g>

                {/* 2. PIXEL FEET (ANCHORED — Gripping branch tightly) */}
                <g id="anchoredFeet">
                  {/* Left Foot */}
                  <rect x="23" y="49" width="3" height="4" fill="#C7A583" />
                  <rect x="22" y="52" width="5" height="2" fill="#A3733E" />
                  <rect x="21" y="53" width="2" height="2" fill="#734B29" />
                  <rect x="25" y="53" width="2" height="2" fill="#734B29" />

                  {/* Right Foot */}
                  <rect x="35" y="49" width="3" height="4" fill="#C7A583" />
                  <rect x="34" y="52" width="5" height="2" fill="#A3733E" />
                  <rect x="33" y="53" width="2" height="2" fill="#734B29" />
                  <rect x="37" y="53" width="2" height="2" fill="#734B29" />
                </g>

                {/* 3. ARTICULATED TAIL FEATHERS (Wags independently) */}
                <motion.g
                  id="articulatedTail"
                  animate={isPlaying ? {
                    rotate: [-14, 8, -14],
                  } : {
                    rotate: [0, 3, 0],
                  }}
                  transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '42px 45px' }}
                >
                  <rect x="41" y="38" width="4" height="4" fill="#06181F" />
                  <rect x="43" y="41" width="5" height="5" fill="#0B252E" />
                  <rect x="46" y="45" width="5" height="6" fill="#105B69" />
                  <rect x="49" y="49" width="4" height="6" fill="#137586" />
                  <rect x="52" y="53" width="3" height="4" fill="#1A96AA" />
                  <rect x="44" y="47" width="3" height="4" fill="#0E4652" />
                </motion.g>

                {/* 4. ARTICULATED TORSO / BODY (Breathing & rhythmic bounce anchored at feet) */}
                <motion.g
                  id="articulatedTorso"
                  animate={isPlaying ? {
                    scaleY: [1, 1.05, 0.98, 1.03, 1],
                    scaleX: [1, 0.98, 1.02, 0.99, 1],
                  } : {
                    scaleY: [1, 1.02, 1],
                  }}
                  transition={isPlaying ? {
                    duration: 0.65,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: '30px 49px' }}
                >
                  {/* Deep Shadow / Silhouette Outline */}
                  <rect x="18" y="29" width="23" height="20" rx="3" fill="#0B252E" />
                  
                  {/* Rich Midnight River Plumage Body */}
                  <rect x="19" y="28" width="21" height="21" fill="#105B69" />
                  <rect x="21" y="27" width="18" height="22" fill="#137586" />
                  <rect x="23" y="29" width="15" height="18" fill="#1A96AA" />

                  {/* Soft Light-Cyan Breast & Belly Patch (Facing Left) */}
                  <rect x="19" y="31" width="6" height="15" fill="#39B3C6" />
                  <rect x="20" y="33" width="6" height="13" fill="#77CDDA" />
                  <rect x="21" y="35" width="5" height="10" fill="#AEE2E8" />
                  <rect x="22" y="37" width="4" height="7" fill="#E5F3F5" />
                  <rect x="23" y="39" width="2" height="4" fill="#FFFFFF" />

                  {/* Back Rump Feather Shading */}
                  <rect x="36" y="32" width="4" height="12" fill="#0E4652" />
                  <rect x="38" y="34" width="3" height="8" fill="#092E36" />
                </motion.g>

                {/* 5. ARTICULATED WING (Flaps independently from shoulder pivot) */}
                <motion.g
                  id="articulatedWing"
                  animate={isPlaying ? {
                    rotate: [0, -28, 6, -20, 0],
                    scaleX: [1, 1.15, 0.95, 1.1, 1],
                    scaleY: [1, 1.1, 0.95, 1.05, 1],
                  } : {
                    rotate: 0,
                  }}
                  transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '34px 32px' }}
                >
                  {/* Wing Outline */}
                  <rect x="28" y="30" width="14" height="13" rx="2" fill="#06181F" />
                  {/* Shoulder Coverts */}
                  <rect x="29" y="31" width="11" height="10" fill="#0E4652" />
                  <rect x="31" y="32" width="8" height="8" fill="#137586" />
                  {/* Middle Wing Band */}
                  <rect x="32" y="34" width="7" height="6" fill="#1A96AA" />
                  {/* Primary Flight Feathers & Tips */}
                  <rect x="34" y="37" width="5" height="5" fill="#39B3C6" />
                  <rect x="36" y="39" width="4" height="4" fill="#77CDDA" />
                  <rect x="37" y="41" width="3" height="3" fill="#AEE2E8" />
                </motion.g>

                {/* 6. ARTICULATED HEAD, CREST & BEAK (Independent Neck Pivot & Minecraft Tilt) */}
                <motion.g
                  id="articulatedHead"
                  animate={isPlaying ? {
                    rotate: [-16, 0, 16, 0, -16],
                    y: [0, -3, 0, -2, 0],
                    x: [0, -1, 0, 1, 0],
                  } : {
                    rotate: [0, 2, -1, 0],
                    y: [0, -1, 0],
                  }}
                  transition={isPlaying ? {
                    duration: 0.65,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: '28px 26px' }}
                >
                  {/* Feather Crown / Crest (Top of Head - Secondary Delayed Spring Bounce) */}
                  <motion.g
                    id="crownCrest"
                    animate={isPlaying ? {
                      rotate: [0, -20, 0, 16, 0],
                    } : {
                      rotate: 0,
                    }}
                    transition={{ duration: 0.65, delay: 0.08, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '32px 14px' }}
                  >
                    <rect x="30" y="8" width="3" height="6" fill="#1A96AA" />
                    <rect x="32" y="5" width="3" height="8" fill="#39B3C6" />
                    <rect x="34" y="7" width="3" height="6" fill="#77CDDA" />
                    <rect x="33" y="4" width="2" height="3" fill="#AEE2E8" />
                  </motion.g>

                  {/* Main Head Skull */}
                  <rect x="19" y="14" width="16" height="14" rx="2" fill="#0B252E" />
                  <rect x="20" y="13" width="14" height="14" fill="#105B69" />
                  <rect x="21" y="13" width="12" height="13" fill="#137586" />
                  <rect x="23" y="12" width="9" height="12" fill="#1A96AA" />
                  <rect x="25" y="13" width="6" height="4" fill="#39B3C6" />

                  {/* Throat Chin Shading */}
                  <rect x="20" y="24" width="7" height="3" fill="#39B3C6" />
                  <rect x="22" y="25" width="4" height="2" fill="#77CDDA" />

                  {/* Eye Mask Accent */}
                  <rect x="19" y="17" width="11" height="5" fill="#092E36" />
                  
                  {/* Expressive Pixel Eye */}
                  <rect x="22" y="17" width="5" height="5" fill="#FFFFFF" />
                  <rect x="23" y="17" width="3" height="4" fill="#06181F" />
                  <rect x="23" y="17" width="1.5" height="1.5" fill="#FFFFFF" />
                  <rect x="24" y="19" width="1.5" height="1.5" fill="#137586" />

                  {/* SLENDER HIGH-RES BEAK (Extending LEFT towards Vinyl Turntable) */}
                  {/* Upper Beak */}
                  <rect x="14" y="19" width="7" height="3" fill="#C7A583" />
                  <rect x="9" y="20" width="7" height="2" fill="#E2BA84" />
                  <rect x="4" y="21" width="6" height="1.5" fill="#F3D5A5" />
                  <rect x="14" y="21" width="7" height="1" fill="#A3733E" />
                  <rect x="8" y="21.5" width="7" height="0.8" fill="#8C5F2E" />

                  {/* Lower Beak (Chirping micro-motion on beats) */}
                  <motion.g
                    id="lowerBeak"
                    animate={isPlaying ? {
                      y: [0, 1.5, 0, 1.2, 0],
                    } : {
                      y: 0,
                    }}
                    transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <rect x="14" y="22.5" width="6" height="1.8" fill="#C7A583" />
                    <rect x="10" y="22.8" width="5" height="1.2" fill="#E2BA84" />
                    <rect x="6" y="22.8" width="5" height="0.8" fill="#A3733E" />
                  </motion.g>
                </motion.g>
              </svg>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-center">
            <span className="text-[11px] font-mono font-bold text-[#137586] tracking-wide">
              Kodagu Kingfisher
            </span>
            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#FAF0E1] text-[#A3733E] border border-[#E8DFD1]">
              16-BIT HD
            </span>
          </div>
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
