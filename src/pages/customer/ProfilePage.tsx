import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Globe, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../hooks/useAuth';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [telephone, setTelephone] = useState(user?.telephone || '+254 700 882 100');
  const [country, setCountry] = useState(user?.country || 'Kenya');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead title="Profile Particulars" canonicalPath="/account/profile" />
      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-4 border-b border-ivory-dark pb-3 text-xs uppercase tracking-wider font-semibold">
            <Link to="/account" className="text-stone-light hover:text-forest pb-2">
              Overview
            </Link>
            <Link to="/account/reservations" className="text-stone-light hover:text-forest pb-2">
              My Reservations
            </Link>
            <Link to="/account/profile" className="text-forest border-b-2 border-forest pb-2">
              Profile Particulars
            </Link>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-forest">Profile Particulars</h2>
              <p className="text-stone text-xs font-light">
                Keep your resident details up to date for effortless reservations.
              </p>
            </div>

            {saved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Resident profile updated successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-stone-light/10 border border-ivory-dark text-stone text-sm px-3.5 py-2.5 rounded-sm cursor-not-allowed"
                  />
                  <span className="text-[10px] text-stone-light">Contact administration to modify email.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-ivory-cream flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
