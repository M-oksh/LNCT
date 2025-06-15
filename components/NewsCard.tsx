import React from 'react';
import { NewsArticle } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <article 
      ref={ref}
      className={`bg-white shadow-xl rounded-lg overflow-hidden h-full flex flex-col md:flex-row border border-slate-200
                  transition-all duration-700 ease-out transform hover:shadow-2xl
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <div className="md:w-1/2">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      <div className="p-6 md:w-1/2 flex flex-col justify-center">
        <span className="text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          {article.category}
        </span>
        <h3 className="mt-2 text-2xl font-bold text-slate-800 leading-tight hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:bg-clip-text transition-colors duration-200">
          <a href="#">{article.title}</a>
        </h3>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed relative pl-4">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></span>
          {article.summary}
        </p>
        {article.authorLine && (
            <p className="mt-4 text-xs text-slate-500">{article.authorLine}</p>
        )}
      </div>
    </article>
  );
};

export default NewsCard;