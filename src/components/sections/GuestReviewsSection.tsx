import React, { useState } from 'react';
import { Star, CheckCircle2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { CinematicReveal } from '../common/CinematicReveal';

interface GuestReview {
  name: string;
  location: string;
  rating: number;
  stayType: string;
  date: string;
  title: string;
  quote: string;
  aspect: string;
}

export const GuestReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'families' | 'couples' | 'groups'>('all');

  const reviews: GuestReview[] = [
    {
      name: 'Ravi',
      location: 'Bengaluru',
      rating: 5,
      stayType: 'Weekend Getaway',
      date: '2 weeks ago',
      title: 'Sound sleep and early morning coffee',
      quote: 'The quietness here at night is something else. No traffic, just cool breeze through the bamboo. Had my morning coffee sitting on the wooden deck listening to birds. Bed was very comfortable and the room was spacious.',
      aspect: 'Sleep & Quietness',
    },
    {
      name: 'Srinivas',
      location: 'Mysuru',
      rating: 5,
      stayType: 'Family Stay',
      date: 'Last month',
      title: 'Kids wouldn’t get off the trampoline',
      quote: 'Came with family including my parents and two young kids. The circular trampoline on the lawn was a huge hit—kids were jumping safely for hours while we relaxed on the verandah with hot tea. Very peaceful lawn.',
      aspect: 'Family & Trampoline',
    },
    {
      name: 'Surya',
      location: 'Hyderabad',
      rating: 5,
      stayType: 'Friends Trip',
      date: '3 weeks ago',
      title: 'Badminton matches and late bonfire',
      quote: 'We played badminton in the afternoon under the shade of the bamboo trees, then the staff set up a wood bonfire for us around 8 PM. Clear skies, crisp air, and good conversations. Great place for a group of friends.',
      aspect: 'Badminton & Bonfire',
    },
    {
      name: 'Trisha',
      location: 'Chennai',
      rating: 5,
      stayType: 'Solo Nature Break',
      date: 'January 2026',
      title: 'Clean swimming pool and palm trees',
      quote: 'I spent most of my afternoon by the pool. Water was clean and crystal clear with palm trees all around. The circular shallow area is great to just sit with feet in the water and read a book. Very well maintained.',
      aspect: 'Palm Pool & Leisure',
    },
    {
      name: 'Suraj',
      location: 'Hassan',
      rating: 5,
      stayType: 'Drive-in Roadtrip',
      date: 'February 2026',
      title: 'Easy location and smooth WhatsApp check-in',
      quote: 'Driving in from Kushalnagar was straightforward, good wide road and secure gated parking inside the resort. Booking was handled directly over WhatsApp without any confusion. Helpful staff who carried our luggage.',
      aspect: 'Access & Parking',
    },
    {
      name: 'Zaiba',
      location: 'Kozhikode',
      rating: 5,
      stayType: 'Couple Stay',
      date: 'December 2025',
      title: 'Room interiors and hot showers',
      quote: 'Loved the timber ceiling details and olive botanical aesthetic of the room. Hot water pressure in the shower was continuous and instant, which matters a lot on chilly Kodagu mornings. Felt clean, private, and secure.',
      aspect: 'Room Quality & Hot Water',
    },
    {
      name: 'Angelina',
      location: 'Traveler from UK',
      rating: 5,
      stayType: 'Kodagu Exploration',
      date: 'January 2026',
      title: 'Morning mist and close to Tibetan Monastery',
      quote: 'A wonderful base to explore the region. Golden Temple in Bylakuppe is just 10 minutes away. Morning fog rolling over the coffee trees was magical. Fresh South Indian breakfast was hearty and delicious.',
      aspect: 'Monastery Base & Mist',
    },
    {
      name: 'Geeta',
      location: 'Mangalore',
      rating: 5,
      stayType: 'Family Function (35 Guests)',
      date: 'November 2025',
      title: 'Hosted our anniversary gathering on the lawn',
      quote: 'We booked multiple rooms for our extended family anniversary. The open lawn is huge and manicured, buffet setup was smooth, and the care taken by the caretakers was genuine. Everyone in our family went back happy.',
      aspect: 'Lawn Gathering & Hospitality',
    },
  ];

  return (
    <section
      id="reviews"
      className="relative w-full py-16 sm:py-20 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none border-t border-[#E8DFD1]"
      aria-label="Guest Reviews and Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Aggregate Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-6">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-white px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#14422F] shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Real Guest Experiences</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C1A] leading-tight">
              Words From Our In-House Guests.
            </h2>
            <p className="text-xs sm:text-sm text-[#223633] font-medium leading-relaxed max-w-xl">
              Honest impressions from travelers who spent unhurried mornings, family holidays, and celebrations with us in Kushalnagar.
            </p>
          </CinematicReveal>

          {/* Rating Summary Card */}
          <CinematicReveal delay={0.15}>
            <div className="p-4 rounded-3xl bg-white border border-[#E0D7C8] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E1F3EA] text-[#0E523A] font-bold text-xl flex items-center justify-center border border-[#A8DEC2]">
                4.9
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#5A3F1F] block">
                  Consistent 5-Star Guest Rating
                </span>
              </div>
            </div>
          </CinematicReveal>
        </div>

        {/* 8-Card Human Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.05} duration={0.4}>
              <div className="p-5 rounded-3xl bg-white border border-[#E0D7C8] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-3">
                <div className="space-y-2.5">
                  {/* Rating Stars & Aspect Pill */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5F3F5] text-[#0A5462] border border-[#BCE2E7]">
                      {rev.aspect}
                    </span>
                  </div>

                  {/* Title & Authentic Quote */}
                  <h4 className="font-serif text-sm font-bold text-[#0F1C1A] leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-[#223633] font-normal leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Guest Attribution */}
                <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-1 font-bold text-[#0F1C1A]">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#14422F]" />
                    </div>
                    <span className="text-[10px] text-[#586E6B]">
                      {rev.location} · {rev.date}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-[#5A3F1F] bg-[#FAF6EF] px-2 py-0.5 rounded-md border border-[#E0D7C8]">
                    {rev.stayType}
                  </span>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GuestReviewsSection;
