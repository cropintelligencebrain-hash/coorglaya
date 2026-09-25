import React from 'react';
import { Car, Navigation } from 'lucide-react';
import { ContactEnquirySection } from '../components/sections/ContactEnquirySection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';

export const ContactPage: React.FC = () => {
  const routes = [
    {
      from: 'Bangalore (Bengaluru)',
      dist: '235 km · ~4.5 Hours',
      route: 'Bangalore → Nelamangala → Kunigal → Channarayapatna → Hassan → Holenarasipura → Kushalnagar',
      highlights: 'Smooth 4-lane highway up to Hassan, followed by scenic state highway surrounded by coconut groves.',
    },
    {
      from: 'Mysore (Mysuru)',
      dist: '88 km · ~2 Hours',
      route: 'Mysore → Hunsur → Bilikere → Kushalnagar (SH 88)',
      highlights: 'Fastest approach route along shaded state highway with abundant coffee stops.',
    },
    {
      from: 'Mangalore (Coastal Gateway)',
      dist: '135 km · ~3.5 Hours',
      route: 'Mangalore → Bantwal → Mani → Puttur → Sullia → Madikeri → Kushalnagar',
      highlights: 'Picturesque Western Ghats mountain pass via Sampaje ghat road.',
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-16 sm:space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Connect & Reserve"
        title="Contact Our Desk"
        description="Reach our direct reservation desk for room bookings, 500-guest lawn dates, and private resort buyout enquiries."
        bgImage="/images/resort/covered-seating.jpeg"
      />

      {/* Main Interactive Contact Section */}
      <ContactEnquirySection />

      {/* Getting Here Driving Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Car className="w-4 h-4 text-[#A3733E]" />
            <span className="tracking-wide uppercase">Travel & Accessibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display heading-balance leading-tight">
            Getting to Coorg Laya Resort
          </h2>
          <p className="text-sm text-[#2C413E] font-normal leading-relaxed prose-pretty">
            Kushalnagar, Kodagu District, Karnataka · 850m Altitude above sea level.
          </p>
        </CinematicReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((rt, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.1}>
              <div className="p-6 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] space-y-3 shadow-sm h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF6EF] text-[#137586] border border-[#D5C7B2] inline-block">
                    {rt.dist}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#132422]">
                    {rt.from}
                  </h3>
                  <p className="text-xs font-mono text-[#A3733E] font-bold">
                    {rt.route}
                  </p>
                  <p className="text-xs text-[#2C413E] font-normal leading-relaxed prose-pretty pt-1">
                    {rt.highlights}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4D9C8]/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#137586]">GPS Navigation Ready</span>
                  <Navigation className="w-4 h-4 text-[#137586]" />
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ContactPage;
