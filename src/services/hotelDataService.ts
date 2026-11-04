import { 
  RoomType, 
  SpecialOffer, 
  HotelExperience, 
  DiningOption, 
  GalleryItem, 
  Testimonial, 
  Reservation, 
  Enquiry, 
  HotelSiteSettings, 
  PaymentTransaction,
  ReservationStatus,
  PaymentStatus
} from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { defaultSiteSettings } from '../config/siteConfig';
import { 
  initialRoomTypes, 
  initialOffers, 
  initialExperiences, 
  initialDiningOptions, 
  initialGallery, 
  initialTestimonials, 
  initialSampleReservations 
} from './seedData';
import { BookingEngine } from './bookingEngine';

// Local storage storage keys
const STORAGE_KEYS = {
  ROOMS: 'mau_estate_rooms_v1',
  OFFERS: 'mau_estate_offers_v1',
  EXPERIENCES: 'mau_estate_experiences_v1',
  DINING: 'mau_estate_dining_v1',
  GALLERY: 'mau_estate_gallery_v1',
  TESTIMONIALS: 'mau_estate_testimonials_v1',
  RESERVATIONS: 'mau_estate_reservations_v1',
  ENQUIRIES: 'mau_estate_enquiries_v1',
  SETTINGS: 'mau_estate_settings_v1',
  NEWSLETTER: 'mau_estate_newsletter_v1',
  PAYMENTS: 'mau_estate_payments_v1',
};

class HotelDataService {
  private getLocal<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(item);
    } catch {
      return fallback;
    }
  }

  private setLocal<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist to localStorage', e);
    }
  }

  // ============================================================================
  // ROOM TYPES
  // ============================================================================
  public async getRoomTypes(): Promise<RoomType[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('room_types')
          .select('*')
          .order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) return data as RoomType[];
      } catch (err) {
        console.warn('Supabase fetch room_types failed, falling back to local store', err);
      }
    }
    return this.getLocal<RoomType[]>(STORAGE_KEYS.ROOMS, initialRoomTypes);
  }

  public async getRoomTypeBySlug(slug: string): Promise<RoomType | undefined> {
    const rooms = await this.getRoomTypes();
    return rooms.find((r) => r.slug === slug);
  }

  public async updateRoomType(updatedRoom: RoomType): Promise<RoomType> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('room_types')
          .update(updatedRoom)
          .eq('id', updatedRoom.id);
      } catch (err) {
        console.warn('Supabase update room_type failed', err);
      }
    }
    const rooms = this.getLocal<RoomType[]>(STORAGE_KEYS.ROOMS, initialRoomTypes);
    const index = rooms.findIndex((r) => r.id === updatedRoom.id);
    if (index !== -1) {
      rooms[index] = updatedRoom;
    } else {
      rooms.push(updatedRoom);
    }
    this.setLocal(STORAGE_KEYS.ROOMS, rooms);
    return updatedRoom;
  }

  public async createRoomType(newRoom: Omit<RoomType, 'id'>): Promise<RoomType> {
    const id = 'rt_' + Date.now();
    const created: RoomType = { ...newRoom, id };
    const rooms = this.getLocal<RoomType[]>(STORAGE_KEYS.ROOMS, initialRoomTypes);
    rooms.push(created);
    this.setLocal(STORAGE_KEYS.ROOMS, rooms);
    return created;
  }

  // ============================================================================
  // SPECIAL OFFERS
  // ============================================================================
  public async getSpecialOffers(): Promise<SpecialOffer[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('special_offers')
          .select('*')
          .eq('is_active', true);
        if (!error && data && data.length > 0) return data as SpecialOffer[];
      } catch (err) {
        console.warn('Supabase offers failed, using local store', err);
      }
    }
    return this.getLocal<SpecialOffer[]>(STORAGE_KEYS.OFFERS, initialOffers);
  }

  public async getSpecialOfferBySlug(slug: string): Promise<SpecialOffer | undefined> {
    const offers = await this.getSpecialOffers();
    return offers.find((o) => o.slug === slug);
  }

  // ============================================================================
  // EXPERIENCES & DINING
  // ============================================================================
  public async getExperiences(): Promise<HotelExperience[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('hotel_experiences')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as HotelExperience[];
      } catch (err) {
        console.warn('Supabase experiences failed, using local store', err);
      }
    }
    return this.getLocal<HotelExperience[]>(STORAGE_KEYS.EXPERIENCES, initialExperiences);
  }

  public async getDiningOptions(): Promise<DiningOption[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('dining_options')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as DiningOption[];
      } catch (err) {
        console.warn('Supabase dining failed, using local store', err);
      }
    }
    return this.getLocal<DiningOption[]>(STORAGE_KEYS.DINING, initialDiningOptions);
  }

  // ============================================================================
  // GALLERY & TESTIMONIALS
  // ============================================================================
  public async getGalleryImages(category?: string): Promise<GalleryItem[]> {
    const all = this.getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    if (!category || category === 'all') return all;
    return all.filter((img) => img.category === category);
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    return this.getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  }

  // ============================================================================
  // SITE SETTINGS
  // ============================================================================
  public async getSiteSettings(): Promise<HotelSiteSettings> {
    return this.getLocal<HotelSiteSettings>(STORAGE_KEYS.SETTINGS, defaultSiteSettings);
  }

  public async updateSiteSettings(settings: Partial<HotelSiteSettings>): Promise<HotelSiteSettings> {
    const current = await this.getSiteSettings();
    const updated = { ...current, ...settings };
    this.setLocal(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // ============================================================================
  // RESERVATIONS & BOOKINGS
  // ============================================================================
  public async getReservations(): Promise<Reservation[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select(`
            *,
            room_type:room_types(*),
            guests:reservation_guests(*)
          `)
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data.map((item: any) => ({
            ...item,
            guest: item.guests?.[0] || undefined,
          })) as Reservation[];
        }
      } catch (err) {
        console.warn('Supabase reservations fetch failed, using local store', err);
      }
    }
    return this.getLocal<Reservation[]>(STORAGE_KEYS.RESERVATIONS, initialSampleReservations);
  }

  public async getReservationByReference(ref: string): Promise<Reservation | undefined> {
    const all = await this.getReservations();
    return all.find((r) => r.booking_reference.toUpperCase() === ref.trim().toUpperCase());
  }

  public async createReservation(
    room: RoomType,
    checkIn: string,
    checkOut: string,
    adults: number,
    children: number,
    roomsCount: number,
    guestName: string,
    guestEmail: string,
    guestPhone: string,
    guestCountry: string,
    specialRequests?: string,
    offerDiscountPct: number = 0,
    userId?: string
  ): Promise<{ success: boolean; reservation?: Reservation; error?: string }> {
    const existingReservations = await this.getReservations();

    // Check availability
    const available = BookingEngine.isRoomAvailable(
      room,
      checkIn,
      checkOut,
      roomsCount,
      existingReservations
    );

    if (!available) {
      return {
        success: false,
        error: 'The selected room category is unfortunately fully reserved for the requested dates.',
      };
    }

    // Compute pricing server-side
    const pricing = BookingEngine.calculatePricing(
      room,
      checkIn,
      checkOut,
      roomsCount,
      offerDiscountPct
    );

    const bookingRef = BookingEngine.generateBookingReference();
    const newReservation: Reservation = {
      id: 'res_' + Date.now(),
      booking_reference: bookingRef,
      user_id: userId || null,
      status: 'confirmed',
      payment_status: 'pending',
      check_in_date: checkIn,
      check_out_date: checkOut,
      total_nights: pricing.nights,
      adults_count: adults,
      children_count: children,
      rooms_count: roomsCount,
      room_type_id: room.id,
      room_type: room,
      subtotal_rate: pricing.subtotal,
      vat_tax_amount: pricing.vatTaxAmount,
      tourism_levy_amount: pricing.tourismLevyAmount,
      service_charge_amount: pricing.serviceChargeAmount,
      discount_amount: pricing.discountAmount,
      total_amount: pricing.totalAmount,
      currency: pricing.currency,
      guest: {
        full_name: guestName,
        email: guestEmail,
        telephone: guestPhone,
        country: guestCountry,
      },
      special_requests: specialRequests || '',
      created_at: new Date().toISOString(),
    };

    // Attempt Supabase RPC atomic booking if configured
    if (isSupabaseConfigured) {
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc('create_atomic_reservation', {
          p_room_type_id: room.id,
          p_check_in: checkIn,
          p_check_out: checkOut,
          p_adults: adults,
          p_children: children,
          p_rooms_count: roomsCount,
          p_guest_name: guestName,
          p_guest_email: guestEmail,
          p_guest_phone: guestPhone,
          p_guest_country: guestCountry,
          p_special_requests: specialRequests || '',
          p_subtotal: pricing.subtotal,
          p_vat: pricing.vatTaxAmount,
          p_tourism_levy: pricing.tourismLevyAmount,
          p_service_charge: pricing.serviceChargeAmount,
          p_total: pricing.totalAmount,
          p_currency: pricing.currency,
          p_user_id: userId || null,
        });

        if (!rpcError && rpcData?.booking_reference) {
          newReservation.booking_reference = rpcData.booking_reference;
          newReservation.id = rpcData.reservation_id;
        }
      } catch (e) {
        console.warn('Supabase atomic RPC failed, persisting to local store fallback', e);
      }
    }

    // Persist to local store
    const all = this.getLocal<Reservation[]>(STORAGE_KEYS.RESERVATIONS, initialSampleReservations);
    all.unshift(newReservation);
    this.setLocal(STORAGE_KEYS.RESERVATIONS, all);

    return {
      success: true,
      reservation: newReservation,
    };
  }

  public async updateReservationStatus(
    id: string,
    status: ReservationStatus,
    adminNotes?: string,
    paymentStatus?: PaymentStatus
  ): Promise<boolean> {
    const all = this.getLocal<Reservation[]>(STORAGE_KEYS.RESERVATIONS, initialSampleReservations);
    const index = all.findIndex((r) => r.id === id);
    if (index === -1) return false;

    all[index].status = status;
    if (adminNotes !== undefined) all[index].internal_admin_notes = adminNotes;
    if (paymentStatus !== undefined) all[index].payment_status = paymentStatus;
    all[index].updated_at = new Date().toISOString();

    this.setLocal(STORAGE_KEYS.RESERVATIONS, all);

    if (isSupabaseConfigured) {
      try {
        const updates: any = { status, updated_at: new Date().toISOString() };
        if (adminNotes !== undefined) updates.internal_admin_notes = adminNotes;
        if (paymentStatus !== undefined) updates.payment_status = paymentStatus;
        await supabase.from('reservations').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase update reservation failed', err);
      }
    }

    return true;
  }

  // ============================================================================
  // ENQUIRIES & CONTACT
  // ============================================================================
  public async getEnquiries(): Promise<Enquiry[]> {
    return this.getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, [
      {
        id: 'enq_01',
        enquiry_type: 'weddings_and_celebrations',
        full_name: 'Grace Wambui & David Sterling',
        email: 'grace.wambui@outlook.com',
        telephone: '+254 722 100 200',
        event_date: '2026-12-14',
        estimated_guests: 80,
        message: 'Interested in booking the estate grounds and private pavilion for a weekend wedding celebration.',
        status: 'new',
        created_at: '2026-11-02T11:00:00Z',
      },
      {
        id: 'enq_02',
        enquiry_type: 'meetings_and_events',
        full_name: 'Marcus Thorne',
        email: 'mthorne@pan-african-ventures.org',
        telephone: '+254 733 445 566',
        event_date: '2026-11-28',
        estimated_guests: 18,
        message: 'Executive board retreat with private dining and high-altitude hiking breaks.',
        status: 'in_progress',
        admin_notes: 'Sent preliminary proposal with boardroom and suite buyout rates.',
        created_at: '2026-10-30T16:30:00Z',
      }
    ]);
  }

  public async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'created_at'>): Promise<Enquiry> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq_' + Date.now(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const all = await this.getEnquiries();
    all.unshift(newEnquiry);
    this.setLocal(STORAGE_KEYS.ENQUIRIES, all);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('enquiries').insert([newEnquiry]);
      } catch (err) {
        console.warn('Supabase enquiry insert failed', err);
      }
    }

    return newEnquiry;
  }

  public async updateEnquiryStatus(id: string, status: Enquiry['status'], adminNotes?: string): Promise<boolean> {
    const all = await this.getEnquiries();
    const index = all.findIndex((e) => e.id === id);
    if (index === -1) return false;

    all[index].status = status;
    if (adminNotes !== undefined) all[index].admin_notes = adminNotes;
    this.setLocal(STORAGE_KEYS.ENQUIRIES, all);
    return true;
  }

  // ============================================================================
  // NEWSLETTER
  // ============================================================================
  public async subscribeNewsletter(email: string): Promise<boolean> {
    const list = this.getLocal<string[]>(STORAGE_KEYS.NEWSLETTER, []);
    if (!list.includes(email.toLowerCase())) {
      list.push(email.toLowerCase());
      this.setLocal(STORAGE_KEYS.NEWSLETTER, list);
    }
    return true;
  }

  // ============================================================================
  // PAYMENTS & TRANSACTIONS
  // ============================================================================
  public async recordPayment(payment: PaymentTransaction): Promise<boolean> {
    const all = this.getLocal<PaymentTransaction[]>(STORAGE_KEYS.PAYMENTS, []);
    all.unshift(payment);
    this.setLocal(STORAGE_KEYS.PAYMENTS, all);

    // Update corresponding reservation
    if (payment.status === 'successful') {
      await this.updateReservationStatus(payment.reservation_id, 'confirmed', undefined, 'successful');
    }

    return true;
  }

  public async getPayments(): Promise<PaymentTransaction[]> {
    return this.getLocal<PaymentTransaction[]>(STORAGE_KEYS.PAYMENTS, [
      {
        id: 'pay_01',
        reservation_id: '77777777-7777-7777-7777-777777777701',
        payment_method: 'card',
        transaction_reference: 'TXN-CARD-984210',
        amount: 2509.20,
        currency: 'USD',
        exchange_rate_to_kes: 128.50,
        amount_kes: 322432,
        status: 'successful',
        created_at: '2026-10-28T09:20:00Z',
      }
    ]);
  }
}

export const hotelDataService = new HotelDataService();
