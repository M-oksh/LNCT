import React, { useState, useEffect, useRef } from 'react';
import './ScrollIndicator.css'; // Ensure CSS is imported

interface ScrollIndicatorProps {
  numSections: number;
  activeSectionIndex: number;
  onDotClick: (index: number) => void;
  sectionNames: string[];
}

const TRACK_HEIGHT_CLASS = 'h-56'; // Approx 224px. Adjust as needed.
const TRACK_HEIGHT_PX = 224; // Must match the pixel value of TRACK_HEIGHT_CLASS
const THUMB_HEIGHT_PX = 28; // h-7 is 28px
const TEXT_LINE_HEIGHT_REM = 0.75; // text-xs line-height (usually 1rem for text-xs, but visually smaller)

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  numSections,
  activeSectionIndex,
  onDotClick,
  sectionNames,
}) => {
  const [hoveredTickIndex, setHoveredTickIndex] = useState<number | null>(null);
  const [currentSectionName, setCurrentSectionName] = useState(sectionNames[activeSectionIndex] || '');

  // Update section name with animation
  useEffect(() => {
    // Set an initial name without delay if it's the first load and name exists
    if (sectionNames[activeSectionIndex] && currentSectionName !== sectionNames[activeSectionIndex]) {
       // Timeout to allow potential re-render/animation trigger if key changes
      const timer = setTimeout(() => {
        setCurrentSectionName(sectionNames[activeSectionIndex] || '');
      }, 50); // Short delay for transition effect
      return () => clearTimeout(timer);
    } else if (!sectionNames[activeSectionIndex] && currentSectionName) {
      setCurrentSectionName(''); // Clear if no name
    }
  }, [activeSectionIndex, sectionNames, currentSectionName]);

  const getPositionPercentage = (index: number) => {
    if (numSections <= 1) return 50; // Center if only one section
    return (index / (numSections - 1)) * 100;
  };

  const activeThumbTopStyle = `calc(${getPositionPercentage(activeSectionIndex)}% - ${THUMB_HEIGHT_PX / 2}px)`;
  const activeTextTopStyle = `calc(${getPositionPercentage(activeSectionIndex)}% - ${TEXT_LINE_HEIGHT_REM / 2}rem)`;


  return (
    <div className="fixed right-5 md:right-6 lg:right-7 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex items-center"
         style={{ height: `${TRACK_HEIGHT_PX + THUMB_HEIGHT_PX}px` }} // Ensure container accommodates thumb at edges
    >
      {/* Section Name Label - positioned relative to the track */}
      <div
        className="absolute whitespace-nowrap transition-all duration-300 ease-out pointer-events-none"
        style={{
          top: activeTextTopStyle,
          right: 'calc(100% + 8px)', // Position to the left of the track (track is about 0.5rem wide + spacing)
        }}
        aria-live="polite"
      >
        <span
          key={currentSectionName + activeSectionIndex} // Key to re-trigger animation
          className="text-xs font-semibold uppercase tracking-wider animate-fadeIn px-1 py-0.5 bg-white/60 backdrop-blur-sm rounded-sm shadow-sm bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
        >
          {currentSectionName}
        </span>
      </div>

      {/* Track and Markers Container */}
      <div className={`relative w-1 ${TRACK_HEIGHT_CLASS} bg-slate-300/70 rounded-full flex flex-col justify-between`}>
        {/* Active Thumb */}
        <div
          className="absolute w-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-out"
          style={{
            height: `${THUMB_HEIGHT_PX}px`,
            top: activeThumbTopStyle,
          }}
          aria-hidden="true"
        />

        {/* Clickable Ticks */}
        {Array.from({ length: numSections }).map((_, index) => (
          <div
            key={`tick-container-${index}`}
            className="absolute w-full flex justify-center" // Container for each tick, positioned by top style
            style={{ top: `calc(${getPositionPercentage(index)}% - 1px)` }} // -1px to center the 2px high tick
          >
            <button
              onClick={() => onDotClick(index)}
              aria-label={sectionNames[index] ? `Go to ${sectionNames[index]} section` : `Go to section ${index + 1}`}
              aria-current={activeSectionIndex === index ? 'step' : undefined}
              onMouseEnter={() => setHoveredTickIndex(index)}
              onMouseLeave={() => setHoveredTickIndex(null)}
              // Make clickable area larger than visual tick
              className="w-5 h-5 rounded-full group focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-slate-100 flex items-center justify-center"
              style={{ transform: 'translateX(-50%)', left: '50%'}} // Center button over the track line
            >
              {/* Visual Tick Mark */}
              <div
                className={`
                  w-2.5 h-0.5 rounded-full transition-all duration-200 ease-in-out
                  ${activeSectionIndex === index ? 'bg-yellow-400 scale-x-125' : 'bg-slate-500/90 group-hover:bg-yellow-400 group-hover:scale-x-110'}
                `}
              />
              {/* Tooltip */}
              {hoveredTickIndex === index && sectionNames[index] && (
                <span
                  role="tooltip"
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800/95 text-white text-[10px] leading-tight font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150 opacity-100 z-50"
                >
                  {sectionNames[index]}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;