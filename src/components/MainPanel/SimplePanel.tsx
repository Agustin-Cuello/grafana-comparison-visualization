import React, { useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions } from 'types';
import { FieldType } from '@grafana/data';
import { BarCanvas } from '../BarGraph';
interface Props extends PanelProps<PanelOptions> {}

export const SimplePanel: React.FC<Props> = ({ data, width, height }) => {
  const series = data.series[0];
  const valueField = series?.fields.find(f => f.type === FieldType.number);

  if (!valueField) {
    return <div>No data</div>;
  }

  const values = [];
  for (let i = 0; i < valueField.values.length; i++) {
    const v = valueField.values.get(i);
    if (typeof v === 'number') {
      values.push(v);
    }
  }

    //Click handler para realizar un zoom a la barra clickeada
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;

    const barWidth = width / values.length;
    const index = Math.floor(x / barWidth);

    if (index >= 0 && index < values.length) {
    }
  };

  return (
    <BarCanvas
      values={values}
      width={width}
      height={height}
      onClick={handleClick}
    />
  );

};
