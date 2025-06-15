
import React from 'react';
import { SocialPost } from '../types';
import { ExternalLinkIcon } from '../constants';
import { playClickSound } from '../utils/soundUtils';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface SocialPostCardProps {
  post: SocialPost;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({ post }) => {
  const PlatformIcon = post.platformIcon;
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`rounded-lg shadow-xl p-6 flex flex-col min-h-[480px] md:min-h-[500px] relative overflow-hidden
                  ${post.cardClass} transition-all duration-700 ease-out transform hover:scale-[1.02] border ${post.platform === 'facebook' ? 'border-slate-200' : 'border-transparent'}
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
      style={post.backgroundImage ? { backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {post.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${post.backgroundImage})`}}
        ></div>
      )}
      {post.backgroundImage && (
         <div className="absolute inset-0 bg-black/60 z-[1]"></div> 
      )}

      <div className="relative z-[2] flex justify-between items-start mb-4">
        <PlatformIcon className={`w-8 h-8 ${post.iconColorClass}`} />
        <span className={`font-bold text-lg ${post.iconColorClass}`}>{post.userLogoText}</span>
      </div>

      <div className="relative z-[2] flex-grow flex flex-col">
        {post.platform === 'facebook' && post.postImage && (
          <div className="my-3">
            <img
              src={post.postImage}
              alt="Social post image"
              className="rounded-md w-full object-cover max-h-48 md:max-h-56"
            />
            {post.imageCredit && (
              <p className={`mt-1 text-xs opacity-70 ${post.textClass}`}>{post.imageCredit}</p>
            )}
          </div>
        )}

        <p className={`leading-relaxed my-2 ${post.textClass} ${post.platform === 'instagram' ? 'text-lg text-shadow-sm' : 'text-sm'}`}> {/* Added text-shadow for IG */}
          {post.content}
        </p>

        {post.hashtags && post.hashtags.length > 0 && (
          <p className={`mt-2 text-xs font-medium opacity-80 ${post.textClass} ${post.platform === 'instagram' ? 'text-shadow-xs' : ''}`}> {/* Added text-shadow for IG */}
            {post.hashtags.join(' ')}
          </p>
        )}
      </div>

      <div className="relative z-[2] mt-auto flex justify-between items-end pt-4">
        <span className={`text-xs opacity-70 ${post.textClass} ${post.platform === 'instagram' ? 'text-shadow-xs' : ''}`}>{post.timestamp}</span> {/* Added text-shadow for IG */}
        <a href="#" aria-label="View post externally" onClick={playClickSound}>
            <ExternalLinkIcon className={`w-5 h-5 cursor-pointer hover:opacity-80 ${post.iconColorClass}`} />
        </a>
      </div>
    </div>
  );
};

export default SocialPostCard;