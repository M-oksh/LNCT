
import React from 'react';
import { MilestoneItem } from '../types';
import { TrophyIcon } from '../constants'; // Default icon
import useScrollAnimation from '../hooks/useScrollAnimation';

interface MilestoneCardProps {
  milestone: MilestoneItem;
  accentColor?: string; // e.g., 'border-amber-500' or 'border-sky-400'
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, accentColor = 'border-gray-500' }) => {
  const IconComponent = milestone.icon || TrophyIcon;
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  // Extract just the color name for text, e.g., 'text-amber-500' from 'border-amber-500'
  const textColorClass = accentColor.replace('border-', 'text-');

  return (
    <div
      ref={ref}
      className={`
        bg-neutral-800 text-gray-300 shadow-xl p-5 md:p-6
        relative group transition-all duration-500 ease-out transform hover:shadow-2xl hover:bg-neutral-700 hover:scale-[1.03]
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
      `}
      style={{
        clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)', // Parallelogram shape
      }}
    >
      <div className={`absolute top-0 left-0 h-1 w-full ${accentColor.replace('border-','bg-')} opacity-75 group-hover:opacity-100 transition-opacity`}></div>
      
      <div className="pt-4"> {/* Added padding top for space from the accent border */}
        <div className="flex items-center mb-2">
          <IconComponent className={`w-5 h-5 mr-2 ${textColorClass} opacity-80 group-hover:opacity-100`} />
          <p className={`text-xs font-semibold uppercase tracking-wider ${textColorClass} group-hover:opacity-100`}>
            {milestone.year} 
          </p>
        </div>
        
        <h3 className="text-md sm:text-lg font-bold text-white mb-1.5 group-hover:text-white transition-colors leading-tight">
          {milestone.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {milestone.description}
        </p>
      </div>
    </div>
  );
};

export default MilestoneCard;