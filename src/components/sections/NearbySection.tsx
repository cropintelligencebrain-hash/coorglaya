import React from 'react';
import { Compass, MapPin, Clock, Navigation, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicReveal } from '../common/CinematicReveal';

interface TouristAttraction {
  name: string;
  distance: string;
  travelTime: string;
  description: string;
  image: string;
  category: string;
  mapsQuery: string;
}

export const NearbySection: React.FC = () => {
  const touristPlaces: TouristAttraction[] = [
    {
      name: 'Kaveri Nisargadhama',
      distance: '3.8 km from Coorg Laya Resort',
      travelTime: 'Approx. 8 mins drive',
      description: 'Picturesque 64-acre island formed by the Kaveri river featuring hanging footbridges, dense bamboo groves, and deer park walkways.',
      image: '/images/nearby/hanging-bridge.png',
      category: 'Riverside Island',
      mapsQuery: 'Kaveri+Nisargadhama+Kushalnagar',
    },
    {
      name: 'Tibetan Golden Temple (Namdroling)',
      distance: '6.5 km from Coorg Laya Resort',
      travelTime: 'Approx. 12 mins drive',
      description: 'One of the largest Tibetan Buddhist learning centers in South India with three magnificent 40-foot gilded Buddha statues.',
      image: '/images/nearby/namdroling-monastery.jpg',
      category: 'Heritage & Sacred',
      mapsQuery: 'Namdroling+Monastery+Golden+Temple+Bylakuppe',
    },
    {
      name: 'Harangi Dam & Reservoir',
      distance: '9.2 km from Coorg Laya Resort',
      travelTime: 'Approx. 18 mins drive',
      description: 'Quiet lakeside retreat with cooling mountain breezes and wide reservoir reflections, ideal for uncrowded evening walks.',
      image: '/images/nearby/harangi-dam.jpg',
      category: 'Lakeside Scenic',
      mapsQuery: 'Harangi+Reservoir+Kushalnagar',
    },
    {
      name: 'Dubare Elephant Camp',
      distance: '14.5 km from Coorg Laya Resort',
      travelTime: 'Approx. 25 mins drive',
      description: 'Famous forest camp on the banks of Kaveri where visitors can observe elephant river bathing and tranquil boat crossings.',
      image: '/images/nearby/dubare-camp.jpg',
      category: 'Wildlife & River',
      mapsQuery: 'Dubare+Elephant+Camp+Coorg',
    },
    {
      name: "Raja's Seat (Madikeri)",
      distance: '29.0 km from Coorg Laya Resort',
      travelTime: 'Approx. 40 mins drive',
      description: 'Historic hilltop garden terrace overlooking rolling Western Ghats valleys where the Kings of Kodagu once watched dramatic sunsets.',
      image: '/images/nearby/rajas-seat.jpg',
      category: 'Sunset Viewpoint',
      mapsQuery: 'Rajas+Seat+Madikeri',
    },
    {
      name: 'Abbey Falls',
      distance: '35.0 km from Coorg Laya Resort',
      travelTime: 'Approx. 50 mins drive',
      description: 'Dramatic waterfall plunging between lush coffee estates, pepper vines, and tropical canopies with a suspension viewing bridge.',
      image: '/images/nearby/abbey-falls.jpg',
      category: 'Waterfalls & Nature',
      mapsQuery: 'Abbey+Falls+Madikeri',
    },
  ];

  return (
    <section
      id="nearby"
      className="relative w-full py-16 sm:py-20 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none"
      aria-label="Tourist Places Nearby Coorg Laya Resort"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-6">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#14422F] shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#A3733E]" />
              <span>Gateway to Kodagu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C1A] leading-tight">
              Tourist Places Nearby.
            </h2>
            <p className="text-xs sm:text-sm text-[#223633] font-medium leading-relaxed max-w-xl">
              Coorg Laya's strategic location in Kushalnagar places you minutes from Kodagu's premier river islands, monasteries, elephant reserves, and waterfalls.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.15}>
            <Link
              to="/nearby"
              className="px-6 py-3 rounded-full bg-[#137586] hover:bg-[#0E5461] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Interactive Regional Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CinematicReveal>
        </div>

        {/* Tourist Places Grid: Exact Specification Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {touristPlaces.map((place, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.08} duration={0.5}>
              <div className="group rounded-3xl overflow-hidden bg-white border border-[#E0D7C8] hover:border-[#137586] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Genuine Attraction Photograph */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E8DFD1]">
                    <img
                      src={place.image}
                      alt={place.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {place.category}
                    </span>
                  </div>

                  {/* Details Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F1C1A] leading-snug group-hover:text-[#137586] transition-colors">
                      {place.name}
                    </h3>

                    {/* Distance & Travel Time Badges */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#14422F]">
                        <MapPin className="w-3.5 h-3.5 text-[#A3733E] shrink-0" />
                        <span>{place.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4744]">
                        <Clock className="w-3.5 h-3.5 text-[#137586] shrink-0" />
                        <span>{place.travelTime}</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#223633] font-medium leading-relaxed pt-1">
                      {place.description}
                    </p>
                  </div>
                </div>

                {/* Get Directions / View Location Action */}
                <div className="p-5 pt-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full bg-[#FAF6EF] hover:bg-[#14422F] text-[#14422F] hover:text-white border border-[#D5C7B2] hover:border-[#14422F] text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group/btn"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#A3733E] group-hover/btn:text-[#D4AF37] transition-colors" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100" />
                  </a>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NearbySection;
