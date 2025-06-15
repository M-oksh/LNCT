import React, { useRef, useEffect } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Mouse position is no longer needed for floating bubbles
  // const mousePosition = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const particlesArray = useRef<Particle[]>([]);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    canvasWidth: number;
    canvasHeight: number;

    constructor(x: number, y: number, canvasWidth: number, canvasHeight: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 25 + 10; // Bubble size range: 10px to 35px
      this.speedX = (Math.random() - 0.5) * 0.2; // Slow horizontal drift
      this.speedY = (Math.random() * -0.3) - 0.1; // Slow upward drift
      
      // White bubbles with random opacity
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.03})`; // Opacity 0.03 to 0.23

      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
    }

    update() { // Removed mouseX, mouseY parameters
      // Gentle wrapping behavior for continuous floating
      if (this.x > this.canvasWidth + this.size) this.x = -this.size;
      if (this.x < -this.size) this.x = this.canvasWidth + this.size;
      
      if (this.y < -this.size) { // Reset to bottom when it floats off the top
          this.y = this.canvasHeight + this.size;
          this.x = Math.random() * this.canvasWidth; // Re-randomize x position
          this.speedY = (Math.random() * -0.3) - 0.1; // New upward speed
      } else if (this.y > this.canvasHeight + this.size) { // If somehow goes below
          this.y = -this.size;
          this.x = Math.random() * this.canvasWidth;
      }


      // No mouse interaction for bubbles
      // if (mouseX !== null && mouseY !== null) { ... }

      this.x += this.speedX;
      this.y += this.speedY;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
        if (!canvasRef.current || !canvasRef.current.parentElement) return;
        canvas.width = canvasRef.current.parentElement.offsetWidth;
        canvas.height = canvasRef.current.parentElement.offsetHeight;
        initParticles();
    };
    
    const initParticles = () => {
        particlesArray.current = [];
        // Adjusted particle density for larger, sparse bubbles
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 45000); 
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height; // Start anywhere on screen
            particlesArray.current.push(new Particle(x, y, canvas.width, canvas.height));
        }
    };


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.current.length; i++) {
        particlesArray.current[i].update(); // Removed mousePosition args
        particlesArray.current[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas(); 
    animate();

    // Mouse move and leave listeners are no longer needed
    // const handleMouseMove = (event: MouseEvent) => { ... };
    // const handleMouseLeave = () => { ... };
    
    // const parentElement = canvasRef.current?.parentElement;
    // if (parentElement) { ... }
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      // if (parentElement) { ... }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[1]" />;
};

export default InteractiveBackground;