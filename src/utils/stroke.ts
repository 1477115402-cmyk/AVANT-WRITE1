import { getStroke } from 'perfect-freehand';

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return '';

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ['M', ...stroke[0], 'Q']
  );

  d.push('Z');
  return d.join(' ');
}

export function drawStrokeToCanvas(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number; pressure?: number }[],
  options: any,
  color: string,
  opacity: number = 1
) {
  const stroke = getStroke(points, options);
  if (!stroke.length) return;

  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.beginPath();

  const [first, ...rest] = stroke;
  ctx.moveTo(first[0], first[1]);

  rest.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
