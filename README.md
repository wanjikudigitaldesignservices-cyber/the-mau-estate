# THE MAU ESTATE
## Luxury Hotel & Private Sanctuary • Mau Narok, Kenya

> **"A world away. A feeling apart."**

A complete, production-ready luxury hotel website, reservation platform, and administrative management engine built for **The Mau Estate**, situated at an elevation of 2,840 metres on the western escarpment of the Great Rift Valley in Mau Narok, Nakuru County, Kenya.

---

## 1. Brand Identity & Visual System

- **Brand:** THE MAU ESTATE
- **Location:** Mau Narok Highland Ridge, Nakuru County, Kenya (Coordinates: `-0.6015° S, 35.9865° E`, Elevation: `2,840m`)
- **Tagline:** *A world away. A feeling apart.*
- **Personality:** Elegant, exclusive, peaceful, refined, welcoming, contemporary African luxury.

### Colour Palette
- **Deep Forest:** `#202B26` (Primary architectural dark)
- **Champagne Gold:** `#B69A70` (Accent, buttons, seals, monogram)
- **Warm Ivory:** `#E9E2D5` / `#F8F6F1` (Backgrounds, editorial canvases)
- **Stone Grey:** `#5C6258` (Editorial body typography, secondary borders)
- **Pure White:** `#FFFFFF` (Card surfaces, clean highlights)

### Typography
- **Headings & Display:** *Cormorant Garamond* (Serif)
- **Body & Numerical Interface:** *Manrope* (Sans-serif)

### Custom Luxury SVG Logo Suite
Custom mountain, horizon, and morning sun emblem with geometric luxury monograms:
- Primary Logo (`/public/icons/logo-primary.svg`)
- Light Logo (`/public/icons/logo-light.svg`)
- Dark Logo (`/public/icons/logo-dark.svg`)
- Favicon (`/public/icons/favicon.svg` and `/public/favicon.ico`)
- Apple Touch Icon (`/public/icons/apple-touch-icon.svg`)
- Social Media Avatar (`/public/icons/social-avatar.svg`)

---

## 2. Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Date-fns, Canvas-Confetti
- **Forms & Validation:** React Hook Form, Zod schema validation
- **Backend & Database:** Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security, Edge Functions)
- **Email Service:** Resend (HTML email templates dispatched via Edge Functions)
- **Payments:** Safaricom M-Pesa Daraja API 2.0 (Lipa Na M-Pesa STK push & callback webhook) + Card Gateway
- **Deployment:** Vercel SPA ready (`vercel.json`), GitHub Actions compatible

---

## 3. Platform Architecture & Route Sitemap

### Public Routes
- `/` — Homepage with all 15 luxury sections
- `/about` — The Story & Ecological Heritage of Mau Narok
- `/accommodation` — Luxury Suites & Sanctuaries Directory with occupancy filtering
- `/accommodation/:slug` — Dynamic Suite Detail page with interactive gallery, specifications, and direct reservation CTA
- `/dining` — Farm-to-Table Gastronomy (The Forest Hearth, Cedar Lounge, Greenhouse Bistro, Lantern-lit Bush Dining)
- `/experiences` — Signature Highland Pursuits (Forest Canopy Trek, Equestrian Trails, Artisanal Tea & Honey Tasting, Escarpment Stargazing)
- `/gallery` — Visual Archive with multi-category masonry filtering and lightbox modal
- `/offers` — Curated Seasonal Packages
- `/offers/:slug` — Individual Offer Detail with pre-applied discounts
- `/meetings-and-events` — Executive Retreats, Cedar Boardroom, and proposal request engine
- `/weddings-and-celebrations` — Highland Lawn and Pavilion Celebrations with tailored inquiry form
- `/contact` — Concierge desk, location coordinates, interactive Google Maps, and contact form
- `/faq` — Resident guidance, climate advice, packing list, and policies
- `/booking` — 4-Step Interactive Multi-step Reservation Engine
- `/booking/confirmation/:reference` — Resident Itinerary Voucher, printable confirmation, and instant M-Pesa / Card checkout
- `/privacy-policy` — Kenya Data Protection Act 2019 and GDPR compliance
- `/terms-and-conditions` — Terms of Stay and property etiquette
- `/cancellation-policy` — Resident cancellation schedules and refund guidelines

### Customer Account Portal (Protected)
- `/account` — Resident Dashboard, quick metrics, recent itineraries
- `/account/profile` — Resident particulars and contact details
- `/account/reservations` — Complete stay archive and voucher retrieval
- `/account/reservations/:reference` — Specific stay itinerary

### Hotel Administration Dashboard (Staff & Admin Only)
- `/admin` — Executive Overview KPIs (Revenue, Occupancy %, Arrivals, Departures, Pending Attention)
- `/admin/reservations` — Full reservations table with search, status filters, concierge notes, and CSV export
- `/admin/rooms` — Physical room inventory (Suites 101-401) with housekeeping/maintenance controls
- `/admin/room-types` — Category management, base rates, descriptions, inventory, and demonstration status
- `/admin/availability` — Monthly inventory matrix with blackout date toggles
- `/admin/rates` — Standard rates, seasonal surge multipliers, and weekend yield rules
- `/admin/guests` — Resident directory, lifetime spend, and concierge notes
- `/admin/offers` — Special package manager
- `/admin/gallery` — Photo archive media library
- `/admin/content` — Homepage announcement bar, brand copy, and contact info editor
- `/admin/enquiries` — Inbound lead and wedding proposal manager
- `/admin/analytics` — Revenue reports, stay trends, popular rooms, and channel share
- `/admin/settings` — Tax configurations (16% VAT, 2% Tourism Levy, 5% Service Charge), M-Pesa setup, and **live interactive preview of all 5 Resend HTML email templates**

### Authentication Routes
- `/login` — Resident sign-in with instant one-click preview buttons (Admin GM, Staff Desk, Resident)
- `/register` — Resident registration form
- `/forgot-password` — Password recovery dispatcher
- `/reset-password` — Password update form

---

## 4. Multi-Step Hotel Reservation Engine

The reservation engine adheres strictly to server-side financial and inventory integrity:
1. **Search:** Select arrival/departure dates, adult/child counts, and suite numbers.
2. **Availability Check:** Interrogates database reservations for overlapping confirmed bookings to guarantee room inventory is never overbooked.
3. **Select Sanctuary:** Presents only available rooms with calculated total costs, inclusions, and demonstration badges.
4. **Resident Information:** Zod-validated particulars (Full legal name, email, phone, country, estimated arrival time, special requests).
5. **Price Summary:** Computes base rate, nights, rooms, promotional discounts, 16% Kenya VAT, 2% Tourism Levy, 5% Service Charge, and KES currency conversion.
6. **Atomic Reservation:** Creates the reservation with reference `MNE-2026-XXXXXX` and automatically triggers guest and hotel admin notification emails.
7. **Confirmation & Payment:** Generates printable voucher, triggers celebratory confetti, and allows instant Lipa Na M-Pesa Online or Credit Card payment.

---

## 5. Resend Email Notifications

The application features 5 custom-designed luxury HTML email templates:
1. **Guest Reservation Acknowledgement**
2. **Hotel Administration Notification**
3. **Confirmed Reservation Email**
4. **Cancellation Notification**
5. **Payment Confirmation Receipt**

*Staff can view and test-send all 5 templates live inside `/admin/settings`.*

---

## 6. Safaricom M-Pesa Daraja 2.0 Integration

- **Protocol:** Lipa Na M-Pesa Online (STK Push)
- **Shortcode / Paybill:** `882100` (Account Reference: `MNE-XXXXXX`)
- **Currency:** Auto-converted from USD to KES at current bank exchange rates.
- **Harness:** Includes both live Supabase Edge Function handlers (`supabase/functions/mpesa-stk-push` and `supabase/functions/mpesa-callback`) and an interactive sandbox test simulator in the client.

---

## 7. Supabase Database Migrations

Run the SQL scripts located in `supabase/migrations/`:
- `20261104000000_mau_estate_schema.sql` — Creates tables, constraints, sequences, triggers, atomic RPC function, and Row Level Security policies.
- `20261104000001_mau_estate_seed.sql` — Seeds Deluxe Room, Executive Suite, Family Suite, Presidential Suite, dining venues, experiences, offers, and settings.

---

## 8. Quick Start & Local Setup

```bash
# 1. Clone or navigate to the project directory
cd the-mau-estate

# 2. Install dependencies
npm install

# 3. Copy environment configuration
cp .env.example .env

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 9. Vercel Production Deployment

```bash
# Build the production bundle
npm run build

# Deploy with Vercel CLI
vercel --prod
```

Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your Vercel Project Environment Variables.
