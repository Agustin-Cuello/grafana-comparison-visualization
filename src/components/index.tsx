import React from 'react';
import { PanelProps } from '@grafana/data';

import { MatrixPanel } from "./Overview";

export const InitialValidator: React.FC<PanelProps> = (props) => {
  const { data, width, height } = props;
  const referenceFrame = data.series[0];
  const targetFrame = data.series[1];

  if (!referenceFrame || !targetFrame) {
    return (
      <div style={{ width, height }}>
        This panel requires at least two time series.
      </div>
    );
  }

  return (
    <MatrixPanel
      {...props}
    />
  );
};
