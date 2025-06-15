
import React from 'react';
import { MilestoneItem } from '../types'; 
import useScrollAnimation from '../hooks/useScrollAnimation';
import InteractiveBackground from './InteractiveBackground'; // For floating bubbles
import InternalMilestoneCarousel from './InternalMilestoneCarousel'; // Import the modified carousel

interface QuadrantSectionProps {
  educationalMilestones: MilestoneItem[];
  businessMilestones: MilestoneItem[];
}

const QuadrantSection: React.FC<QuadrantSectionProps> = ({
  educationalMilestones,
  businessMilestones,
}) => {
  const { ref: sectionRef, isVisible: sectionIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.05 });
  const { ref: titleRef, isVisible: titleIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 });
  const { ref: pillar1Ref, isVisible: pillar1IsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.15 });
  const { ref: pillar2Ref, isVisible: pillar2IsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className={`py-20 md:py-28 lg:py-32 text-slate-800 relative min-h-screen overflow-hidden
                  transition-opacity duration-1000 ease-out
                  ${sectionIsVisible ? 'opacity-100' : 'opacity-0'} bg-white`}
    >
      <div className="quadrant-section-abstract-bg-container">
        <div className="quadrant-abstract-bg yellow-abstract-bg"></div>
        <div className="quadrant-abstract-bg black-abstract-bg"></div>
      </div>

      <InteractiveBackground /> 

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:max-w-screen-lg 2xl:max-w-screen-xl h-full flex flex-col">
        <h2
          ref={titleRef}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-16 md:mb-20 lg:mb-24
                      transition-all duration-700 ease-out tracking-tight
                      text-white 
                      ${titleIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Key Pillars & <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Achievements</span> {/* Golden gradient highlight */}
        </h2>

        <div className="relative flex-grow flex items-center justify-center">
          <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-12 md:gap-y-20 items-start z-10">
            
            <div 
              ref={pillar1Ref}
              className={`flex flex-col items-center space-y-6 md:space-y-8
                          transition-all duration-700 ease-out transform 
                          ${pillar1IsVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center mb-4">
                Education Excellence
              </h3>
              {/* Wrapper for the carousel, mt-40 provides space below the title H3 (which has mb-4) */}
              <div className="w-full px-2 mt-40"> 
                <InternalMilestoneCarousel
                  milestones={educationalMilestones}
                  accentColorClass="text-yellow-500"
                />
              </div>
            </div>

            <div 
              ref={pillar2Ref}
              className={`flex flex-col items-center space-y-6 md:space-y-8
                          transition-all duration-700 ease-out transform delay-200 
                          ${pillar2IsVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center mb-4">
                Corporate Ventures
              </h3>
              {/* Wrapper for the carousel, mt-40 provides space below the title H3 (which has mb-4) */}
              <div className="w-full px-2 mt-40">
                <InternalMilestoneCarousel
                  milestones={businessMilestones}
                  accentColorClass="text-sky-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuadrantSection;