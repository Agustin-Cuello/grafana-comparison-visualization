import React, { useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions } from 'types';
import { FieldType } from '@grafana/data';
import { MatrixCanvas } from './MatrixPanel';
import { MatrixCell } from 'types';
interface Props extends PanelProps<PanelOptions> {}

export const Overview: React.FC<Props> = ({ data, width, height }) => {
  const series = data.series[0];
  const valueField = series?.fields.find(f => f.type === FieldType.number);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const years = [1,2,3,4,5]

  const canvas = canvasRef.current;
  if (!canvas) {
    return; 
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

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
  const cells: MatrixCell[] = years.flatMap(row =>
    years.map(col => ({
      row,
      col,
      values: Array.from({ length: 12 }, () => Math.random() * 4 - 2),
    }))
  );


  return (
    <MatrixCanvas
      ctx=    {ctx}      
      width=  {width}
      height= {height}
      years=  {years}
      cells=  {cells}

    />
  );

};
