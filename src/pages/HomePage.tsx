import React from 'react';
import { LayaVideoHeroSection } from '../components/sections/LayaVideoHeroSection';
import { RoomsSection } from '../components/sections/RoomsSection';
import { AmenitiesSection } from '../components/sections/AmenitiesSection';
import { BirdsongNatureSection } from '../components/sections/BirdsongNatureSection';
import { ActivitiesSection } from '../components/sections/ActivitiesSection';
import { EventsSection } from '../components/sections/EventsSection';
import { GallerySection } from '../components/sections/GallerySection';
import { NearbySection } from '../components/sections/NearbySection';
import { GuestReviewsSection } from '../components/sections/GuestReviewsSection';
import { ContactEnquirySection } from '../components/sections/ContactEnquirySection';

interface HomePageProps {
  onOpenEnquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="relative w-full bg-[#FAF6EF] text-[#132422] overflow-x-hidden select-none">
      {/* 1. CINEMATIC COORG VIDEO HERO (Woman sipping coffee by window, misty hills, seamless 2.7K loop) */}
      <div id="hero-section" className="snap-section">
        <LayaVideoHeroSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 2. ROOMS & SUITES (Directly Below Video — 4 Signature Suites with Real Photos & Direct WhatsApp Booking) */}
      <div id="rooms-section" className="snap-section">
        <RoomsSection isPreview={true} onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 3. FACILITIES & AMENITIES (Pool & Kids Trampoline Photos, Listed Sports & Services) */}
      <div id="amenities-section" className="snap-section">
        <AmenitiesSection />
      </div>

      {/* 4. FRESH PLANTATION BREW & DAWN BIRDSONG (Vinyl Turntable + Minecraft Dancing Bird) */}
      <div id="nature-section" className="snap-section">
        <BirdsongNatureSection />
      </div>

      {/* 5. ACTIVITIES & EXPERIENCES (Recreation Schedule, Sports, Energy Meter & WhatsApp Planning) */}
      <div id="activities-section" className="snap-section">
        <ActivitiesSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 6. EVENTS & CELEBRATIONS (Real Event Photos EventIMG1-6, Lawn Grounds & Dates Enquiry) */}
      <div id="events-section" className="snap-section">
        <EventsSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 7. RESORT PHOTO GALLERY (Interactive 3D Cylinder / Grid Toggle & Full Lightbox Inspection) */}
      <div id="gallery-section" className="snap-section">
        <GallerySection />
      </div>

      {/* 8. NEARBY TOURIST PLACES (Distance, Travel Time, Real Photography & Direct Maps Navigation) */}
      <div id="nearby-section" className="snap-section">
        <NearbySection />
      </div>

      {/* 9. GUEST REVIEWS (Authentic Human Impressions: Ravi, Srinivas, Surya, Trisha, Suraj, Zaiba, Angelina, Geeta) */}
      <div id="reviews-section" className="snap-section">
        <GuestReviewsSection />
      </div>

      {/* 10. CONTACT, MAP & RESERVATIONS (Direct WhatsApp Dispatch Form & Concierge Channels) */}
      <div id="contact-section" className="snap-section">
        <ContactEnquirySection />
      </div>
    </div>
  );
};

export default HomePage;

