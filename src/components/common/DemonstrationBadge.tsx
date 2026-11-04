import React from 'react';
import { Info } from 'lucide-react';

interface DemonstrationBadgeProps {
  className?: string;
  variant?: 'inline' | 'overlay' | 'card';
}

export const DemonstrationBadge: React.FC<DemonstrationBadgeProps> = ({
  className = '',
  variant = 'inline',
}) => {
  if (variant === 'overlay') {
    return (
      <div className={`absolute top-4 left-4 z-10 backdrop-blur-md bg-forest/80 text-gold-light border border-gold/40 text-[10px] tracking-[0.18em] uppercase px-3 py-1 rounded-sm shadow-sm flex items-center gap-1.5 font-medium ${className}`}>
        <Info className="w-3 h-3 text-gold" />
        <span>Demonstration Concept</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] tracking-[0.14em] uppercase font-semibold bg-ivory-cream text-stone border border-stone-light/30 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      <span>Provisional Concept Data</span>
    </div>
  );
};
