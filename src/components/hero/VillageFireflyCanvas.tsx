import React, { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  phase: number;
  phaseSpeed: number;
  colorType: 'green' | 'gold';
}

export const VillageFireflyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mousePos = { x: -999, y: -999 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePos.x = -999;
      mousePos.y = -999;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize fireflies
    const count = width < 640 ? 24 : 48;
    const fireflies: Firefly[] = [];

    for (let i = 0; i < count; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1.2,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -Math.random() * 0.5 - 0.2,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.04 + 0.02,
        colorType: Math.random() > 0.4 ? 'green' : 'gold'
      });
    }

    // 60 FPS GPU-accelerated render loop
    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // Pulsing bioluminescence
        f.phase += f.phaseSpeed;
        const pulse = (Math.sin(f.phase) + 1) / 2; // 0 to 1
        const alpha = 0.2 + pulse * 0.75;

        // Interactive gentle cursor avoidance / attraction
        const dx = mousePos.x - f.x;
        const dy = mousePos.y - f.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 1) {
          f.vx -= (dx / dist) * 0.08;
          f.vy -= (dy / dist) * 0.08;
        }

        // Natural organic wandering
        f.vx += (Math.random() - 0.5) * 0.06;
        f.vy += (Math.random() - 0.5) * 0.06;

        // Cap maximum velocity
        f.vx = Math.max(-1.2, Math.min(1.2, f.vx));
        f.vy = Math.max(-1.0, Math.min(0.8, f.vy));

        f.x += f.vx;
        f.y += f.vy;

        // Wrap boundaries
        if (f.x < -20) f.x = width + 20;
        if (f.x > width + 20) f.x = -20;
        if (f.y < -20) f.y = height + 20;
        if (f.y > height + 20) f.y = -20;

        // Dual-pass concentric GPU glow (Fast, zero CPU software rasterization)
        const innerColor =
          f.colorType === 'green' ? `rgba(167, 243, 208, ${alpha})` : `rgba(254, 240, 138, ${alpha})`;
        const outerColor =
          f.colorType === 'green'
            ? `rgba(52, 211, 153, ${alpha * 0.35})`
            : `rgba(250, 204, 21, ${alpha * 0.35})`;

        // Outer soft glow aura
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = outerColor;
        ctx.fill();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = innerColor;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    // Auto-pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animId = requestAnimationFrame(render);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.02 }
    );

    observer.observe(canvas);
    animId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-15"
    />
  );
};
