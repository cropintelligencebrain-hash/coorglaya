import React from 'react';
import { LayaVideoHeroSection } from '../components/sections/LayaVideoHeroSection';
import { ResortPillarsDirectory } from '../components/sections/ResortPillarsDirectory';
import { RoomsSection } from '../components/sections/RoomsSection';
import { AmenitiesSection } from '../components/sections/AmenitiesSection';
import { EventsSection } from '../components/sections/EventsSection';
import { ContactEnquirySection } from '../components/sections/ContactEnquirySection';

interface HomePageProps {
  onOpenEnquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="relative w-full bg-[#FAF6EF] text-[#132422] overflow-x-hidden select-none">
      {/* 1. CINEMATIC COORG VIDEO HERO (Woman sipping coffee by window, misty hills, seamless 12.55s 2.7K loop) */}
      <div id="hero-section" className="snap-section">
        <LayaVideoHeroSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 2. RESORT PILLARS DIRECTORY (The 4 Core Offerings: Suites, Pool & Amenities, Lawn, Gallery) */}
      <div id="pillars-directory" className="snap-section">
        <ResortPillarsDirectory onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 3. SUITES PREVIEW (Image-Dominant 4-Suite Grid, Direct Booking & Redirect to Full 3D Specs) */}
      <div id="rooms-section" className="snap-section">
        <RoomsSection isPreview={true} onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 4. POOL & RESORT SPACES PREVIEW (Image-First Amenities & Redirect to Fluid Caustics) */}
      <div id="amenities-section" className="snap-section">
        <AmenitiesSection />
      </div>

      {/* 5. CELEBRATION GROUNDS (500-Guest Lawn Photo & Event Planning) */}
      <div id="events-section" className="snap-section">
        <EventsSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 6. INSTANT CONTACT & RESERVATION (Direct Booking Form & Location) */}
      <div id="contact-section" className="snap-section">
        <ContactEnquirySection />
      </div>
    </div>
  );
};

export default HomePage;
