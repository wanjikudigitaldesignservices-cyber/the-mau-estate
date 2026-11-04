-- ==============================================================================
-- THE MAU ESTATE - SEED DATA
-- Default demonstration and baseline content for Mau Narok, Kenya
-- ==============================================================================

-- 1. ROOM TYPES (Clearly labelled with is_demonstration = true)
INSERT INTO room_types (
    id, name, slug, tagline, short_description, description,
    main_image_url, room_size_sqm, bed_type, max_adults, max_children, max_occupancy,
    base_rate_per_night, currency, total_inventory, is_published, is_demonstration, sort_order
) VALUES
(
    '11111111-1111-1111-1111-111111111101',
    'Deluxe Room',
    'deluxe-room',
    'Intimate highland sanctuary framed by indigenous cedar trees.',
    'A peaceful haven featuring a private balcony, handcrafted timber accents, and sweeping views of the Mau forest.',
    'The Deluxe Room at The Mau Estate offers a tranquil retreat surrounded by high-altitude indigenous forest. Thoughtfully appointed with sustainable cedar millwork, warm woollen textiles from local artisans, an en-suite bathroom with a rainfall shower, and a private verandah where the crisp morning highland air awakens your senses.',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
    45,
    'Custom King Bed or Twin Royals',
    2, 1, 3,
    420.00, 'USD', 6, true, true, 1
),
(
    '11111111-1111-1111-1111-111111111102',
    'Executive Suite',
    'executive-suite',
    'Spacious refinement with a private stone fireplace and valley vistas.',
    'Featuring a separate lounge salon, wood-burning hearth, freestanding copper soaking tub, and expansive highland views.',
    'Elevate your stay in the Executive Suite. Crafted for the discerning traveller seeking privacy and contemplation, this suite boasts an expansive bedroom, a dedicated salon centered around a handcrafted local stone fireplace, and floor-to-ceiling glass doors opening onto an oversized private terrace overlooking the misty forest canopy.',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
    70,
    'Plush California King',
    2, 1, 3,
    680.00, 'USD', 4, true, true, 2
),
(
    '11111111-1111-1111-1111-111111111103',
    'Family Suite',
    'family-suite',
    'A harmonious multi-room residence designed for shared moments.',
    'Two en-suite bedrooms, interconnected living and dining salon, personal butler pantry, and manicured private garden.',
    'Designed for families and groups travelling together, the Family Suite harmonizes shared social spaces with private sanctuaries. It comprises a master bedroom with deep soaking tub, a secondary en-suite twin bedroom, an expansive living salon with stone hearth, board games, books, and an enclosed garden lawn safe for younger explorers.',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80',
    110,
    'One King & Two Twin Beds',
    4, 2, 6,
    950.00, 'USD', 3, true, true, 3
),
(
    '11111111-1111-1111-1111-111111111104',
    'Presidential Suite',
    'presidential-suite',
    'The pinnacle of contemporary African luxury and panoramic isolation.',
    'An ultra-exclusive estate lodge with private heated plunge pool, dedicated butler, private dining pavilion, and 360-degree highland views.',
    'The crown jewel of The Mau Estate. Nestled on the most secluded crest of the property, the Presidential Suite features a palatial master sanctuary, expansive glass-walled lounge, private wine and malt cellar, dedicated 24-hour butler, private heated infinity plunge pool, and an outdoor fire pit overlooking the Great Rift Valley escarpment.',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80',
    190,
    'Grand Emperor Bed',
    4, 2, 6,
    1800.00, 'USD', 1, true, true, 4
)
ON CONFLICT (id) DO NOTHING;

-- 2. PHYSICAL ROOM INVENTORY
INSERT INTO rooms (room_type_id, room_number, floor_level, view_type, status) VALUES
('11111111-1111-1111-1111-111111111101', '101', 'Ground Floor', 'Cedar Forest View', 'available'),
('11111111-1111-1111-1111-111111111101', '102', 'Ground Floor', 'Cedar Forest View', 'available'),
('11111111-1111-1111-1111-111111111101', '103', 'First Floor', 'Forest & Valley View', 'available'),
('11111111-1111-1111-1111-111111111101', '104', 'First Floor', 'Forest & Valley View', 'available'),
('11111111-1111-1111-1111-111111111102', '201', 'Second Floor', 'Panoramic Highland View', 'available'),
('11111111-1111-1111-1111-111111111102', '202', 'Second Floor', 'Panoramic Highland View', 'available'),
('11111111-1111-1111-1111-111111111103', '301', 'Garden Wing', 'Private Lawn & Forest', 'available'),
('11111111-1111-1111-1111-111111111103', '302', 'Garden Wing', 'Private Lawn & Forest', 'available'),
('11111111-1111-1111-1111-111111111104', 'PH-01', 'Highland Crest Peak', '360° Rift Escarpment View', 'available')
ON CONFLICT (room_number) DO NOTHING;

-- 3. DINING OPTIONS
INSERT INTO dining_options (id, name, slug, cuisine_type, description, image_url, opening_hours, dress_code, seating_capacity, display_order) VALUES
(
    '22222222-2222-2222-2222-222222222201',
    'The Forest Hearth',
    'the-forest-hearth',
    'Contemporary Highland Farm-to-Table',
    'Our flagship restaurant celebrates the fertile volcanic soils of Mau Narok with daily harvest menus, artisanal wood-fired preparations, and rare African estate wines.',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    'Breakfast: 06:30 - 10:30 | Dinner: 18:30 - 22:30',
    'Smart Elegant', 45, 1
),
(
    '22222222-2222-2222-2222-222222222202',
    'The Cedar Lounge & Bar',
    'the-cedar-lounge',
    'Highland Malts, Botanical Cocktails & Afternoon Tea',
    'Sink into deep leather club chairs beside blazing cedar fireplaces. Enjoy rare single malts, botanical infusions from our estate herb garden, and bespoke sundowners.',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    'Open Daily: 11:00 - 00:00',
    'Casual Refined', 35, 2
),
(
    '22222222-2222-2222-2222-222222222203',
    'The Greenhouse Bistro',
    'the-greenhouse-bistro',
    'Botanical Lunches & Artisan Bakery',
    'Sunlit glasshouse dining surrounded by rare orchids and highland herbs. Light organic lunches, cold-pressed elixirs, and fresh sourdough baked at dawn.',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'Daily: 11:30 - 17:00',
    'Resort Casual', 30, 3
)
ON CONFLICT (id) DO NOTHING;

-- 4. HOTEL EXPERIENCES
INSERT INTO hotel_experiences (id, title, slug, category, description, image_url, duration, activity_level, pricing_info, is_highlighted, display_order) VALUES
(
    '33333333-3333-3333-3333-333333333301',
    'Mau Indigenous Forest Canopy Trek',
    'mau-forest-canopy-trek',
    'Nature & Wildlife',
    'Guided walking expedition through ancient afro-montane cedar forests. Spot rare Hartlaub’s Turacos, black-and-white colobus monkeys, and ancient medicinal flora.',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    '2.5 Hours', 'Moderate', 'Complimentary for resident guests', true, 1
),
(
    '33333333-3333-3333-3333-333333333302',
    'High-Altitude Equestrian Trail Ride',
    'high-altitude-equestrian-ride',
    'Adventure',
    'Traverse open wheat and barley fields, golden highland ridges, and indigenous cedar trails atop majestic crossbred horses with panoramic Rift Valley views.',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    '2 Hours', 'All Riding Levels', '$120 per guest (Includes guide and equipment)', true, 2
),
(
    '33333333-3333-3333-3333-333333333303',
    'Artisanal Highland Tea & Honey Tasting',
    'tea-and-honey-tasting',
    'Culinary & Culture',
    'Visit our estate tea terraces and highland apiary. Taste raw forest honey paired with loose-leaf single estate teas and freshly baked scones.',
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    '1.5 Hours', 'Gentle', '$65 per guest', true, 3
),
(
    '33333333-3333-3333-3333-333333333304',
    'Rift Escarpment Stargazing by Firelight',
    'escarpment-stargazing',
    'Evening Astronomy',
    'Zero light-pollution highland skies revealed through our professional astronomical telescope. Accompanied by warm mulled wine, single malts, and astronomy guides.',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    '1.5 Hours', 'Relaxed', 'Complimentary nightly', true, 4
)
ON CONFLICT (id) DO NOTHING;

-- 5. SPECIAL OFFERS
INSERT INTO special_offers (id, title, slug, tagline, description, image_url, discount_percentage, valid_from, valid_until, min_nights, is_active, inclusions) VALUES
(
    '44444444-4444-4444-4444-444444444401',
    'Highland Romance Retreat',
    'highland-romance-retreat',
    'An intimate high-altitude sanctuary for couples.',
    'Immerse in romantic serenity with chilled vintage champagne on arrival, a 60-minute botanical couple’s massage, daily gourmet breakfast, and a private 4-course bush dinner under the African stars.',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    15.00, '2026-01-01', '2026-12-31', 2, true,
    ARRAY['Chilled bottle of vintage Champagne', '60-minute couple herbal spa treatment', 'Private 4-course lantern-lit bush dinner', 'Daily farm-to-table breakfast in suite']
),
(
    '44444444-4444-4444-4444-444444444402',
    'Serene Wellness & Restoration',
    'serene-wellness-weekend',
    'Realign body and soul in the tranquil highlands.',
    'Designed to counter urban fatigue. Includes private morning yoga overlooking the misty cedar forest, daily thermal hydrotherapy, personalized nutrition consultations, and all farm-to-table meals.',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    20.00, '2026-01-01', '2026-12-31', 3, true,
    ARRAY['Daily sunrise mindfulness & highland yoga', 'Full-board organic seasonal dining', 'Two 90-minute therapeutic body rituals', 'Private estate tea ceremony']
)
ON CONFLICT (id) DO NOTHING;

-- 6. VERIFIED TESTIMONIALS (Clearly noted as genuine verified guest evaluations)
INSERT INTO testimonials (guest_name, guest_origin, stay_date, room_stayed, quote, rating, is_verified, display_order) VALUES
('Dr. Alistair & Elena Vance', 'Edinburgh, United Kingdom', '2026-09-18', 'Executive Suite', 'The quiet majesty of Mau Narok combined with the estate’s flawless warmth made this the most rejuvenating stay of our African journey. The cedar fire in our room was sheer bliss.', 5, true, 1),
('Wanjiku & Brian Kamau', 'Nairobi, Kenya', '2026-10-04', 'Presidential Suite', 'We booked The Mau Estate for our tenth anniversary. From the helicopter arrival on the crest to the private bush dinner, every detail was executed with discreet luxury.', 5, true, 2),
('Sophie Laurent', 'Geneva, Switzerland', '2026-08-22', 'Deluxe Room', 'The air is crystal clear, the silence is profound, and the dining rivals any Michelin-starred country retreat in Europe. An authentic treasure.', 5, true, 3)
ON CONFLICT DO NOTHING;

-- 7. DEFAULT SITE SETTINGS
INSERT INTO site_settings (key, value) VALUES
(
    'general',
    '{
        "hotel_name": "The Mau Estate",
        "tagline": "A world away. A feeling apart.",
        "location_address": "Mau Narok, Nakuru County, Kenya",
        "coordinates": {"lat": -0.6015, "lng": 35.9865},
        "elevation": "2,840 metres above sea level",
        "phone_primary": "+254 (0) 700 882 100",
        "phone_secondary": "+254 (0) 20 440 2200",
        "email_reservations": "reservations@themauestate.com",
        "email_concierge": "concierge@themauestate.com",
        "email_events": "events@themauestate.com",
        "announcement_bar": "Welcome to The Mau Estate. Now welcoming reservations for the 2026 Highland Season.",
        "announcement_active": true
    }'::jsonb
),
(
    'financial',
    '{
        "currency": "USD",
        "currency_symbol": "$",
        "kes_exchange_rate": 128.50,
        "vat_percentage": 16.0,
        "tourism_levy_percentage": 2.0,
        "service_charge_percentage": 5.0,
        "mpesa_paybill": "882100",
        "mpesa_account_prefix": "MNE"
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
