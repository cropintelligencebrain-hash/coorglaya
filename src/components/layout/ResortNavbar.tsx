import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, MessageCircle, Phone, MapPin, ChevronRight, BedDouble, Waves, Trees, Camera, Home } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { springTransition } from '../../utils/motionVariants';

interface ResortNavbarProps {
  onOpenEnquiry: () => void;
  onReplayIntro?: () => void;
}

export const ResortNavbar: React.FC<ResortNavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Primary navigation links with explicit Home button
  const primaryLinks = [
    { name: 'Home', path: '/', tag: 'Sanctuary' },
    { name: 'Suites', path: '/rooms', tag: '15 Private Suites' },
    { name: 'Amenities', path: '/amenities', tag: 'Pool & Lawn' },
    { name: 'Events Lawn', path: '/events', tag: '500 Guests' },
    { name: 'Gallery', path: '/gallery', tag: 'Photos' },
    { name: 'Contact', path: '/contact', tag: 'Direct' },
  ];

  // Core 4 Pillars for the Directory Menu (Using proper SVG Lucide icons instead of emojis)
  const corePillars = [
    {
      title: 'Suites & Living Quarters',
      desc: '15 private suites crafted for peaceful mountain nights',
      path: '/rooms',
      badge: 'Direct Booking',
      icon: BedDouble,
    },
    {
      title: 'Palm Pool & Recreation',
      desc: 'Crystal swimming pool, badminton lawn & kids trampoline',
      path: '/amenities',
      badge: 'Daily 7 AM – 7 PM',
      icon: Waves,
    },
    {
      title: '500-Guest Celebration Lawn',
      desc: 'Open manicured lawns for weddings, milestones & retreats',
      path: '/events',
      badge: 'Up to 500 Capacity',
      icon: Trees,
    },
    {
      title: 'Resort Photo Gallery',
      desc: 'Authentic high-resolution photos of rooms & grounds',
      path: '/gallery',
      badge: 'Real Grounds',
      icon: Camera,
    },
  ];

  const secondaryPages = [
    { name: 'Home', path: '/', hint: 'Sanctuary Main' },
    { name: 'Nearby Tourism & Kaveri River', path: '/nearby', hint: '4km to Kaveri' },
    { name: 'About Coorg Laya', path: '/about', hint: 'Heritage & Vision' },
    { name: 'Contact & Location Radar', path: '/contact', hint: 'Kushalnagar, Coorg' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-2.5 sm:pt-3 flex justify-center pointer-events-none">
      <div ref={dropdownRef} className="pointer-events-auto relative w-full max-w-5xl flex flex-col items-center">
        {/* Streamlined Floating Pill Navbar */}
        <div
          className={`w-full max-w-fit flex items-center gap-2 sm:gap-4 rounded-full px-3.5 sm:px-5 py-2 transition-all duration-300 bg-[#FAF6EF]/95 backdrop-blur-md border border-[#E0D7C8] shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${
            isScrolled ? 'bg-white/98 shadow-[0_10px_35px_rgba(19,36,34,0.18)] border-[#D4AF37]/40' : ''
          }`}
        >
          {/* Brand Monogram Link */}
          <Link to="/" className="shrink-0 pr-1 flex items-center" aria-label="Coorg Laya Home">
            <BrandLogo compact={true} isLight={false} />
          </Link>

          {/* Explicit Mobile Home Button */}
          <Link
            to="/"
            className={`md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              location.pathname === '/'
                ? 'bg-[#132422] text-[#FAF6EF]'
                : 'text-[#223633] bg-[#EFE8DC]/80 hover:bg-[#EFE8DC] border border-[#DFD3C0]'
            }`}
            aria-label="Return to Home"
          >
            <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Home</span>
          </Link>

          {/* Desktop Core Links (Fast Visual Orientation) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-[#132422]">
            {primaryLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#132422] text-[#FAF6EF] shadow-sm'
                      : 'text-[#314240] hover:text-[#116B7B] hover:bg-[#F0EAE1]'
                  }`}
                >
                  {link.name === 'Home' && <Home className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Book Stay + 3 Horizontal Bars Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Booking CTA */}
            <button
              onClick={onOpenEnquiry}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold text-[#FAF6EF] bg-[#14422F] hover:bg-[#1A543C] border border-[#D4AF37]/50 shadow-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Book Stay</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>

            {/* 3 Horizontal Bars Menu Toggle Button (Mobile Only to prevent duplicate desktop loop) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF6EF] hover:bg-[#F0EAE1] text-[#132422] border border-[#E0D7C8] transition-all cursor-pointer shadow-sm group"
              aria-label="Toggle Resort Directory Menu"
              aria-expanded={menuOpen}
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center">
                <span
                  className={`w-4 h-[2px] rounded-full bg-[#132422] transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                  }`}
                />
                <span
                  className={`w-3.5 h-[2px] rounded-full bg-[#132422] transition-all duration-200 ${
                    menuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`w-4 h-[2px] rounded-full bg-[#132422] transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Structured Customer-First Directory Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={springTransition}
              className="mt-3 w-full max-w-xl rounded-3xl border border-[#E4D9C8] bg-[#FAF6EF]/98 backdrop-blur-2xl p-5 shadow-2xl space-y-4 text-[#132422]"
            >
              {/* Directory Header: Quick Orientation */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E4D9C8]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A3733E]">
                    Resort Directory & Experience Guide
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#131E1C]">
                    Where to explore at Coorg Laya
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E5F3F5] text-[#137586] font-semibold border border-[#BCE2E7]">
                  15 Suites · Kushalnagar
                </span>
              </div>

              {/* Prominent Home Option */}
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between border transition-all ${
                  location.pathname === '/'
                    ? 'bg-[#14422F] text-white border-[#D4AF37]/50 shadow-sm'
                    : 'bg-white/90 hover:bg-white text-[#132422] border-[#E4D9C8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    location.pathname === '/' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#E5F3F5] text-[#137586]'
                  }`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Resort Home Sanctuary</span>
                    <span className={`text-[10px] ${location.pathname === '/' ? 'text-white/80' : 'text-[#586E6B]'}`}>
                      Return to main overview & grounds
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  location.pathname === '/' ? 'bg-[#D4AF37] text-[#0A261B]' : 'bg-[#EFE8DC] text-[#132422]'
                }`}>
                  Home
                </span>
              </Link>

              {/* 4 Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {corePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <Link
                      key={pillar.path}
                      to={pillar.path}
                      onClick={() => setMenuOpen(false)}
                      className="p-3 rounded-2xl bg-white/80 hover:bg-white border border-[#E4D9C8] hover:border-[#137586] transition-all duration-200 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-7 h-7 rounded-lg bg-[#E5F3F5] text-[#137586] flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#137586] bg-[#E5F3F5] px-2 py-0.5 rounded-full">
                            {pillar.badge}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm font-bold text-[#131E1C] group-hover:text-[#137586] transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-[11px] text-[#586E6B] leading-snug line-clamp-1 mt-0.5">
                          {pillar.desc}
                        </p>
                      </div>
                      <div className="pt-2 mt-1 flex items-center gap-1 text-[11px] font-bold text-[#137586] group-hover:translate-x-0.5 transition-transform">
                        <span>View Experience</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Secondary Links & Direct Actions */}
              <div className="pt-2 border-t border-[#E4D9C8] space-y-2">
                <div className="flex flex-wrap gap-2 text-xs">
                  {secondaryPages.map((sec) => (
                    <Link
                      key={sec.path}
                      to={sec.path}
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-1.5 rounded-full bg-[#EFE8DC]/80 hover:bg-[#EFE8DC] text-[#314240] hover:text-[#131E1C] font-medium border border-[#DFD3C0] transition-colors"
                    >
                      {sec.name}
                    </Link>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="https://wa.me/917411695533?text=Hello%20Coorg%20Laya%2C%20I%20would%20like%20to%20enquire%20about%20suite%20availability"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#25D366]/30 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenEnquiry();
                    }}
                    className="py-2.5 px-3 rounded-2xl bg-[#14422F] hover:bg-[#1A543C] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#D4AF37]/50 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Reserve Online</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default ResortNavbar;
