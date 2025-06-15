
import React from 'react';
import { SocialPost } from '../types';
import SocialPostCard from './SocialPostCard';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface SocialFeedSectionProps {
  posts: SocialPost[];
}

const SocialFeedSection: React.FC<SocialFeedSectionProps> = ({ posts }) => {
  const { ref: titleRef, isVisible: titleIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-12 md:py-16 bg-white text-slate-700 overflow-hidden"> {/* Changed background to white */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:max-w-screen-xl">
        <h2 
          ref={titleRef}
          className={`text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-slate-800 /* Changed title color */
                      transition-all duration-700 ease-out transform
                      ${titleIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          Connect With Us
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialFeedSection;