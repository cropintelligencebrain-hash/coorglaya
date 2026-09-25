import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Coffee, Sparkles, Sun, CheckCircle2 } from 'lucide-react';
import { VinylBirdsongPlayer } from '../3d/VinylBirdsongPlayer';
import { CinematicReveal } from '../common/CinematicReveal';

export const BirdsongNatureSection: React.FC = () => {
  const localBirds = [
    {
      name: 'Malabar Whistling Thrush',
      title: 'Whistling Schoolboy',
      callTime: 'Dawn Twilight',
      description: 'Famous for its human-like melodic whistling echoing through the morning mist.',
      color: 'border-[#BCE2E7] bg-[#E5F3F5] text-[#137586]',
    },
    {
      name: 'Red-whiskered Bulbul',
      title: 'Estate Garden Songbird',
      callTime: 'Early Morning',
      description: 'Lively, cheerful morning calls fluttering amongst flowering coffee canopies.',
      color: 'border-[#DFD3C0] bg-[#EFE8DC] text-[#A3733E]',
    },
    {
      name: 'Oriental White-eye',
      title: 'Canopy Nectar Feeder',
      callTime: 'Mid-Morning',
      description: 'Tiny golden-green songbirds moving in friendly flocks through bamboo groves.',
      color: 'border-[#BCE2E7] bg-[#E5F3F5] text-[#137586]',
    },
    {
      name: 'White-throated Kingfisher',
      title: 'Kaveri Basin Resident',
      callTime: 'Waterside',
      description: 'Striking turquoise plumage spotted around the estate ponds and Kaveri riverbank.',
      color: 'border-[#C5DACF] bg-[#EAF2ED] text-[#14422F]',
    },
  ];

  return (
    <section id="morning-sensory" className="relative w-full py-10 sm:py-16 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none border-b border-[#E4D9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Lead Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DFD3C0] pb-5 sm:pb-6">
          <CinematicReveal className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-3.5 py-1 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-xs">
              <Sun className="w-3.5 h-3.5 text-[#A3733E]" />
              <span>Morning Ritual · Kushalnagar</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight">
              Fresh Plantation Brew & Dawn Birdsong
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.15} direction="left" className="max-w-md">
            <p className="text-xs sm:text-sm text-[#4A5D5A] leading-relaxed">
              Every morning in Kodagu begins with cool mist rising off the Kaveri river basin, freshly roasted estate coffee, and nature's living dawn chorus.
            </p>
          </CinematicReveal>
        </div>

        {/* 2-Column Split: Clean Turntable (5 Cols) & Morning Ritual + Birds (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Compact Luxury Turntable (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <CinematicReveal delay={0.1} duration={0.8} spring className="h-full flex flex-col justify-between">
              <VinylBirdsongPlayer />
            </CinematicReveal>
          </div>

          {/* Right Column: Verandah Coffee & Birds of Kodagu (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            
            {/* Morning Coffee & Tea Narrative Card */}
            <CinematicReveal delay={0.15} duration={0.8}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-[#A3733E] flex items-center justify-center shadow-2xs">
                    <Coffee className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A3733E] block">
                      Kodagu Morning Tradition
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#131E1C]">
                      The Verandah Coffee & Tea Ritual
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5D5A] leading-relaxed mb-3.5">
                  Step onto your private verandah as dawn breaks over the tall silver oak trees. Savor a cup of steaming, freshly ground Kodagu Arabica coffee or organic spiced plantation tea, served in complete peace before the rest of the world wakes up.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#EFE8DC]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14422F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#14422F] shrink-0" />
                    <span>Single-Estate Filter Coffee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14422F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#14422F] shrink-0" />
                    <span>Fresh Garden Spiced Tea</span>
                  </div>
                </div>
              </div>
            </CinematicReveal>

            {/* Local Birds Guide Grid */}
            <CinematicReveal delay={0.25} duration={0.8} className="flex-1 flex flex-col justify-between">
              <div className="rounded-3xl bg-white border border-[#E4D9C8] p-5 sm:p-6 shadow-sm space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-2.5">
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#137586]" />
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#131E1C]">
                      Indigenous Bird Species of Coorg Laya
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#8B7355] hidden sm:block">
                    Live Sanctuary Audio
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {localBirds.map((bird, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAF6EF] border border-[#E0D7C8] hover:border-[#137586] transition-colors shadow-2xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-[#0F1C1A]">{bird.name}</h5>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${bird.color}`}>
                          {bird.callTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#223633] font-medium leading-relaxed">
                        {bird.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center border-t border-[#EFE8DC]">
                  <p className="text-[11px] text-[#3D3023] font-medium italic flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A3733E]" />
                    <span>Recorded live on location under our estate's bamboo canopy</span>
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
