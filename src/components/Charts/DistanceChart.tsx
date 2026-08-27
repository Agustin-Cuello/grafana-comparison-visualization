import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LateColor, EarlyColor, OnTimeColor, LineColor } from '../Colors';
import { DistanceProps } from '../../types';

export default function DistanceChart(props: DistanceProps) {
  const option = {
    dataset: {
        dimensions: [
          'index',
          'warping',
          'distance',
          'misalignment',
          'fixedIndex',
          'degree_of_misalignment',
        ],
        source: props.Distance.map(point => ({
          ...point,
          fixedIndex: point.index + 0.5,
        })),
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
      min: 0,
      max: (value: { max: number }) => value.max + 1,
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
        min: -1,
        max: 1,
        dimension: 'degree_of_misalignment',
        inRange: {
            color: [LateColor, OnTimeColor, EarlyColor]
        }
    },
    series: [
      {
        name: 'DistanceBar',
        type: 'bar',
        encode: {
          x: 'fixedIndex',
          y: 'distance'
        },
        animation: false,
      },
      {
        name: 'DistanceLine',
        encode: {
          x: 'fixedIndex',
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
