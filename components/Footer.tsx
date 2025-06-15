import React from 'react';
import { FooterLinkCategory } from '../types';
import { FacebookIcon, LinkedInIcon, TwitterXIcon, YouTubeIcon, InstagramIconOutline, MailIcon, ChevronRightIcon, LnctGeometricLogoIcon } from '../constants';
import { playClickSound } from '../utils/soundUtils';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface FooterProps {
  footerLinkData: FooterLinkCategory[];
}

const socialIcons = [
  { Icon: FacebookIcon, href: 'https://www.facebook.com/LNCTGroupOfCollege', label: 'Facebook' },
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/school/lnct-group-of-colleges/', label: 'LinkedIn' },
  { Icon: TwitterXIcon, href: 'https://x.com/GroupLnct', label: 'X (Twitter)' },
  { Icon: YouTubeIcon, href: 'https://www.youtube.com/@LNCTUniversity', label: 'YouTube' },
  { Icon: InstagramIconOutline, href: 'https://www.instagram.com/lnctgroupofcolleges/', label: 'Instagram' },
  { Icon: MailIcon, href: 'mailto:info@lnct.ac.in', label: 'Email' },
];

const Footer: React.FC<FooterProps> = ({ footerLinkData }) => {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.05 });
  const hoverTextGradientClass = 'hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:bg-clip-text';

  return (
    <footer 
      ref={ref}
      className={`bg-slate-100 text-slate-700 pt-16 pb-8 overflow-hidden border-t border-slate-300
                  transition-all duration-1000 ease-out transform
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {footerLinkData.map((category) => (
            <div key={category.title} className="lg:col-span-1">
              <h5 className="font-bold text-lg text-slate-800 mb-4">{category.title}</h5>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={playClickSound}
                      className={`text-sm text-slate-600 hover:underline transition-colors ${hoverTextGradientClass}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex space-x-4 mb-6">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={playClickSound}
                  aria-label={label}
                  className="text-slate-500 hover:text-yellow-400 transition-colors p-1 rounded-full hover:bg-slate-200"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <form className="flex items-center border border-slate-400 rounded-sm overflow-hidden max-w-xs shadow-sm" onSubmit={(e) => {e.preventDefault(); playClickSound();}}>
              <input
                type="email"
                placeholder="Your email for updates"
                className="bg-white text-slate-800 placeholder-slate-500 text-sm px-4 py-2.5 flex-grow focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
                aria-label="Email for subscription"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 p-2.5 transition-colors text-white"
                aria-label="Subscribe"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </form>
            
            <div className="mt-8 flex flex-col items-start">
              <div className="flex items-center space-x-2">
                <LnctGeometricLogoIcon className="w-12 h-12" /> 
                <div>
                  <div className="relative">
                    <span className="text-4xl font-bold text-slate-800">L</span>
                    <span className="text-4xl font-bold bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">N</span>
                    <span className="text-4xl font-bold text-slate-800">C</span>
                    <span className="text-4xl font-bold text-slate-800">T</span>
                    <span className="absolute -top-0.5 -right-4 text-xs font-semibold text-slate-500">SM</span>
                  </div>
                  <div className="h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 w-full mt-0.5"></div>
                </div>
              </div>
              <p className="text-md font-semibold text-slate-700 mt-1 ml-1 tracking-wider">GROUP OF COLLEGES</p>
              <p className="text-xs text-slate-600 mt-1 ml-1 italic">
                “WORKING TOWARDS BEING THE <span className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">BEST</span>”
              </p>
            </div>

          </div>
        </div>
        
        <div className="border-t border-slate-300 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} LNCT Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;