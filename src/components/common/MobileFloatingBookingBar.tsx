import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

interface MobileFloatingBookingBarProps {
  onOpenEnquiry: () => void;
}

export const MobileFloatingBookingBar: React.FC<MobileFloatingBookingBarProps> = ({
  onOpenEnquiry,
}) => {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="md:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] inset-x-3 landscape:inset-x-8 max-w-lg mx-auto z-40 select-none pointer-events-auto"
    >
      <div className="flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0B1513]/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-[0_12px_32px_rgba(0,0,0,0.55)] text-white">
        {/* Left: Quick Booking Info & WhatsApp */}
        <div className="flex items-center gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">
              15 Private Suites
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xs font-bold text-[#FAF6EF]">
                Tariff on Enquiry
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/917411695533?text=Hello%20Coorg%20Laya%2C%20I%20would%20like%20to%20enquire%20about%20suite%20availability"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 transition-colors cursor-pointer"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Direct Reserve CTA */}
        <button
          onClick={onOpenEnquiry}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#14422F] to-[#1A543C] hover:from-[#1A543C] hover:to-[#226B4D] text-[#FAF6EF] font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 border border-[#D4AF37]/50 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Reserve</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      </div>
    </motion.div>
  );
};

export default MobileFloatingBookingBar;
