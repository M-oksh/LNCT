
import React from 'react';
import NewsCard from './NewsCard';
import FactsCard from './FactsCard';
import { NewsArticle, FactItem } from '../types';
import { playClickSound } from '../utils/soundUtils';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface NewsSectionProps {
  newsArticle: NewsArticle;
  fact: FactItem;
}

const NewsSection: React.FC<NewsSectionProps> = ({ newsArticle, fact }) => {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={`py-12 md:py-16 bg-slate-50 text-slate-700 overflow-hidden relative subtle-noise-overlay
                  transition-all duration-700 ease-out transform
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:max-w-screen-xl relative z-10"> {/* Ensure content is above noise */}
        <div
          className="absolute -top-4 left-6 md:left-12 lg:left-20 z-10 cursor-pointer"
          onClick={playClickSound}
        >
          <div className="relative bg-slate-200 py-3 px-6 shadow-lg border border-slate-300">
            <h2 className="text-2xl font-bold text-slate-800">In the News</h2>
            <div className="absolute left-full top-0 h-full w-4 overflow-hidden">
              <div className="h-full w-full bg-slate-200 transform origin-top-left -skew-x-[18deg] border-r border-b border-t border-slate-300"></div>
            </div>
             <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-slate-50 rotate-45"></div> {/* Match section bg */}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 pt-12 md:pt-16">
          <div className="lg:w-2/3">
            <NewsCard article={newsArticle} />
          </div>
          <div className="lg:w-1/3">
            <FactsCard fact={fact} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;