import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Sparkles, Cake, Briefcase, HeartHandshake, 
  Wine, Trees, ChevronRight, ArrowUpRight, Camera
} from 'lucide-react';
import { CinematicReveal } from '../common/CinematicReveal';

interface EventsSectionProps {
  onOpenEnquiry: () => void;
}

interface EventCategoryItem {
  id: string;
  name: string;
  badge: string;
  capacity: string;
  description: string;
  photos: Array<{
    src: string;
    caption: string;
    tag: string;
  }>;
  highlights: string[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenEnquiry }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('weddings');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const eventCategories: EventCategoryItem[] = [
    {
      id: 'weddings',
      name: 'Weddings & Celebrations',
      badge: 'Up to 500 Guests',
      capacity: '500-Guest Outdoor Lawn Capacity',
      description: 'Expansive manicured open lawn framed by tropical coconut palms and bamboo canopies. Set up magnificent mandaps, open-air banquets, and starlit evening receptions with full 15-suite private buyout accommodation.',
      photos: [
        {
          src: '/images/EventIMG1.jpeg',
          caption: '500-Guest Celebration Lawn Stage Setup',
          tag: 'Real Lawn Photo',
        },
        {
          src: '/images/EventIMG2.jpeg',
          caption: 'Evening Ambient Tree Lighting & Gathering',
          tag: 'Evening Atmosphere',
        },
        {
          src: '/images/EventIMG3.jpeg',
          caption: 'Lawn Seating & Reception Arrangement',
          tag: 'Open-Air Seating',
        },
      ],
      highlights: [
        'Dedicated Mandap & banquet zones',
        'Bridal preparation vanity suites',
        'DG generator sound & lighting backup',
        'Spacious catering preparation bay',
      ],
    },
    {
      id: 'birthdays',
      name: 'Birthday Celebrations & Milestones',
      badge: 'Intimate to Grand',
      capacity: '50 – 250 Guests',
      description: 'Celebrate special milestone birthdays and anniversaries amidst refreshing mountain air. Raised wooden garden decks provide the perfect stage for cake cuttings, live music, and evening barbecue dinners.',
      photos: [
        {
          src: '/images/EventIMG4.jpeg',
          caption: 'Milestone Celebration & Party Grounds',
          tag: 'Celebration Lawn',
        },
        {
          src: '/images/EventIMG5.jpeg',
          caption: 'Buffet Bay & Event Dining Canopy',
          tag: 'Catering Bay',
        },
        {
          src: '/images/EventIMG6.jpeg',
          caption: 'Celebration Grounds Panoramic Perspective',
          tag: 'Resort Grounds',
        },
      ],
      highlights: [
        'Customized elevated cake-cutting deck',
        'Live barbecue & open-air buffet allowance',
        'Enclosed kids trampoline zone',
        'Acoustic sound & music setup permitted',
      ],
    },
    {
      id: 'family',
      name: 'Family Functions & Reunions',
      badge: 'Private & Relaxed',
      capacity: '30 – 200 Guests',
      description: 'Host memorable multi-generation family gatherings where grandparents, parents, and children unwind together. Covered verandahs, peaceful garden walks, and sports courts keep all age groups delighted.',
      photos: [
        {
          src: '/images/EventIMG3.jpeg',
          caption: 'Open Lawn Setup for Family Functions',
          tag: 'Family Gathering',
        },
        {
          src: '/images/EventIMG1.jpeg',
          caption: 'Spacious Grounds for Multi-Gen Reunions',
          tag: 'Estate Lawn',
        },
        {
          src: '/images/EventIMG2.jpeg',
          caption: 'Warm Evening Ambience for Family Gatherings',
          tag: 'Night Gathering',
        },
      ],
      highlights: [
        'Covered rain-safe banquet dining patio',
        'Friendly lawn volleyball & badminton matches',
        'Spacious interconnecting family bedrooms',
        'Driver rest facilities & ample secure parking',
      ],
    },
    {
      id: 'parties',
      name: 'Parties & Sundowner Gatherings',
      badge: 'Evening Magic',
      capacity: '40 – 180 Guests',
      description: 'Sundowner gatherings and vibrant evening parties by the palm-lined swimming pool. As dusk settles over Kodagu, gather around crackling estate bonfires with chilled breezes and warm starlight.',
      photos: [
        {
          src: '/images/EventIMG2.jpeg',
          caption: 'Starlit Evening Festoon & Tree Lighting',
          tag: 'Sundowner Party',
        },
        {
          src: '/images/EventIMG6.jpeg',
          caption: 'Open Night Lawn for Cocktail Evenings',
          tag: 'Party Grounds',
        },
        {
          src: '/images/EventIMG4.jpeg',
          caption: 'Celebration Grounds Ready for Music',
          tag: 'Night Festivity',
        },
      ],
      highlights: [
        'Adjoining pool deck cocktail setup',
        'Wood-fired bonfire on request',
        'Ambient festoon tree lighting',
        'Highland nighttime breeze & stargazing',
      ],
    },
    {
      id: 'corporate',
      name: 'Corporate Offsites & Retreats',
      badge: 'Productive Nature',
      capacity: '20 – 120 Delegates',
      description: 'Unplug your leadership team or company for focused strategy retreats, team building, and milestone celebration dinners. Fast Wi-Fi across open lawns and comfortable breakout verandahs.',
      photos: [
        {
          src: '/images/EventIMG5.jpeg',
          caption: 'Corporate Dining & Buffet Pavilion',
          tag: 'Buffet Bay',
        },
        {
          src: '/images/EventIMG1.jpeg',
          caption: 'Lawn Area for Outdoor Team Building Activities',
          tag: 'Team Building',
        },
        {
          src: '/images/EventIMG3.jpeg',
          caption: 'Exclusive Resort Buyout Layout for Delegations',
          tag: 'Executive Buyout',
        },
      ],
      highlights: [
        'Exclusive full-resort privacy guaranteed',
        'Reliable estate Wi-Fi across all spaces',
        'Outdoor lawn games & badminton tournaments',
        'Continuous hot estate coffee & tea service',
      ],
    },
  ];

  const currentCategory = eventCategories.find((cat) => cat.id === activeCategoryId) || eventCategories[0];

  return (
    <section
      id="events"
      className="relative w-full py-16 sm:py-20 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none"
      aria-label="Events, Celebrations and Functions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-6">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-white px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#14422F] shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#A3733E]" />
              <span>Celebration Grounds & Photo Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C1A] leading-tight">
              Events, Celebrations & Functions.
            </h2>
            <p className="text-xs sm:text-sm text-[#223633] font-medium leading-relaxed max-w-xl">
              From grand 500-guest lawn weddings and milestone birthdays to poolside cocktail parties and corporate retreats. Explore authentic photographs of our resort spaces prepared for unforgettable occasions.
            </p>
          </CinematicReveal>

          {/* Quick Enquire Button - Direct WhatsApp */}
          <CinematicReveal delay={0.15}>
            <a
              href="https://wa.me/917411695533?text=Hello%20Coorg%20Laya%2C%20I%20would%20like%20to%20enquire%20about%20hosting%20an%20event%20at%20the%20resort"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#14422F] hover:bg-[#1A543C] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Check Event Dates</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </CinematicReveal>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {eventCategories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryId(cat.id);
                  setActivePhotoIdx(0);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#14422F] text-[#FAF6EF] border-[#D4AF37]/60 shadow-md ring-1 ring-[#D4AF37]/30'
                    : 'bg-white text-[#223633] border-[#E0D7C8] hover:border-[#14422F] hover:bg-[#F6EFE5]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#D4AF37] text-[#0A261B]' : 'bg-[#EFE4D6] text-[#5A3F1F]'
                }`}>
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display: Clean Photo Gallery + Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="rounded-3xl bg-white border border-[#E0D7C8] p-5 sm:p-8 shadow-sm space-y-8"
          >
            {/* Top Info Bar: Event Name → Description → Enquire Now */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EFE8DC]">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1C1A]">
                    {currentCategory.name}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#E5F3F5] text-[#0A5462] text-xs font-bold border border-[#BCE2E7]">
                    {currentCategory.capacity}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#223633] font-medium leading-relaxed">
                  {currentCategory.description}
                </p>
              </div>

              {/* Direct Category Action */}
              <div className="shrink-0 flex items-center gap-3">
                <a
                  href={`https://wa.me/917411695533?text=${encodeURIComponent(`Hello Coorg Laya, I would like to enquire about hosting: ${currentCategory.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#137586] hover:bg-[#0E5461] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
                  <span>Enquire For This Event</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Photo Gallery Grid for this Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentCategory.photos.map((photo, pIdx) => (
                <div
                  key={pIdx}
                  className="group rounded-2xl overflow-hidden bg-[#EFE8DC] border border-[#E0D7C8] flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#E4D9C8]">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {photo.tag}
                    </span>
                  </div>

                  <div className="p-3.5 bg-white flex items-center justify-between gap-2 border-t border-[#EFE8DC]">
                    <span className="text-xs font-bold text-[#0F1C1A] leading-snug">
                      {photo.caption}
                    </span>
                    <Camera className="w-3.5 h-3.5 text-[#137586] shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Inclusions & Highlights Footer */}
            <div className="pt-4 border-t border-[#EFE8DC] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-[#223633] font-semibold">
                <span className="text-[#A3733E] uppercase tracking-wider text-[11px] font-bold">Key Inclusions:</span>
                {currentCategory.highlights.map((item, hIdx) => (
                  <span key={hIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[#E0D7C8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14422F]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              <span className="text-xs font-semibold text-[#5A3F1F] bg-[#EFE4D6] px-3.5 py-1 rounded-full border border-[#D9C4AC]">
                Catering & Decor Coordination Available
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default EventsSection;
