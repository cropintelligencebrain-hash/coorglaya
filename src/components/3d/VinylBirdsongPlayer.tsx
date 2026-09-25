import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles } from 'lucide-react';

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
            <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3.6s' }} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A3733E] block">
              Sanctuary Turntable
            </span>
            <span className="text-xs font-serif font-bold text-[#132422]">
              Living Dawn Recording
            </span>
          </div>
        </div>

        {/* Live Audio Waves Visualizer Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DC] border border-[#DFD3C0]">
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
                  isPlaying ? 'bg-[#137586]' : 'bg-[#C2B5A0]'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold text-[#137586] uppercase">
            {isPlaying ? 'Live Audio' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Centered Compact Turntable Deck */}
      <div className="relative flex items-center justify-center py-2 overflow-visible">
        {/* Radiating Soundwave Ripples when Playing */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            <motion.div
              animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              className="w-56 h-56 rounded-full border border-[#137586]/30 absolute pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.55], opacity: [0.3, 0] }}
              transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
              className="w-56 h-56 rounded-full border border-[#D4AF37]/30 absolute pointer-events-none"
            />
          </div>
        )}

        {/* Square Plinth Base with Inset Bevel */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#EFE8DC] border-2 border-[#DFD3C0] p-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),_0_12px_28px_rgba(0,0,0,0.12)] flex items-center justify-center shrink-0">
          
          {/* Spinning Vinyl Record */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              rotate: {
                duration: 2.6,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              },
            }}
            className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={togglePlay}
            style={{
              background: `radial-gradient(circle, #223B36 0%, #162926 28%, #0C1715 55%, #162926 80%, #223B36 100%)`,
            }}
          >
            {/* Rotating Anisotropic Specular Light Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{
                background: `conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,0.2) 0deg, transparent 55deg, rgba(255,255,255,0.2) 180deg, transparent 235deg, rgba(255,255,255,0.2) 360deg)`,
              }}
            />

            {/* Vinyl Grooves Texture */}
            <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-9 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-13 rounded-full border border-white/5 pointer-events-none" />

            {/* Gold Foil Center Label */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#8C5F2E] via-[#E2BA84] to-[#A3733E] shadow-md border border-white/40 flex flex-col items-center justify-center text-center p-1.5 z-10">
              <span className="text-[6.5px] sm:text-[7px] font-extrabold text-[#132422] uppercase tracking-tighter leading-tight">
                COORG LAYA
              </span>
              <span className="text-[5.5px] font-mono font-bold text-[#132422]/80 mt-0.5">
                DAWN CHORUS
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#132422] mt-0.5 border border-white/50" />
            </div>
          </motion.div>

          {/* Mechanical Tonearm */}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 pointer-events-none">
            {/* Pivot Base */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#E5E7EB] via-[#D1D5DB] to-[#9CA3AF] border border-[#9CA3AF] shadow-[0_3px_8px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#1F2937] border border-[#6B7280] shadow-inner" />
              
              {/* Arm Wand */}
              <motion.div
                animate={{
                  rotate: isPlaying ? 26 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="absolute top-3.5 left-3.5 origin-top-left"
              >
                {/* Metallic Tonearm Stem */}
                <div className="relative w-1.5 h-[95px] sm:h-[110px] rounded-full shadow-[2px_3px_8px_rgba(0,0,0,0.25)] bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF] border border-[#9CA3AF]/60" />
                
                {/* Cartridge Headshell & Stylus Needle */}
                <motion.div
                  animate={{
                    scale: needleOnRecord ? 0.96 : 1,
                    y: needleOnRecord ? 2 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-2 -left-1.5 w-4 h-6 rounded bg-[#18181B] border border-[#D4AF37] shadow-sm flex flex-col items-center justify-between p-0.5"
                >
                  <div className="w-1.5 h-1 bg-[#D4AF37] rounded-full" />
                  <div className="w-1 h-1 rounded-full bg-[#EF4444]" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Center Play/Pause Floating Action Button */}
          <button
            onClick={togglePlay}
            className="absolute z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#137586] hover:bg-[#105B69] text-white shadow-[0_6px_18px_rgba(19,117,134,0.4)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause Birdsong' : 'Play Birdsong'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Track Scrubber & Time Display */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-[#635546]">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[10px] font-sans font-bold text-[#137586] uppercase tracking-wider">
            {isPlaying ? 'Playing Dawn Sounds' : 'Tap Vinyl to Play'}
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
              ? 'bg-[#132422] text-white hover:bg-black'
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
