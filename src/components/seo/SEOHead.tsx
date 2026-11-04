import React, { useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'hotel' | 'article';
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'A world away. A feeling apart. Experience contemporary African luxury nestled in the tranquil highland beauty of Mau Narok, Kenya.',
  canonicalPath = '',
  image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  type = 'website',
  breadcrumbs,
  structuredData,
}) => {
  const fullTitle = title 
    ? `${title} | The Mau Estate • Mau Narok, Kenya` 
    : 'The Mau Estate | Luxury Hotel & Private Sanctuary | Mau Narok, Kenya';
    
  const canonicalUrl = `https://themauestate.com${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMeta('description', description);

    // OpenGraph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', image, true);
    setMeta('og:type', type, true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 3. Inject Structured Data JSON-LD
    const baseHotelSchema = {
      '@context': 'https://schema.org',
      '@type': ['Hotel', 'LodgingBusiness'],
      name: 'The Mau Estate',
      description,
      url: 'https://themauestate.com',
      image,
      telephone: siteConfig.contact.phones.primary,
      email: siteConfig.contact.emails.reservations,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Highland Ridge',
        addressLocality: 'Mau Narok',
        addressRegion: 'Nakuru County',
        postalCode: '20111',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.contact.coordinates.lat,
        longitude: siteConfig.contact.coordinates.lng,
      },
      priceRange: '$$$$',
      currenciesAccepted: 'USD, KES',
      paymentAccepted: 'Credit Card, M-Pesa',
      checkinTime: '14:00',
      checkoutTime: '11:00',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'High-Altitude Cedar Forest', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Farm-to-Table Restaurant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Artisanal Tea & Honey Tasting', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Rift Valley Escarpment View', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Private Stone Fireplaces', value: true },
      ],
    };

    let scriptTag = document.getElementById('seo-json-ld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-json-ld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const schemasToInject: any[] = [baseHotelSchema];

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: b.name,
          item: b.item.startsWith('http') ? b.item : `https://themauestate.com${b.item}`,
        })),
      };
      schemasToInject.push(breadcrumbSchema);
    }

    if (structuredData) {
      schemasToInject.push(structuredData);
    }

    scriptTag.textContent = JSON.stringify(schemasToInject);

    return () => {
      // Clean up on unmount if needed
    };
  }, [fullTitle, description, canonicalUrl, image, type, breadcrumbs, structuredData]);

  return null;
};
