import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  children: string;
  scrambleDuration?: number; // Milliseconds for scramble effect
  characters?: string; // Characters to use for scrambling
  className?: string; // Allow passing additional classNames
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  children,
  scrambleDuration = 300,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&^%$#@!',
  className = '',
}) => {
  const [displayText, setDisplayText] = useState(children);
  const animationFrameId = useRef<number | null>(null);
  // Fix: Changed NodeJS.Timeout to number for browser compatibility
  const timeoutId = useRef<number | null>(null);
  const isMounted = useRef(true);
  const originalText = useRef(children);

  useEffect(() => {
    originalText.current = children;
    setDisplayText(children); // Update if children prop changes
  }, [children]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const scramble = useCallback(() => {
    let currentText = '';
    for (let i = 0; i < originalText.current.length; i++) {
      if (originalText.current[i] === ' ') {
        currentText += ' ';
      } else {
        currentText += characters[Math.floor(Math.random() * characters.length)];
      }
    }
    if (isMounted.current) {
      setDisplayText(currentText);
      animationFrameId.current = requestAnimationFrame(scramble);
    }
  }, [characters]);

  const handleMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    
    if (isMounted.current) {
      animationFrameId.current = requestAnimationFrame(scramble);
    }

    timeoutId.current = setTimeout(() => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (isMounted.current) {
        setDisplayText(originalText.current);
      }
    }, scrambleDuration);
  };

  const handleMouseLeave = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (isMounted.current) {
      setDisplayText(originalText.current);
    }
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`} // inline-block helps with layout consistency
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;