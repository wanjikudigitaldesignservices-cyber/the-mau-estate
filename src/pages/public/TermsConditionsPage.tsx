import React from 'react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Terms & Conditions of Stay"
        description="Terms and conditions governing guest stays, check-in policies, property etiquette, and reservations at The Mau Estate, Mau Narok."
        canonicalPath="/terms-and-conditions"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        <div className="bg-forest text-white py-16 border-b border-forest-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block">Resident Guidelines</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal">Terms & Conditions of Stay</h1>
            <p className="text-stone-light text-xs font-light">Effective: November 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-dark shadow-subtle space-y-8 text-stone text-xs sm:text-sm leading-relaxed font-light">
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">1. Check-In & Check-Out Timings</h2>
              <p>
                Standard check-in commences at 14:00 hours. Early arrivals before 14:00 may enjoy the estate lounges, dining venues, and walking trails while suites are prepared. Standard departure time is 11:00 hours to ensure pristine sanitization for arriving residents. Late departures are subject to suite availability and prior concierge arrangement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">2. Identification Requirements</h2>
              <p>
                In accordance with Kenyan national hospitality regulations, all adult residents must present a valid government-issued passport or national identity card upon check-in.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">3. Tranquility & Environmental Reverence</h2>
              <p>
                The Mau Estate is dedicated to peaceful contemplation. We kindly request residents maintain discreet noise levels, particularly in common gardens, outdoor thermal tubs, and residential corridors after 22:00 hours.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">4. Taxes & Levies</h2>
              <p>
                All final rates calculated on the platform include statutory Kenyan taxes: 16% Value Added Tax (VAT), 2% Tourism Training Levy, and 5% Luxury Hospitality Service Charge.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
