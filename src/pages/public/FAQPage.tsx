import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Calendar } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Arrival & Geography',
      q: 'Where is The Mau Estate located and how do we reach the property?',
      a: 'The Mau Estate is located on the high-altitude ridge of Mau Narok in Nakuru County, Kenya, at an elevation of 2,840 metres above sea level. By road, it is a scenic 3-hour drive from Nairobi via the Great Rift Valley escarpment, or 50 minutes from Nakuru City. For private air transfers, our crest helipad welcomes direct helicopter flights from Wilson Airport (HKNW) in just 35 minutes.',
    },
    {
      category: 'Arrival & Geography',
      q: 'What is the highland climate like and what should we pack?',
      a: 'Mau Narok enjoys cool, temperate mountain weather throughout the year. Daytime temperatures average 21°C to 24°C with abundant sunshine, while evenings and early mornings dip to 9°C to 12°C. We recommend packing layered woollen clothing, a warm jacket for evenings by the fire, comfortable hiking boots for forest trails, and sun protection for daytime rides.',
    },
    {
      category: 'Reservations & Payments',
      q: 'What payment methods do you accept?',
      a: 'We accept Safaricom Lipa Na M-Pesa Online (instant STK push in KES), major international credit and debit cards (Visa, MasterCard, American Express), and direct international wire transfers. All rates are quoted in USD with live conversion to Kenyan Shillings (KES).',
    },
    {
      category: 'Reservations & Payments',
      q: 'What is your cancellation policy?',
      a: 'We offer flexible, resident-first terms. Reservations cancelled 14 or more days prior to scheduled check-in receive a full refund. Cancellations made between 7 and 13 days prior incur a 50% charge, while cancellations within 7 days of arrival are non-refundable.',
    },
    {
      category: 'Stay & Amenities',
      q: 'Are children and families welcome at the estate?',
      a: 'Yes, absolutely. Our multi-room Family Suites are specifically configured with interconnected living salons and enclosed private gardens. We provide bespoke children’s nature kits, guided pony rides, and dedicated family dining options.',
    },
    {
      category: 'Stay & Amenities',
      q: 'What dietary preferences and allergies can you accommodate?',
      a: 'Our farm-to-table culinary team caters to gluten-free, vegan, vegetarian, Halal-friendly, and specific medical allergies with advance notice. All vegetables, herbs, and dairy are harvested daily from our organic estate gardens and local highland farms.',
    },
    {
      category: 'Stay & Amenities',
      q: 'Is high-speed internet available for remote work?',
      a: 'Yes. Dedicated high-speed optical fiber Wi-Fi is complimentary across all suites, executive boardrooms, and common guest pavilions, backed by redundant solar generator infrastructure.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Frequently Asked Questions"
        description="Common guest questions regarding arrival, elevation, climate, reservations, M-Pesa payments, and dining at The Mau Estate, Mau Narok."
        canonicalPath="/faq"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Resident Guidance</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Everything you need to know to prepare for your journey to Mau Narok.
            </p>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-sm border border-ivory-dark overflow-hidden shadow-subtle transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-forest font-medium">{faq.q}</h3>
                  </div>
                  <div className="p-1 rounded-full text-gold flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-stone text-xs sm:text-sm leading-relaxed border-t border-ivory-cream font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}

          {/* Need more help banner */}
          <div className="pt-12 text-center space-y-4">
            <h4 className="font-serif text-2xl text-forest">Have a question not addressed here?</h4>
            <p className="text-stone text-xs font-light max-w-md mx-auto">
              Our concierge team is available 24/7 to assist with bespoke itineraries, helicopter charter logistics, or dietary requests.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-forest-deep transition-all"
              >
                Contact Concierge
              </Link>
              <Link
                to="/booking"
                className="px-6 py-2.5 border border-forest text-forest text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-forest hover:text-gold transition-all"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
