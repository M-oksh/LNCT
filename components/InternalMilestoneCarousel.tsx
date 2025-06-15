
import React, { useState, useEffect, useRef } from 'react';
import { MilestoneItem } from '../types';
import { TrophyIcon } from '../constants'; // Default icon

interface InternalMilestoneCarouselProps {
  milestones: MilestoneItem[];
  accentColorClass: string;
  rotationSpeed?: number; // Degrees per frame
  initialRotationY?: number; // Initial Y rotation offset
}

const DEFAULT_ROTATION_SPEED = 0.15; 

const InternalMilestoneCarousel: React.FC<InternalMilestoneCarouselProps> = ({
  milestones,
  accentColorClass,
  rotationSpeed = DEFAULT_ROTATION_SPEED,
  initialRotationY = 0,
}) => {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [prismTranslateZ, setPrismTranslateZ] = useState(0);
  const [currentRotationY, setCurrentRotationY] = useState(initialRotationY);
  
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      if (carouselContainerRef.current) {
        const width = carouselContainerRef.current.offsetWidth;
        setCarouselWidth(width);
        if (milestones.length > 1) {
          const translateZ = (width / 2) / Math.tan(Math.PI / milestones.length);
          setPrismTranslateZ(translateZ);
        } else {
          setPrismTranslateZ(0);
        }
      }
    };

    calculateDimensions();
    const resizeObserver = new ResizeObserver(calculateDimensions);
    if (carouselContainerRef.current) {
      resizeObserver.observe(carouselContainerRef.current);
    }
    
    window.addEventListener('resize', calculateDimensions);
    
    return () => {
      if (carouselContainerRef.current) {
        resizeObserver.unobserve(carouselContainerRef.current);
      }
      window.removeEventListener('resize', calculateDimensions);
    };
  }, [milestones.length]);

  useEffect(() => {
    if (milestones.length <= 1) {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      setCurrentRotationY(initialRotationY);
      return;
    }

    const animate = () => {
      setCurrentRotationY(prevRotation => (prevRotation + rotationSpeed) % 360);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    animationFrameIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [milestones.length, rotationSpeed, initialRotationY]);


  if (!milestones || milestones.length === 0) {
    return <p className="text-center text-gray-500">No milestones to display.</p>;
  }
  
  const numSlides = milestones.length;
  
  const isGoldenAccent = accentColorClass === 'text-yellow-500';
  const iconColor = isGoldenAccent ? 'text-yellow-400' : accentColorClass;
  const yearTextColor = isGoldenAccent ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent' : accentColorClass;

  // Increased min-height by 128px (8rem) to account for pt-32
  // Original: min-h-[240px] md:min-h-[280px]
  // New:      min-h-[368px] md:min-h-[408px]  (240+128, 280+128)
  return (
    <div 
      ref={carouselContainerRef}
      className="relative flex flex-col flex-grow items-center min-h-[368px] md:min-h-[408px] w-full overflow-visible pt-32" // Added pt-32 and increased min-height
      style={{ perspective: numSlides > 1 ? (numSlides === 2 ? '800px' : '1200px') : 'none' }}
    >
      {carouselWidth > 0 && (
        <div
          className="relative w-full h-full" // h-full will respect parent's padding
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${prismTranslateZ}px) rotateY(${currentRotationY}deg)`,
          }}
        >
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon || TrophyIcon;
            const angle = numSlides > 0 ? index * (360 / numSlides) : 0; 
            
            const slideStyle: React.CSSProperties = numSlides > 1 ? {
              position: 'absolute',
              top: '50%', 
              left: '50%', 
              width: '180px', 
              height: 'auto', 
              minHeight: '180px', 
              backfaceVisibility: 'hidden',
              transformOrigin: 'center center',
              transform: `translateX(-50%) translateY(-50%) rotateY(${angle}deg) translateZ(${prismTranslateZ}px)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem', 
              textAlign: 'center',
            } : { 
              width: '100%', 
              maxWidth: '250px', 
              height: 'auto',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem', 
              textAlign: 'center',
              margin: '0 auto', 
            };

            return (
              <div
                key={milestone.id || index}
                className="carousel-slide bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col justify-between" 
                style={slideStyle}
              >
                <div> 
                  <IconComponent className={`w-7 h-7 md:w-9 md:h-9 mb-2 mx-auto ${iconColor}`} /> 
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${yearTextColor}`}> 
                    {milestone.year}
                  </p>
                  <h4 className="text-base font-bold text-gray-800 mb-2 px-1 break-words leading-tight"> 
                    {milestone.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-snug px-1 max-w-full break-words mt-auto"> 
                  {milestone.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InternalMilestoneCarousel;