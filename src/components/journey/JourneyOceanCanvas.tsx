import React, { useEffect, useRef } from 'react';

export const JourneyOceanCanvas: React.FC = () => {
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

    // Golden twilight fireflies & motes
    const fireflies: { x: number; y: number; radius: number; speed: number; wobbleSpeed: number; seed: number; alpha: number }[] = [];
    const initFireflies = (width: number, height: number) => {
      fireflies.length = 0;
      const count = Math.floor(width / 55);
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 2.8,
          speed: 0.5 + Math.random() * 1.0,
          wobbleSpeed: 1 + Math.random() * 2,
          seed: Math.random() * 100,
          alpha: 0.4 + Math.random() * 0.5
        });
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initFireflies(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!isRunning || !ctx || !canvas || !isVisible) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Sunset Hillside & Meadow Gradient
      const hillGrad = ctx.createLinearGradient(0, 0, 0, height);
      hillGrad.addColorStop(0, '#2d5a44');
      hillGrad.addColorStop(0.28, '#264e3b');
      hillGrad.addColorStop(0.65, '#2e382b');
      hillGrad.addColorStop(1.0, '#1c1f19');
      ctx.fillStyle = hillGrad;
      ctx.fillRect(0, 0, width, height);

      // Warm Sunset Shoreline / Meadow Lip
      const shorelineHeight = Math.min(220, height * 0.18);
      ctx.save();
      const sandGrad = ctx.createLinearGradient(0, 0, 0, shorelineHeight);
      sandGrad.addColorStop(0, '#d5cfba');
      sandGrad.addColorStop(0.4, '#e6dfce');
      sandGrad.addColorStop(0.8, '#f0eae0');
      sandGrad.addColorStop(1.0, '#f5f3ec');
      ctx.fillStyle = sandGrad;

      ctx.beginPath();
      ctx.moveTo(-50, -20);
      ctx.lineTo(width + 50, -20);
      ctx.lineTo(width + 50, shorelineHeight);

      for (let x = width + 50; x >= -50; x -= 8) {
        const sy =
          shorelineHeight +
          Math.sin(x * 0.005 + time * 1.2) * 12 +
          Math.cos(x * 0.008 - time * 0.7) * 6;
        ctx.lineTo(x, sy);
      }

      ctx.lineTo(-50, -20);
      ctx.closePath();
      ctx.fill();

      // Golden contour border
      ctx.beginPath();
      for (let x = -50; x <= width + 50; x += 8) {
        const sy =
          shorelineHeight +
          Math.sin(x * 0.005 + time * 1.2) * 12 +
          Math.cos(x * 0.008 - time * 0.7) * 6;
        if (x === -50) ctx.moveTo(x, sy);
        else ctx.lineTo(x, sy);
      }
      ctx.strokeStyle = '#d4b26f';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // Hillside Contour Ridge Lines
      const drawRidgeLine = (yPos: number, freq: number, amp: number, speed: number, alpha: number, color: string) => {
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const wy = yPos + Math.sin(x * freq + time * speed) * amp + Math.cos(x * (freq * 0.7) - time * (speed * 0.5)) * (amp * 0.5);
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2.2;
        ctx.setLineDash([16, 16]);
        ctx.stroke();
        ctx.restore();
      };

      drawRidgeLine(height * 0.32, 0.006, 8, 1.0, 0.5, '#fde047');
      drawRidgeLine(height * 0.55, 0.005, 10, 0.8, 0.4, '#f59e0b');
      drawRidgeLine(height * 0.78, 0.004, 12, 0.6, 0.35, '#80ed99');

      // Floating Autumn / Tea Leaves
      const drawLeaf = (lx: number, ly: number, angle: number, size: number, color: string) => {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(angle);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.quadraticCurveTo(0, -size * 0.45, size, 0);
        ctx.quadraticCurveTo(0, size * 0.45, -size, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      const leaf1X = ((time * 30) % (width + 100)) - 50;
      const leaf1Y = height * 0.45 + Math.sin(time * 1.5) * 12;
      drawLeaf(leaf1X, leaf1Y, Math.sin(time * 2) * 0.4, 10, 'rgba(245, 158, 11, 0.75)');

      const leaf2X = ((time * 24 + width * 0.5) % (width + 100)) - 50;
      const leaf2Y = height * 0.7 + Math.cos(time * 1.2) * 14;
      drawLeaf(leaf2X, leaf2Y, Math.cos(time * 1.8) * 0.5, 8, 'rgba(251, 191, 36, 0.7)');

      // Twilight Fireflies (GPU hardware-accelerated dual arc instead of software blur)
      ctx.save();
      for (const b of fireflies) {
        b.y -= b.speed;
        if (b.y < shorelineHeight) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        const wobbleX = b.x + Math.sin(time * b.wobbleSpeed + b.seed) * 6;
        const currentAlpha = b.alpha * (0.6 + Math.sin(time * 2 + b.seed) * 0.4);

        // Soft outer corona
        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.35})`;
        ctx.fill();

        // Inner bright spark
        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${currentAlpha})`;
        ctx.fill();
      }
      ctx.restore();

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
