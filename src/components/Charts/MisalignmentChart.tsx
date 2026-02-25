import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LineColor } from '../Colors';

interface Props {
  Misalignment: Array<[number, number]>;
  height: number;
  width: number;
}

export default function MisalignmentChart({ Misalignment: Misalignment, height }: Props) {
  const option = {
    dataset:{
        source: Misalignment
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Misalignment'],
    },
    xAxis: {
      name: 'Time',
      type: 'value',
      nameLocation: 'middle',
    },
    yAxis: {
      name: 'Misalignment',
      type: 'value',
      nameLocation: 'middle',
    },
    series: [
      {
        name: 'Misalignment',
        type: 'line',
        showSymbol: false,
        color: LineColor,
        smooth: false,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: height, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );

  
};
