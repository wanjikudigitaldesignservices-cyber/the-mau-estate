import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, Calendar, Users, Phone, Mail, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';

export const WeddingsCelebrationsPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [estimatedGuests, setEstimatedGuests] = useState(80);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await hotelDataService.createEnquiry({
      enquiry_type: 'weddings_and_celebrations',
      full_name: fullName,
      email,
      telephone,
      event_date: eventDate || undefined,
      estimated_guests: estimatedGuests,
      message,
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Weddings & Milestone Celebrations"
        description="Celebrate life's most unforgettable moments at The Mau Estate. Manicured highland lawns, romantic cedar sanctuaries, and bespoke banquet gastronomy in Mau Narok, Kenya."
        canonicalPath="/weddings-and-celebrations"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Heart className="w-3.5 h-3.5" />
              <span>Timeless Celebrations</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Weddings & Landmark Celebrations
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Say your vows high on the misty Kenyan ridge, framed by ancient cedar forests and boundless horizons.
            </p>
          </div>
        </div>

        {/* Narrative & Photo Highlights */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal">
                An intimate highland stage for your love story.
              </h2>
              <div className="w-16 h-[2px] bg-gold" />
              <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
                Whether envisioning an intimate elopement for two on a private escarpment overlook or a marquee celebration for up to 100 cherished guests on our manicured lawns, The Mau Estate delivers unmatched elegance and exclusivity.
              </p>
              <ul className="space-y-2.5 text-xs text-stone-dark">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Bridal preparation dressing salon inside the Presidential Suite</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Private lawn ceremonies facing Mount Longonot and the Great Rift Valley</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Handcrafted celebratory menus paired with fine African estate wines</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Helicopter grand departures and arrival coordination</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden shadow-luxury border border-ivory-dark aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury highland wedding reception setting at The Mau Estate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Wedding Inquiry Form */}
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-dark shadow-subtle max-w-3xl mx-auto">
            <div className="text-center space-y-2 mb-8">
              <h3 className="font-serif text-3xl text-forest">Inquire with Our Wedding Specialists</h3>
              <p className="text-stone text-xs font-light">
                Let us curate an unforgettable highland celebration tailored to your vision.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-ivory-light text-center space-y-4 rounded border border-gold/40">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-serif text-2xl text-forest">Wedding Inquiry Received</h4>
                <p className="text-xs text-stone max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-forest">{fullName}</span>. Our bespoke wedding coordinator has received your details and will contact you via <span className="font-semibold">{email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                      Couple / Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Grace Wambui & David Sterling"
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
                      placeholder="e.g. grace@example.com"
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="e.g. +254 722 000 000"
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Estimated Guest Attendance
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={120}
                    value={estimatedGuests}
                    onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Your Wedding Vision & Questions *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your celebration style, suite buyout needs, dietary requirements, or decorative vision..."
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Submitting Inquiry...' : 'Submit Wedding Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
