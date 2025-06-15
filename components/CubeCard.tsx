import React from 'react';
import { MilestoneItem } from '../types';
import { TrophyIcon } from '../constants'; // Default icon

interface CubeCardProps {
  milestones: MilestoneItem[]; // Expects up to 6 milestones
  cubeSize?: number;
}

/**
 * @deprecated This component is currently not used in QuadrantSection. 
 * It has been replaced by PageTurnAchievementCard. Kept for potential future use.
 */
const CubeCard: React.FC<CubeCardProps> = ({
  milestones,
  cubeSize = 200, // Default cube side length in pixels
}) => {
  const faceSize = cubeSize;
  const translateZValue = cubeSize / 2;

  const faceStyles = {
    width: `${faceSize}px`,
    height: `${faceSize}px`,
  };
  
  const dynamicFaceStyles = (transform: string) => ({
    ...faceStyles,
    transform,
    // Adjust positioning if faceSize is different from .cube-face CSS
    left: `calc(50% - ${faceSize/2}px)`, 
    top: `calc(50% - ${faceSize/2}px)`,
  });

  const facesOrder: ('front' | 'right' | 'back' | 'left' | 'top' | 'bottom')[] = [
    'front', 'right', 'back', 'left', 'top', 'bottom'
  ];

  const truncateDescription = (text: string, maxLength: number = 45) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
    return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
  };
  
  return (
    <div className="cube-perspective-container" style={{ width: `${cubeSize + 50}px`, height: `${cubeSize + 50}px`}}>
      <div className="cube cube-is-floating" style={{ width: `${cubeSize}px`, height: `${cubeSize}px` }}>
        {facesOrder.map((faceKey, index) => {
          const milestone = milestones[index];
          const IconComponent = milestone?.icon || TrophyIcon;
          
          let transformStyle = '';
          switch(faceKey) {
            case 'front': transformStyle = `rotateY(0deg) translateZ(${translateZValue}px)`; break;
            case 'right': transformStyle = `rotateY(90deg) translateZ(${translateZValue}px)`; break;
            case 'back':  transformStyle = `rotateY(180deg) translateZ(${translateZValue}px)`; break;
            case 'left':  transformStyle = `rotateY(-90deg) translateZ(${translateZValue}px)`; break;
            case 'top':   transformStyle = `rotateX(90deg) translateZ(${translateZValue}px)`; break;
            case 'bottom':transformStyle = `rotateX(-90deg) translateZ(${translateZValue}px)`; break;
          }

          return (
            <div
              key={faceKey}
              className={`cube-face cube-face--${faceKey}`} // General styling from index.html
              style={dynamicFaceStyles(transformStyle)}
            >
              {milestone ? (
                <>
                  <IconComponent className={`cube-face-icon ${milestone.categoryColor || 'text-amber-500'}`} />
                  <p className={`cube-face-year ${milestone.categoryColor || 'text-amber-500'}`}> 
                    {milestone.year}
                  </p>
                  <h4 className="cube-face-title"> 
                    {milestone.title}
                  </h4>
                  <p className="cube-face-description"> 
                    {truncateDescription(milestone.description)}
                  </p>
                </>
              ) : (
                <span className="cube-face-empty">LNCT</span> 
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CubeCard;