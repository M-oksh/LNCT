import React from 'react';
import { HeroSlide } from '../types';
import { ChevronRightIcon } from '../constants';
import { playClickSound } from '../utils/soundUtils';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface HeroSectionProps {
  slide: HeroSlide;
}

const HeroSection: React.FC<HeroSectionProps> = ({ slide }) => {
  const { ref: heroContainerRef, isVisible: heroIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={heroContainerRef} className={`relative h-screen flex items-center bg-cover bg-center`}>
      {slide.video ? (
        <video
          key={slide.video}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          poster={slide.image}
        >
          <source src={slide.video} type={slide.videoType || 'video/mp4'} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full object-cover z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
      )}

      {/* Dark overlay to ensure text contrast, even on a light theme page structure */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[1]"></div>


      <div
        className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-24 xl:max-w-screen-xl`}
      >
        <div className="max-w-xl lg:max-w-2xl text-white"> {/* Text remains white due to dark overlay over image */}
          <span
            className={`inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-xs font-semibold px-3 py-1.5 rounded-sm uppercase tracking-wider mb-4
                        transition-all duration-500 ease-out
                        ${heroIsVisible ? 'opacity-100 translate-x-0 delay-100' : 'opacity-0 -translate-x-8'}`}
          >
            {slide.tag}
          </span>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight
                        transition-all duration-500 ease-out
                        ${heroIsVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-6'}`}
            style={{textShadow: '2px 2px 6px rgba(0,0,0,0.6)'}} /* Enhanced shadow for readability */
          >
            {slide.title}
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl text-slate-100 mb-8 leading-relaxed max-w-md lg:max-w-lg /* Lighter gray for description */
                        transition-all duration-500 ease-out
                        ${heroIsVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-6'}`}
            style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}} /* Enhanced shadow for readability */
          >
            {slide.description}
          </p>
          <button
            onClick={playClickSound}
            className={`bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-sm text-base inline-flex items-center
                        transition-all duration-500 ease-out group
                        hover:shadow-lg hover:shadow-yellow-500/40 focus:outline-none focus:ring-4 focus:ring-yellow-400/50
                        ${heroIsVisible ? 'opacity-100 scale-100 delay-400' : 'opacity-0 scale-90'}`}
          >
            Read story
            <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

      {/* Removed Wavy bottom transition */}
    </div>
  );
};

export default HeroSection;