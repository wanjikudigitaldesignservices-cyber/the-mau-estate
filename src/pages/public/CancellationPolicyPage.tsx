import React from 'react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';

export const CancellationPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Cancellation & Refund Policy"
        description="Cancellation terms and refund procedures for individual and group suite reservations at The Mau Estate, Mau Narok."
        canonicalPath="/cancellation-policy"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        <div className="bg-forest text-white py-16 border-b border-forest-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block">Transparent Terms</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal">Cancellation & Refund Policy</h1>
            <p className="text-stone-light text-xs font-light">Effective: November 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-dark shadow-subtle space-y-8 text-stone text-xs sm:text-sm leading-relaxed font-light">
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">1. Standard Suite Reservations</h2>
              <ul className="list-disc list-inside space-y-2 pl-2 text-stone-dark">
                <li>
                  <strong>14 or more days before arrival:</strong> Full 100% refund of any prepayment, or credit for future stay with no penalty fees.
                </li>
                <li>
                  <strong>7 to 13 days before arrival:</strong> 50% refund of total reservation charge, or full credit transferable within 12 months.
                </li>
                <li>
                  <strong>Less than 7 days before arrival:</strong> 100% retention charge applies due to limited inventory allocation.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">2. Full Estate Buyouts & Special Celebrations</h2>
              <p>
                For whole estate buyouts, wedding gatherings, and executive retreats, cancellations must be communicated at least 30 days prior to the event date to qualify for deposit refund (less a 10% administrative processing fee).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">3. Refund Processing</h2>
              <p>
                Approved refunds are processed back to the original funding source (M-Pesa or payment card) within 5 to 7 business banking days.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
