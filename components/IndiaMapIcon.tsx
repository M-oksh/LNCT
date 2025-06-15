import React from 'react';

interface IndiaMapIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const IndiaMapIcon: React.FC<IndiaMapIconProps> = ({ className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 900" // Maintained existing viewBox
      className={className}
      style={style}
      aria-label="Map of India with states"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* More Detailed Map of India */}
        {/* Main Outline of India - Significantly more detailed */}
        <path d="M340,20 L385,22 L403,30 L410,60 L420,80 L410,100 L420,120 L450,145 L480,140 L500,122 L530,100 L550,90 L570,100 L590,120 L600,150 L620,180 L630,220 L635,250 L620,280 L630,310 L640,340 L640,370 L620,400 L600,430 L580,470 L570,500 L560,550 L550,600 L540,650 L530,700 L515,750 L490,800 L460,830 L420,850 L380,855 L340,845 L300,820 L270,780 L250,740 L235,700 L225,650 L220,600 L210,550 L200,500 L190,450 L180,400 L175,350 L170,300 L165,250 L170,200 L180,150 L200,120 L230,80 L270,50 L300,30 Z" />

        {/* Internal State Lines - More representative */}
        {/* J&K, Ladakh, Himachal, Punjab region */}
        <path d="M340,20 L350,100 L420,120 L410,60 Z" />
        <path d="M350,100 L300,150 L380,180 Z" />
        {/* Rajasthan */}
        <path d="M230,80 L200,250 L300,280 L380,180 Z" />
        {/* Gujarat */}
        <path d="M180,280 L200,250 L280,300 L250,400 L175,350 Z" />
        {/* UP, Bihar, MP region */}
        <path d="M380,180 L300,280 L400,400 L500,350 L570,100 Z" />
        <path d="M400,400 L480,420" />
        {/* Maharashtra, Goa, Karnataka */}
        <path d="M250,400 L280,300 L400,400 L380,550 L220,500 Z" />
        <path d="M220,500 L225,600" />
        {/* Kerala, Tamil Nadu */}
        <path d="M225,600 L250,740 L380,855 L380,550 Z" />
        <path d="M380,550 L515,750" />
        {/* Andhra, Telangana, Odisha */}
        <path d="M380,550 L480,420 L570,500 L515,750 Z" />
        <path d="M480,420 L580,470" />
        {/* West Bengal, Jharkhand, Chhattisgarh */}
        <path d="M500,350 L480,420 L550,380 Z" />
        {/* North Eastern States group */}
        <path d="M570,100 L600,150 L550,250 L580,320 L630,310 L620,280 L635,250 L630,220 L600,150" />
        <path d="M550,250 L500,350" />
        
        {/* Islands */}
        {/* Andaman & Nicobar Islands - More spread out and numerous */}
        <g transform="translate(220, 150) scale(0.8)">
          <rect x="620" y="630" width="7" height="15" />
          <rect x="625" y="650" width="6" height="12" />
          <rect x="632" y="670" width="5" height="18" />
          <rect x="628" y="695" width="6" height="14" />
          <rect x="635" y="715" width="5" height="22" />
          <rect x="642" y="740" width="4" height="10" />
        </g>

        {/* Lakshadweep Islands - More spread out */}
        <g transform="scale(0.9) translate(-20, 50)">
          <circle cx="130" cy="580" r="4" />
          <circle cx="120" cy="600" r="3" />
          <circle cx="135" cy="615" r="4" />
          <circle cx="115" cy="630" r="3" />
          <circle cx="125" cy="645" r="3.5" />
        </g>
      </g>
    </svg>
  );
};

export default IndiaMapIcon;