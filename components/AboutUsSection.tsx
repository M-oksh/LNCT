import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { ChevronDownIcon } from '../constants'; // Assuming you have this icon

const AboutUsSection: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 });
  const { ref: contentRef, isVisible: contentIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2, rootMargin: "-100px 0px -100px 0px" });

  // Placeholder for the background image. Replace with your actual image.
  const backgroundImageUrl = "https://picsum.photos/seed/corporatevision/1920/1080"; 

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center text-white bg-slate-900
                  transition-opacity duration-1000 ease-out
                  ${sectionIsVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      aria-labelledby="about-us-main-title"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-[1]"></div>

      {/* Content container */}
      <div 
        ref={contentRef}
        className={`relative z-[2] container mx-auto px-6 md:px-12 lg:px-16 xl:max-w-3xl text-center md:text-left
                    transition-all duration-1000 ease-out transform
                    ${contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div 
          className={`inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-xs font-semibold px-3 py-1.5 rounded-sm uppercase tracking-wider mb-4
                      transition-all duration-500 ease-out delay-100
                      ${contentIsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          About Us
        </div>

        <h1 
          id="about-us-main-title"
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight
                      transition-all duration-500 ease-out delay-200
                      ${contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          Our Ethos, Our Enterprise
        </h1>
        
        <p 
          className={`text-base sm:text-lg md:text-xl text-slate-200 mb-8 leading-relaxed
                      transition-all duration-500 ease-out delay-300
                      ${contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
        >
          Pioneering progress through innovation and integrity. We are dedicated to shaping a sustainable future, driven by our core values and commitment to excellence across all our endeavors.
        </p>

        <div 
          className={`flex flex-col items-center md:items-start mt-10 text-slate-300
                      transition-all duration-500 ease-out delay-400
                      ${contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-sm">Scroll below to learn more about us.</span>
          <ChevronDownIcon className="w-6 h-6 mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;