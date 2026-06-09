import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LineColor } from '../Colors';
import { MisalignmentProps } from '../../types';

export default function MisalignmentChart({ Misalignment, height }: MisalignmentProps) {
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
