import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '../constants';

interface CarouselControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onPauseToggle: () => void;
  isPaused: boolean;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onPauseToggle,
  isPaused,
}) => {
  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="absolute bottom-8 left-6 md:left-12 lg:left-24 z-20 flex items-center space-x-4 bg-white/70 backdrop-blur-sm p-3 rounded-md border border-slate-200 shadow-lg">
      <button
        onClick={onPrev}
        aria-label="Previous slide"
        className="text-slate-600 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-slate-100/50"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      
      <div className="flex items-center space-x-2">
        <span className="text-slate-700 text-sm font-medium">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <div className="w-16 h-1 bg-slate-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transition-all duration-300 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-slate-500 text-sm"> {/* Lighter for total slides */}
          {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      <button
        onClick={onPauseToggle}
        aria-label={isPaused ? "Play slides" : "Pause slides"}
        className="text-slate-600 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-slate-100/50"
      >
        {isPaused ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
      </button>

      <button
        onClick={onNext}
        aria-label="Next slide"
        className="text-slate-600 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-slate-100/50"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CarouselControls;