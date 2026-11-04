import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Privacy Policy"
        description="The Mau Estate privacy commitment. How we protect, store, and process resident information under the Kenya Data Protection Act 2019 and GDPR."
        canonicalPath="/privacy-policy"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        <div className="bg-forest text-white py-16 border-b border-forest-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block">Legal & Governance</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal">Privacy & Data Protection Policy</h1>
            <p className="text-stone-light text-xs font-light">Last revised: November 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-dark shadow-subtle space-y-8 text-stone text-xs sm:text-sm leading-relaxed font-light">
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">1. Commitment to Resident Privacy</h2>
              <p>
                The Mau Estate ("we", "our", or "the hotel") is committed to safeguarding the confidentiality, security, and integrity of all resident information. We comply strictly with the Kenya Data Protection Act 2019 and international data privacy benchmarks including GDPR.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">2. Information We Collect</h2>
              <p>
                To provide tailored hospitality, reservation confirmations, and concierge logistics, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-dark">
                <li>Contact identifiers (Full legal name, email address, telephone number, country of residence).</li>
                <li>Stay preferences (Suite selections, check-in and check-out dates, dietary requirements, arrival times).</li>
                <li>Transactional records (Payment confirmation references, M-Pesa transaction identifiers).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">3. Payment Security & Integrity</h2>
              <p>
                We do not store credit card numbers on our servers. Card transactions are processed through PCI-DSS Level 1 certified gateways. Mobile payments through the Safaricom Daraja API are encrypted directly with Safaricom telecommunications network infrastructure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-forest font-medium">4. Contact our Data Protection Officer</h2>
              <p>
                For data access requests, rectification, or privacy inquiries, please contact our administrative desk at <a href="mailto:privacy@themauestate.com" className="text-gold underline">privacy@themauestate.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
