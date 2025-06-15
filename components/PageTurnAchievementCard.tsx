import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MilestoneItem } from '../types';
import { TrophyIcon } from '../constants'; // Default icon

interface PageTurnAchievementCardProps {
  milestones: MilestoneItem[];
  accentColorBase?: string; 
  cardWidth?: string; 
  cardHeight?: string; 
}

const PageTurnAchievementCard: React.FC<PageTurnAchievementCardProps> = ({
  milestones,
  accentColorBase = 'amber',
  cardWidth = '440px', 
  cardHeight = '330px', 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const flipTimeoutRef = useRef<number | null>(null);

  const currentEffectiveAccentColor = milestones[currentIndex]?.categoryColor || `text-${accentColorBase}-500`;
  
  const nextIndex = (currentIndex + 1) % milestones.length;
  const nextEffectiveAccentColor = milestones[nextIndex]?.categoryColor || `text-${accentColorBase}-500`;

  const triggerFlip = useCallback(() => {
    if (milestones.length <= 1) return;
    setIsFlipping(true);
    
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    flipTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % milestones.length);
      setIsFlipping(false);
    }, 300); 
  }, [milestones.length]);

  useEffect(() => {
    if (isHovered || milestones.length <= 1) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }
    const scheduleNextFlip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (!isHovered) { 
           triggerFlip();
        }
      }, 2600); 
    };
    scheduleNextFlip();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, [currentIndex, isHovered, milestones.length, triggerFlip]);
  
  const currentMilestone = milestones[currentIndex];
  const nextMilestone = milestones[nextIndex];
  
  const CurrentIconComponent = currentMilestone?.icon || TrophyIcon;
  const NextIconComponent = nextMilestone?.icon || TrophyIcon;

  const renderFaceContent = (milestone: MilestoneItem | undefined, IconComp: React.FC<any>, effectiveColorClass: string) => {
    if (!milestone) {
      return <span className="text-slate-400 text-lg">LNCT</span>;
    }
    return (
      <>
        <IconComp className={`page-content-icon ${effectiveColorClass}`} />
        <p className={`page-content-year ${effectiveColorClass}`}>
          {milestone.year}
        </p>
        <h4 className="page-content-title">
          {milestone.title}
        </h4>
        <p className="page-content-description">
          {milestone.description}
        </p>
      </>
    );
  };

  return (
    <div 
      className={`page-turn-perspective-container ${isHovered ? 'hovered' : ''}`}
      style={{ width: cardWidth, height: cardHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`page-turn-card ${isFlipping ? 'flipping' : ''}`}>
        <div className="page-face-content page-face-content--front">
          {renderFaceContent(currentMilestone, CurrentIconComponent, currentEffectiveAccentColor)}
        </div>
        <div className="page-face-content page-face-content--back">
          {renderFaceContent(nextMilestone, NextIconComponent, nextEffectiveAccentColor)}
        </div>
      </div>
    </div>
  );
};

export default PageTurnAchievementCard;