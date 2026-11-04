import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, User, Shield, Phone } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../hooks/useAuth';
import { siteConfig } from '../../config/siteConfig';

interface NavbarProps {
  transparentOnTop?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparentOnTop = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isStaff } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const shouldBeTransparent = transparentOnTop && isHome && !isScrolled;

  const navLinks = [
    { label: 'Stay', path: '/accommodation' },
    { label: 'Dining', path: '/dining' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Offers', path: '/offers' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        shouldBeTransparent
          ? 'bg-gradient-to-b from-forest-deep/90 via-forest-deep/40 to-transparent pt-3 pb-3'
          : 'bg-forest/95 backdrop-blur-md border-b border-forest-border/80 shadow-luxury py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Logo variant="light" size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.18em] transition-all duration-200 py-1 border-b ${
                    isActive
                      ? 'text-gold border-gold font-medium'
                      : 'text-ivory/85 border-transparent hover:text-white hover:border-gold/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & User Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {isStaff && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-gold-light hover:text-white px-2.5 py-1 rounded bg-forest-light/60 border border-gold/30 transition-colors"
                title="Management Dashboard"
              >
                <Shield className="w-3.5 h-3.5 text-gold" />
                <span className="tracking-wider uppercase text-[10px]">Admin</span>
              </Link>
            )}

            {user ? (
              <Link
                to="/account"
                className="inline-flex items-center gap-1.5 text-xs text-ivory hover:text-gold transition-colors py-1 px-2"
                title="Guest Account"
              >
                <User className="w-3.5 h-3.5" />
                <span className="tracking-wider uppercase text-[11px] truncate max-w-[120px]">
                  {user.full_name?.split(' ')[0] || 'Account'}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs uppercase tracking-wider text-ivory/80 hover:text-white py-1 px-2"
              >
                Sign In
              </Link>
            )}

            {/* Reserve Now Luxury Button */}
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-forest-deep text-xs font-semibold tracking-[0.16em] uppercase rounded-sm transition-all duration-300 shadow-sm hover:shadow-gold-glow active:scale-98"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Now</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              to="/booking"
              className="px-3 py-1.5 bg-gold text-forest-deep text-[11px] font-semibold tracking-wider uppercase rounded-sm"
            >
              Reserve
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-ivory hover:text-white focus:outline-none focus:ring-1 focus:ring-gold"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-forest-deep border-b border-forest-border shadow-2xl px-6 pt-4 pb-8 transition-all animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm uppercase tracking-[0.18em] text-ivory/90 hover:text-gold py-2 border-b border-forest-surface"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 flex flex-col space-y-3">
              <Link
                to="/booking"
                className="w-full text-center py-3 bg-gold hover:bg-gold-light text-forest-deep text-xs font-semibold tracking-[0.18em] uppercase rounded-sm"
              >
                Reserve Your Sanctuary
              </Link>

              {user ? (
                <div className="flex items-center justify-between pt-2 text-xs text-stone-light">
                  <Link to="/account" className="text-ivory hover:text-gold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>My Account ({user.full_name})</span>
                  </Link>
                  {isStaff && (
                    <Link to="/admin" className="text-gold hover:underline flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Admin</span>
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 border border-forest-border text-ivory hover:text-white text-xs uppercase tracking-wider rounded-sm"
                >
                  Guest Login / Register
                </Link>
              )}

              <div className="pt-4 border-t border-forest-surface text-[12px] text-stone-light flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  {siteConfig.contact.phones.primary}
                </span>
                <span>Mau Narok, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
