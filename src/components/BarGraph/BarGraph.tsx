import React, { useRef, useEffect } from 'react';

interface Props {
  values: number[];
  width: number;
  height: number;
}


export function BarCanvas({ values, width, height, onClick }: Props & { onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return; 
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const max = Math.max(...values, 1);
    const barWidth = width / values.length;

    values.forEach((v, i) => {
      const barHeight = (v / max) * height;

      ctx.fillStyle = '#5794F2';
      ctx.fillRect(
        i * barWidth,
        height - barHeight,
        barWidth - 2,
        barHeight
      );
    });
  }, [values, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}