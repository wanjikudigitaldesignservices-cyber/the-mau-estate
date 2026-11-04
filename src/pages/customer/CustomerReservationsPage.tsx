import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../hooks/useAuth';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const CustomerReservationsPage: React.FC = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelDataService.getReservations().then((all) => {
      const userRes = user
        ? all.filter(
            (r) =>
              r.user_id === user.id ||
              r.guest?.email?.toLowerCase() === user.email?.toLowerCase()
          )
        : all;
      setReservations(userRes.length > 0 ? userRes : all.slice(0, 3));
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead title="My Stays & Itineraries" canonicalPath="/account/reservations" />
      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-4 border-b border-ivory-dark pb-3 text-xs uppercase tracking-wider font-semibold">
            <Link to="/account" className="text-stone-light hover:text-forest pb-2">
              Overview
            </Link>
            <Link to="/account/reservations" className="text-forest border-b-2 border-forest pb-2">
              My Reservations ({reservations.length})
            </Link>
            <Link to="/account/profile" className="text-stone-light hover:text-forest pb-2">
              Profile Particulars
            </Link>
          </div>

          <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
            <div className="p-6 border-b border-ivory-cream flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-forest">All Reservations</h1>
                <p className="text-xs text-stone-light font-light">Complete history of your stays at The Mau Estate</p>
              </div>

              <Link
                to="/booking"
                className="px-4 py-2 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-forest-deep transition-all"
              >
                + Book Sanctuary
              </Link>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-stone">Retrieving reservations...</div>
            ) : reservations.length === 0 ? (
              <div className="p-12 text-center text-xs text-stone-light">No reservations on file.</div>
            ) : (
              <div className="divide-y divide-ivory-cream">
                {reservations.map((res) => (
                  <div key={res.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-forest">{res.booking_reference}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                            res.payment_status === 'successful'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {res.payment_status}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl text-forest">{res.room_type?.name || 'Luxury Suite'}</h4>
                      <p className="text-xs text-stone-light">
                        {formatDate(res.check_in_date)} &rarr; {formatDate(res.check_out_date)} ({res.total_nights} Nights)
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-light uppercase block">Total</span>
                        <span className="font-serif text-xl font-bold text-forest">
                          {formatCurrency(res.total_amount, res.currency)}
                        </span>
                      </div>

                      <Link
                        to={`/booking/confirmation/${res.booking_reference}`}
                        className="px-4 py-2 bg-ivory-light hover:bg-ivory text-forest text-xs font-semibold uppercase tracking-wider rounded-sm border border-ivory-dark transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-gold" />
                        <span>View</span>
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
