import { HotelSiteSettings } from '../types';

export const siteConfig = {
  brand: {
    name: 'THE MAU ESTATE',
    tagline: 'A world away. A feeling apart.',
    location: 'Mau Narok, Kenya',
    established: '2026',
    elevation: '2,840 metres above sea level',
  },
  colors: {
    forest: '#202B26',
    gold: '#B69A70',
    ivory: '#E9E2D5',
    stone: '#5C6258',
    white: '#FFFFFF',
  },
  contact: {
    address: 'Mau Narok Highland Ridge, Nakuru County, Kenya',
    coordinates: {
      lat: -0.6015,
      lng: 35.9865,
    },
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127638.1672688975!2d35.90848384218684!3d-0.5985834882193498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829e01101ffdb21%3A0xe54ef5fbe4261895!2sMau%20Narok!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske',
    phones: {
      primary: '+254 (0) 700 882 100',
      concierge: '+254 (0) 700 882 101',
      landline: '+254 (0) 20 440 2200',
    },
    emails: {
      reservations: 'reservations@themauestate.com',
      concierge: 'concierge@themauestate.com',
      events: 'events@themauestate.com',
      general: 'info@themauestate.com',
    },
    operatingHours: 'Reception & Concierge 24/7',
  },
  taxes: {
    vat: 0.16, // 16% Kenya VAT
    tourismLevy: 0.02, // 2% Kenya Tourism Training Levy
    serviceCharge: 0.05, // 5% Luxury Hospitality Service Charge
    kesExchangeRate: 128.50, // 1 USD = 128.50 KES
  },
  payments: {
    mpesaPaybill: '882100',
    mpesaAccountPrefix: 'MNE',
  },
  social: {
    instagram: 'https://instagram.com/themauestate',
    facebook: 'https://facebook.com/themauestate',
    twitter: 'https://twitter.com/themauestate',
    linkedin: 'https://linkedin.com/company/themauestate',
  },
};

export const defaultSiteSettings: HotelSiteSettings = {
  hotel_name: siteConfig.brand.name,
  tagline: siteConfig.brand.tagline,
  location_address: siteConfig.contact.address,
  coordinates: siteConfig.contact.coordinates,
  elevation: siteConfig.brand.elevation,
  phone_primary: siteConfig.contact.phones.primary,
  phone_secondary: siteConfig.contact.phones.landline,
  email_reservations: siteConfig.contact.emails.reservations,
  email_concierge: siteConfig.contact.emails.concierge,
  email_events: siteConfig.contact.emails.events,
  announcement_bar: 'Welcome to The Mau Estate. Now welcoming reservations for the 2026 Highland Season.',
  announcement_active: true,
  currency: 'USD',
  currency_symbol: '$',
  kes_exchange_rate: siteConfig.taxes.kesExchangeRate,
  vat_percentage: 16.0,
  tourism_levy_percentage: 2.0,
  service_charge_percentage: 5.0,
  mpesa_paybill: siteConfig.payments.mpesaPaybill,
  mpesa_account_prefix: siteConfig.payments.mpesaAccountPrefix,
};
