import React, { useEffect, useRef } from 'react';
import {
  renderWaterBody,
  renderSandLayers,
  renderWaterWaves,
  renderGoldenMotes
} from './oceanEnvironmentRenderers';
import { renderCreaturesByDepth } from './oceanCreatureRenderers';

interface AnimatedOceanSlideBackgroundProps {
  depthLevel: 1 | 2 | 3 | 4;
}

export const AnimatedOceanSlideBackground: React.FC<AnimatedOceanSlideBackgroundProps> = ({
  depthLevel
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let time = 0;
    let isRunning = true;
    let isVisible = false;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!isRunning || !ctx || !canvas || !isVisible) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // water background
      renderWaterBody(ctx, width, height, depthLevel);

      // sand layers
      const { waterMinY, waterMaxY } = renderSandLayers(ctx, width, height, depthLevel, time);

      // surface waves
      renderWaterWaves(ctx, width, waterMinY, waterMaxY, time);

      // marine creatures by depth
      renderCreaturesByDepth(ctx, depthLevel, width, height, time, waterMinY, waterMaxY);

      // golden twilight motes
      renderGoldenMotes(ctx, width, waterMinY, waterMaxY, time);

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId && isRunning) {
          animId = requestAnimationFrame(render);
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    return () => {
      isRunning = false;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [depthLevel]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
