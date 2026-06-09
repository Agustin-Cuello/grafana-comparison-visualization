import React from "react";
import { useRef } from "react";
import { MatrixCell } from "types";

type MatrixCanvasProps = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  years: number[];
  cells: MatrixCell[];
};

function valueToColor(value: number) {
  if (value < -2) return '#d73027';
  if (value < 0) return '#fc8d59';
  if (value < 2) return '#fee08b';
  return '#91cf60';
}


export function MatrixCanvas ({
  ctx,
  width,
  height,
  years,
  cells,
}: MatrixCanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, width, height);

    const rows = years.length;
    const cols = years.length;

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    cells.forEach(cell => {
      const colIndex = years.indexOf(cell.col);
      const rowIndex = years.indexOf(cell.row);

      if (colIndex === -1 || rowIndex === -1) return;

      const x = colIndex * cellWidth;
      const y = rowIndex * cellHeight;

      const segmentHeight = cellHeight / cell.values.length;

      cell.values.forEach((value, i) => {
        context.fillStyle = valueToColor(value);
        context.fillRect(
          x,
          y + i * segmentHeight,
          cellWidth,
          segmentHeight
        );
      });

      // cell border
      context.strokeStyle = '#333';
      context.lineWidth = 1;
      context.strokeRect(x, y, cellWidth, cellHeight);
    });

    // draw grid lines
    context.strokeStyle = '#ddd';
    context.lineWidth = 0.5;
    for (let i = 0; i <= cols; i++) {
      context.beginPath();
      context.moveTo(i * cellWidth, 0);
      context.lineTo(i * cellWidth, height);
      context.stroke();
    }
    for (let i = 0; i <= rows; i++) {
      context.beginPath();
      context.moveTo(0, i * cellHeight);
      context.lineTo(width, i * cellHeight);
      context.stroke();
    }
  }, [width, height, years, cells]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid #ccc' }} />;
}
