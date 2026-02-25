import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { getStroke } from 'perfect-freehand';
import { getSvgPathFromStroke, drawStrokeToCanvas } from '../utils/stroke';
import { BrushType, Point } from '../types';

interface CanvasBoardProps {
  brushType: BrushType;
  brushSize: number;
  inkColor: string;
  testMode?: boolean;
}

export interface CanvasBoardRef {
  clear: () => void;
  getImage: () => string;
}

const getBrushOptions = (type: BrushType, size: number, isPartner?: boolean) => {
  const base = {
    pen: {
      size: size,
      thinning: isPartner ? 0.1 : 0,
      smoothing: isPartner ? 0.6 : 0.5,
      streamline: 0.5,
      easing: (t: number) => t,
      start: { taper: 0, easing: (t: number) => t, cap: true },
      end: { taper: 0, easing: (t: number) => t, cap: true },
    },
    pencil: {
      size: size * 0.8,
      thinning: isPartner ? 0.4 : 0.3,
      smoothing: 0.5,
      streamline: 0.5,
      easing: (t: number) => t,
      start: { taper: 0, easing: (t: number) => t, cap: true },
      end: { taper: 0, easing: (t: number) => t, cap: true },
    },
    brush: {
      size: size * 2.5,
      thinning: isPartner ? 0.8 : 0.7,
      smoothing: 0.5,
      streamline: 0.6,
      easing: (t: number) => t,
      start: { taper: size * 2, easing: (t: number) => t, cap: true },
      end: { taper: size * 2, easing: (t: number) => t, cap: true },
    },
  };
  return base[type];
};

const PARTNER_COLORS = {
  pen: '#2c3e50', // Dark blue
  pencil: '#7f8c8d', // Grayish blue
  brush: '#c0392b', // Deep red
};

const BRUSH_OPACITY = {
  pen: 1,
  pencil: 0.8,
  brush: 0.9,
};

const PARTNER_OFFSET = 120; // Increased offset
const PARTNER_DELAY = 400; // Delay in ms

export const CanvasBoard = forwardRef<CanvasBoardRef, CanvasBoardProps>(
  ({ brushType, brushSize, inkColor, testMode = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [points, setPoints] = useState<Point[]>([]);
    const [partnerPoints, setPartnerPoints] = useState<Point[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useImperativeHandle(ref, () => ({
      clear: () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
        setPoints([]);
        setPartnerPoints([]);
      },
      getImage: () => {
        const canvas = canvasRef.current;
        return canvas ? canvas.toDataURL('image/png') : '';
      },
    }));

    // Handle resize
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      let timeoutId: ReturnType<typeof setTimeout>;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          
          if (Math.abs(dimensions.width - width) < 1 && Math.abs(dimensions.height - height) < 1) {
            continue;
          }

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setDimensions({ width, height });
            
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              let imageData: ImageData | null = null;

              if (canvas.width > 0 && canvas.height > 0 && ctx) {
                try {
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                } catch (e) {
                  console.warn('Failed to get image data', e);
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              
              if (ctx && imageData) {
                ctx.putImageData(imageData, 0, 0);
              }
            }
          }, 50);
        }
      });

      resizeObserver.observe(container);
      return () => {
        resizeObserver.disconnect();
        clearTimeout(timeoutId);
      };
    }, [dimensions.width, dimensions.height]);

    const handlePointerDown = (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDrawing(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pressure,
      };
      const initialPoints = [point, { ...point, x: point.x + 0.1, y: point.y + 0.1 }];
      setPoints(initialPoints);

      if (testMode) {
        setTimeout(() => {
          setPartnerPoints(initialPoints.map(p => ({ ...p, y: p.y + PARTNER_OFFSET })));
        }, PARTNER_DELAY);
      }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDrawing) return;
      const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      const rect = e.currentTarget.getBoundingClientRect();
      
      const newPoints = events.map(event => ({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        pressure: event.pressure,
      }));

      setPoints((prev) => [...prev, ...newPoints]);

      if (testMode) {
        setTimeout(() => {
          setPartnerPoints((prev) => [...prev, ...newPoints.map(p => ({ ...p, y: p.y + PARTNER_OFFSET }))]);
        }, PARTNER_DELAY);
      }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      const canvas = canvasRef.current;
      const currentPoints = [...points];
      
      if (canvas && currentPoints.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawStrokeToCanvas(
            ctx,
            currentPoints,
            getBrushOptions(brushType, brushSize),
            inkColor,
            BRUSH_OPACITY[brushType]
          );

          if (testMode) {
            setTimeout(() => {
              const pPoints = currentPoints.map(p => ({ ...p, y: p.y + PARTNER_OFFSET }));
              drawStrokeToCanvas(
                ctx,
                pPoints,
                getBrushOptions(brushType, brushSize, true),
                PARTNER_COLORS[brushType],
                BRUSH_OPACITY[brushType]
              );
              setPartnerPoints([]);
            }, PARTNER_DELAY);
          }
        }
      }
      
      setIsDrawing(false);
      setPoints([]);
    };

    const userPathData = useMemo(() => {
      if (points.length === 0) return '';
      const stroke = getStroke(points, getBrushOptions(brushType, brushSize));
      return getSvgPathFromStroke(stroke);
    }, [points, brushType, brushSize]);

    const partnerPathData = useMemo(() => {
      if (!testMode || partnerPoints.length === 0) return '';
      const stroke = getStroke(partnerPoints, getBrushOptions(brushType, brushSize, true));
      return getSvgPathFromStroke(stroke);
    }, [partnerPoints, brushType, brushSize, testMode]);

    return (
      <div 
        ref={containerRef} 
        className="relative w-full h-full touch-none select-none overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 pointer-events-none"
          width={dimensions.width}
          height={dimensions.height}
        />
        <svg
          className="absolute top-0 left-0 w-full h-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none' }}
        >
          {isDrawing && (
            <path
              d={userPathData}
              fill={inkColor}
              opacity={BRUSH_OPACITY[brushType]}
            />
          )}
          {testMode && partnerPoints.length > 0 && (
            <path
              d={partnerPathData}
              fill={PARTNER_COLORS[brushType]}
              opacity={BRUSH_OPACITY[brushType]}
            />
          )}
        </svg>
      </div>
    );
  }
);

CanvasBoard.displayName = 'CanvasBoard';
