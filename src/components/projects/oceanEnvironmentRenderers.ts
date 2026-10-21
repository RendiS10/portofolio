export interface WaterBounds {
  waterMinY: number;
  waterMaxY: number;
}

export function renderWaterBody(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4
): void {
  let waterTop = '#52b788';
  let waterMid = '#2d6a4f';
  let waterBottom = '#1b4332';

  if (depthLevel === 1) {
    waterTop = '#52b788'; waterMid = '#2d6a4f'; waterBottom = '#1b4332';
  } else if (depthLevel === 2) {
    waterTop = '#40916c'; waterMid = '#2d6a4f'; waterBottom = '#132a20';
  } else if (depthLevel === 3) {
    waterTop = '#2d6a4f'; waterMid = '#1b4332'; waterBottom = '#0d2818';
  } else {
    waterTop = '#1b4332'; waterMid = '#132a20'; waterBottom = '#0a1c12';
  }

  const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
  waterGrad.addColorStop(0, waterTop);
  waterGrad.addColorStop(0.55, waterMid);
  waterGrad.addColorStop(1, waterBottom);
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 0, width, height);
}

export function renderSandLayers(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4,
  time: number
): WaterBounds {
  let waterMinY = 0;
  let waterMaxY = height;

  if (depthLevel === 1) {
    const topSandHeight = height * 0.20;
    waterMinY = topSandHeight;

    ctx.save();
    const topSandGrad = ctx.createLinearGradient(0, 0, 0, topSandHeight);
    topSandGrad.addColorStop(0, '#cad8c5');
    topSandGrad.addColorStop(0.25, '#d8dfd5');
    topSandGrad.addColorStop(0.55, '#e5ede3');
    topSandGrad.addColorStop(0.80, '#edf2eb');
    topSandGrad.addColorStop(1.0, '#f5f3ec');
    ctx.fillStyle = topSandGrad;

    // coastal shoreline fill
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, topSandHeight);

    for (let x = width; x >= 0; x -= 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      ctx.lineTo(x, sy);
    }

    ctx.closePath();
    ctx.fill();

    // shoreline foam edge
    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.restore();
  } else if (depthLevel === 4) {
    const bottomSandY = height * 0.82;
    waterMaxY = bottomSandY;

    ctx.save();
    const bottomSandGrad = ctx.createLinearGradient(0, bottomSandY, 0, height);
    bottomSandGrad.addColorStop(0, '#c2d6be');
    bottomSandGrad.addColorStop(0.3, '#e5ede3');
    bottomSandGrad.addColorStop(0.7, '#edf2eb');
    bottomSandGrad.addColorStop(1.0, '#f5f3ec');
    ctx.fillStyle = bottomSandGrad;

    // seabed sand fill
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, bottomSandY);

    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      ctx.lineTo(x, sy);
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // seabed foam edge
    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  }

  return { waterMinY, waterMaxY };
}

export function renderWaterWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  waterMinY: number,
  waterMaxY: number,
  time: number
): void {
  const wave1Y = waterMinY + (waterMaxY - waterMinY) * 0.35;
  ctx.save();
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const cy =
      wave1Y +
      Math.sin(x * 0.004 + time * 1.1) * 14 +
      Math.cos(x * 0.008 - time * 0.5) * 6;
    if (x === 0) ctx.moveTo(x, cy);
    else ctx.lineTo(x, cy);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 2.8;
  ctx.stroke();
  ctx.restore();

  const wave2Y = waterMinY + (waterMaxY - waterMinY) * 0.72;
  ctx.save();
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const cy =
      wave2Y +
      Math.sin(x * 0.005 + time * 0.9 + 2) * 16 +
      Math.sin(x * 0.01 - time * 0.4) * 8;
    if (x === 0) ctx.moveTo(x, cy);
    else ctx.lineTo(x, cy);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ctx.restore();
}

export function renderGoldenMotes(
  ctx: CanvasRenderingContext2D,
  width: number,
  waterMinY: number,
  waterMaxY: number,
  time: number
): void {
  ctx.save();
  const waterHeight = Math.max(100, waterMaxY - waterMinY);
  for (let i = 0; i < 12; i++) {
    const speed = 0.35 + (i % 4) * 0.2;
    const mx = ((width * 0.08 * i + Math.sin(time * 0.8 + i) * 30 + width) % width);
    const my = waterMinY + (waterHeight - (((time * 30 * speed + i * 45) % waterHeight)));
    const r = 1.6 + (i % 3) * 1.2;
    const alpha = 0.35 + Math.sin(time * 2 + i) * 0.3;

    ctx.beginPath();
    ctx.arc(mx, my, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(253, 224, 71, ${alpha})`;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.fill();
  }
  ctx.restore();
}

// Backwards-compatible alias to eliminate all underwater bubbles
export const renderBubbles = renderGoldenMotes;
