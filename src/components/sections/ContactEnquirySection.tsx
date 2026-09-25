import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, CheckCircle2, Loader2, Send, 
  Sparkles, MessageSquare, ArrowUpRight, Compass, Clock, ShieldCheck, Instagram
} from 'lucide-react';
import { springTransition } from '../../utils/motionVariants';

export const ContactEnquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    message: '',
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const WHATSAPP_NUMBER = '917411695533';
  const PHONE_DISPLAY = '+91 7411695533';
  const INSTAGRAM_URL = 'https://www.instagram.com/p/Ddb0dXLBLPa/?stkn=MTd0ZzN2dGZzOTZrdQ==';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Coorg Laya Resort, I would like to enquire about booking a stay.'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    const summary =
      `*Reservation Enquiry — Coorg Laya Resort*\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Check-in Date:* ${formData.checkIn || 'Flexible'}\n` +
      `• *Check-out Date:* ${formData.checkOut || 'Flexible'}\n` +
      `• *Guests:* ${formData.guests}\n\n` +
      `*Notes:* ${formData.message || 'No additional notes'}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', phone: '', checkIn: '', checkOut: '', guests: '2 Guests', message: '' });
      }, 4000);
    }, 600);
  };

  return (
    <section id="contact" className="relative w-full pt-12 sm:pt-16 pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] sm:pb-16 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
            <Compass className="w-4 h-4 text-[#A3733E]" />
            <span>Direct Concierge Channels</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
            Connect with Coorg Laya Resort
          </h2>

          <p className="text-sm sm:text-base text-[#314240] font-normal leading-relaxed prose-pretty">
            Reach our on-site team directly via WhatsApp, Instagram, direct call, or submit an unhurried reservation enquiry below.
          </p>
        </div>

        {/* Streamlined 4-Channel Contact Hierarchy: WhatsApp -> Phone -> Email -> Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* 1. WhatsApp Card (Primary Instant Chat) */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 sm:p-6 rounded-3xl bg-[#FAF6EF] border-2 border-[#25D366]/40 hover:border-[#25D366] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shadow-inner">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#128C7E] uppercase tracking-wider block">
                  1. Instant WhatsApp Chat
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#131E1C]">
                  WhatsApp Concierge
                </h4>
                <p className="text-xs text-[#2D4744] mt-1 font-mono font-medium">
                  {PHONE_DISPLAY}
                </p>
                <p className="text-[11px] text-[#128C7E] mt-0.5 font-medium">
                  Fastest response · 1-tap chat
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#128C7E]">
              <span>Message on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 2. Direct Phone Call Card */}
          <motion.a
            href={`tel:${PHONE_DISPLAY}`}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 sm:p-6 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#137586] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E5F3F5] text-[#137586] flex items-center justify-center group-hover:bg-[#137586] group-hover:text-white transition-colors shadow-inner">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#137586] uppercase tracking-wider block">
                  2. Direct Phone Call
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#131E1C]">
                  Front Desk Line
                </h4>
                <p className="text-xs text-[#2D4744] mt-1 font-mono font-medium">
                  {PHONE_DISPLAY}
                </p>
                <p className="text-[11px] text-[#2D4744] mt-0.5">
                  Available 8:00 AM – 10:00 PM
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#137586]">
              <span>Call Front Desk</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 3. Email Card */}
          <motion.a
            href="mailto:stay@coorglaya.com"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 sm:p-6 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#A3733E] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EFE8DC] text-[#A3733E] flex items-center justify-center group-hover:bg-[#A3733E] group-hover:text-white transition-colors shadow-inner">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8C5F2E] uppercase tracking-wider block">
                  3. Official Email Desk
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#131E1C] truncate">
                  stay@coorglaya.com
                </h4>
                <p className="text-xs text-[#2D4744] mt-1 truncate font-medium">
                  Event RFPs & Group Queries
                </p>
                <p className="text-[11px] text-[#8C5F2E] mt-0.5">
                  Written replies within 24 hours
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#A3733E]">
              <span>Send An Email</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 4. Location & Google Maps Card */}
          <motion.a
            href="https://maps.google.com/maps?q=12.4349915%2C75.9235081&z=17&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 sm:p-6 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#131E1C] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EFE8DC] text-[#131E1C] flex items-center justify-center group-hover:bg-[#131E1C] group-hover:text-white transition-colors shadow-inner">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2D4744] uppercase tracking-wider block">
                  4. Full Address & Location
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#131E1C] leading-snug">
                  Coorg Laya Resort
                </h4>
                <p className="text-xs text-[#2D4744] mt-1 font-medium leading-relaxed">
                  Teppadakandi, Siddapura Main Road, Basavanahalli Village, Gudde Hosur Post, Kushalnagar - 571234
                </p>
                <p className="text-[11px] text-[#A3733E] mt-0.5 font-bold">
                  Kodagu, Karnataka
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#132422]">
              <span>Get Directions on Maps</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

        </div>

        {/* Main Reservation Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#132422]">
                Reservation Concierge
              </h3>
              <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
                Whether booking a relaxing weekend across our 15 boutique suites or planning a grand celebration on the 500-guest lawn, our dedicated team will assist you personally.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#344E4A]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A3733E]" />
                  <span>Reception Active: 24/7 for In-House Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Direct Booking Reservation Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] p-6 sm:p-8 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F1C1A] block">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 text-base sm:text-sm bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#137586]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F1C1A] block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 text-base sm:text-sm bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#137586]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F1C1A] block">Check-in Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full px-4 py-3 text-base sm:text-sm bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#137586]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F1C1A] block">Check-out Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full px-4 py-3 text-base sm:text-sm bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#137586]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0F1C1A] block">Number of Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 text-base sm:text-sm bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#137586]"
                >
                  <option value="2 Guests">2 Guests (Couples / Living Suite)</option>
                  <option value="3-4 Guests">3–4 Guests (Family Twin Suite)</option>
                  <option value="5-10 Guests">5–10 Guests (Family Group)</option>
                  <option value="15-45 Guests (Full Buyout)">15–45 Guests (Full 15-Suite Buyout)</option>
                  <option value="50-500 Guests (Lawn Event)">50–500 Guests (Open Lawn Celebration)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0F1C1A] block">Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your room preferences, food requirements, or event plans..."
                  className="w-full px-4 py-3 text-base sm:text-sm bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium resize-none focus:outline-none focus:border-[#137586]"
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState !== 'idle'}
                whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                transition={springTransition}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#14422F] hover:bg-[#1A543C] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {formState === 'loading' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to WhatsApp...</span>
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Enquiry Sent to WhatsApp</span>
                  </>
                )}
                {formState === 'idle' && (
                  <>
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>Send Enquiry</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactEnquirySection;
