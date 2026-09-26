import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Disc, Music, Music2, Music3, Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { KingfisherDancer } from './KingfisherDancer';

export const VinylBirdsongPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setCurrentTime(0);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onMetadata);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.warn('Birdsong playback could not start:', error);
      }
    } else {
      audio.pause();
    }
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };

  return (
    <div className="flex w-full flex-col justify-between space-y-5 rounded-3xl border border-[#E4D9C8] bg-[#FAF6EF] p-5 shadow-md sm:p-6">
      <audio ref={audioRef} src="/audio/BirdsAudio.mpeg" preload="metadata" />

      <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#BCE2E7] bg-[#E5F3F5] text-[#137586]">
            <Disc className={`h-4 w-4 ${isPlaying && !reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '3.2s' }} aria-hidden="true" />
          </div>
          <div><span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#A3733E]">Sanctuary Turntable</span><span className="font-serif text-xs font-bold text-[#132422]">Living Dawn Recording & Birdsong</span></div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-3 py-1">
          <div className="flex h-3 items-end gap-0.5" aria-hidden="true">{[10, 14, 8, 12, 14, 9].map((height, index) => <motion.span key={index} className={`w-0.5 rounded-full ${isPlaying ? 'bg-[#137586]' : 'bg-[#A2C9CF]'}`} animate={{ height: isPlaying && !reducedMotion ? [3, height, 4, height * 0.7, 3] : 3 }} transition={{ duration: 0.5 + (index % 3) * 0.15, repeat: isPlaying && !reducedMotion ? Infinity : 0 }} />)}</div>
          <span className="font-mono text-[10px] font-bold uppercase text-[#137586]" aria-live="polite">{isPlaying ? 'Live Audio' : 'Paused'}</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-around gap-4 overflow-visible py-2 sm:flex-row sm:gap-6">
        {isPlaying && !reducedMotion && <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex" aria-hidden="true"><motion.div className="absolute h-56 w-56 rounded-full border border-[#137586]/35" animate={{ scale: [1, 1.42], opacity: [0.38, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} /><motion.div className="absolute h-56 w-56 rounded-full border border-[#1A96AA]/30" animate={{ scale: [1, 1.62], opacity: [0.24, 0] }} transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeOut' }} /></div>}

        <div className="relative flex h-56 w-56 shrink-0 items-center justify-center rounded-3xl border-2 border-[#DFD3C0] bg-[#EFE8DC] p-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),_0_12px_28px_rgba(19,117,134,0.12)] sm:h-60 sm:w-60">
          <button type="button" onClick={togglePlay} className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full shadow-[0_8px_24px_rgba(9,46,54,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137586] sm:h-52 sm:w-52" aria-label={isPlaying ? 'Pause birdsong' : 'Play birdsong'}>
            <motion.span className="absolute inset-0" animate={{ rotate: isPlaying && !reducedMotion ? 360 : 0 }} transition={{ duration: 2.8, repeat: isPlaying && !reducedMotion ? Infinity : 0, ease: 'linear' }} style={{ background: 'radial-gradient(circle, #0D2630 0%, #081B22 30%, #030E12 55%, #081B22 80%, #0D2630 100%)' }} />
            <span className="pointer-events-none absolute inset-2 rounded-full border border-cyan-100/10" /><span className="pointer-events-none absolute inset-8 rounded-full border border-cyan-100/10" /><span className="pointer-events-none absolute inset-12 rounded-full border border-white/5" />
            <span className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-[#E2BA84]/80 bg-gradient-to-tr from-[#0E4652] via-[#1A96AA] to-[#137586] p-1.5 text-center shadow-md"><span className="text-[6.5px] font-extrabold leading-tight tracking-tighter text-white">COORG LAYA</span><span className="mt-0.5 font-mono text-[5.5px] font-bold text-[#E2BA84]">DAWN CHORUS</span><span className="mt-0.5 h-2.5 w-2.5 rounded-full border border-white/60 bg-[#030E12]" /></span>
          </button>
          <motion.div className="pointer-events-none absolute right-2 top-2 z-20 origin-top-left sm:right-2.5 sm:top-2.5" animate={{ rotate: isPlaying ? 26 : 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}><span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#9CA3AF] bg-gradient-to-br from-[#E5E7EB] to-[#9CA3AF] shadow-md"><span className="h-3.5 w-3.5 rounded-full border border-[#137586] bg-[#092E36]" /></span><span className="absolute left-3 top-3 h-[98px] w-1.5 rounded-full border border-[#9CA3AF]/60 bg-gradient-to-r from-[#F3F4F6] to-[#9CA3AF]" /></motion.div>
          <button type="button" onClick={togglePlay} className="absolute z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#137586] text-white shadow-[0_6px_18px_rgba(19,117,134,0.45)] transition hover:scale-105 hover:bg-[#105B69] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137586]" aria-label={isPlaying ? 'Pause birdsong' : 'Play birdsong'}>{isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />}</button>
        </div>

        <div className="relative hidden h-44 w-12 items-center justify-center sm:flex" aria-hidden="true"><AnimatePresence>{isPlaying && !reducedMotion && <>{[Music, Music2, Music3].map((Note, index) => <motion.div key={index} className={`absolute ${index === 2 ? 'text-[#A3733E]' : 'text-[#137586]'}`} initial={{ opacity: 0, x: -12, y: 18 }} animate={{ opacity: [0, 1, 1, 0], x: [-10, 10 + index * 5, 24 + index * 4], y: [10, -22, -48 - index * 9] }} exit={{ opacity: 0 }} transition={{ duration: 2.1 + index * 0.2, delay: index * 0.55, repeat: Infinity }}><Note className={index === 0 ? 'h-5 w-5' : 'h-4 w-4'} /></motion.div>)}</>}</AnimatePresence></div>

        <button type="button" onClick={togglePlay} aria-label={isPlaying ? 'Pause birdsong and stop the White-throated Kingfisher dance' : 'Play birdsong and start the White-throated Kingfisher dance'} className="group flex min-h-44 flex-col items-center justify-center rounded-3xl border-2 border-[#DFD3C0] bg-[#FAF6EF] p-4 shadow-sm transition hover:border-[#137586] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137586] sm:p-5">
          <span className="mb-2 flex items-center gap-1.5 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-3 py-1 text-[10px] font-bold text-[#137586]"><Sparkles className="h-3.5 w-3.5 text-[#A3733E]" aria-hidden="true" />{isPlaying ? 'Dancing to the Dawn Chorus' : 'Click bird to play'}</span><KingfisherDancer isPlaying={isPlaying} /><span className="mt-1 flex items-center gap-1.5"><span className="font-serif text-xs font-bold text-[#132422]">White-throated Kingfisher</span><span className="rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-2.5 py-0.5 text-[10px] font-bold text-[#137586]">Kodagu resident</span></span>
        </button>
      </div>

      <div className="space-y-1.5 pt-1"><div className="flex items-center justify-between font-mono text-[11px] font-semibold text-[#635546]"><span>{formatTime(currentTime)}</span><span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#137586]">{isPlaying ? 'Playing sanctuary dawn audio' : 'Click vinyl or bird to play'}</span><span>{formatTime(duration)}</span></div><input type="range" min="0" max={duration || 100} step="0.5" value={currentTime} onChange={(event) => { const time = Number(event.target.value); setCurrentTime(time); if (audioRef.current) audioRef.current.currentTime = time; }} className="h-1.5 w-full cursor-pointer rounded-lg bg-[#DFD3C0] accent-[#137586]" aria-label="Birdsong playback position" /></div>
      <div className="flex items-center justify-between gap-3 border-t border-[#E8DFD1] pt-2"><div className="flex items-center gap-2"><button type="button" onClick={() => setIsMuted((muted) => !muted)} className="flex h-11 w-11 items-center justify-center rounded-lg text-[#132422] transition hover:bg-[#E5F3F5] hover:text-[#137586] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#137586]" aria-label={isMuted ? 'Unmute birdsong' : 'Mute birdsong'}>{isMuted ? <VolumeX className="h-4 w-4 text-red-500" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}</button><input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={(event) => { setVolume(Number(event.target.value)); setIsMuted(false); }} className="h-1 w-20 cursor-pointer rounded-lg bg-[#DFD3C0] accent-[#137586] sm:w-24" aria-label="Birdsong volume" /></div><button type="button" onClick={togglePlay} className={`flex min-h-11 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137586] ${isPlaying ? 'bg-[#0E4652] hover:bg-[#092E36]' : 'bg-[#137586] hover:bg-[#105B69]'}`}>{isPlaying ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}{isPlaying ? 'Pause' : 'Play sound'}</button></div>
    </div>
  );
};

export default VinylBirdsongPlayer;
