import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface OceanHeroHandle {
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

interface WindRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const OceanHeroCanvas = forwardRef<OceanHeroHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const leavesRef = useRef<FloatingLeaf[]>([]);
    const motesRef = useRef<SunsetMote[]>([]);
    const ripplesRef = useRef<WindRipple[]>([]);
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);

    // Warm sunset leaf palette: golden harvest, amber, sunlit tea leaf, olive
    const leafPalette = ['#f59e0b', '#fbbf24', '#d97706', '#84cc16', '#52b788', '#eab308', '#a3e635'];

    const initLeaves = (width: number, height: number) => {
      leavesRef.current = [];
      const count = Math.min(36, Math.floor(width / 38));
      for (let i = 0; i < count; i++) {
        leavesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.85,
          vx: 0.6 + Math.random() * 1.3,
          vy: 0.15 + Math.random() * 0.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
          size: 7 + Math.random() * 9,
          color: leafPalette[Math.floor(Math.random() * leafPalette.length)],
          alpha: 0.45 + Math.random() * 0.45
        });
      }
    };

    const initMotes = (width: number, height: number) => {
      motesRef.current = [];
      const count = Math.min(28, Math.floor(width / 45));
      for (let i = 0; i < count; i++) {
        motesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.9,
          vx: (Math.random() - 0.4) * 0.4,
          vy: -0.2 - Math.random() * 0.4,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.3 + Math.random() * 0.5,
          pulseSpeed: 1.5 + Math.random() * 2.0,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 8,
        maxRadius: Math.min(260, rect.width * 0.4) * Math.max(0.7, intensity),
        alpha: 0.9,
        speed: 3.2 * Math.max(0.6, intensity)
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.min(170, rect.width * 0.25) * Math.max(0.7, intensity),
        alpha: 0.7,
        speed: 2.0 * Math.max(0.6, intensity)
      });

      // Scatter leaves outward on drop
      const burstCount = Math.floor(12 * Math.min(2, intensity));
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.5;
        const speed = (2.0 + Math.random() * 5.0) * Math.min(2, intensity);
        leavesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
          size: 8 + Math.random() * 7,
          color: leafPalette[Math.floor(Math.random() * leafPalette.length)],
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

      const handleResize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        initLeaves(rect.width, rect.height);
        initMotes(rect.width, rect.height);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const render = () => {
        if (!isRunning || !canvas) return;
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.012;
        const t = timeRef.current;

        // 1. Serene Golden Hour / Sunset Rural Sky Gradient (Langit Senja Pedesaan)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#1c1917');      // Warm dusky stone dusk
        skyGrad.addColorStop(0.22, '#381c12');   // Warm terracotta amber twilight
        skyGrad.addColorStop(0.48, '#782d11');   // Rich sunset burnt orange
        skyGrad.addColorStop(0.70, '#b45309');   // Glowing amber golden hour
        skyGrad.addColorStop(0.86, '#d97706');   // Warm golden sunlight horizon
        skyGrad.addColorStop(1, '#5c4818');      // Golden mist over terrace foothills
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Radiant Afternoon Sunset Sun (Matahari Senja di Ufuk Barat)
        const sunX = width * 0.76;
        const sunY = height * 0.32;
        ctx.save();
        
        // Broad atmospheric golden sunset glow
        const sunHaloGrad = ctx.createRadialGradient(
          sunX, sunY, 15,
          sunX, sunY, Math.min(width * 0.7, 520)
        );
        sunHaloGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
        sunHaloGrad.addColorStop(0.25, 'rgba(245, 158, 11, 0.28)');
        sunHaloGrad.addColorStop(0.60, 'rgba(217, 119, 6, 0.12)');
        sunHaloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sunHaloGrad;
        ctx.fillRect(0, 0, width, height);

        // Glowing Sun Disc with Soft Corona
        const sunDiscGrad = ctx.createRadialGradient(
          sunX, sunY, 0,
          sunX, sunY, 48
        );
        sunDiscGrad.addColorStop(0, '#fffbeb');
        sunDiscGrad.addColorStop(0.4, 'rgba(253, 224, 71, 0.95)');
        sunDiscGrad.addColorStop(0.8, 'rgba(245, 158, 11, 0.6)');
        sunDiscGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
        ctx.fillStyle = sunDiscGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 48, 0, Math.PI * 2);
        ctx.fill();

        // 3. Subtle Crepuscular Sun Rays (Sinar Surya Menyapa Lembah)
        ctx.save();
        ctx.globalAlpha = 0.08 + Math.sin(t * 1.5) * 0.02;
        const rayGrad = ctx.createLinearGradient(sunX, sunY, width * 0.2, height * 0.85);
        rayGrad.addColorStop(0, '#fde047');
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

        // 4. Flowing Evening Breeze Streams (Semilir Angin Senja Keemasan)
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
          ctx.strokeStyle = `rgba(254, 240, 138, ${alpha})`;
          ctx.lineWidth = strokeW;
          ctx.setLineDash([40, 60]);
          ctx.lineDashOffset = -t * 38;
          ctx.stroke();
          ctx.restore();
        };

        drawWindStream(height * 0.24, 0.0035, 0.8, 0.28, 1.6);
        drawWindStream(height * 0.44, 0.0042, 1.1, 0.35, 2.0);
        drawWindStream(height * 0.62, 0.0038, 0.9, 0.24, 1.5);

        // 5. Terraced Hill Ridges Bathed in Sunset Gold (Terasering Sawah Sore Hari)
        // Ridge Layer 1 - Distant Hills Silhouette
        ctx.save();
        ctx.beginPath();
        const ridge1Base = height * 0.66;
        ctx.moveTo(0, height);
        ctx.lineTo(0, ridge1Base);
        for (let x = 0; x <= width; x += 10) {
          const ry =
            ridge1Base +
            Math.sin(x * 0.0028 + 0.5) * 36 +
            Math.cos(x * 0.006 + t * 0.1) * 8;
          ctx.lineTo(x, ry);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(46, 36, 28, 0.9)'; // Warm mountain silhouette
        ctx.fill();

        // Distant hill rim highlight from setting sun
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();

        // Ridge Layer 2 - Mid Rice Terrace (Golden-Olive & Sunset Highlights)
        ctx.save();
        ctx.beginPath();
        const ridge2Base = height * 0.74;
        ctx.moveTo(0, height);
        ctx.lineTo(0, ridge2Base);
        for (let x = 0; x <= width; x += 8) {
          const ry =
            ridge2Base +
            Math.sin(x * 0.0036 - 1.2) * 28 +
            Math.sin(x * 0.008 + t * 0.15) * 6;
          ctx.lineTo(x, ry);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(45, 78, 48, 0.94)'; // Golden-olive lush rice terrace
        ctx.fill();

        // Golden sunset reflection on terrace water ridge edge
        ctx.strokeStyle = 'rgba(252, 211, 77, 0.85)';
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
            Math.sin(x * 0.0042 + 2.1) * 20 +
            Math.cos(x * 0.007 - t * 0.2) * 5;
          ctx.lineTo(x, ry);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = '#f5f3ec'; // Clean natural linen meadow ground
        ctx.fill();

        // Warm golden wheat contour border
        ctx.strokeStyle = '#d4b26f';
        ctx.lineWidth = 3.2;
        ctx.stroke();
        ctx.restore();

        // 6. Sunset Golden Motes & Fireflies (Debu Emas & Kunang-kunang Senja)
        for (let i = 0; i < motesRef.current.length; i++) {
          const m = motesRef.current[i];
          m.x += m.vx;
          m.y += m.vy;
          m.phase += 0.03 * m.pulseSpeed;

          // Wrap motes
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
          ctx.fillStyle = `rgba(253, 224, 71, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.35})`;
          ctx.fill();
          ctx.fill();
          ctx.restore();
        }

        // 7. Interactive Wind Ripples (Touch / Drag Feedback with Golden Light)
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
          ctx.strokeStyle = `rgba(251, 191, 36, ${r.alpha * 0.85})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.65, r.radius * 0.3, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.7})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        // 8. Drifting Golden Harvest & Tea Leaves in Sunset Breeze
        for (let i = leavesRef.current.length - 1; i >= 0; i--) {
          const leaf = leavesRef.current[i];
          leaf.x += leaf.vx;
          leaf.y += leaf.vy + Math.sin(t * 2 + i) * 0.4;
          leaf.rotation += leaf.vRot;

          // Wrap around seamlessly
          if (leaf.x > width + 40) {
            leaf.x = -30;
            leaf.y = Math.random() * height * 0.8;
          }
          if (leaf.y > height * 0.85) {
            leaf.y = Math.random() * height * 0.3;
            leaf.x = Math.random() * width;
          }

          // Draw organic willow/tea/bamboo leaf shape
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

          // Leaf center vein with sunlit golden glint
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

OceanHeroCanvas.displayName = 'OceanHeroCanvas';
