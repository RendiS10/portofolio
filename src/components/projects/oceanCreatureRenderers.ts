export function drawFirefly(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  size: number = 4
): void {
  ctx.save();
  ctx.translate(x, y);

  const glow = size * (1.2 + Math.sin(time * 4) * 0.4);
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(0, 0, glow * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(253, 224, 71, 0.25)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, glow * 0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, glow * 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawFloatingLeaf(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  size: number = 10,
  color: string = '#52b788'
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 1.5 + x * 0.01) * 0.5);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-size * 1.2, 0);
  ctx.quadraticCurveTo(0, -size * 0.45, size * 1.2, 0);
  ctx.quadraticCurveTo(0, size * 0.45, -size * 1.2, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-size * 0.9, 0);
  ctx.lineTo(size * 0.9, 0);
  ctx.stroke();

  ctx.restore();
}

export function renderCreaturesByDepth(
  ctx: CanvasRenderingContext2D,
  _depthLevel: 1 | 2 | 3 | 4,
  width: number,
  _height: number,
  time: number,
  waterMinY: number,
  waterMaxY: number
): void {
  const waterHeight = Math.max(100, waterMaxY - waterMinY);

  // Elegant golden fireflies drifting through the night terrace
  const fireflyCount = 6;
  for (let i = 0; i < fireflyCount; i++) {
    const fx = ((width * 0.16 * i + Math.sin(time * 1.2 + i * 1.7) * 45 + width) % width);
    const fy = waterMinY + ((i * 55 + Math.cos(time * 1.5 + i) * 25) % waterHeight);
    drawFirefly(ctx, time + i, fx, fy, 3.5);
  }

  // Soft drifting highland leaves
  const leafColors = ['#52b788', '#74c69d', '#40916c'];
  for (let i = 0; i < 4; i++) {
    const lx = ((time * (30 + i * 8) + i * 140) % (width + 120)) - 60;
    const ly = waterMinY + ((waterHeight * 0.25 * (i + 1) + Math.sin(time * 1.8 + i) * 16) % waterHeight);
    drawFloatingLeaf(ctx, time + i, lx, ly, 8 + i * 2, leafColors[i % leafColors.length]);
  }
}
