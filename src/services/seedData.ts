import { RoomType, SpecialOffer, HotelExperience, DiningOption, GalleryItem, Testimonial, Reservation } from '../types';

export const initialRoomTypes: RoomType[] = [
  {
    id: '11111111-1111-1111-1111-111111111101',
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    tagline: 'Intimate highland sanctuary framed by indigenous cedar trees.',
    short_description: 'A peaceful haven featuring a private balcony, handcrafted timber accents, and sweeping views of the Mau forest.',
    description: 'The Deluxe Room at The Mau Estate offers a tranquil retreat surrounded by high-altitude indigenous forest. Thoughtfully appointed with sustainable cedar millwork, warm woollen textiles from local artisans, an en-suite bathroom with a rainfall shower, and a private verandah where the crisp morning highland air awakens your senses.',
    main_image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    room_size_sqm: 45,
    bed_type: 'Custom King Bed or Twin Royals',
    max_adults: 2,
    max_children: 1,
    max_occupancy: 3,
    base_rate_per_night: 420.00,
    currency: 'USD',
    total_inventory: 6,
    is_published: true,
    is_demonstration: true,
    sort_order: 1,
    amenities: [
      'Private cedar-lined verandah with forest vista',
      'Signature plush bathrobes & handmade botanical toiletries',
      'Highland wool blankets and hot water bottles at turndown',
      'Complimentary artisanal tea & pour-over coffee bar',
      'Rainfall walk-in stone shower',
      'High-speed fiber Wi-Fi & Bluetooth audio',
      'Safe and in-room refreshment bar'
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111111102',
    name: 'Executive Suite',
    slug: 'executive-suite',
    tagline: 'Spacious refinement with a private stone fireplace and valley vistas.',
    short_description: 'Featuring a separate lounge salon, wood-burning hearth, freestanding copper soaking tub, and expansive highland views.',
    description: 'Elevate your stay in the Executive Suite. Crafted for the discerning traveller seeking privacy and contemplation, this suite boasts an expansive bedroom, a dedicated salon centered around a handcrafted local stone fireplace, and floor-to-ceiling glass doors opening onto an oversized private terrace overlooking the misty forest canopy.',
    main_image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    room_size_sqm: 70,
    bed_type: 'Plush California King',
    max_adults: 2,
    max_children: 1,
    max_occupancy: 3,
    base_rate_per_night: 680.00,
    currency: 'USD',
    total_inventory: 4,
    is_published: true,
    is_demonstration: true,
    sort_order: 2,
    amenities: [
      'Private wood-burning cedar fireplace in lounge',
      'Freestanding deep copper soaking tub with valley view',
      'Separate executive living salon & dining nook',
      'Complimentary evening sommelier wine tasting in suite',
      'Double vanity bathroom with heated limestone floors',
      'Binoculars and birdwatching field guide',
      'Dedicated personal concierge service'
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111111103',
    name: 'Family Suite',
    slug: 'family-suite',
    tagline: 'A harmonious multi-room residence designed for shared moments.',
    short_description: 'Two en-suite bedrooms, interconnected living and dining salon, personal butler pantry, and manicured private garden.',
    description: 'Designed for families and groups travelling together, the Family Suite harmonizes shared social spaces with private sanctuaries. It comprises a master bedroom with deep soaking tub, a secondary en-suite twin bedroom, an expansive living salon with stone hearth, board games, books, and an enclosed garden lawn safe for younger explorers.',
    main_image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    room_size_sqm: 110,
    bed_type: 'One King & Two Twin Beds',
    max_adults: 4,
    max_children: 2,
    max_occupancy: 6,
    base_rate_per_night: 950.00,
    currency: 'USD',
    total_inventory: 3,
    is_published: true,
    is_demonstration: true,
    sort_order: 3,
    amenities: [
      'Two full en-suite master bedrooms with separate entrances',
      'Expansive communal living room with wood fireplace',
      'Private enclosed lawn & terrace for children to play',
      'Butler service pantry with espresso machine & snacks',
      'Custom children board games & nature scavenger hunt kits',
      'Two oversized soaking tubs and dual rain showers',
      'Private dining service arranged inside suite or garden'
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111111104',
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    tagline: 'The pinnacle of contemporary African luxury and panoramic isolation.',
    short_description: 'An ultra-exclusive estate lodge with private heated plunge pool, dedicated butler, private dining pavilion, and 360-degree highland views.',
    description: 'The crown jewel of The Mau Estate. Nestled on the most secluded crest of the property, the Presidential Suite features a palatial master sanctuary, expansive glass-walled lounge, private wine and malt cellar, dedicated 24-hour butler, private heated infinity plunge pool, and an outdoor fire pit overlooking the Great Rift Valley escarpment.',
    main_image_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    room_size_sqm: 190,
    bed_type: 'Grand Emperor Bed',
    max_adults: 4,
    max_children: 2,
    max_occupancy: 6,
    base_rate_per_night: 1800.00,
    currency: 'USD',
    total_inventory: 1,
    is_published: true,
    is_demonstration: true,
    sort_order: 4,
    amenities: [
      'Private heated outdoor infinity plunge pool',
      'Panoramic escarpment sunken fire lounge',
      'Private helipad access with discreet security escort',
      'Dedicated 24/7 private chef and royal butler team',
      'Private curated temperature-controlled wine & malt reserve',
      'Spa massage room inside suite',
      'Executive boardroom / private dining hall for 8'
    ]
  }
];

export const initialDiningOptions: DiningOption[] = [
  {
    id: '22222222-2222-2222-2222-222222222201',
    name: 'The Forest Hearth',
    slug: 'the-forest-hearth',
    cuisine_type: 'Contemporary Highland Farm-to-Table',
    description: 'Our flagship restaurant celebrates the fertile volcanic soils of Mau Narok with daily harvest menus, artisanal wood-fired preparations, and rare African estate wines.',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    opening_hours: 'Breakfast: 06:30 - 10:30 | Dinner: 18:30 - 22:30',
    dress_code: 'Smart Elegant',
    seating_capacity: 45,
    display_order: 1
  },
  {
    id: '22222222-2222-2222-2222-222222222202',
    name: 'The Cedar Lounge & Bar',
    slug: 'the-cedar-lounge',
    cuisine_type: 'Highland Malts, Botanical Cocktails & Afternoon Tea',
    description: 'Sink into deep leather club chairs beside blazing cedar fireplaces. Enjoy rare single malts, botanical infusions from our estate herb garden, and bespoke sundowners.',
    image_url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    opening_hours: 'Open Daily: 11:00 - 00:00',
    dress_code: 'Casual Refined',
    seating_capacity: 35,
    display_order: 2
  },
  {
    id: '22222222-2222-2222-2222-222222222203',
    name: 'The Greenhouse Bistro',
    slug: 'the-greenhouse-bistro',
    cuisine_type: 'Botanical Lunches & Artisan Bakery',
    description: 'Sunlit glasshouse dining surrounded by rare orchids and highland herbs. Light organic lunches, cold-pressed elixirs, and fresh sourdough baked at dawn.',
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    opening_hours: 'Daily: 11:30 - 17:00',
    dress_code: 'Resort Casual',
    seating_capacity: 30,
    display_order: 3
  }
];

export const initialExperiences: HotelExperience[] = [
  {
    id: '33333333-3333-3333-3333-333333333301',
    title: 'Mau Indigenous Forest Canopy Trek',
    slug: 'mau-forest-canopy-trek',
    category: 'Nature & Wildlife',
    description: 'Guided walking expedition through ancient afro-montane cedar forests. Spot rare Hartlaub’s Turacos, black-and-white colobus monkeys, and ancient medicinal flora.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    duration: '2.5 Hours',
    activity_level: 'Moderate',
    pricing_info: 'Complimentary for resident guests',
    is_highlighted: true,
    display_order: 1
  },
  {
    id: '33333333-3333-3333-3333-333333333302',
    title: 'High-Altitude Equestrian Trail Ride',
    slug: 'high-altitude-equestrian-ride',
    category: 'Adventure',
    description: 'Traverse open wheat and barley fields, golden highland ridges, and indigenous cedar trails atop majestic crossbred horses with panoramic Rift Valley views.',
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    duration: '2 Hours',
    activity_level: 'All Riding Levels',
    pricing_info: '$120 per guest (Includes guide and equipment)',
    is_highlighted: true,
    display_order: 2
  },
  {
    id: '33333333-3333-3333-3333-333333333303',
    title: 'Artisanal Highland Tea & Honey Tasting',
    slug: 'tea-and-honey-tasting',
    category: 'Culinary & Culture',
    description: 'Visit our estate tea terraces and highland apiary. Taste raw forest honey paired with loose-leaf single estate teas and freshly baked scones.',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    duration: '1.5 Hours',
    activity_level: 'Gentle',
    pricing_info: '$65 per guest',
    is_highlighted: true,
    display_order: 3
  },
  {
    id: '33333333-3333-3333-3333-333333333304',
    title: 'Rift Escarpment Stargazing by Firelight',
    slug: 'escarpment-stargazing',
    category: 'Evening Astronomy',
    description: 'Zero light-pollution highland skies revealed through our professional astronomical telescope. Accompanied by warm mulled wine, single malts, and astronomy guides.',
    image_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    duration: '1.5 Hours',
    activity_level: 'Relaxed',
    pricing_info: 'Complimentary nightly',
    is_highlighted: true,
    display_order: 4
  }
];

export const initialOffers: SpecialOffer[] = [
  {
    id: '44444444-4444-4444-4444-444444444401',
    title: 'Highland Romance Retreat',
    slug: 'highland-romance-retreat',
    tagline: 'An intimate high-altitude sanctuary for couples.',
    description: 'Immerse in romantic serenity with chilled vintage champagne on arrival, a 60-minute botanical couple’s massage, daily gourmet breakfast, and a private 4-course bush dinner under the African stars.',
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    discount_percentage: 15.00,
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    min_nights: 2,
    is_active: true,
    inclusions: [
      'Chilled bottle of vintage Champagne in suite',
      '60-minute couple herbal spa treatment',
      'Private 4-course lantern-lit bush dinner',
      'Daily farm-to-table breakfast in suite'
    ]
  },
  {
    id: '44444444-4444-4444-4444-444444444402',
    title: 'Serene Wellness & Restoration',
    slug: 'serene-wellness-weekend',
    tagline: 'Realign body and soul in the tranquil highlands.',
    description: 'Designed to counter urban fatigue. Includes private morning yoga overlooking the misty cedar forest, daily thermal hydrotherapy, personalized nutrition consultations, and all farm-to-table meals.',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    discount_percentage: 20.00,
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    min_nights: 3,
    is_active: true,
    inclusions: [
      'Daily sunrise mindfulness & highland yoga',
      'Full-board organic seasonal dining',
      'Two 90-minute therapeutic body rituals',
      'Private estate tea ceremony'
    ]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: '55555555-5555-5555-5555-555555555501',
    guest_name: 'Dr. Alistair & Elena Vance',
    guest_origin: 'Edinburgh, United Kingdom',
    stay_date: 'September 2026',
    room_stayed: 'Executive Suite',
    quote: 'The quiet majesty of Mau Narok combined with the estate’s flawless warmth made this the most rejuvenating stay of our African journey. The cedar fire in our room was sheer bliss.',
    rating: 5,
    is_verified: true,
    display_order: 1
  },
  {
    id: '55555555-5555-5555-5555-555555555502',
    guest_name: 'Wanjiku & Brian Kamau',
    guest_origin: 'Nairobi, Kenya',
    stay_date: 'October 2026',
    room_stayed: 'Presidential Suite',
    quote: 'We booked The Mau Estate for our tenth anniversary. From the helicopter arrival on the crest to the private bush dinner, every detail was executed with discreet luxury.',
    rating: 5,
    is_verified: true,
    display_order: 2
  },
  {
    id: '55555555-5555-5555-5555-555555555503',
    guest_name: 'Sophie Laurent',
    guest_origin: 'Geneva, Switzerland',
    stay_date: 'August 2026',
    room_stayed: 'Deluxe Room',
    quote: 'The air is crystal clear, the silence is profound, and the dining rivals any Michelin-starred country retreat in Europe. An authentic treasure.',
    rating: 5,
    is_verified: true,
    display_order: 3
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: '66666666-6666-6666-6666-666666666601',
    title: 'The Mau Estate Main Lodge at Dusk',
    category: 'estate',
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'The Mau Estate illuminated in the evening highland mist',
    is_featured: true,
    display_order: 1
  },
  {
    id: '66666666-6666-6666-6666-666666666602',
    title: 'Executive Suite Fireplace Salon',
    category: 'accommodation',
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Stone hearth and private lounge inside the Executive Suite',
    is_featured: true,
    display_order: 2
  },
  {
    id: '66666666-6666-6666-6666-666666666603',
    title: 'Farm-to-Table Dinner at The Forest Hearth',
    category: 'dining',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Candlelit dining table with organic culinary creation',
    is_featured: true,
    display_order: 3
  },
  {
    id: '66666666-6666-6666-6666-666666666604',
    title: 'Highland Botanical Spa Sanctuary',
    category: 'wellness',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Cedar outdoor thermal tub overlooking the forest',
    is_featured: true,
    display_order: 4
  },
  {
    id: '66666666-6666-6666-6666-666666666605',
    title: 'Equestrian Trails over Mau Narok Ridges',
    category: 'experiences',
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Guest on horseback atop the high-altitude estate ridge',
    is_featured: true,
    display_order: 5
  },
  {
    id: '66666666-6666-6666-6666-666666666606',
    title: 'Celebration Pavilion and Estate Lawn',
    category: 'events',
    image_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Luxury outdoor celebration setting on the manicured estate lawn',
    is_featured: true,
    display_order: 6
  }
];

export const initialSampleReservations: Reservation[] = [
  {
    id: '77777777-7777-7777-7777-777777777701',
    booking_reference: 'MNE-2026-001001',
    user_id: null,
    status: 'confirmed',
    payment_status: 'successful',
    check_in_date: '2026-11-12',
    check_out_date: '2026-11-15',
    total_nights: 3,
    adults_count: 2,
    children_count: 0,
    rooms_count: 1,
    room_type_id: '11111111-1111-1111-1111-111111111102',
    room_type: initialRoomTypes[1],
    subtotal_rate: 2040.00,
    vat_tax_amount: 326.40,
    tourism_levy_amount: 40.80,
    service_charge_amount: 102.00,
    discount_amount: 0,
    total_amount: 2509.20,
    currency: 'USD',
    guest: {
      full_name: 'Lady Catherine Montgomery',
      email: 'c.montgomery@highland-estates.co.uk',
      telephone: '+44 7700 900077',
      country: 'United Kingdom',
    },
    special_requests: 'Helicopter transfer from Wilson Airport requested. Prefer room on upper floor.',
    created_at: '2026-10-28T09:15:00Z',
  },
  {
    id: '77777777-7777-7777-7777-777777777702',
    booking_reference: 'MNE-2026-001002',
    user_id: null,
    status: 'pending_confirmation',
    payment_status: 'pending',
    check_in_date: '2026-11-20',
    check_out_date: '2026-11-23',
    total_nights: 3,
    adults_count: 2,
    children_count: 1,
    rooms_count: 1,
    room_type_id: '11111111-1111-1111-1111-111111111101',
    room_type: initialRoomTypes[0],
    subtotal_rate: 1260.00,
    vat_tax_amount: 201.60,
    tourism_levy_amount: 25.20,
    service_charge_amount: 63.00,
    discount_amount: 0,
    total_amount: 1549.80,
    currency: 'USD',
    guest: {
      full_name: 'Kiprono Koech',
      email: 'koech.kiprono@gmail.com',
      telephone: '+254 712 345 678',
      country: 'Kenya',
    },
    special_requests: 'Celebrating 5th wedding anniversary.',
    created_at: '2026-11-01T14:22:00Z',
  }
];
