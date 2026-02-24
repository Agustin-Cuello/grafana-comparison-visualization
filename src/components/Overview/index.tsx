import React from 'react';
import { PanelProps } from '@grafana/data';
/*import { MatrixGrid } from './MatrixGrid';*/
import DistanceChart from '../Charts/DistanceChart';

export const MatrixPanel: React.FC<PanelProps> = ({ width, height }) => {
  return (
    <div style={{ width, height }}>
      <DistanceChart
        ReferenceSeries={[[1, 10], [2, 20], [3, 15], [4, 25], [5, 18]]}
        Difference={[[0,1],[1, 2], [2, 3], [3, 1], [4, 4], [5, 2], [6, 3], [7, 10], [8, 5], [9, 15], [10, 4]]}
        width={width}
        height={height}
      />
    </div>
  );
};
