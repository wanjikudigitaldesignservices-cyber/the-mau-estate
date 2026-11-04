// ==============================================================================
// THE MAU ESTATE - CORE TYPE DEFINITIONS
// ==============================================================================

export type UserRole = 'guest' | 'staff' | 'manager' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  telephone?: string;
  country?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon_name: string;
  category: 'general' | 'comfort' | 'view' | 'bathroom' | 'technology';
  description?: string;
}

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  short_description: string;
  description: string;
  main_image_url: string;
  room_size_sqm: number;
  bed_type: string;
  max_adults: number;
  max_children: number;
  max_occupancy: number;
  base_rate_per_night: number;
  currency: string;
  total_inventory: number;
  is_published: boolean;
  is_demonstration: boolean; // Clearly labels demo room types until verified
  sort_order: number;
  amenities?: string[];
  gallery_images?: string[];
  created_at?: string;
}

export interface PhysicalRoom {
  id: string;
  room_type_id: string;
  room_number: string;
  floor_level: string;
  view_type: string;
  status: 'available' | 'maintenance' | 'blocked' | 'occupied';
  notes?: string;
}

export type ReservationStatus = 
  | 'pending_confirmation' 
  | 'confirmed' 
  | 'checked_in' 
  | 'checked_out' 
  | 'cancelled' 
  | 'no_show';

export type PaymentStatus = 
  | 'pending' 
  | 'partially_paid' 
  | 'successful' 
  | 'failed' 
  | 'refunded';

export type PaymentMethod = 'mpesa' | 'card' | 'bank_transfer' | 'cash';

export interface ReservationGuest {
  id?: string;
  reservation_id?: string;
  full_name: string;
  email: string;
  telephone: string;
  country: string;
  is_primary_guest?: boolean;
}

export interface Reservation {
  id: string;
  booking_reference: string;
  user_id?: string | null;
  status: ReservationStatus;
  payment_status: PaymentStatus;
  check_in_date: string;
  check_out_date: string;
  total_nights: number;
  adults_count: number;
  children_count: number;
  rooms_count: number;
  room_type_id: string;
  room_type?: RoomType;
  
  // Financial breakdown
  subtotal_rate: number;
  vat_tax_amount: number;
  tourism_levy_amount: number;
  service_charge_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  
  // Guest and notes
  guest?: ReservationGuest;
  special_requests?: string;
  estimated_arrival_time?: string;
  internal_admin_notes?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at?: string;
}

export interface PaymentTransaction {
  id: string;
  reservation_id: string;
  payment_method: PaymentMethod;
  transaction_reference?: string;
  provider_reference?: string;
  mpesa_receipt_number?: string;
  amount: number;
  currency: string;
  exchange_rate_to_kes: number;
  amount_kes?: number;
  status: PaymentStatus;
  provider_raw_response?: any;
  created_at: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image_url: string;
  discount_percentage: number;
  fixed_discount_amount?: number;
  valid_from: string;
  valid_until: string;
  min_nights: number;
  is_active: boolean;
  inclusions: string[];
}

export interface HotelExperience {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  duration: string;
  activity_level: string;
  pricing_info: string;
  is_highlighted: boolean;
  display_order: number;
}

export interface DiningOption {
  id: string;
  name: string;
  slug: string;
  cuisine_type: string;
  description: string;
  image_url: string;
  opening_hours: string;
  dress_code?: string;
  seating_capacity?: number;
  menu_sample_url?: string;
  display_order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'estate' | 'accommodation' | 'dining' | 'wellness' | 'experiences' | 'events';
  image_url: string;
  alt_text: string;
  is_featured: boolean;
  display_order: number;
}

export interface Enquiry {
  id: string;
  enquiry_type: 'general' | 'meetings_and_events' | 'weddings_and_celebrations' | 'dining' | 'spa';
  full_name: string;
  email: string;
  telephone?: string;
  event_date?: string;
  estimated_guests?: number;
  message: string;
  status: 'new' | 'in_progress' | 'responded' | 'closed';
  admin_notes?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  guest_name: string;
  guest_origin: string;
  stay_date?: string;
  room_stayed?: string;
  quote: string;
  rating: number;
  is_verified: boolean;
  display_order: number;
}

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  roomTypeId?: string;
  offerSlug?: string;
}

export interface PriceCalculationResult {
  nights: number;
  baseRatePerNight: number;
  subtotal: number;
  vatTaxAmount: number;         // 16% Kenya VAT
  tourismLevyAmount: number;    // 2% Kenya Tourism Training Levy
  serviceChargeAmount: number;  // 5% Service Charge
  discountAmount: number;
  totalAmount: number;
  currency: string;
  exchangeRateKes: number;
  totalAmountKes: number;
}

export interface HotelSiteSettings {
  hotel_name: string;
  tagline: string;
  location_address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  elevation: string;
  phone_primary: string;
  phone_secondary: string;
  email_reservations: string;
  email_concierge: string;
  email_events: string;
  announcement_bar: string;
  announcement_active: boolean;
  currency: string;
  currency_symbol: string;
  kes_exchange_rate: number;
  vat_percentage: number;
  tourism_levy_percentage: number;
  service_charge_percentage: number;
  mpesa_paybill: string;
  mpesa_account_prefix: string;
}
