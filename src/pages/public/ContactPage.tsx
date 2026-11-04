import React, { useState } from 'react';
import { Mail, Phone, MapPin, Compass, Clock, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { siteConfig } from '../../config/siteConfig';
import { hotelDataService } from '../../services/hotelDataService';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await hotelDataService.createEnquiry({
      enquiry_type: 'general',
      full_name: fullName,
      email,
      telephone,
      message,
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Contact Concierge & Reservations"
        description="Connect with The Mau Estate concierge desk. Reservations, private air transfers, bespoke dining, and estate location details in Mau Narok, Kenya."
        canonicalPath="/contact"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Personalized Concierge</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Connect with The Estate
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Our reservations desk and resident concierge are at your service for stay planning, transfers, and private inquiries.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Contact Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl text-forest font-normal">Direct Inquiries</h2>
                <p className="text-stone text-xs sm:text-sm font-light leading-relaxed">
                  We look forward to curating your highland retreat. Reach our reservations team directly or submit a message.
                </p>
              </div>

              <div className="space-y-5 text-xs text-stone">
                {/* Physical Location */}
                <div className="p-5 rounded-sm bg-white border border-ivory-dark flex items-start gap-4">
                  <div className="p-2.5 rounded bg-ivory-light text-gold flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-forest uppercase tracking-wider text-[11px]">Location Address</h4>
                    <p className="leading-relaxed">{siteConfig.contact.address}</p>
                    <span className="text-[10px] text-gold font-mono block">
                      Elevation: 2,840m &bull; Coordinates: -0.6015° S, 35.9865° E
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="p-5 rounded-sm bg-white border border-ivory-dark flex items-start gap-4">
                  <div className="p-2.5 rounded bg-ivory-light text-gold flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-forest uppercase tracking-wider text-[11px]">Direct Telephone Lines</h4>
                    <p>Primary Reservations: <span className="font-medium text-forest">{siteConfig.contact.phones.primary}</span></p>
                    <p>Estate Concierge Desk: <span className="font-medium text-forest">{siteConfig.contact.phones.concierge}</span></p>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-sm bg-white border border-ivory-dark flex items-start gap-4">
                  <div className="p-2.5 rounded bg-ivory-light text-gold flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-forest uppercase tracking-wider text-[11px]">Email Communications</h4>
                    <p>Reservations: <a href={`mailto:${siteConfig.contact.emails.reservations}`} className="text-gold hover:underline">{siteConfig.contact.emails.reservations}</a></p>
                    <p>Concierge: <a href={`mailto:${siteConfig.contact.emails.concierge}`} className="text-gold hover:underline">{siteConfig.contact.emails.concierge}</a></p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-5 rounded-sm bg-white border border-ivory-dark flex items-start gap-4">
                  <div className="p-2.5 rounded bg-ivory-light text-gold flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-forest uppercase tracking-wider text-[11px]">Resident Reception</h4>
                    <p>Reception & Concierge: <span className="font-medium text-forest">24 Hours / 7 Days</span></p>
                    <p>Reservations Desk: 07:00 - 21:00 EAT (UTC+3)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl text-forest font-normal">Send a Message</h3>
                  <p className="text-stone text-xs font-light">
                    Have a question or request? Please fill in the form below and we will respond promptly.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 bg-ivory-light text-center space-y-4 rounded border border-gold/40">
                    <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                    <h4 className="font-serif text-2xl text-forest">Message Dispatched</h4>
                    <p className="text-xs text-stone max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-forest">{fullName}</span>. Your inquiry has been received by our guest relations team. We will respond to <span className="font-semibold">{email}</span> shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Alistair Vance"
                          className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. guest@example.com"
                          className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="e.g. +254 700 882 100"
                        className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                        Message or Inquiry *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can our concierge assist your upcoming stay..."
                        className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-gold" />
                      <span>{loading ? 'Transmitting...' : 'Dispatch Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
