import React from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  ReferenceSeries: Array<[number, number]>; // [time, value]
  Difference: Array<[number, number]>;
  height: number;
  width: number;
}

export default function DistanceChart({ Difference, height }: Props) {
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Difference'],
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'value',
    },
    dataZoom: [
      {
        type: 'inside',
        throttle: 50,
      },
      {
        type: 'slider',
      },
    ],
    series: [
      {
        name: 'Difference',
        type: 'line',
        showSymbol: false,
        data: Difference,
        smooth: false,
        areaStyle: {},
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
