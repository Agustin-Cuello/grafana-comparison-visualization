import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LineColor } from '../Colors';
import { MisalignmentProps } from '../../types';

export default function MisalignmentChart( props: MisalignmentProps ) {
  const option = {
    dataset:{
        source: props.Misalignment
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: Array<{ data?: { index?: number; misalignment?: number; degree_of_misalignment?: number } }>) => {
        const point = params[0]?.data;

        if (!point) {
          return '';
        }

        return [
          `Index: ${point.index ?? '-'}`,
          `Misalignment: ${point.misalignment ?? '-'}`,
          `Degree of misalignment: ${point.degree_of_misalignment ?? '-'}`,
        ].join('<br/>');
      },
    },
    legend: {
      data: ['Misalignment'],
    },
    grid: {
      left: 12,
      right: 20,
      top: 50,
      bottom: 45,
      containLabel: true,
    },
    xAxis: {
      name: 'Time',
      type: 'value',
      nameLocation: 'middle',
      min: 'dataMin',
      max: 'dataMax',
      axisLine: {
        lineStyle: {
          color: 'orange',
        },
      },
    },
    yAxis: {
      name: 'Misalignment',
      type: 'value',
      nameLocation: 'middle',

      axisLabel: {
        formatter: (value: number) => (value === 0 ? `{zero|${value}}` : `${value}`),
        rich: {
          zero: {
            color: 'orange',
          },
        },
      },
    },
    series: [
      {
        name: 'Misalignment',
        encode: {
          x: 'index',
          y: 'misalignment'
        },
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
      style={{ height: props.height, width: props.width }}
      notMerge={true}
      lazyUpdate={true}
    />
  );

  
};
