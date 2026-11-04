import React, { useState } from 'react';
import { Briefcase, Users, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';

export const MeetingsEventsPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [estimatedGuests, setEstimatedGuests] = useState(15);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await hotelDataService.createEnquiry({
      enquiry_type: 'meetings_and_events',
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
        title="Executive Retreats & Board Meetings"
        description="Host executive board meetings, corporate leadership retreats, and intimate conferences high in the tranquil mountain atmosphere of The Mau Estate."
        canonicalPath="/meetings-and-events"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Executive Gatherings</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Meetings & Executive Retreats
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Quiet seclusion, high-speed fiber connectivity, private dining, and panoramic horizons designed for strategic clarity.
            </p>
          </div>
        </div>

        {/* Venues & Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">Capacity: 16 Board Members</span>
              <h3 className="font-serif text-2xl text-forest">The Cedar Boardroom</h3>
              <p className="text-stone text-xs leading-relaxed font-light">
                Ergonomic leather chairs, natural daylight, 85-inch 4K conferencing screen, dedicated barista station, and private breakout verandah.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">Capacity: 40 Attendees</span>
              <h3 className="font-serif text-2xl text-forest">Highland Crest Pavilion</h3>
              <p className="text-stone text-xs leading-relaxed font-light">
                Expansive glass-walled plenary space overlooking the Rift Valley escarpment, equipped with state-of-the-art acoustic tuning and private terrace.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">Exclusive Buyout</span>
              <h3 className="font-serif text-2xl text-forest">Full Estate Buyout</h3>
              <p className="text-stone text-xs leading-relaxed font-light">
                Reserve all 14 residential suites, private dining rooms, helipad, and estate grounds for complete corporate confidentiality.
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-dark shadow-subtle max-w-3xl mx-auto">
            <div className="text-center space-y-2 mb-8">
              <h3 className="font-serif text-3xl text-forest">Submit an Event Proposal Request</h3>
              <p className="text-stone text-xs font-light">
                Our executive retreats manager will prepare a custom quotation and itinerary within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-ivory-light text-center space-y-4 rounded border border-gold/40">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-serif text-2xl text-forest">Retreat Inquiry Received</h4>
                <p className="text-xs text-stone max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-forest">{fullName}</span>. Our corporate events director has received your request and will follow up promptly via <span className="font-semibold">{email}</span>.
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
                      placeholder="e.g. Marcus Thorne"
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                      Corporate / Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. mthorne@company.org"
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                      Telephone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="e.g. +254 700 000 000"
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                      Target Event Date
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
                    Estimated Delegates / Guests
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={60}
                    value={estimatedGuests}
                    onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Retreat Objectives & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your meeting agenda, AV equipment needs, private dining requirements, or team excursion interests..."
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Submitting Request...' : 'Send Event Enquiry'}
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
