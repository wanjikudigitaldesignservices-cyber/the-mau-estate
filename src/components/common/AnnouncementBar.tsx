import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface AnnouncementBarProps {
  message?: string;
  linkTo?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = 'Welcome to The Mau Estate. Now welcoming reservations for the 2026 Highland Season.',
  linkTo = '/offers',
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Special Announcement" className="bg-forest-deep text-ivory text-xs border-b border-forest-border relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        <div className="flex-1 text-center flex items-center justify-center gap-2 tracking-[0.06em]">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span className="font-light">{message}</span>
          {linkTo && (
            <Link
              to={linkTo}
              className="text-gold hover:text-gold-light underline underline-offset-4 ml-1.5 font-medium transition-colors"
            >
              Explore Inclusions &rarr;
            </Link>
          )}
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-stone-light hover:text-white transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
