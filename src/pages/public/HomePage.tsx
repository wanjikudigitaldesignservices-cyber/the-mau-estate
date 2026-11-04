import React from 'react';
import { AnnouncementBar } from '../../components/common/AnnouncementBar';
import { Navbar } from '../../components/navigation/Navbar';
import { HeroSection } from '../../components/homepage/HeroSection';
import { IntroSection } from '../../components/homepage/IntroSection';
import { RoomsShowcase } from '../../components/homepage/RoomsShowcase';
import { ExperiencesShowcase } from '../../components/homepage/ExperiencesShowcase';
import { DiningShowcase } from '../../components/homepage/DiningShowcase';
import { WellnessShowcase } from '../../components/homepage/WellnessShowcase';
import { DestinationSection } from '../../components/homepage/DestinationSection';
import { GalleryPreview } from '../../components/homepage/GalleryPreview';
import { OffersSection } from '../../components/homepage/OffersSection';
import { TestimonialsSection } from '../../components/homepage/TestimonialsSection';
import { LocationSection } from '../../components/homepage/LocationSection';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest selection:bg-gold selection:text-white">
      <SEOHead
        title="The Mau Estate | Luxury Hotel & Private Sanctuary | Mau Narok, Kenya"
        description="A world away. A feeling apart. Experience contemporary African luxury in Mau Narok, Kenya. Private suites, farm-to-table dining, and highland wildlife."
        canonicalPath="/"
      />

      {/* Section 1: Announcement Bar */}
      <AnnouncementBar />

      {/* Section 2: Navigation */}
      <Navbar transparentOnTop={true} />

      <main className="flex-1">
        {/* Section 3: Hero & Search Widget */}
        <HeroSection />

        {/* Section 4: Hotel Introduction */}
        <IntroSection />

        {/* Section 5: Accommodation */}
        <RoomsShowcase />

        {/* Section 6: Signature Experiences */}
        <ExperiencesShowcase />

        {/* Section 7: Dining */}
        <DiningShowcase />

        {/* Section 8: Wellness */}
        <WellnessShowcase />

        {/* Section 9: Destination Story */}
        <DestinationSection />

        {/* Section 10: Gallery */}
        <GalleryPreview />

        {/* Section 11: Special Offers */}
        <OffersSection />

        {/* Section 12: Testimonials */}
        <TestimonialsSection />

        {/* Section 13: Location & Coordinates */}
        <LocationSection />
      </main>

      {/* Section 14 & 15: Newsletter & Footer */}
      <Footer />
    </div>
  );
};
