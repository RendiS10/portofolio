import React, { useEffect, useRef } from 'react';

interface ContactPaddyCanvasProps {
  isNight?: boolean;
}

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

export const ContactPaddyCanvas: React.FC<ContactPaddyCanvasProps> = ({ isNight = false }) => {
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

    // Ambient floating particles (pollen/dew in morning, luminous fireflies at night)
    const fireflies: {
      x: number;
      y: number;
      radius: number;
      speed: number;
      wobbleSpeed: number;
      seed: number;
      alpha: number;
    }[] = [];

    const initFireflies = (width: number, height: number) => {
      fireflies.length = 0;
      const count = Math.floor(width / 50);
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isNight ? 1.5 + Math.random() * 3 : 1 + Math.random() * 1.5,
          speed: 0.4 + Math.random() * 0.8,
          wobbleSpeed: 1.0 + Math.random() * 1.5,
          seed: Math.random() * 100,
          alpha: isNight ? 0.35 + Math.random() * 0.5 : 0.12 + Math.random() * 0.18
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

    // Click ripple feedback
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 130,
        alpha: isNight ? 0.85 : 0.5,
        speed: 2.8
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: 80,
        alpha: isNight ? 0.6 : 0.35,
        speed: 1.8
      });

      // Warm ember droplets
      const count = isNight ? 14 : 8;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 2.2 + Math.random() * 3.5;
        dropletsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.0,
          radius: 1.2 + Math.random() * 2.0,
          alpha: isNight ? 1.0 : 0.6,
          decay: 0.022 + Math.random() * 0.015,
          gravity: 0.16
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

      // Harmonic Background Gradient: Morning Mist Ivory vs Night Peat Obsidian
      const duskGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isNight) {
        duskGrad.addColorStop(0, '#040b06');      // Midnight emerald
        duskGrad.addColorStop(0.35, '#07150c');   // Deep forest dusk
        duskGrad.addColorStop(0.70, '#0a1a10');   // Starry obsidian
        duskGrad.addColorStop(1.0, '#030805');    // Pitch black emerald night
      } else {
        duskGrad.addColorStop(0, '#fbfaf6');      // Warm mist ivory
        duskGrad.addColorStop(0.40, '#f5f3ec');   // Soft highland dew
        duskGrad.addColorStop(0.80, '#edf2eb');   // Gentle morning sage
        duskGrad.addColorStop(1.0, '#e5ece3');    // Subtle green-tinted ivory
      }
      ctx.fillStyle = duskGrad;
      ctx.fillRect(0, 0, width, height);

      // Smooth Topographic Elevation Contour Waves (NO highway dash lines!)
      const drawContourLine = (
        yPos: number,
        freq: number,
        amp: number,
        speed: number,
        alpha: number,
        color: string
      ) => {
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const wy =
            yPos +
            Math.sin(x * freq + time * speed) * amp +
            Math.cos(x * (freq * 0.7) - time * (speed * 0.5)) * (amp * 0.5);
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([]); // Clean continuous natural contour
        ctx.stroke();
        ctx.restore();
      };

      if (isNight) {
        drawContourLine(height * 0.20, 0.0035, 9, 0.7, 0.22, '#10b981');
        drawContourLine(height * 0.50, 0.0030, 11, 0.55, 0.16, '#059669');
        drawContourLine(height * 0.78, 0.0032, 10, 0.45, 0.12, '#047857');
      } else {
        drawContourLine(height * 0.20, 0.0035, 8, 0.65, 0.10, '#1b4332');
        drawContourLine(height * 0.50, 0.0030, 10, 0.50, 0.08, '#2d6a4f');
        drawContourLine(height * 0.78, 0.0032, 9, 0.40, 0.06, '#40916c');
      }

      // Gentle floating autumn/tea leaf in the breeze
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

      const leafX = ((time * 22) % (width + 120)) - 60;
      const leafY = height * 0.36 + Math.sin(time * 1.2) * 8;
      const leafColor = isNight ? 'rgba(251, 191, 36, 0.5)' : 'rgba(27, 67, 50, 0.15)';
      drawLeaf(leafX, leafY, Math.sin(time * 1.4) * 0.35, 8, leafColor);

      // Ambient Floating Particles
      ctx.save();
      for (const b of fireflies) {
        b.y -= b.speed;
        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        const wobbleX = b.x + Math.sin(time * b.wobbleSpeed + b.seed) * 4;
        const currentAlpha = b.alpha * (0.6 + Math.sin(time * 2 + b.seed) * 0.4);

        if (isNight) {
          ctx.beginPath();
          ctx.arc(wobbleX, b.y, b.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.35})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 224, 71, ${currentAlpha})`;
          ctx.fill();
        } else {
          // Daylight: subtle dew/sun glint particle
          ctx.beginPath();
          ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(27, 67, 50, ${currentAlpha * 0.6})`;
          ctx.fill();
        }
      }
      ctx.restore();

      // Ripples feedback on click
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
        ctx.strokeStyle = isNight
          ? `rgba(251, 191, 36, ${r.alpha * 0.85})`
          : `rgba(27, 67, 50, ${r.alpha * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Splash droplets
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
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNight
          ? `rgba(253, 224, 71, ${d.alpha * 0.9})`
          : `rgba(27, 67, 50, ${d.alpha * 0.4})`;
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
  }, [isNight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
