import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Compass, ArrowRight, CheckCircle2, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '../../config/siteConfig';
import { hotelDataService } from '../../services/hotelDataService';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await hotelDataService.subscribeNewsletter(email);
    setLoading(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-forest-deep text-ivory border-t border-forest-border pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-forest-surface">
          {/* Column 1: Brand & Narrative */}
          <div className="lg:col-span-2 space-y-6">
            <Logo variant="light" size="lg" />
            <p className="text-stone-light text-sm leading-relaxed max-w-sm font-light">
              A private highland sanctuary nestled on the misty western escarpment of Mau Narok, Kenya. Elevated 2,840 metres above sea level, offering refined seclusion, afro-montane nature, and bespoke hospitality.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-forest-surface text-gold text-xs tracking-wider uppercase font-medium border border-gold/20">
                <Compass className="w-3.5 h-3.5" />
                Elevation 2,840m • Mau Narok
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-surface hover:bg-gold hover:text-forest-deep flex items-center justify-center transition-all duration-300 text-stone-light"
                aria-label="The Mau Estate on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-surface hover:bg-gold hover:text-forest-deep flex items-center justify-center transition-all duration-300 text-stone-light"
                aria-label="The Mau Estate on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-surface hover:bg-gold hover:text-forest-deep flex items-center justify-center transition-all duration-300 text-stone-light"
                aria-label="The Mau Estate on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-surface hover:bg-gold hover:text-forest-deep flex items-center justify-center transition-all duration-300 text-stone-light"
                aria-label="The Mau Estate on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: The Estate Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white tracking-widest uppercase">The Estate</h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase font-light text-stone-light">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">Our Story & Heritage</Link>
              </li>
              <li>
                <Link to="/accommodation" className="hover:text-gold transition-colors">Suites & Sanctuaries</Link>
              </li>
              <li>
                <Link to="/dining" className="hover:text-gold transition-colors">Farm-to-Table Dining</Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-gold transition-colors">Highland Experiences</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-gold transition-colors">Curated Offers</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold transition-colors">Visual Archive</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Gatherings & Inquiries */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white tracking-widest uppercase">Gatherings</h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase font-light text-stone-light">
              <li>
                <Link to="/weddings-and-celebrations" className="hover:text-gold transition-colors">Weddings & Celebrations</Link>
              </li>
              <li>
                <Link to="/meetings-and-events" className="hover:text-gold transition-colors">Executive Retreats</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Concierge Desk</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition-colors">Guest FAQ</Link>
              </li>
              <li>
                <Link to="/booking" className="text-gold hover:text-gold-light transition-colors font-medium">Check Live Availability</Link>
              </li>
              <li>
                <Link to="/admin" className="text-stone/80 hover:text-white transition-colors">Staff & Admin Access</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white tracking-widest uppercase">Highland Gazette</h4>
            <p className="text-stone-light text-xs leading-relaxed font-light">
              Receive seasonal reflections, migratory wildlife sightings, and invitation-only retreat announcements.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-gold-light bg-forest-surface p-3 rounded border border-gold/30">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Thank you. You have been enrolled in our seasonal dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-forest-surface border border-forest-border text-white placeholder-stone-light text-xs px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-gold hover:bg-gold-light text-forest-deep rounded-sm flex items-center justify-center transition-colors disabled:opacity-50"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-light block">We honor your privacy. Unsubscribe at any time.</span>
              </form>
            )}

            <div className="pt-2 text-xs text-stone-light space-y-1.5 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span>Mau Narok Highland Ridge, Nakuru County, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{siteConfig.contact.phones.primary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{siteConfig.contact.emails.reservations}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal, Policies, Demonstration Disclosure */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-light gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} The Mau Estate. All rights reserved.</p>
            <p className="text-[11px] text-stone-light/70">
              Provisional Brand Identity. Photographic concepts are curated representations until verified on-site facility audit.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-wider">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gold transition-colors">Terms of Stay</Link>
            <Link to="/cancellation-policy" className="hover:text-gold transition-colors">Cancellation Policy</Link>
            <a href="/sitemap.xml" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
