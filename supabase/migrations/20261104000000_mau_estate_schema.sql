-- ==============================================================================
-- THE MAU ESTATE - LUXURY HOTEL & RESERVATION PLATFORM
-- DATABASE SCHEMA MIGRATION
-- Location: Mau Narok, Kenya
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. USER ROLES & PROFILES
-- ==============================================================================
CREATE TYPE app_role AS ENUM ('guest', 'staff', 'manager', 'admin');

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    telephone TEXT,
    country TEXT,
    avatar_url TEXT,
    role app_role DEFAULT 'guest' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    assigned_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, role)
);

-- ==============================================================================
-- 2. ACCOMMODATION: ROOM TYPES, ROOMS, AMENITIES, IMAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    main_image_url TEXT NOT NULL,
    room_size_sqm INTEGER NOT NULL CHECK (room_size_sqm > 0),
    bed_type TEXT NOT NULL,
    max_adults INTEGER NOT NULL DEFAULT 2 CHECK (max_adults > 0),
    max_children INTEGER NOT NULL DEFAULT 1 CHECK (max_children >= 0),
    max_occupancy INTEGER NOT NULL CHECK (max_occupancy >= max_adults),
    base_rate_per_night NUMERIC(10, 2) NOT NULL CHECK (base_rate_per_night > 0),
    currency TEXT DEFAULT 'USD' NOT NULL,
    total_inventory INTEGER NOT NULL DEFAULT 1 CHECK (total_inventory > 0),
    is_published BOOLEAN DEFAULT true NOT NULL,
    is_demonstration BOOLEAN DEFAULT true NOT NULL, -- Clearly tags demo rooms until physically verified
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL UNIQUE,
    floor_level TEXT,
    view_type TEXT,
    status TEXT DEFAULT 'available' NOT NULL CHECK (status IN ('available', 'maintenance', 'blocked', 'occupied')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS room_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    is_primary BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS room_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    icon_name TEXT,
    category TEXT DEFAULT 'general' NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS room_type_amenities (
    room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES room_amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (room_type_id, amenity_id)
);

-- ==============================================================================
-- 3. PRICING & CALENDAR AVAILABILITY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
    rate_name TEXT NOT NULL,
    rate_multiplier NUMERIC(4, 2) DEFAULT 1.0 NOT NULL, -- e.g. 1.25 for high season
    start_date DATE,
    end_date DATE,
    day_of_week INTEGER[], -- Array of days (0=Sunday to 6=Saturday) for weekend pricing
    is_active BOOLEAN DEFAULT true NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS room_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
    calendar_date DATE NOT NULL,
    booked_count INTEGER DEFAULT 0 NOT NULL CHECK (booked_count >= 0),
    blocked_count INTEGER DEFAULT 0 NOT NULL CHECK (blocked_count >= 0),
    override_rate NUMERIC(10, 2),
    is_closed_for_arrival BOOLEAN DEFAULT false NOT NULL,
    is_closed_for_departure BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (room_type_id, calendar_date)
);

-- ==============================================================================
-- 4. RESERVATIONS & BOOKING ENGINE
-- ==============================================================================
CREATE TYPE reservation_status AS ENUM (
    'pending_confirmation',
    'confirmed',
    'checked_in',
    'checked_out',
    'cancelled',
    'no_show'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'partially_paid',
    'successful',
    'failed',
    'refunded'
);

CREATE SEQUENCE IF NOT EXISTS reservation_ref_seq START WITH 1001;

CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Nullable for guest checkouts
    status reservation_status DEFAULT 'confirmed' NOT NULL,
    payment_status payment_status DEFAULT 'pending' NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_nights INTEGER NOT NULL CHECK (total_nights > 0),
    adults_count INTEGER NOT NULL CHECK (adults_count > 0),
    children_count INTEGER DEFAULT 0 NOT NULL CHECK (children_count >= 0),
    rooms_count INTEGER DEFAULT 1 NOT NULL CHECK (rooms_count > 0),
    room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE RESTRICT,
    
    -- Financial Breakdown
    subtotal_rate NUMERIC(10, 2) NOT NULL CHECK (subtotal_rate >= 0),
    vat_tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (vat_tax_amount >= 0), -- Kenya VAT 16%
    tourism_levy_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tourism_levy_amount >= 0), -- Kenya Tourism Levy 2%
    service_charge_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (service_charge_amount >= 0),
    discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    currency TEXT DEFAULT 'USD' NOT NULL,
    
    -- Special Notes & Internal CRM
    special_requests TEXT,
    estimated_arrival_time TEXT,
    internal_admin_notes TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CHECK (check_out_date > check_in_date)
);

CREATE TABLE IF NOT EXISTS reservation_guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT NOT NULL,
    country TEXT NOT NULL,
    is_primary_guest BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS reservation_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    allocated_room_number TEXT,
    assigned_at TIMESTAMPTZ,
    assigned_by UUID REFERENCES profiles(id)
);

-- ==============================================================================
-- 5. PAYMENTS & TRANSACTIONS (M-PESA DARAJA & CARDS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('mpesa', 'card', 'bank_transfer', 'cash')),
    transaction_reference TEXT UNIQUE,
    provider_reference TEXT, -- e.g. M-Pesa MerchantRequestID or CheckoutRequestID
    mpesa_receipt_number TEXT,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'USD' NOT NULL,
    exchange_rate_to_kes NUMERIC(10, 2) DEFAULT 128.50,
    amount_kes NUMERIC(10, 2),
    status payment_status DEFAULT 'pending' NOT NULL,
    provider_raw_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 6. CONTENT, SPECIAL OFFERS, EXPERIENCES, DINING & GALLERY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS special_offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    discount_percentage NUMERIC(5, 2) DEFAULT 0,
    fixed_discount_amount NUMERIC(10, 2) DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    min_nights INTEGER DEFAULT 1 NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    inclusions TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS hotel_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- Nature, Adventure, Cultural, Wellness, Culinary
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    duration TEXT,
    activity_level TEXT,
    pricing_info TEXT,
    is_highlighted BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS dining_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    cuisine_type TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    opening_hours TEXT NOT NULL,
    dress_code TEXT,
    seating_capacity INTEGER,
    menu_sample_url TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('estate', 'accommodation', 'dining', 'wellness', 'experiences', 'events')),
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('general', 'meetings_and_events', 'weddings_and_celebrations', 'dining', 'spa')),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    event_date DATE,
    estimated_guests INTEGER,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name TEXT NOT NULL,
    guest_origin TEXT NOT NULL,
    stay_date DATE,
    room_stayed TEXT,
    quote TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    is_verified BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'homepage_footer',
    status TEXT DEFAULT 'subscribed' NOT NULL CHECK (status IN ('subscribed', 'unsubscribed')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES profiles(id),
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    entity_id TEXT,
    actor_id UUID REFERENCES profiles(id),
    actor_email TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 7. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_room_types_slug ON room_types(slug);
CREATE INDEX IF NOT EXISTS idx_reservations_ref ON reservations(booking_reference);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_reservations_user ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservation_guests_res_id ON reservation_guests(reservation_id);
CREATE INDEX IF NOT EXISTS idx_room_availability_date ON room_availability(room_type_id, calendar_date);
CREATE INDEX IF NOT EXISTS idx_payments_res_id ON payments(reservation_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_ref ON payments(provider_reference);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- ==============================================================================
-- 8. AUTOMATIC BOOKING REFERENCE TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
DECLARE
    seq_val BIGINT;
    year_str TEXT;
BEGIN
    IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
        seq_val := nextval('reservation_ref_seq');
        year_str := TO_CHAR(CURRENT_DATE, 'YYYY');
        NEW.booking_reference := 'MNE-' || year_str || '-' || LPAD(seq_val::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_booking_reference ON reservations;
CREATE TRIGGER trigger_generate_booking_reference
BEFORE INSERT ON reservations
FOR EACH ROW
EXECUTE FUNCTION generate_booking_reference();

-- ==============================================================================
-- 9. ATOMIC RESERVATION TRANSACTION FUNCTION (PREVENTS OVERLAPPING BOOKINGS)
-- ==============================================================================
CREATE OR REPLACE FUNCTION create_atomic_reservation(
    p_room_type_id UUID,
    p_check_in DATE,
    p_check_out DATE,
    p_adults INTEGER,
    p_children INTEGER,
    p_rooms_count INTEGER,
    p_guest_name TEXT,
    p_guest_email TEXT,
    p_guest_phone TEXT,
    p_guest_country TEXT,
    p_special_requests TEXT,
    p_subtotal NUMERIC,
    p_vat NUMERIC,
    p_tourism_levy NUMERIC,
    p_service_charge NUMERIC,
    p_total NUMERIC,
    p_currency TEXT DEFAULT 'USD',
    p_user_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_total_inventory INTEGER;
    v_max_booked_in_range INTEGER;
    v_nights INTEGER;
    v_new_reservation_id UUID;
    v_booking_ref TEXT;
    v_curr_date DATE;
BEGIN
    -- Check basic date logic
    IF p_check_out <= p_check_in THEN
        RAISE EXCEPTION 'Check-out date must be after check-in date.';
    END IF;

    v_nights := (p_check_out - p_check_in);

    -- Lock room_types row to serialize concurrent reservations for this category
    SELECT total_inventory INTO v_total_inventory
    FROM room_types
    WHERE id = p_room_type_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Room type not found.';
    END IF;

    -- Calculate maximum overlap on any single day within the selected stay
    SELECT COALESCE(MAX(daily_count), 0) INTO v_max_booked_in_range
    FROM (
        SELECT d::DATE AS check_date,
               COALESCE(SUM(r.rooms_count), 0) AS daily_count
        FROM generate_series(p_check_in, p_check_out - INTERVAL '1 day', INTERVAL '1 day') d
        LEFT JOIN reservations r ON r.room_type_id = p_room_type_id
                                AND r.status IN ('confirmed', 'checked_in')
                                AND r.check_in_date <= d::DATE
                                AND r.check_out_date > d::DATE
        GROUP BY d::DATE
    ) daily_sub;

    IF (v_max_booked_in_range + p_rooms_count) > v_total_inventory THEN
        RAISE EXCEPTION 'Sorry, no available rooms for this category on the chosen dates.';
    END IF;

    -- Insert reservation
    INSERT INTO reservations (
        room_type_id,
        user_id,
        status,
        payment_status,
        check_in_date,
        check_out_date,
        total_nights,
        adults_count,
        children_count,
        rooms_count,
        subtotal_rate,
        vat_tax_amount,
        tourism_levy_amount,
        service_charge_amount,
        total_amount,
        currency,
        special_requests
    ) VALUES (
        p_room_type_id,
        p_user_id,
        'confirmed',
        'pending',
        p_check_in,
        p_check_out,
        v_nights,
        p_adults,
        p_children,
        p_rooms_count,
        p_subtotal,
        p_vat,
        p_tourism_levy,
        p_service_charge,
        p_total,
        p_currency,
        p_special_requests
    ) RETURNING id, booking_reference INTO v_new_reservation_id, v_booking_ref;

    -- Insert primary guest information
    INSERT INTO reservation_guests (
        reservation_id,
        full_name,
        email,
        telephone,
        country,
        is_primary_guest
    ) VALUES (
        v_new_reservation_id,
        p_guest_name,
        p_guest_email,
        p_guest_phone,
        p_guest_country,
        true
    );

    -- Update daily availability counts in room_availability table
    FOR v_curr_date IN SELECT generate_series(p_check_in, p_check_out - INTERVAL '1 day', INTERVAL '1 day')::DATE LOOP
        INSERT INTO room_availability (room_type_id, calendar_date, booked_count)
        VALUES (p_room_type_id, v_curr_date, p_rooms_count)
        ON CONFLICT (room_type_id, calendar_date)
        DO UPDATE SET booked_count = room_availability.booked_count + p_rooms_count,
                      updated_at = NOW();
    END LOOP;

    -- Return JSON payload of the created booking
    RETURN jsonb_build_object(
        'success', true,
        'reservation_id', v_new_reservation_id,
        'booking_reference', v_booking_ref,
        'check_in', p_check_in,
        'check_out', p_check_out,
        'total_amount', p_total,
        'status', 'confirmed'
    );
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_type_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user has staff or admin role
CREATE OR REPLACE FUNCTION is_hotel_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role IN ('staff', 'manager', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can view & update their own profile; staff can view all profiles
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id OR is_hotel_staff());

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Public readable content tables:
CREATE POLICY "Public read published room types" ON room_types
    FOR SELECT USING (is_published = true OR is_hotel_staff());

CREATE POLICY "Staff manage room types" ON room_types
    FOR ALL USING (is_hotel_staff());

CREATE POLICY "Public read room images" ON room_images
    FOR SELECT USING (true);

CREATE POLICY "Public read amenities" ON room_amenities
    FOR SELECT USING (true);

CREATE POLICY "Public read room type amenities" ON room_type_amenities
    FOR SELECT USING (true);

CREATE POLICY "Public read special offers" ON special_offers
    FOR SELECT USING (is_active = true OR is_hotel_staff());

CREATE POLICY "Public read hotel experiences" ON hotel_experiences
    FOR SELECT USING (true);

CREATE POLICY "Public read dining options" ON dining_options
    FOR SELECT USING (true);

CREATE POLICY "Public read gallery images" ON gallery_images
    FOR SELECT USING (true);

CREATE POLICY "Public read testimonials" ON testimonials
    FOR SELECT USING (is_verified = true OR is_hotel_staff());

CREATE POLICY "Public read site settings" ON site_settings
    FOR SELECT USING (true);

-- Reservations RLS:
-- Guests can read their own reservations if linked to their user_id
-- Staff can view and modify all reservations
CREATE POLICY "Users read own reservations" ON reservations
    FOR SELECT USING (auth.uid() = user_id OR is_hotel_staff());

CREATE POLICY "Staff manage reservations" ON reservations
    FOR ALL USING (is_hotel_staff());

-- Reservation guests: Guests can read their own info; Staff has full access
CREATE POLICY "Guest or staff read reservation_guests" ON reservation_guests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reservations r
            WHERE r.id = reservation_guests.reservation_id
            AND (r.user_id = auth.uid() OR is_hotel_staff())
        )
    );

CREATE POLICY "Staff manage reservation_guests" ON reservation_guests
    FOR ALL USING (is_hotel_staff());

-- Enquiries & Newsletter inserts are open to public
CREATE POLICY "Public create enquiries" ON enquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff read and manage enquiries" ON enquiries
    FOR ALL USING (is_hotel_staff());

CREATE POLICY "Public subscribe newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff view newsletter subscribers" ON newsletter_subscribers
    FOR ALL USING (is_hotel_staff());

-- Payments:
CREATE POLICY "Users read own payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reservations r
            WHERE r.id = payments.reservation_id
            AND (r.user_id = auth.uid() OR is_hotel_staff())
        )
    );

CREATE POLICY "Staff manage payments" ON payments
    FOR ALL USING (is_hotel_staff());
