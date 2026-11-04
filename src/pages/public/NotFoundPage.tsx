import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Calendar, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Sanctuary Trail Not Found (404)"
        description="The requested page could not be located at The Mau Estate."
        canonicalPath="/404"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-forest text-gold flex items-center justify-center mx-auto border-2 border-gold/40 shadow-luxury">
            <Compass className="w-8 h-8 animate-spin duration-[10000ms]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block">
              Error 404 &bull; Wandering Off Path
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-forest">
              Sanctuary Not Found
            </h1>
            <p className="text-stone text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto">
              Like a hidden clearing in the misty cedar forest, the trail you requested cannot be located.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Home className="w-4 h-4 text-gold" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/accommodation"
              className="w-full sm:w-auto px-6 py-3 border border-forest text-forest hover:bg-forest hover:text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Explore Suites</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
