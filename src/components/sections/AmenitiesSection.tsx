import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Sparkles, Activity, Smile, Sun, ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { FluidWaterCard } from '../3d/FluidWaterCard';
import { CinematicReveal } from '../common/CinematicReveal';
import { Clay3DCard } from '../3d/Clay3DCard';

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="relative w-full py-12 sm:py-16 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-8">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#137586] shadow-sm">
              <Waves className="w-4 h-4 text-[#137586]" />
              <span>Resort Amenities · Kushalnagar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
              Spaces for swimming, outdoor games, and family time.
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.15} direction="left">
            <p className="text-xs sm:text-sm text-[#314240] max-w-xs font-normal leading-relaxed prose-pretty">
              Explore our palm-lined swimming pool, grass badminton court, kids trampoline, and garden terraces.
            </p>
          </CinematicReveal>
        </div>

        {/* Asynchronous Editorial Magazine Bento Layout */}
        <div className="space-y-8">
          
          {/* Item 01: Full-Width Panoramic Palm Pool Spotlight */}
          <CinematicReveal duration={0.8} spring>
            <div className="relative rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 sm:p-6 shadow-[0_20px_45px_rgba(22,41,38,0.08)] hover:shadow-[0_28px_55px_rgba(19,117,134,0.18)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Pool Liquid Water Interactive Canvas (7 Cols) */}
              <div className="lg:col-span-7">
                <FluidWaterCard
                  imageSrc="/images/amenities/swimming-pool.jpeg"
                  title="Palm-Fringed Swimming Pool"
                  subtitle="Daily 7:00 AM – 7:00 PM"
                  badge="01 · Living Water Simulation"
                  description="Crystal-clear pool with a dedicated circular shallow relaxation section, flanked by towering tropical coconut palms, timber loungers, and lush estate greenery."
                />
              </div>

              {/* Editorial Side Narrative (5 Cols) */}
              <div className="lg:col-span-5 p-4 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-[#A3733E]/40">
                    № 01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#E5F3F5] text-[#137586] text-xs font-semibold tracking-wider uppercase border border-[#BCE2E7]">
                    Water & Sun
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#131E1C] leading-snug heading-balance">
                  Swim under open Kodagu skies in our palm-lined pool.
                </h3>

                <p className="text-xs sm:text-sm text-[#314240] font-normal leading-relaxed prose-pretty">
                  Hover or glide your cursor across the pool surface on the left to experience our real-time fluid wave caustics and solar light refraction.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#E4D9C8]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#132422]">
                    <CheckCircle2 className="w-4 h-4 text-[#1A96AA]" />
                    <span>Dedicated circular shallow kids & lounge pool</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#132422]">
                    <CheckCircle2 className="w-4 h-4 text-[#1A96AA]" />
                    <span>Solar hot showers adjoining pool deck</span>
                  </div>
                </div>
              </div>

            </div>
          </CinematicReveal>

          {/* Mid Tier: Kids Trampoline (Featured) + Extra Amenities & Estate Features Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Item 02: Kids Trampoline & Play Arena (5 Cols on Desktop) */}
            <div className="lg:col-span-5 flex flex-col">
              <CinematicReveal delay={0.1} duration={0.8} spring className="h-full flex flex-col">
                <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-[#A3733E]/40">
                        № 02
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#EFE8DC] text-[#A3733E] text-xs font-bold border border-[#DFD3C0]">
                        Family & Kids Fun
                      </span>
                    </div>

                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1] shadow-sm">
                      <ClayImage
                        src="/images/amenities/kids-play-trampoline.png"
                        alt="Kids Play Area & Trampoline at Coorg Laya"
                        aspectRatio="4:3"
                        clayVariant="sand"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#635546] mb-1">
                        <Smile className="w-3.5 h-3.5 text-[#A3733E]" />
                        <span>Afternoon to Sunset · Open Play</span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-[#132422] group-hover:text-[#116B7B] transition-colors">
                        Kids Jumping Trampoline & Play Arena
                      </h4>
                      <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed mt-1">
                        Heavy-duty steel-sprung circular trampoline with full-height safety netting, safely situated on soft manicured lawn grass for toddlers and children.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#116B7B]">
                    <span>Enclosed 360° Safety Enclosure</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                  </div>
                </div>
              </CinematicReveal>
            </div>

            {/* Extra Amenities & Estate Inclusions Directory (7 Cols on Desktop) */}
            <div className="lg:col-span-7 flex flex-col">
              <CinematicReveal delay={0.2} duration={0.8} spring className="h-full flex flex-col">
                <div className="rounded-3xl bg-white border border-[#E4D9C8] p-5 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-2xl font-extrabold text-[#137586]/40">
                            № 03
                          </span>
                          <span className="px-3 py-0.5 rounded-full bg-[#E5F3F5] text-[#137586] text-xs font-bold border border-[#BCE2E7]">
                            Inclusive Access
                          </span>
                        </div>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#132422] mt-1">
                          Extra Amenities & Estate Inclusions
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#8B7355] hidden sm:block">
                        Complimentary for All In-House Guests
                      </span>
                    </div>

                    {/* Amenities List Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                      <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#132422] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#137586]" />
                            Grass Badminton Court
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#137586] border border-[#D0E7EB]">
                            Gear Free
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#526462] leading-relaxed">
                          Open-air lawn badminton court naturally sheltered by tall bamboo trees. Racquets and shuttles provided at reception.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#132422] flex items-center gap-2">
                            <Sun className="w-4 h-4 text-[#A3733E]" />
                            Lawn Volleyball Grounds
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#A3733E] border border-[#DFD3C0]">
                            Team Play
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#526462] leading-relaxed">
                          Expansive manicured lawn area set up for spirited afternoon volleyball matches and team games.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#132422] flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#137586]" />
                            Raised Garden Terraces
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#137586] border border-[#D0E7EB]">
                            All Day
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#526462] leading-relaxed">
                          Elevated wooden deck seating overlooking the plantation canopies for hot Coorg coffee, evening tea, and reading.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#132422] flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#A3733E]" />
                            Evening Bonfire & Stargazing
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#A3733E] border border-[#DFD3C0]">
                            On Request
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#526462] leading-relaxed">
                          Gather around a crackling wood fire under clear night skies, accompanied by crisp Kodagu estate breezes.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#132422] flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#137586]" />
                            High-Speed Estate Wi-Fi
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#137586] border border-[#D0E7EB]">
                            Connected
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#526462] leading-relaxed">
                          Reliable wireless internet access across all guest suites, dining patio, and common garden decks for remote work.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD1] hover:border-[#137586] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#132422] flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#14422F]" />
                            24/7 Power & Secure Parking
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#14422F] border border-[#C5DACF]">
                            Full Security
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#526462] leading-relaxed">
                          Generator backup for round-the-clock uninterrupted power, continuous hot water, and gated parking with driver rest facilities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EFE8DC] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B5E50]">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#14422F]" />
                      <span>All sports equipment & board games available on request at reception</span>
                    </div>
                  </div>
                </div>
              </CinematicReveal>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default AmenitiesSection;

