import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, LogOut, ArrowRight, Clock, ShieldCheck, CreditCard } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../hooks/useAuth';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AccountDashboard: React.FC = () => {
  const { user, logout, isStaff } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    hotelDataService.getReservations().then((all) => {
      // Filter reservations for current user email or name
      const userRes = all.filter(
        (r) =>
          r.user_id === user.id ||
          r.guest?.email?.toLowerCase() === user.email?.toLowerCase()
      );
      setReservations(userRes.length > 0 ? userRes : all.slice(0, 2)); // show sample if new user
      setLoading(false);
    });
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead title="Resident Account Dashboard" canonicalPath="/account" />
      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Profile Banner */}
          <div className="bg-white p-8 rounded-sm border border-ivory-dark shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-forest text-gold flex items-center justify-center font-serif text-2xl font-bold border-2 border-gold/40">
                {user.full_name?.charAt(0) || 'R'}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block">
                  Resident Account
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-forest">{user.full_name}</h1>
                <p className="text-xs text-stone-light">{user.email} &bull; Country: {user.country || 'Kenya'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isStaff && (
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-forest-deep"
                >
                  Admin Portal
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-ivory-dark text-stone hover:text-red-700 text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Account Sub-navigation */}
          <div className="flex items-center gap-4 border-b border-ivory-dark pb-3 text-xs uppercase tracking-wider font-semibold">
            <Link to="/account" className="text-forest border-b-2 border-forest pb-2">
              Overview
            </Link>
            <Link to="/account/reservations" className="text-stone-light hover:text-forest pb-2">
              My Reservations ({reservations.length})
            </Link>
            <Link to="/account/profile" className="text-stone-light hover:text-forest pb-2">
              Profile Particulars
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-light font-semibold block">
                Total Reservations
              </span>
              <div className="font-serif text-3xl font-bold text-forest">{reservations.length}</div>
              <span className="text-[11px] text-stone-light">Past & upcoming highland journeys</span>
            </div>

            <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-light font-semibold block">
                Sanctuary Status
              </span>
              <div className="font-serif text-2xl font-bold text-forest capitalize">
                {user.role === 'admin' ? 'General Manager' : 'Verified Resident'}
              </div>
              <span className="text-[11px] text-stone-light">Eligible for direct booking perks</span>
            </div>

            <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-light font-semibold block">
                Personal Concierge
              </span>
              <div className="text-xs text-forest font-semibold">+254 (0) 700 882 101</div>
              <a href="mailto:concierge@themauestate.com" className="text-[11px] text-gold hover:underline block">
                concierge@themauestate.com
              </a>
            </div>
          </div>

          {/* Recent Reservations */}
          <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
            <div className="p-6 border-b border-ivory-cream flex items-center justify-between">
              <h2 className="font-serif text-2xl text-forest font-medium">Recent Reservations</h2>
              <Link to="/booking" className="text-xs text-gold font-semibold uppercase tracking-wider hover:underline">
                + New Reservation
              </Link>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-stone">Loading reservations...</div>
            ) : reservations.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Calendar className="w-8 h-8 text-stone-light mx-auto" />
                <h3 className="font-serif text-xl text-forest">No Reservations Found</h3>
                <p className="text-xs text-stone-light">You have no active stays scheduled at The Mau Estate.</p>
                <Link
                  to="/booking"
                  className="inline-block px-5 py-2.5 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm mt-2"
                >
                  Reserve Your First Stay
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-ivory-cream">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-ivory-light/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-forest">
                          {res.booking_reference}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold tracking-wider ${
                            res.payment_status === 'successful'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {res.payment_status}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-forest">{res.room_type?.name || 'Luxury Suite'}</h4>
                      <p className="text-xs text-stone-light font-light">
                        {formatDate(res.check_in_date)} &rarr; {formatDate(res.check_out_date)} ({res.total_nights} Nights &bull; {res.adults_count} Adults)
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-light uppercase block">Total</span>
                        <span className="font-serif text-lg font-bold text-forest">
                          {formatCurrency(res.total_amount, res.currency)}
                        </span>
                      </div>

                      <Link
                        to={`/booking/confirmation/${res.booking_reference}`}
                        className="px-4 py-2 border border-forest/30 text-forest hover:border-gold hover:text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                      >
                        Voucher
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
