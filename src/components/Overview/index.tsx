import React from 'react';
import { PanelProps } from '@grafana/data';
/*import { MatrixGrid } from './MatrixGrid';*/

import DistanceChart from '../Charts/DistanceChart';
import MisalignmentChart from '../Charts/MisalignmentChart';

export const MatrixPanel: React.FC<PanelProps> = ({ width, height }) => {
  return (
    <div style={{ width, height }}>
      <DistanceChart
        Difference={[[1, 2, 0], [2, 3, 1], [3, 1, -1], [4, 4, 0], [5, 2, -1], [6, 3, 0], [7, 10, -1], [8, 5, 1], [9, 15, -1], [10, 4, 0],
        [11, 6, 1], [12, 2, -1], [13, 7, 0], [14, 3, 1], [15, 8, -1], [16, 4, 0], [17, 9, 1], [18, 5, -1], [19, 10, 0], [20, 6, 1],
        [21, 7, -1], [22, 3, 0], [23, 8, 1], [24, 4, -1], [25, 9, 0], [26, 5, 1], [27, 10, -1], [28, 6, 0], [29, 11, 1], [30, 7, -1], [31, 12, 0], [32, 8, 1], [33, 13, -1]]}

        width={width}
        height={height/2}
      />
      <MisalignmentChart
        Misalignment={[[0, 4],[1, -2], [2, 1], [3, -1], [4, 3], [5, -3], [6, 2], [7, -5], [8, 4], [9, -10], [10, 6]]}
        width={width}
        height={height/2}
      />
    </div>
  );
};
