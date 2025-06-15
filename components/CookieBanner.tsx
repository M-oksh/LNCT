import React from 'react';
import { CookieIcon } from '../constants';

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-100 text-slate-700 p-4 shadow-2xl z-50 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 border-t border-slate-300">
      <div className="flex items-center space-x-3">
        <CookieIcon className="w-8 h-8 text-yellow-400 shrink-0" /> {/* Solid gold for icon */}
        <p className="text-sm">
          We use cookies to give you a better experience. By using our website you agree to 
          <a href="#" className="hover:underline ml-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">our policies</a>.
        </p>
      </div>
      <div className="flex space-x-3 shrink-0">
        <button
          onClick={onAccept}
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white px-5 py-2 text-sm font-semibold rounded-sm transition-colors"
        >
          Sweet!
        </button>
        <button
          onClick={onDecline}
          className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-5 py-2 text-sm font-semibold rounded-sm transition-colors"
        >
          Sorry, I'm on a diet
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;