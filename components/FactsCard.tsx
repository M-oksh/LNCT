import React from 'react';
import { FactItem } from '../types';
import { RefreshIcon } from '../constants';
import { playClickSound } from '../utils/soundUtils';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface FactsCardProps {
  fact: FactItem;
}

const FactsCard: React.FC<FactsCardProps> = ({ fact }) => {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`bg-white text-slate-800 p-6 rounded-lg shadow-xl h-full flex flex-col border border-slate-200
                  transition-all duration-700 ease-out transform hover:shadow-2xl
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider opacity-90 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        {fact.category}
      </span>
      <h4 className="mt-2 text-2xl font-bold text-slate-800">
        {fact.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed relative pl-4 flex-grow text-slate-600">
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></span>
        {fact.content}
      </p>
      <p className="mt-4 text-xs italic opacity-90 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        {fact.tagline}
      </p>
      <div className="mt-6 text-center">
        <button
          onClick={playClickSound}
          aria-label="Refresh fact"
          className="p-2 rounded-full hover:bg-slate-100/50 transition-colors duration-200"
        >
          <RefreshIcon className="w-6 h-6 text-yellow-400" />
        </button>
      </div>
    </div>
  );
};

export default FactsCard;