import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LateColor, EarlyColor, OnTimeColor, LineColor } from '../Colors';

interface Props {
  Difference: Array<[number, number, number]>;
  height: number;
  width: number;
}

export default function DistanceChart({ Difference, height }: Props) {
  const option = {
    dataset:{
        source: Difference
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Difference'],
    },
    xAxis: {
      name: 'Time',
      type: 'value',
      nameLocation: 'middle',
    },
    yAxis: {
      name: 'Distance',
      type: 'value',
      nameLocation: 'middle',
    },
    visualMap: {
        seriesIndex: 0,
        orient: 'horizontal',
        left: 'right',
        min: -1,
        max: 1,
        text: ['Early','Late'],
        dimension: 2,
        inRange: {
            color: [LateColor, OnTimeColor, EarlyColor]
        }
    },
    series: [
      {
        type: 'bar',
        encode: {
          x: 'index',
          y: 'distance'
        },
        animation: false,
      },
      {
        name: 'Difference',
        type: 'line',
        showSymbol: false,
        smooth: false,
        color: LineColor,
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
