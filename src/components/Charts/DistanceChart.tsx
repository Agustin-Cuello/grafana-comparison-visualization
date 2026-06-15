import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LateColor, EarlyColor, OnTimeColor, LineColor } from '../Colors';
import { DistanceProps } from '../../types';

export default function DistanceChart(props: DistanceProps) {
  const option = {
    dataset:{
        source: props.Distance
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: Array<{ data?: { index?: number; distance?: number; degree_of_misalignment?: number } }>) => {
        const point = params[0]?.data;

        if (!point) {
          return '';
        }

        return [
          `Index: ${point.index ?? '-'}`,
          `Distance: ${point.distance ?? '-'}`,
          `Degree of misalignment: ${point.degree_of_misalignment ?? '-'}`,
        ].join('<br/>');
      },
    },
    legend: {
      data: ['Distance'],
    },
    grid: {
      left: 12,
      right: 20,
      top: 50,
      containLabel: true,
    },
    xAxis: {
      name: 'Time',
      type: 'value',
      nameLocation: 'middle',
      min: 'dataMin',
      max: 'dataMax',
    },
    yAxis: {
      name: 'Distance',
      type: 'value',
      nameLocation: 'middle',
      nameGap: 28,
      axisLabel: {
        margin: 8,
      },
    },
    visualMap: {
        seriesIndex: 0,
        orient: 'horizontal',
        left: 'right',
        top: 0,
        z: 10,
        text: ['Early','Late'],
        dimension: 4,
        inRange: {
            color: [LateColor, OnTimeColor, EarlyColor]
        }
    },
    series: [
      {
        name: 'DistanceBar',
        type: 'bar',
        encode: {
          x: 'index',
          y: 'distance'
        },
        animation: false,
      },
      {
        name: 'DistanceLine',
        encode: {
          x: 'index',
          y: 'distance',
        },
        type: 'line',
        showSymbol: false,
        smooth: true,
        color: LineColor,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: props.height, width: props.width }}
      notMerge={true}
      lazyUpdate={true}
    />
  );

  
};
