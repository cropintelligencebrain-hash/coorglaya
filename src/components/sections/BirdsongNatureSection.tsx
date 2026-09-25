import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Coffee, Sparkles, Sun, CheckCircle2 } from 'lucide-react';
import { VinylBirdsongPlayer } from '../3d/VinylBirdsongPlayer';
import { CinematicReveal } from '../common/CinematicReveal';

export const BirdsongNatureSection: React.FC = () => {
  const localBirds = [
    {
      name: 'Malabar Whistling Thrush',
      kannadaTitle: 'Whistling Schoolboy of Western Ghats',
      callTime: 'Dawn & Early Twilight',
      description: 'Famous for its human-like melodic whistling echoing through the mist before sunrise.',
      color: 'border-[#BCE2E7] bg-[#E5F3F5] text-[#137586]',
    },
    {
      name: 'Red-whiskered Bulbul',
      kannadaTitle: 'Estate Garden Songbird',
      callTime: 'Active All Morning',
      description: 'Lively, inquisitive birds perching on flowering coffee branches and bamboo canopies.',
      color: 'border-[#DFD3C0] bg-[#EFE8DC] text-[#A3733E]',
    },
    {
      name: 'Oriental White-eye',
      kannadaTitle: 'Canopy Nectar Feeder',
      callTime: 'Mid-Morning Sunlight',
      description: 'Tiny golden-green songbirds with distinctive white eye-rings fluttering in friendly flocks.',
      color: 'border-[#BCE2E7] bg-[#E5F3F5] text-[#137586]',
    },
    {
      name: 'White-throated Kingfisher',
      kannadaTitle: 'Kaveri Basin Resident',
      callTime: 'Morning Waterside',
      description: 'Striking electric-turquoise plumage spotted around our water garden and nearby Kaveri river.',
      color: 'border-[#C5DACF] bg-[#EAF2ED] text-[#14422F]',
    },
  ];

  return (
    <section id="morning-sensory" className="relative w-full py-12 sm:py-20 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none border-b border-[#E4D9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Section Lead Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DFD3C0] pb-6 sm:pb-8">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
              <Sun className="w-4 h-4 text-[#A3733E]" />
              <span>Sensory Morning Experience · Kushalnagar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
              Fresh Plantation Brew & Dawn Birdsong
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.15} direction="left" className="max-w-md">
            <p className="text-xs sm:text-sm text-[#314240] leading-relaxed prose-pretty">
              Every morning in Kodagu begins with cool mist rising off the Kaveri river basin, the rich aroma of freshly roasted estate coffee, and nature's living chorus.
            </p>
          </CinematicReveal>
        </div>

        {/* 2-Column Split: Vinyl Turntable (Left) & Morning Ritual + Birds of Kodagu (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Interactive Vinyl Turntable Player (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <CinematicReveal delay={0.1} duration={0.8} spring>
              <div className="space-y-3">
                <VinylBirdsongPlayer />
                <p className="text-center text-[11px] sm:text-xs text-[#6B5E50] font-medium flex items-center justify-center gap-1.5 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#A3733E]" />
                  <span>Tap the vinyl record or play button to hear live dawn birds recorded on our grounds</span>
                </p>
              </div>
            </CinematicReveal>
          </div>

          {/* Right Column: Morning Coffee/Tea Experience + Local Bird Species Guide (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Morning Coffee & Tea Narrative Card */}
            <CinematicReveal delay={0.2} duration={0.8}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-[#A3733E] flex items-center justify-center shadow-xs">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A3733E] block">
                      Kodagu Morning Tradition
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#131E1C]">
                      The Verandah Coffee & Tea Ritual
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5D5A] leading-relaxed mb-4">
                  Step onto your private verandah as dawn breaks over the tall silver oak trees. Savor a cup of steaming, freshly ground Kodagu Arabica coffee or organic spiced plantation tea, prepared fresh and served in pure tranquility before the rest of the world wakes up.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#EFE8DC]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14422F]">
                    <CheckCircle2 className="w-4 h-4 text-[#14422F] shrink-0" />
                    <span>Single-Estate Filter Coffee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14422F]">
                    <CheckCircle2 className="w-4 h-4 text-[#14422F] shrink-0" />
                    <span>Fresh Garden Spiced Tea</span>
                  </div>
                </div>
              </div>
            </CinematicReveal>

            {/* Local Birds Guide Grid */}
            <CinematicReveal delay={0.3} duration={0.8}>
              <div className="rounded-3xl bg-white border border-[#E4D9C8] p-5 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#137586]" />
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#131E1C]">
                      Indigenous Bird Species of Coorg Laya
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#8B7355] hidden sm:block">
                    Kushalnagar Canopy
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {localBirds.map((bird, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-[#132422]">{bird.name}</h5>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${bird.color}`}>
                          {bird.callTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#556966] leading-relaxed">
                        {bird.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#786D5F] italic">
                    All species recorded live on location under our estate’s bamboo and riverine trees.
                  </p>
                </div>
              </div>
            </CinematicReveal>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BirdsongNatureSection;
