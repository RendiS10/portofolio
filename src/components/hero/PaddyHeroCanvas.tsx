import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const WAVE_REFERENCE_WIDTH = 1400;

export interface PaddyHeroHandle {
  triggerSplash: (x: number, y: number, intensity?: number) => void;
  triggerRipple: (x: number, y: number, size?: number) => void;
}

interface FloatingLeaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  color: string;
  alpha: number;
}

interface SunsetMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

interface NightStar {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
}

interface WindRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface PaddyHeroCanvasProps {
  className?: string;
  isNight?: boolean;
}

export const PaddyHeroCanvas = forwardRef<PaddyHeroHandle, PaddyHeroCanvasProps>(
  ({ className = '', isNight = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const leavesRef = useRef<FloatingLeaf[]>([]);
    const motesRef = useRef<SunsetMote[]>([]);
    const starsRef = useRef<NightStar[]>([]);
    const ripplesRef = useRef<WindRipple[]>([]);
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);
    const isNightRef = useRef<boolean>(isNight);

    useEffect(() => {
      isNightRef.current = isNight;
    }, [isNight]);

    // Palettes
    const dayLeafPalette = ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#eab308', '#84cc16', '#a3e635'];
    const nightLeafPalette = ['#15803d', '#166534', '#047857', '#065f46', '#fde047', '#52b788'];

    const initLeaves = (width: number, height: number) => {
      leavesRef.current = [];
      const count = Math.min(36, Math.floor(width / 38));
      const palette = isNightRef.current ? nightLeafPalette : dayLeafPalette;
      for (let i = 0; i < count; i++) {
        leavesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.85,
          vx: 0.6 + Math.random() * 1.3,
          vy: 0.15 + Math.random() * 0.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
          size: 7 + Math.random() * 9,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 0.45 + Math.random() * 0.45
        });
      }
    };

    const initMotes = (width: number, height: number) => {
      motesRef.current = [];
      const count = Math.min(42, Math.floor(width / 32));
      for (let i = 0; i < count; i++) {
        motesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.9,
          vx: (Math.random() - 0.4) * 0.8,
          vy: -0.2 - Math.random() * 0.5,
          size: 1.2 + Math.random() * 2.4,
          alpha: 0.35 + Math.random() * 0.55,
          pulseSpeed: 1 + Math.random() * 2.5,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const initStars = (width: number, height: number) => {
      starsRef.current = [];
      const count = Math.min(85, Math.floor(width / 16));
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.62,
          radius: 0.7 + Math.random() * 1.5,
          alpha: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.8 + Math.random() * 2.5
        });
      }
    };

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1.0) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      triggerRipple(clientX, clientY, 40 + intensity * 50);

      const burstCount = Math.floor(6 * intensity);
      const palette = isNightRef.current ? nightLeafPalette : dayLeafPalette;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (2.5 + Math.random() * 4.5) * intensity;
        leavesRef.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
          size: 8 + Math.random() * 7,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 0.95
        });
      }
    };

    const triggerRipple = (clientX: number, clientY: number, size: number = 75) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: size,
        alpha: 0.55,
        speed: 1.8
      });
    };

    useImperativeHandle(ref, () => ({
      triggerSplash,
      triggerRipple
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let isRunning = true;
      let isVisible = true;
      let cssWidth = 0;
      let cssHeight = 0;

      const handleResize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        cssWidth = rect.width;
        cssHeight = rect.height;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        initLeaves(rect.width, rect.height);
        initMotes(rect.width, rect.height);
        initStars(rect.width, rect.height);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const render = () => {
        if (!isRunning || !canvas) return;
        const width = cssWidth || canvas.width;
        const height = cssHeight || canvas.height;
        const isNightTime = isNightRef.current;

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.012;
        const t = timeRef.current;

        // 1. SKY GRADIENT (Day: Fresh Tropical Morning | Night: Deep Starry Highland)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        if (isNightTime) {
          skyGrad.addColorStop(0, '#040b08');
          skyGrad.addColorStop(0.35, '#0a1610');
          skyGrad.addColorStop(0.68, '#0f2219');
          skyGrad.addColorStop(0.88, '#142a1f');
          skyGrad.addColorStop(1, '#1b3427');
        } else {
          // Pucat hangat agar menyatu dengan latar krem situs, bukan langit biru jenuh
          skyGrad.addColorStop(0, '#cfe0d2');
          skyGrad.addColorStop(0.3, '#dde9d6');
          skyGrad.addColorStop(0.62, '#eaeedb');
          skyGrad.addColorStop(0.85, '#f2f0df');
          skyGrad.addColorStop(1, '#f5f3ec');
        }
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. CELESTIAL BODY (Day: Warm Golden Sun | Night: Twinkling Stars & Golden Crescent Moon)
        const sunX = width * 0.76;
        const sunY = height * 0.28;

        if (isNightTime) {
          // Twinkling stars in night sky
          for (let i = 0; i < starsRef.current.length; i++) {
            const star = starsRef.current[i];
            const twinkle = Math.sin(t * star.twinkleSpeed + i * 2);
            const starAlpha = Math.max(0.15, star.alpha + twinkle * 0.35);

            ctx.save();
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(248, 250, 252, ${starAlpha})`;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.restore();
          }

          // Golden Crescent Moon
          ctx.save();
          // Moon Halo Glow
          const moonHalo = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
          moonHalo.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
          moonHalo.addColorStop(0.5, 'rgba(245, 158, 11, 0.12)');
          moonHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = moonHalo;
          ctx.beginPath();
          ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
          ctx.fill();

          // Crescent shape
          ctx.beginPath();
          ctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.shadowColor = '#fde047';
          ctx.shadowBlur = 18;
          ctx.fill();

          // Cutout to form crescent
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(sunX + 13, sunY - 7, 30, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          ctx.restore();
        } else {
          // Bright Warm Morning Sun
          ctx.save();
          const sunHaloGrad = ctx.createRadialGradient(
            sunX, sunY, 15,
            sunX, sunY, Math.min(width * 0.65, 480)
          );
          sunHaloGrad.addColorStop(0, 'rgba(250, 204, 110, 0.40)');
          sunHaloGrad.addColorStop(0.3, 'rgba(250, 204, 110, 0.18)');
          sunHaloGrad.addColorStop(0.7, 'rgba(250, 204, 110, 0.06)');
          sunHaloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = sunHaloGrad;
          ctx.fillRect(0, 0, width, height);

          // Glowing Sun Disc
          const sunDiscGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 44);
          sunDiscGrad.addColorStop(0, '#fffaf0');
          sunDiscGrad.addColorStop(0.35, '#f8d98a');
          sunDiscGrad.addColorStop(0.75, 'rgba(244, 190, 90, 0.9)');
          sunDiscGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = sunDiscGrad;
          ctx.beginPath();
          ctx.arc(sunX, sunY, 44, 0, Math.PI * 2);
          ctx.fill();

          // Soft Morning Sun Rays
          ctx.save();
          ctx.globalAlpha = 0.09 + Math.sin(t * 1.5) * 0.02;
          const rayGrad = ctx.createLinearGradient(sunX, sunY, width * 0.2, height * 0.85);
          rayGrad.addColorStop(0, '#f8d98a');
          rayGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = rayGrad;

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(width * 0.1, height * 0.9);
          ctx.lineTo(width * 0.35, height);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(width * 0.45, height);
          ctx.lineTo(width * 0.7, height);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          ctx.restore();
        }

        // 3. FLOWING WIND STREAMS
        const drawWindStream = (yPos: number, freq: number, speed: number, alpha: number, strokeW: number) => {
          ctx.save();
          ctx.beginPath();
          for (let x = 0; x <= width; x += 8) {
            const wy =
              yPos +
              Math.sin(x * freq + t * speed) * 16 +
              Math.cos(x * (freq * 0.6) - t * (speed * 0.4)) * 8;
            if (x === 0) ctx.moveTo(x, wy);
            else ctx.lineTo(x, wy);
          }
          ctx.strokeStyle = isNightTime
            ? `rgba(128, 237, 153, ${alpha * 0.45})`
            : `rgba(255, 255, 255, ${alpha * 0.55})`;
          ctx.lineWidth = strokeW;
          ctx.stroke();
          ctx.restore();
        };

        drawWindStream(height * 0.24, 0.0035, 0.8, 0.28, 1.6);
        drawWindStream(height * 0.44, 0.0042, 1.1, 0.35, 2.0);
        drawWindStream(height * 0.62, 0.0038, 0.9, 0.24, 1.5);

        // 4. TERRACED HILL RIDGES (Terasering Sawah Pegunungan)
        // Di layar sempit frekuensi tetap membuat bukit tampak lurus, jadi diperapat mengikuti lebar kanvas.
        const waveScale = Math.max(1, WAVE_REFERENCE_WIDTH / width);
        // Ridge Layer 1 - Distant Mountains
        ctx.save();
        ctx.beginPath();
        const ridge1Base = height * 0.66;
        ctx.moveTo(0, height);
        ctx.lineTo(0, ridge1Base);
        for (let x = 0; x <= width; x += 10) {
          const ry =
            ridge1Base +
            Math.sin(x * waveScale * 0.0028 + 0.5) * 36 +
            Math.cos(x * waveScale * 0.006 + t * 0.1) * 8;
          ctx.lineTo(x, ry);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = isNightTime ? 'rgba(7, 18, 12, 0.95)' : '#a9c7ad';
        ctx.fill();

        ctx.strokeStyle = isNightTime ? 'rgba(128, 237, 153, 0.3)' : 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();

        // Ridge Layer 2 - Mid Rice Terrace (Day: Lush Emerald Green | Night: Moonlit Jade)
        ctx.save();
        ctx.beginPath();
        const ridge2Base = height * 0.74;
        ctx.moveTo(0, height);
        ctx.lineTo(0, ridge2Base);
        for (let x = 0; x <= width; x += 8) {
          const ry =
            ridge2Base +
            Math.sin(x * waveScale * 0.0036 - 1.2) * 28 +
            Math.sin(x * waveScale * 0.008 + t * 0.15) * 6;
          ctx.lineTo(x, ry);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = isNightTime ? 'rgba(14, 34, 23, 0.96)' : '#6fa57c';
        ctx.fill();

        ctx.strokeStyle = isNightTime ? 'rgba(253, 224, 71, 0.45)' : '#a8d2b0';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();

        // Ridge Layer 3 - Foreground Terrace & Meadow Lip
        ctx.save();
        ctx.beginPath();
        const ridge3Base = height * 0.83;
        ctx.moveTo(0, height);
        ctx.lineTo(0, ridge3Base);
        for (let x = 0; x <= width; x += 6) {
          const ry =
            ridge3Base +
            Math.sin(x * waveScale * 0.0042 + 2.1) * 20 +
            Math.cos(x * waveScale * 0.007 - t * 0.2) * 5;
          ctx.lineTo(x, ry);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = isNightTime ? '#0c1510' : '#f5f3ec';
        ctx.fill();

        ctx.strokeStyle = isNightTime ? '#2d5a44' : '#3f7a55';
        ctx.lineWidth = 3.2;
        ctx.stroke();
        ctx.restore();

        // 5. MOTES (Day: Sunlit dew motes | Night: Golden glowing fireflies)
        for (let i = 0; i < motesRef.current.length; i++) {
          const m = motesRef.current[i];
          m.x += m.vx;
          m.y += m.vy;
          m.phase += 0.03 * m.pulseSpeed;

          if (m.y < 0) {
            m.y = height * 0.9;
            m.x = Math.random() * width;
          }
          if (m.x < 0) m.x = width;
          if (m.x > width) m.x = 0;

          const currentAlpha = m.alpha * (0.6 + Math.sin(m.phase) * 0.4);
          ctx.save();
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fillStyle = isNightTime
            ? `rgba(253, 224, 71, ${currentAlpha})`
            : `rgba(254, 240, 138, ${currentAlpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = isNightTime
            ? `rgba(245, 158, 11, ${currentAlpha * 0.4})`
            : `rgba(255, 255, 255, ${currentAlpha * 0.3})`;
          ctx.fill();
          ctx.fill();
          ctx.restore();
        }

        // 6. RIPPLES
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += r.speed;
          r.alpha -= 0.012;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.48, 0, 0, Math.PI * 2);
          ctx.strokeStyle = isNightTime
            ? `rgba(251, 191, 36, ${r.alpha * 0.85})`
            : `rgba(56, 189, 248, ${r.alpha * 0.85})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.65, r.radius * 0.3, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.7})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        // 7. DRIFTING LEAVES
        for (let i = leavesRef.current.length - 1; i >= 0; i--) {
          const leaf = leavesRef.current[i];
          leaf.x += leaf.vx;
          leaf.y += leaf.vy + Math.sin(t * 2 + i) * 0.4;
          leaf.rotation += leaf.vRot;

          if (leaf.x > width + 40) {
            leaf.x = -30;
            leaf.y = Math.random() * height * 0.8;
          }
          if (leaf.y > height * 0.85) {
            leaf.y = Math.random() * height * 0.3;
            leaf.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(leaf.x, leaf.y);
          ctx.rotate(leaf.rotation);
          ctx.globalAlpha = leaf.alpha;
          ctx.fillStyle = leaf.color;

          ctx.beginPath();
          ctx.moveTo(-leaf.size * 1.2, 0);
          ctx.quadraticCurveTo(0, -leaf.size * 0.45, leaf.size * 1.2, 0);
          ctx.quadraticCurveTo(0, leaf.size * 0.45, -leaf.size * 1.2, 0);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-leaf.size * 0.9, 0);
          ctx.lineTo(leaf.size * 0.9, 0);
          ctx.stroke();

          ctx.restore();
        }

        if (isRunning && isVisible) {
          animRef.current = requestAnimationFrame(render);
        } else {
          animRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(render);

      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animRef.current && isRunning) {
          animRef.current = requestAnimationFrame(render);
        } else if (!isVisible && animRef.current) {
          cancelAnimationFrame(animRef.current);
          animRef.current = null;
        }
      }, { threshold: 0.01 });
      observer.observe(canvas);

      return () => {
        isRunning = false;
        observer.disconnect();
        if (animRef.current) cancelAnimationFrame(animRef.current);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (Math.random() < 0.12) {
        triggerRipple(e.clientX, e.clientY, 55);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      triggerSplash(e.clientX, e.clientY, 1.2);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block cursor-pointer select-none ${className}`}
      />
    );
  }
);

PaddyHeroCanvas.displayName = 'PaddyHeroCanvas';
