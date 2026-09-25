import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, BedDouble, Waves, Trees, Camera, Sparkles, ChevronRight } from 'lucide-react';
import { CinematicReveal } from '../common/CinematicReveal';

interface ResortPillarsDirectoryProps {
  onOpenEnquiry: () => void;
}

export const ResortPillarsDirectory: React.FC<ResortPillarsDirectoryProps> = ({ onOpenEnquiry }) => {
  const pillars = [
    {
      id: 'suites',
      title: '15 Private Guest Suites',
      category: 'Living Quarters & Stay',
      desc: 'Restful garden-facing suites with handcrafted timber roofs, vanity dressing nooks, and morning birdsong.',
      highlight: '15 Handcrafted Suites · ~45 Guests Total',
      image: '/images/rooms/room-interior-neutral.jpeg',
      path: '/rooms',
      ctaText: 'Discover Suites & Stay →',
      icon: BedDouble,
      badgeColor: 'bg-[#E5F3F5] text-[#137586] border-[#BCE2E7]',
    },
    {
      id: 'amenities',
      title: 'Palm Pool & Recreation',
      category: 'Water, Sports & Decks',
      desc: 'Circular shallow pool shaded by tall coconut palms, bamboo badminton lawn, and kids trampoline arena.',
      highlight: 'Daily 7:00 AM – 7:00 PM · Free Sports Equipment',
      image: '/images/amenities/swimming-pool.jpeg',
      path: '/amenities',
      ctaText: 'Discover Pool & Amenities →',
      icon: Waves,
      badgeColor: 'bg-[#EFE8DC] text-[#A3733E] border-[#DFD3C0]',
    },
    {
      id: 'events',
      title: '500-Guest Celebration Lawn',
      category: 'Weddings & Celebrations',
      desc: 'Expansive open-air manicured grounds along the Kaveri river basin for weddings, milestones, and retreats.',
      highlight: 'Capacity 500 Guests · Whole Resort Buyout Available',
      image: '/images/resort/garden-lawn.jpeg',
      path: '/events',
      ctaText: 'Discover Event Grounds & Buyouts →',
      icon: Trees,
      badgeColor: 'bg-[#E5F3F5] text-[#137586] border-[#BCE2E7]',
    },
    {
      id: 'gallery',
      title: 'Sanctuary Photo Gallery',
      category: 'Authentic Photography',
      desc: 'High-resolution authentic photos of our suites, covered verandahs, outdoor murals, and plantation grounds.',
      highlight: '100% Real Grounds · Zero Stock Photos',
      image: '/images/resort/garden-terrace.jpeg',
      path: '/gallery',
      ctaText: 'Discover Photo Gallery →',
      icon: Camera,
      badgeColor: 'bg-[#EFE8DC] text-[#A3733E] border-[#DFD3C0]',
    },
  ];

  return (
    <section id="pillars-directory" className="relative w-full py-10 sm:py-16 bg-[#FAF6EF] text-[#132422] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Section Header: Clear Mental Map */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4D9C8] pb-6">
          <CinematicReveal className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-3.5 py-1 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#A3733E]" />
              <span>What We Offer · Quick Guide</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight">
              Explore Coorg Laya at a Glance
            </h2>
            <p className="text-xs sm:text-sm text-[#314240] leading-relaxed">
              Find exactly what you want without getting lost in endless scrolling. Tap any section to view its full details and interactive tour.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.1} direction="left" className="shrink-0">
            <button
              onClick={onOpenEnquiry}
              className="px-5 py-2.5 rounded-full bg-[#14422F] hover:bg-[#1A543C] text-[#FAF6EF] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Instant Reservation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </CinematicReveal>
        </div>

        {/* 4 Pillars Grid (Auto-Fitting Bento: 1 col on mobile portrait, 2 cols on landscape/tablet, 4 cols on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <CinematicReveal key={pillar.id} delay={idx * 0.08} duration={0.6}>
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#E4D9C8] hover:border-[#137586] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between h-full">
                  {/* Image View (Image-Dominant 60%) */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E8DFD1]">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-[#D4AF37]" />
                      <span>{pillar.category}</span>
                    </div>

                    {/* Bottom Spec Badge */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#D4AF37] block">
                        {pillar.highlight}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold leading-snug drop-shadow-sm text-white">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body & Actions (Uncluttered, Equalized Action Row) */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-[#4A5D5A] leading-relaxed">
                      {pillar.desc}
                    </p>

                    <div className="pt-3 border-t border-[#EFE8DC] grid grid-cols-2 gap-2">
                      <Link
                        to={pillar.path}
                        className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-[#FAF6EF] hover:bg-[#137586] text-[#137586] hover:text-white border border-[#E0D7C8] text-[11px] sm:text-xs font-bold transition-all text-center whitespace-nowrap cursor-pointer shadow-2xs"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>

                      <button
                        onClick={onOpenEnquiry}
                        className="py-2 px-2.5 rounded-xl bg-[#14422F] hover:bg-[#1A543C] text-[#FAF6EF] text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer whitespace-nowrap text-center"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </CinematicReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResortPillarsDirectory;
