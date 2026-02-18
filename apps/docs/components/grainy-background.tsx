'use client';
import { useEffect, useRef } from 'react';

const GrainyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a small grain pattern
      const grainSize = 128;
      const grainCanvas = document.createElement('canvas');
      grainCanvas.width = grainSize;
      grainCanvas.height = grainSize;
      const grainCtx = grainCanvas.getContext('2d');
      if (!grainCtx) return;

      const grainData = grainCtx.createImageData(grainSize, grainSize);
      for (let i = 0; i < grainData.data.length; i += 4) {
        const value = Math.random() * 255;
        grainData.data[i] = value;
        grainData.data[i + 1] = value;
        grainData.data[i + 2] = value;
        grainData.data[i + 3] = 15; // Very low alpha for subtle grain
      }
      grainCtx.putImageData(grainData, 0, 0);

      // Fill the main canvas with the pattern
      const pattern = ctx.createPattern(grainCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Add a very subtle primary glow in the corner
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.9,
        canvas.height * 0.1,
        0,
        canvas.width * 0.9,
        canvas.height * 0.1,
        canvas.width * 0.5
      );
      gradient.addColorStop(0, 'rgba(120, 120, 120, 0.05)');
      gradient.addColorStop(1, 'rgba(120, 120, 120, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none opacity-40 mix-blend-overlay" 
    />
  );
};

export default GrainyBackground;
