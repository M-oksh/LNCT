
import React, { useState, useEffect, useRef } from 'react';
import { LnctGeometricLogoIcon } from '../constants';

interface LoadingScreenProps {
  onLoaded: () => void;
  duration?: number; 
}

// Timing constants for the new text animation
const LETTER_ENTER_DURATION = 600; 
const LETTER_STAGGER_DELAY = 200; 
const GLINT_ANIMATION_DURATION = 500; 
const GLINT_START_DELAY_AFTER_LETTER_ENTER = 100;
const HOLD_AFTER_TEXT_ANIM_MS = 200; // Pause after text animation completes
const BACKGROUND_TRANSITION_DELAY = 250; // Delay for bg/logo fade-in during crossfade

const NUM_TEXT_LETTERS = 4;
const TEXT_ANIMATION_TOTAL_DURATION = 
  (NUM_TEXT_LETTERS * LETTER_STAGGER_DELAY) + 
  LETTER_ENTER_DURATION +                  
  GLINT_START_DELAY_AFTER_LETTER_ENTER +   
  GLINT_ANIMATION_DURATION;               

const TEXT_INTRO_PHASE_TOTAL_DURATION = TEXT_ANIMATION_TOTAL_DURATION + HOLD_AFTER_TEXT_ANIM_MS;

const LOGO_PART_ANIMATION_STEP_DURATION = 400; 

interface AnimatedLetterState {
  char: string;
  playEnter: boolean;
  playGlint: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded, duration = 4500 }) => {
  const [currentPhase, setCurrentPhase] = useState<'textAnimating' | 'textHolding' | 'crossFading' | 'logoAnimating'>('textAnimating');
  const [showTextElements, setShowTextElements] = useState(true);
  const [showLogoElements, setShowLogoElements] = useState(false);
  const [stardustActive, setStardustActive] = useState(true);
  const [logoInternalAnimationActive, setLogoInternalAnimationActive] = useState(false);

  const [animatedLetters, setAnimatedLetters] = useState<AnimatedLetterState[]>(
    "LNCT".split("").map(char => ({ char, playEnter: false, playGlint: false }))
  );
  const [logoAnimationStep, setLogoAnimationStep] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesArray = useRef<Particle[]>([]);
  
  const letterTimers = useRef<number[]>([]);
  const phaseTimer = useRef<number | null>(null);
  const mainFadeOutTimer = useRef<number | null>(null);
  const finalOnLoadedTimer = useRef<number | null>(null);
  const logoIntervalTimer = useRef<number | null>(null);


  const logoAnimationOrderIndices = [0, 1, 2]; 
  const numLogoAnimationParts = logoAnimationOrderIndices.length;

  class Particle {
    x: number; y: number; size: number; speedX: number; speedY: number; color: string; opacity: number;
    canvasWidth: number; canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.canvasWidth = canvasWidth; this.canvasHeight = canvasHeight;
      this.x = Math.random() * this.canvasWidth; this.y = Math.random() * this.canvasHeight;
      this.size = Math.random() * 1.5 + 0.5; 
      this.speedX = (Math.random() - 0.5) * 0.3; this.speedY = (Math.random() - 0.5) * 0.3; 
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = `rgba(253, 224, 71, ${this.opacity})`; 
    }
    update() {
      if (this.x > this.canvasWidth + this.size || this.x < -this.size) this.x = Math.random() * this.canvasWidth;
      if (this.y > this.canvasHeight + this.size || this.y < -this.size) this.y = Math.random() * this.canvasHeight;
      this.x += this.speedX; this.y += this.speedY;
      if (Math.random() < 0.02) {
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(253, 224, 71, ${this.opacity})`; 
      }
    }
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
  }

  useEffect(() => { // Stardust canvas effect
    if (!stardustActive || !canvasRef.current) return;
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    if (!ctx) return; let animationFrameId: number;
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvas.width = canvasRef.current.offsetWidth; canvas.height = canvasRef.current.offsetHeight;
      initParticles();
    };
    const initParticles = () => {
      particlesArray.current = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) particlesArray.current.push(new Particle(canvas.width, canvas.height));
    };
    const animateParticles = () => {
      if (!ctx || !canvas || !stardustActive) { window.cancelAnimationFrame(animationFrameId); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.current.length; i++) { particlesArray.current[i].update(); particlesArray.current[i].draw(ctx); }
      animationFrameId = window.requestAnimationFrame(animateParticles);
    };
    resizeCanvas(); animateParticles();
    window.addEventListener('resize', resizeCanvas);
    return () => { window.cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resizeCanvas); if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.current = [];};
  }, [stardustActive]);

  useEffect(() => { // Main animation sequencing logic
    const clearAllTimeouts = () => {
      letterTimers.current.forEach(window.clearTimeout);
      letterTimers.current = [];
      if (phaseTimer.current) window.clearTimeout(phaseTimer.current);
      if (logoIntervalTimer.current) window.clearInterval(logoIntervalTimer.current);
    };

    if (currentPhase === 'textAnimating') {
      setShowTextElements(true); setShowLogoElements(false); setStardustActive(true);
      animatedLetters.forEach((_, index) => {
        const enterTimer = window.setTimeout(() => {
          if (!isVisible) return;
          setAnimatedLetters(prev => prev.map((l, i) => i === index ? { ...l, playEnter: true } : l));
          const glintTimer = window.setTimeout(() => {
            if (!isVisible) return;
            setAnimatedLetters(prev => prev.map((l, i) => i === index ? { ...l, playGlint: true } : l));
          }, LETTER_ENTER_DURATION + GLINT_START_DELAY_AFTER_LETTER_ENTER);
          letterTimers.current.push(glintTimer);
        }, index * LETTER_STAGGER_DELAY);
        letterTimers.current.push(enterTimer);
      });
      phaseTimer.current = window.setTimeout(() => { if (isVisible) setCurrentPhase('textHolding'); }, TEXT_ANIMATION_TOTAL_DURATION);
    
    } else if (currentPhase === 'textHolding') {
      phaseTimer.current = window.setTimeout(() => { if (isVisible) setCurrentPhase('crossFading'); }, HOLD_AFTER_TEXT_ANIM_MS);
    
    } else if (currentPhase === 'crossFading') {
      setShowTextElements(false); // Start fading out text & stardust
      setStardustActive(false);   // Stop stardust JS loop

      phaseTimer.current = window.setTimeout(() => { // After a delay, start fading in logo & changing background
          if (!isVisible) return;
          setShowLogoElements(true);
          setLogoInternalAnimationActive(true);
          setCurrentPhase('logoAnimating'); // Also triggers bg color change in main div class
      }, BACKGROUND_TRANSITION_DELAY); 

    } else if (currentPhase === 'logoAnimating' && logoInternalAnimationActive) {
        logoIntervalTimer.current = window.setInterval(() => {
        setLogoAnimationStep(prevStep => (prevStep + 1) % numLogoAnimationParts);
      }, LOGO_PART_ANIMATION_STEP_DURATION);
    }
    
    return clearAllTimeouts;
  }, [currentPhase, isVisible, numLogoAnimationParts, logoInternalAnimationActive]);

  useEffect(() => { // Overall screen visibility and onLoaded callback
    const totalMinimumDuration = TEXT_INTRO_PHASE_TOTAL_DURATION + (numLogoAnimationParts * LOGO_PART_ANIMATION_STEP_DURATION) + 700; // 700ms for crossfade
    const actualDuration = Math.max(duration, totalMinimumDuration);
    
    mainFadeOutTimer.current = window.setTimeout(() => { setIsVisible(false); }, actualDuration);
    finalOnLoadedTimer.current = window.setTimeout(onLoaded, actualDuration + 500); // 500ms for fade out animation
    
    return () => {
      if (mainFadeOutTimer.current) window.clearTimeout(mainFadeOutTimer.current);
      if (finalOnLoadedTimer.current) window.clearTimeout(finalOnLoadedTimer.current);
    };
  }, [duration, onLoaded, numLogoAnimationParts]);
  
  const partIndexToHighlightForLogo = logoAnimationOrderIndices[logoAnimationStep];

  const getScreenBgClass = () => {
    if (currentPhase === 'textAnimating' || currentPhase === 'textHolding') return 'bg-slate-900';
    return 'bg-black/90 backdrop-blur-sm';
  };

  return (
    <div
      className={`
        fixed inset-0 flex flex-col items-center justify-center z-[100]
        transition-opacity duration-500 ease-out 
        ${getScreenBgClass()} transition-colors duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      aria-busy="true" aria-live="polite" role="status"
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-out
                   ${showTextElements ? 'opacity-100' : 'opacity-0'}`}
      >
        {stardustActive && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[0]" />}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex">
            {animatedLetters.map((letterState, index) => {
              const isN = letterState.char === 'N';
              const textColorClass = isN 
                ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent'
                : 'text-white';
              return (
                <span
                  key={index}
                  className={`letter-element text-7xl md:text-8xl lg:text-9xl font-extrabold ${textColorClass}
                              ${letterState.playEnter ? 'animate-letter-enter' : 'opacity-0'}
                              ${letterState.playGlint ? 'animate-glint-sweep' : ''}`}
                  style={{
                    animationDuration: `${LETTER_ENTER_DURATION}ms, ${GLINT_ANIMATION_DURATION}ms`,
                    animationDelay: `0ms, ${LETTER_ENTER_DURATION + GLINT_START_DELAY_AFTER_LETTER_ENTER}ms`,
                  }}
                >
                  {letterState.char}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in
                   ${showLogoElements ? 'opacity-100' : 'opacity-0'}`}
      >
        <LnctGeometricLogoIcon
          className="w-32 h-32 md:w-40 md:h-40 mb-4"
          animatedPartIndex={logoInternalAnimationActive ? partIndexToHighlightForLogo : undefined}
          baseOpacity={0.15} 
          highlightOpacity={0.85} 
        />
        <p className="text-lg font-semibold tracking-wider animate-pulse bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Loading Experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
