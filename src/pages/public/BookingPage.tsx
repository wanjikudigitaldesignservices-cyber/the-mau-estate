import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { 
  Calendar, 
  Users, 
  Home, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Bed, 
  Maximize2, 
  Check, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { BookingProgressSteps } from '../../components/booking/BookingProgressSteps';
import { StepGuestInfo, GuestFormData } from '../../components/booking/StepGuestInfo';
import { StepPriceSummary } from '../../components/booking/StepPriceSummary';
import { DemonstrationBadge } from '../../components/common/DemonstrationBadge';
import { hotelDataService } from '../../services/hotelDataService';
import { BookingEngine } from '../../services/bookingEngine';
import { ResendService } from '../../services/resendService';
import { useAuth } from '../../hooks/useAuth';
import { RoomType, SpecialOffer, PriceCalculationResult, Reservation } from '../../types';
import { formatCurrency, formatKes } from '../../utils/formatters';
import { siteConfig } from '../../config/siteConfig';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const today = new Date();
  const defaultCheckIn = searchParams.get('checkIn') || format(addDays(today, 7), 'yyyy-MM-dd');
  const defaultCheckOut = searchParams.get('checkOut') || format(addDays(today, 10), 'yyyy-MM-dd');
  const defaultAdults = Number(searchParams.get('adults')) || 2;
  const defaultChildren = Number(searchParams.get('children')) || 0;
  const defaultRooms = Number(searchParams.get('roomsCount')) || 1;
  const preselectedRoomTypeId = searchParams.get('roomTypeId');
  const preselectedOfferSlug = searchParams.get('offerSlug');

  // Step state (1: Search/Availability, 2: Select Room, 3: Guest Details, 4: Summary/Confirm)
  const [step, setStep] = useState<number>(preselectedRoomTypeId ? 3 : 1);

  // Search parameters
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(defaultChildren);
  const [roomsCount, setRoomsCount] = useState(defaultRooms);

  // Data states
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [existingReservations, setExistingReservations] = useState<Reservation[]>([]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [appliedOffer, setAppliedOffer] = useState<SpecialOffer | undefined>(undefined);
  const [guestData, setGuestData] = useState<GuestFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Load rooms and offers
  useEffect(() => {
    Promise.all([
      hotelDataService.getRoomTypes(),
      hotelDataService.getReservations(),
      hotelDataService.getSpecialOffers(),
    ]).then(([rooms, reservations, offers]) => {
      setRoomTypes(rooms);
      setExistingReservations(reservations);
      setSpecialOffers(offers);

      // Handle query param preselection
      if (preselectedRoomTypeId) {
        const found = rooms.find((r) => r.id === preselectedRoomTypeId);
        if (found) {
          setSelectedRoom(found);
          setStep(3); // jump to guest info if room already chosen
        }
      }

      if (preselectedOfferSlug) {
        const foundOffer = offers.find((o) => o.slug === preselectedOfferSlug);
        if (foundOffer) {
          setAppliedOffer(foundOffer);
        }
      }

      setLoading(false);
    });
  }, [preselectedRoomTypeId, preselectedOfferSlug]);

  const nights = BookingEngine.calculateNights(checkIn, checkOut);

  // Compute pricing if room selected
  const pricing: PriceCalculationResult | null = selectedRoom
    ? BookingEngine.calculatePricing(
        selectedRoom,
        checkIn,
        checkOut,
        roomsCount,
        appliedOffer?.discount_percentage || 0
      )
    : null;

  // Handler for searching
  const handlePerformSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      setBookingError('Check-out date must be after check-in date.');
      return;
    }
    setBookingError(null);
    setStep(2);
  };

  // Handler for selecting room
  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
    setStep(3);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Handler for guest info submit
  const handleGuestInfoSubmit = (data: GuestFormData) => {
    setGuestData(data);
    setStep(4);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Final confirmation execution
  const handleConfirmReservation = async () => {
    if (!selectedRoom || !guestData) return;
    setBookingInProgress(true);
    setBookingError(null);

    try {
      const res = await hotelDataService.createReservation(
        selectedRoom,
        checkIn,
        checkOut,
        adults,
        children,
        roomsCount,
        guestData.fullName,
        guestData.email,
        guestData.phone,
        guestData.country,
        guestData.specialRequests,
        appliedOffer?.discount_percentage || 0,
        user?.id
      );

      if (!res.success || !res.reservation) {
        setBookingError(res.error || 'Unable to complete reservation at this time.');
        setBookingInProgress(false);
        return;
      }

      // Dispatch automated Resend notification emails
      await Promise.all([
        ResendService.sendEmail('guest_acknowledgement', guestData.email, res.reservation),
        ResendService.sendEmail('admin_alert', siteConfig.contact.emails.reservations, res.reservation),
      ]);

      // Navigate to confirmation page
      navigate(`/booking/confirmation/${res.reservation.booking_reference}`);
    } catch (err: any) {
      setBookingError(err.message || 'An unexpected error occurred while booking.');
      setBookingInProgress(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Check Availability & Reserve Your Stay"
        description="Check live room availability, select your luxury suite, and reserve your high-altitude sanctuary at The Mau Estate, Mau Narok."
        canonicalPath="/booking"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-20">
        {/* Page Header */}
        <div className="bg-forest text-white py-12 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Highland Sanctuary Reservation Engine</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide">
              Reserve Your Stay at The Mau Estate
            </h1>
            <p className="text-stone-light text-xs sm:text-sm font-light max-w-xl mx-auto">
              Real-time inventory verification, guaranteed direct rates, and personalized arrival concierge.
            </p>
          </div>
        </div>

        {/* Progress Stepper */}
        <BookingProgressSteps
          currentStep={step}
          onStepClick={(targetStep) => {
            if (targetStep < step) setStep(targetStep);
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {bookingError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2 max-w-3xl mx-auto">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Booking Notice:</span>
                <span>{bookingError}</span>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 1: DATES & GUEST SEARCH
              ========================================================================= */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-8">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl text-forest font-normal">
                  Step 1: Select Stay Itinerary
                </h2>
                <p className="text-stone text-xs font-light">
                  Choose your arrival and departure dates to inspect real-time suite availability.
                </p>
              </div>

              <form onSubmit={handlePerformSearch} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>Check-In Date *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      min={format(today, 'yyyy-MM-dd')}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>Check-Out Date *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold" />
                      <span>Adults *</span>
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                    >
                      {[1, 2, 3, 4, 6, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold" />
                      <span>Children (0-12 yrs)</span>
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Child{n > 1 ? 'ren' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-gold" />
                      <span>Suites Required *</span>
                    </label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Suite{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-ivory-dark flex items-center justify-between">
                  <div className="text-xs text-stone">
                    Selected stay: <span className="font-semibold text-forest">{nights} Night{nights > 1 ? 's' : ''}</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-forest hover:bg-forest-deep text-gold font-semibold text-xs tracking-[0.18em] uppercase rounded-sm transition-all shadow-sm"
                  >
                    <span>Check Suite Availability</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =========================================================================
              STEP 2: SELECT AVAILABLE ROOM
              ========================================================================= */}
          {step === 2 && (
            <div className="space-y-8">
              {/* Filter bar summary */}
              <div className="bg-white p-4 sm:p-5 rounded-sm border border-ivory-dark shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-stone">
                  <div>
                    <span className="text-stone-light uppercase text-[10px] block">Dates:</span>
                    <span className="font-semibold text-forest">{checkIn} &rarr; {checkOut} ({nights} Nights)</span>
                  </div>
                  <div>
                    <span className="text-stone-light uppercase text-[10px] block">Residents:</span>
                    <span className="font-semibold text-forest">{adults} Adults{children > 0 ? `, ${children} Children` : ''} ({roomsCount} Suite)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-gold hover:text-gold-dark underline font-medium"
                >
                  Change Dates
                </button>
              </div>

              {/* Room Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {roomTypes.map((room) => {
                  const isAvailable = BookingEngine.isRoomAvailable(
                    room,
                    checkIn,
                    checkOut,
                    roomsCount,
                    existingReservations
                  );

                  const roomPricing = BookingEngine.calculatePricing(
                    room,
                    checkIn,
                    checkOut,
                    roomsCount,
                    appliedOffer?.discount_percentage || 0
                  );

                  return (
                    <div
                      key={room.id}
                      className={`bg-white rounded-sm border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                        isAvailable
                          ? 'border-ivory-dark/80 shadow-subtle hover:shadow-luxury'
                          : 'border-red-100 opacity-60 bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-forest-surface">
                          <img
                            src={room.main_image_url}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                          {room.is_demonstration && <DemonstrationBadge variant="overlay" />}

                          {!isAvailable && (
                            <div className="absolute inset-0 bg-forest-deep/75 backdrop-blur-sm flex items-center justify-center p-4">
                              <span className="px-4 py-2 bg-red-800 text-white text-xs font-semibold uppercase tracking-wider rounded-sm">
                                Fully Reserved for Selected Dates
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-6 sm:p-7 space-y-4">
                          <div className="space-y-1">
                            <h3 className="font-serif text-2xl text-forest font-medium">{room.name}</h3>
                            <p className="text-stone text-xs leading-relaxed font-light">
                              {room.short_description}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 py-3 border-y border-ivory-cream text-[11px] text-stone">
                            <div className="flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                              <span>{room.room_size_sqm} m²</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Bed className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                              <span className="truncate">{room.bed_type.split(' ')[0]}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                              <span>Max {room.max_occupancy}</span>
                            </div>
                          </div>

                          {/* Teaser amenities */}
                          <ul className="space-y-1 text-xs text-stone-dark">
                            {room.amenities?.slice(0, 3).map((a, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="w-3 h-3 text-gold flex-shrink-0" />
                                <span className="truncate">{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pricing Footer */}
                      <div className="p-6 sm:p-7 pt-4 border-t border-ivory-cream bg-ivory-light/30 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[10px] uppercase text-stone-light tracking-wider">
                            Total for {nights} Night{nights > 1 ? 's' : ''} (excl. tax)
                          </div>
                          <div className="font-serif text-2xl font-bold text-forest">
                            {formatCurrency(roomPricing.subtotal, roomPricing.currency)}
                          </div>
                          <div className="text-[11px] text-gold font-medium">
                            ≈ {formatKes(roomPricing.totalAmountKes)} incl. tax
                          </div>
                        </div>

                        {isAvailable ? (
                          <button
                            type="button"
                            onClick={() => handleSelectRoom(room)}
                            className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold tracking-wider uppercase rounded-sm transition-all shadow-sm"
                          >
                            Select Suite
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="px-6 py-2.5 bg-stone-light/30 text-stone-light text-xs font-semibold uppercase rounded-sm cursor-not-allowed"
                          >
                            Unavailable
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 3: GUEST PARTICULARS
              ========================================================================= */}
          {step === 3 && selectedRoom && (
            <StepGuestInfo
              initialData={guestData || undefined}
              onSubmit={handleGuestInfoSubmit}
              onBack={() => setStep(2)}
            />
          )}

          {/* =========================================================================
              STEP 4: REVIEW & CONFIRM
              ========================================================================= */}
          {step === 4 && selectedRoom && guestData && pricing && (
            <StepPriceSummary
              room={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              children={children}
              roomsCount={roomsCount}
              pricing={pricing}
              appliedOffer={appliedOffer}
              guestName={guestData.fullName}
              guestEmail={guestData.email}
              guestPhone={guestData.phone}
              guestCountry={guestData.country}
              specialRequests={guestData.specialRequests}
              onBack={() => setStep(3)}
              onConfirm={handleConfirmReservation}
              loading={bookingInProgress}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
