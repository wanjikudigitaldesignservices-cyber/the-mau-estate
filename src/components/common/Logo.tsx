import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'primary' | 'light' | 'dark' | 'mark-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  asLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  asLink = true,
}) => {
  const isLight = variant === 'light';
  const isMarkOnly = variant === 'mark-only';

  const markSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-[9px]';

  const logoContent = (
    <div className={`inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-95 ${className}`}>
      {/* Abstract luxury emblem: Mountain/Horizon crest + Sun + Ring */}
      <div className={`relative ${markSize} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Outer circle */}
          <circle cx="50" cy="50" r="46" stroke="#B69A70" strokeWidth="2" opacity="0.9" />
          <circle cx="50" cy="50" r="41" stroke="#B69A70" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          
          {/* Mau Narok highland peaks */}
          <path d="M26 62 C34 50, 44 40, 50 40 C56 40, 66 50, 74 62" stroke="#B69A70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 62 C40 54, 46 48, 50 48 C54 48, 60 54, 66 62" stroke="#B69A70" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />

          {/* Morning sun */}
          <circle cx="50" cy="30" r="4.5" fill="#B69A70" />
          <line x1="50" y1="21" x2="50" y2="24" stroke="#B69A70" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="43" y1="24" x2="45" y2="26" stroke="#B69A70" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="57" y1="24" x2="55" y2="26" stroke="#B69A70" strokeWidth="1.5" strokeLinecap="round" />

          {/* Baseline */}
          <line x1="24" y1="65" x2="76" y2="65" stroke="#B69A70" strokeWidth="1.5" strokeLinecap="round" />
          <text x="50" y="79" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" fontWeight="600" fill="#B69A70" textAnchor="middle" letterSpacing="2">M</text>
        </svg>
      </div>

      {!isMarkOnly && (
        <div className="flex flex-col justify-center">
          <span className={`font-serif tracking-[0.22em] font-medium leading-none ${titleSize} ${isLight ? 'text-white' : 'text-forest'}`}>
            THE MAU ESTATE
          </span>
          <span className={`font-sans tracking-[0.28em] uppercase mt-1 font-semibold ${subSize} ${isLight ? 'text-gold-light' : 'text-gold'}`}>
            MAU NAROK • KENYA
          </span>
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" aria-label="The Mau Estate - Return to homepage">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
