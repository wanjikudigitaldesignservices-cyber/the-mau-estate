import React from 'react';
import { Check } from 'lucide-react';

interface BookingProgressStepsProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const BookingProgressSteps: React.FC<BookingProgressStepsProps> = ({
  currentStep,
  onStepClick,
}) => {
  const steps = [
    { number: 1, label: 'Dates & Guests' },
    { number: 2, label: 'Select Sanctuary' },
    { number: 3, label: 'Guest Details' },
    { number: 4, label: 'Review & Confirm' },
  ];

  return (
    <div className="w-full py-4 sm:py-6 border-b border-ivory-dark bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between relative">
          {/* Horizontal Track Line */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-ivory-dark -z-0" />

          {steps.map((s) => {
            const isCompleted = s.number < currentStep;
            const isCurrent = s.number === currentStep;
            const isClickable = s.number < currentStep && onStepClick;

            return (
              <div
                key={s.number}
                onClick={() => isClickable && onStepClick(s.number)}
                className={`flex flex-col items-center relative z-10 ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gold text-forest-deep'
                      : isCurrent
                      ? 'bg-forest text-gold ring-4 ring-gold/20'
                      : 'bg-ivory-cream text-stone-light border border-ivory-dark'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : s.number}
                </div>
                <span
                  className={`text-[10px] sm:text-xs tracking-wider uppercase mt-2 font-medium hidden sm:block ${
                    isCurrent ? 'text-forest font-semibold' : 'text-stone-light'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
