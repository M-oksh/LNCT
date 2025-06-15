
import React, { useState, useEffect, useRef } from 'react';
import { NavItem, NavSubItem } from '../types';
import { ChevronDownIcon, GlobeIcon, NavListItemMarkerIcon, LnctGeometricLogoIcon, SearchIcon } from '../constants'; 
import { playClickSound } from '../utils/soundUtils';

interface NavbarProps {
  navigateToSection?: (index: number) => void;
}

interface NavLinkClickData {
  hasChildren: boolean;
  itemName: string;
  href: string;
  sectionIndex?: number;
}

const institutionsSubItemsData: NavSubItem[] = [
  { name: 'LNCT University', href: 'https://lnctu.ac.in' },
  { name: 'LNCT VU', href: 'https://lnctvu.ac.in' },
  { name: 'Indore LNMC', href: 'https://indorelnmc.in' },
  { name: 'Indore LNMC (.com)', href: 'https://indorelnmc.com' },
  { name: 'JNCN', href: 'https://jncn.ac.in' },
  { name: 'CEC Bilaspur', href: 'https://cecbilaspur.ac.in' },
  { name: 'LNCPS', href: 'https://lncps.in' },
  { name: 'LNCT UJ', href: 'https://lnctuj.com' },
  { name: 'LNCTS', href: 'https://lncts.in' },
  { name: 'LNCT MCA', href: 'https://lnctmca.in' },
  { name: 'IPS Bilaspur', href: 'https://ipsbilaspur.com' },
  { name: 'LN Ayurvedic College', href: 'https://lnayurvedicollege.com' },
  { name: 'JNCT PU', href: 'https://jnctpu.edu.in' },
  { name: 'LNCT World Schools', href: 'https://lnctworldschools.com' },
  { name: 'LNCP Bhopal', href: 'https://lncpbhopal.in' },
  { name: 'LNCT Bhopal', href: 'https://lnctbhopal.in' },
  { name: 'LNCTE', href: 'https://lncte.in' },
  { name: 'LNCT BPL Indore Campus', href: 'https://lnctbplindorecampus.in' },
  { name: 'LNCT Rishiraj', href: 'https://lnctrishiraj.ac.in' },
  { name: 'LNCT SOP Indore', href: 'https://lnctsopindore.in' },
  { name: 'CIC Homeopathy', href: 'https://cichomeopathy.in' },
];

const companiesSubItemsData: NavSubItem[] = [
  { name: 'Jayant Jaggery', href: 'https://jayantjaggery.com' },
  { name: 'Kalchuri Contractors', href: 'https://kalchuri.contractors.ltd' },
  { name: 'Parvati Sweetners', href: 'https://parvatisweetners.co.in' },
  { name: 'Vitamax', href: 'https://vitamax.co.in' },
  { name: 'Dabra Alcobrew', href: 'https://dabraaicobrew.com' },
  { name: 'Ananjay', href: 'https://ananjay.co.in' },
  { name: 'Ananjay Pharma', href: 'https://ananjaypharma.co.in' },
  { name: 'Instroru', href: 'https://instroru.com' },
];

const institutionsSubItems = [...institutionsSubItemsData].sort((a, b) => a.name.localeCompare(b.name));
const companiesSubItems = [...companiesSubItemsData].sort((a, b) => a.name.localeCompare(b.name));


const navItemsData: NavItem[] = [
  { name: 'About us', href: '#', icon: NavListItemMarkerIcon, sectionIndex: 2 }, 
  { name: 'Institutions', href: '#', icon: NavListItemMarkerIcon, children: institutionsSubItems },
  { name: 'Companies', href: '#', icon: NavListItemMarkerIcon, children: companiesSubItems },
  { name: 'Careers', href: '#', icon: NavListItemMarkerIcon }, 
  { name: "News/Events", href: "#news", icon: NavListItemMarkerIcon, sectionIndex: 4 }, // Updated for programmatic navigation to section index 4 ("Page 5")
  { name: "Contact us", href: "#info", isButton: true },
];

// Static Logo Component Updated
const StaticLnctLogo: React.FC = () => (
  <div className="flex items-center" aria-label="LNCT Logo">
    <LnctGeometricLogoIcon className="w-6 h-6 md:w-7 md:h-7 text-slate-800 self-center" />
    <div className="ml-1.5 md:ml-2 flex items-center"> {/* Centering LNCT text vertically with icon */}
      <span className="text-slate-800 text-2xl md:text-[1.75rem] font-bold [text-shadow:0px_0px_4px_rgba(0,0,0,0.1)]">L</span>
      <span className="text-2xl md:text-[1.75rem] font-bold bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent [text-shadow:0px_0px_4px_rgba(234,179,8,0.2)]">N</span> {/* Golden Gradient N */}
      <span className="text-slate-800 text-2xl md:text-[1.75rem] font-bold [text-shadow:0px_0px_4px_rgba(0,0,0,0.1)]">C</span>
      <span className="text-slate-800 text-2xl md:text-[1.75rem] font-bold [text-shadow:0px_0px_4px_rgba(0,0,0,0.1)]">T</span>
    </div>
  </div>
);


const Navbar: React.FC<NavbarProps> = ({ navigateToSection }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItemName, setHoveredItemName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownTimeoutRef = useRef<number | null>(null);
  const dropdownPanelRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>(navItemsData.map(() => null));

  useEffect(() => {
    if (mobileMenuOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileMenuOpen]);

  const clearDropdownTimeout = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const startDropdownCloseTimer = (delay = 200) => {
    clearDropdownTimeout();
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
      setHoveredItemName(null); 
    }, delay);
  };

  const handleNavItemMouseEnter = (itemName: string, hasChildren?: boolean) => {
    clearDropdownTimeout();
    if (!navItemsData.find(item => item.name === itemName)?.isButton) {
      setHoveredItemName(itemName);
    }
    if (hasChildren) {
      setOpenDropdown(itemName);
    }
  };

  const handleNavItemMouseLeave = () => {
    startDropdownCloseTimer();
  };

  const handleDropdownPanelMouseEnter = () => {
    clearDropdownTimeout();
  };

  const handleDropdownPanelMouseLeave = () => {
    startDropdownCloseTimer();
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openDropdown) return;

      const openDropdownItemIndex = navItemsData.findIndex(navItem => navItem.name === openDropdown && navItem.children);
      if (openDropdownItemIndex !== -1) {
        const triggerElementForOpenDropdown = triggerRefs.current[openDropdownItemIndex];
        if (triggerElementForOpenDropdown && triggerElementForOpenDropdown.contains(event.target as Node)) {
          return;
        }
      }
      
      if (dropdownPanelRef.current && dropdownPanelRef.current.contains(event.target as Node)) {
        return; 
      }
      
      setOpenDropdown(null);
      setHoveredItemName(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const toggleDropdownOnClick = (itemName: string) => {
    playClickSound();
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemName);
      if (!navItemsData.find(item => item.name === itemName)?.isButton) {
        setHoveredItemName(itemName);
      }
    }
  };
  
  const handleMobileMenuToggle = () => {
    playClickSound();
    const newMobileMenuOpenState = !mobileMenuOpen;
    setMobileMenuOpen(newMobileMenuOpenState);
    if (!newMobileMenuOpenState) { // If closing menu
      setOpenDropdown(null); 
      setHoveredItemName(null);
    }
  };

  const handleNavLinkClick = (data: NavLinkClickData, event?: React.MouseEvent<HTMLAnchorElement>) => {
    playClickSound();
  
    if (data.sectionIndex !== undefined && navigateToSection) {
      if (event) event.preventDefault();
      navigateToSection(data.sectionIndex);
      setMobileMenuOpen(false);
      setOpenDropdown(null);
      setHoveredItemName(null);
    } else if (!data.hasChildren) {
      // For regular href links (external or other #hash links not handled by sectionIndex)
      // or button-styled links that are not sectionIndex based
      setMobileMenuOpen(false); // Close mobile menu if it was open
      setOpenDropdown(null);
      setHoveredItemName(null);
      // Default <a> tag behavior will handle the href if event.preventDefault() wasn't called.
      // If it's a button, its specific onClick for buttons (not this generic one) handles it.
    } else { // hasChildren is true, this is a dropdown toggle
       if (event) event.preventDefault(); 
       toggleDropdownOnClick(data.itemName);
    }
  };


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      playClickSound();
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };
  
  const allNavItemsForMobile = [...navItemsData.filter(item => !item.isButton), ...navItemsData.filter(item => item.isButton)];

  const searchBarComponent = (isMobile: boolean) => (
    <form 
      onSubmit={handleSearchSubmit} 
      className={`relative flex-shrink min-w-0 ${isMobile ? 'w-full' : 'w-32 sm:w-36 md:w-40 lg:w-40 xl:w-44'}`}
    >
      <input
        ref={!isMobile ? searchInputRef : (mobileMenuOpen ? searchInputRef : null) }
        type="search"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search..."
        className="w-full bg-slate-900/60 text-yellow-400 placeholder-yellow-400/70 text-sm px-4 py-2 pr-12 rounded-full focus:outline-none shadow-md shadow-yellow-700/10 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900/60 transition-all duration-300"
        aria-label="Search website"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 rounded-full p-2 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-200 ease-in-out flex items-center justify-center"
        aria-label="Submit search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );

  const desktopUtilities = (
    <div className="flex items-center space-x-2 lg:space-x-3 pl-2 lg:pl-3">
      {searchBarComponent(false)}
      {/* <button
        aria-label="Select language"
        className="text-slate-600 hover:text-yellow-400 p-2 hover:bg-slate-100/70 rounded-full transition-all duration-300 ease-in-out bg-slate-100/50 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:scale-110 hover:shadow-md"
        onClick={playClickSound}
      >
        <GlobeIcon className="w-4 h-4 lg:w-5 lg:h-5" />
      </button> */}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:max-w-screen-lg 2xl:max-w-screen-xl">
        <div 
          className={`
            my-2 md:my-3 lg:my-3 
            flex items-center justify-between 
            py-2 md:py-2.5 
          `}
        >
          <a href="#" className="flex items-center" onClick={() => {playClickSound(); setMobileMenuOpen(false); setOpenDropdown(null); setHoveredItemName(null); setSearchQuery(''); if (navigateToSection) navigateToSection(0);}}>
            <StaticLnctLogo />
          </a>

          <div className="hidden md:flex items-center space-x-1 md:space-x-1.5 lg:space-x-1"> {/* Reduced space for compactness */}
            {navItemsData.map((item, index) => { 
              const isActive = !item.isButton && item.name === hoveredItemName;
              const activeTextClass = 'text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text';
              const hoverTextClass = 'hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:bg-clip-text';
              
              return (
                <div 
                  key={item.name} 
                  className={`relative group/navitem
                              ${item.isButton ? '' : 'rounded-full bg-white/60 backdrop-blur-md border border-slate-200/90 shadow-sm hover:bg-slate-100/80 hover:shadow-md transition-all duration-300 ease-in-out'}`}
                  ref={el => { triggerRefs.current[index] = el; }}
                  onMouseEnter={() => handleNavItemMouseEnter(item.name, !!item.children)}
                  onMouseLeave={handleNavItemMouseLeave}
                  >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      const clickData: NavLinkClickData = {
                        hasChildren: !!item.children,
                        itemName: item.name,
                        href: item.href,
                        sectionIndex: item.sectionIndex,
                      };
                      handleNavLinkClick(clickData, e);
                    }}
                    aria-expanded={item.children ? openDropdown === item.name : undefined}
                    className={`
                      relative 
                      ${item.isButton 
                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-semibold px-3 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out' // Increased padding and font for button
                        : `text-slate-700 ${hoverTextClass} px-2 py-1.5 lg:px-2.5 lg:py-2 text-xs lg:text-sm font-medium flex items-center space-x-1 group-hover/navitem:scale-105 transition-transform duration-200 ease-out  // Increased padding and font for links
                           ${isActive ? activeTextClass : ''}`
                      }
                    `}
                  >
                    {item.icon && !item.isButton && <item.icon className={`w-2.5 h-2.5 lg:w-3 lg:h-3 ${isActive ? 'text-yellow-400' : 'text-slate-500 group-hover/navitem:text-yellow-400'}`} />} {/* Increased icon size */}
                    <span>{item.name}</span>
                    {item.children && <ChevronDownIcon className="w-3 h-3 lg:w-3.5 lg:h-3.5 ml-1 text-slate-400 group-hover/navitem:text-yellow-400" />}
                  </a>
                  {item.children && (
                    <div 
                      ref={dropdownPanelRef} 
                      onMouseEnter={handleDropdownPanelMouseEnter}
                      onMouseLeave={handleDropdownPanelMouseLeave}
                      className={`
                        absolute left-1/2 -translate-x-1/2 mt-3 w-60 lg:w-64 rounded-xl shadow-2xl 
                        bg-white/90 backdrop-blur-lg border border-slate-200 py-1.5 max-h-80 overflow-y-auto hide-scrollbar
                        transition-all duration-300 ease-out
                        ${openDropdown === item.name 
                          ? 'opacity-100 scale-100 translate-y-0' 
                          : 'opacity-0 scale-90 -translate-y-4 pointer-events-none' // Updated animation
                        }
                      `}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {playClickSound(); setOpenDropdown(null); setHoveredItemName(null);}}
                          className={`block px-4 py-2 text-xs lg:text-sm text-slate-700 hover:bg-slate-100 rounded-md mx-1 my-0.5 hover:scale-105 golden-shimmer-bg-hover transition-all duration-200 ease-out ${hoverTextClass}`}
                        >
                          {child.icon && <child.icon className="w-3.5 h-3.5 mr-2 inline" />}
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {desktopUtilities}
          </div>
          
          <div className="md:hidden">
            <button 
                onClick={handleMobileMenuToggle} 
                className="text-slate-600 p-2 focus:outline-none hover:bg-slate-100/70 rounded-full transition-all duration-300 ease-in-out bg-white/70 backdrop-blur-sm border border-slate-200/90 shadow-md hover:scale-110 hover:shadow-lg"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div> 
      </div> 

       {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl py-3 max-h-[calc(100vh-4.5rem)] overflow-y-auto shadow-2xl border-t border-slate-200 hide-scrollbar">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="pb-3 mb-2 border-b border-slate-200/80">
              {searchBarComponent(true)}
            </div>

            {allNavItemsForMobile.map((item) => { 
              const isActive = !item.isButton && item.name === hoveredItemName; 
              const activeTextClass = 'text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text';
              const hoverTextClass = 'hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:bg-clip-text';
              return (
                <div key={item.name} className="py-1">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      const clickData: NavLinkClickData = {
                        hasChildren: !!item.children,
                        itemName: item.name,
                        href: item.href,
                        sectionIndex: item.sectionIndex,
                      };
                      handleNavLinkClick(clickData, e);
                    }}
                    onMouseEnter={() => { if (!item.isButton) handleNavItemMouseEnter(item.name, !!item.children); }}
                    onMouseLeave={handleNavItemMouseLeave} // Keep this for desktop-like hover effects if any apply
                    aria-expanded={item.children ? openDropdown === item.name : undefined}
                    className={`
                      ${item.isButton 
                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-semibold px-3 py-2.5 rounded-md text-sm my-1 block text-center' 
                        : `text-slate-700 ${hoverTextClass} px-3 py-2.5 text-sm font-medium flex items-center justify-between space-x-2 my-0.5 rounded-md hover:bg-slate-100
                           ${isActive ? activeTextClass : ''}`
                      }
                      transition-colors duration-150 ease-in-out
                    `}
                  >
                    <div className="flex items-center space-x-2">
                        {item.icon && !item.isButton && <item.icon className={`w-2.5 h-2.5 ${isActive ? 'text-yellow-400' : 'text-slate-600 group-hover:text-yellow-400'}`} />}
                        <span>{item.name}</span>
                    </div>
                    {item.children && <ChevronDownIcon className={`w-4 h-4 transition-transform text-slate-400 ${openDropdown === item.name ? 'rotate-180 text-yellow-400' : 'group-hover:text-yellow-400'}`} />}
                  </a>
                  {item.children && openDropdown === item.name && (
                    <div 
                      className="pl-4 mt-1 pb-1 space-y-0.5 border-l-2 border-slate-300/70 hide-scrollbar"
                      onMouseEnter={handleDropdownPanelMouseEnter} 
                      onMouseLeave={handleDropdownPanelMouseLeave} 
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => { // Child items don't have sectionIndex, treat as normal link
                             const childClickData: NavLinkClickData = {
                               hasChildren: false,
                               itemName: child.name,
                               href: child.href,
                             };
                             handleNavLinkClick(childClickData, e);
                          }}
                          className={`block px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-md hover:scale-105 golden-shimmer-bg-hover transition-all duration-200 ease-out ${hoverTextClass}`}
                        >
                          {child.icon && <child.icon className="w-3.5 h-3.5 mr-1.5 inline" />}
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className="flex items-center justify-center space-x-4 px-4 pt-3 mt-2 border-t border-slate-200/80">
                <button aria-label="Select language" className="text-slate-600 hover:text-yellow-400 p-2.5 hover:bg-slate-100/50 rounded-full" onClick={playClickSound}>
                    <GlobeIcon className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
