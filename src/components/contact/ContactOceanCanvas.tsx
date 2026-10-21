import React, { useEffect, useRef } from 'react';

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const ContactOceanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropletsRef = useRef<SplashDroplet[]>([]);
  const ripplesRef = useRef<WaterRipple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let time = 0;
    let isRunning = true;
    let isVisible = false;

    // Evening fireflies
    const fireflies: { x: number; y: number; radius: number; speed: number; wobbleSpeed: number; seed: number; alpha: number }[] = [];
    const initFireflies = (width: number, height: number) => {
      fireflies.length = 0;
      const count = Math.floor(width / 45);
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3.5,
          speed: 0.6 + Math.random() * 1.1,
          wobbleSpeed: 1.2 + Math.random() * 2,
          seed: Math.random() * 100,
          alpha: 0.35 + Math.random() * 0.5
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

    // click handler to trigger ripple feedback
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 140,
        alpha: 0.9,
        speed: 3.2
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: 90,
        alpha: 0.65,
        speed: 2.0
      });

      // create golden ember droplets
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 2.5 + Math.random() * 4.5;
        dropletsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          radius: 1.5 + Math.random() * 2.5,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.015,
          gravity: 0.18
        });
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('click', handleClick);
    }

    const render = () => {
      if (!isRunning || !ctx || !canvas || !isVisible) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Warm Sunset Dusk Gradient
      const duskGrad = ctx.createLinearGradient(0, 0, 0, height);
      duskGrad.addColorStop(0, '#1c1917');      // Warm stone dusk
      duskGrad.addColorStop(0.35, '#2e1c12');   // Warm terracotta amber dusk
      duskGrad.addColorStop(0.70, '#1e281e');   // Evening pine forest
      duskGrad.addColorStop(1.0, '#131b14');    // Deep peaceful countryside nightfall
      ctx.fillStyle = duskGrad;
      ctx.fillRect(0, 0, width, height);

      // Warm Terrace Ridge Lines
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
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 14]);
        ctx.stroke();
        ctx.restore();
      };

      drawRidgeLine(height * 0.20, 0.005, 8, 1.0, 0.45, '#f59e0b');
      drawRidgeLine(height * 0.50, 0.004, 10, 0.8, 0.35, '#d97706');
      drawRidgeLine(height * 0.75, 0.004, 9, 0.7, 0.30, '#52b788');

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

      const leafX = ((time * 28) % (width + 100)) - 50;
      const leafY = height * 0.38 + Math.sin(time * 1.4) * 10;
      drawLeaf(leafX, leafY, Math.sin(time * 1.6) * 0.4, 9, 'rgba(251, 191, 36, 0.7)');

      // Twilight Fireflies (GPU hardware-accelerated dual arc)
      ctx.save();
      for (const b of fireflies) {
        b.y -= b.speed;
        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        const wobbleX = b.x + Math.sin(time * b.wobbleSpeed + b.seed) * 5;
        const currentAlpha = b.alpha * (0.6 + Math.sin(time * 2 + b.seed) * 0.4);

        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.35})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${currentAlpha})`;
        ctx.fill();
      }
      ctx.restore();

      // Ripples with Warm Golden Glow
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 191, 36, ${r.alpha * 0.85})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(254, 240, 138, ${r.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Golden Splash Droplets
      for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
        const d = dropletsRef.current[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += d.gravity;
        d.alpha -= d.decay;

        if (d.alpha <= 0) {
          dropletsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${d.alpha * 0.35})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${d.alpha * 0.9})`;
        ctx.fill();
        ctx.restore();
      }

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
      if (parent) {
        parent.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
