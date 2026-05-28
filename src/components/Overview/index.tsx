import React from 'react';
import { PanelData, PanelProps } from '@grafana/data';
import { DistancePoint, MisalignmentPoint} from '../../types';

import DistanceChart from '../Charts/DistanceChart';
import MisalignmentChart from '../Charts/MisalignmentChart';
import HeatmapParallelCoord  from "../heatmap/HeatmapParallelCoord";

const reference = {
  headers: ["time", "seriesA", "seriesB"],
  data: [
    ["0", "10", "20"],
    ["1", "12", "18"],
    ["2", "15", "25"],
    ["3", "14", "22"],
    ["4", "18", "26"],
    ["5", "16", "23"],
    ["6", "19", "28"],
    ["7", "17", "24"],
    ["8", "20", "30"],
    ["9", "22", "32"],
  ],
};

const target = {
  headers: ["time", "seriesA", "seriesB"],
  data: [
    ["0", "11", "19"],
    ["1", "13", "17"],
    ["2", "16", "24"],
    ["3", "15", "21"],
    ["4", "17", "27"],
    ["5", "18", "22"],
    ["6", "20", "29"],
    ["7", "19", "23"],
    ["8", "21", "31"],
    ["9", "23", "33"],
  ],
};

const source = [
  {
    index: 0,
    warping: 0,
    distance: 0.1,
    misalignment: 0.2,
    degree_of_misalignment: 0.3,
  },
  {
    index: 1,
    warping: 1,
    distance: 0.4,
    misalignment: 0.5,
    degree_of_misalignment: 0.8,
  },
  {
    index: 2,
    warping: 2,
    distance: 0.2,
    misalignment: 0.1,
    degree_of_misalignment: 0.2,
  },
  {
    index: 3,
    warping: 0.5,
    distance: 0.3,
    misalignment: 0.25,
    degree_of_misalignment: 0.4,
  },
  {
    index: 4,
    warping: 1.5,
    distance: 0.35,
    misalignment: 0.45,
    degree_of_misalignment: 0.6,
  },
  {
    index: 5,
    warping: 2.5,
    distance: 0.25,
    misalignment: 0.15,
    degree_of_misalignment: 0.35,
  },
  {
    index: 6,
    warping: 1.2,
    distance: 0.28,
    misalignment: 0.32,
    degree_of_misalignment: 0.5,
  },
  {
    index: 7,
    warping: 0.8,
    distance: 0.15,
    misalignment: 0.18,
    degree_of_misalignment: 0.25,
  },
  {
    index: 8,
    warping: 2.1,
    distance: 0.38,
    misalignment: 0.52,
    degree_of_misalignment: 0.75,
  },
  {
    index: 9,
    warping: 1.7,
    distance: 0.32,
    misalignment: 0.38,
    degree_of_misalignment: 0.55,
  },
];

export const MatrixPanel: React.FC<PanelProps> = ({ data, width, height }) => {
  const processedDistanceData = transformDistanceData(data);
  const processedMisalignmentData = transformMisalignmentData(data);
  //print header of processed columns:
  
  console.log('Processed distance data header: ', Object.keys(processedDistanceData[0] || {}));
  console.log('Processed distance: ', processedDistanceData);
  console.log('Processed misalignment: ', processedMisalignmentData);
  return (
    
    <div style={{ width, height, overflowY:"scroll"}}>
      <DistanceChart
        Difference={processedDistanceData}
        width={width}
        height={height*0.3}
      />
      <MisalignmentChart
        Misalignment={processedMisalignmentData}
        width={width}
        height={height*0.3}
      /> 
      <div style={{ width: "100%", height: height*0.4 }}>
      <HeatmapParallelCoord
          reference={reference}
          target={target}
          source={source}
      />
      </div>
    </div>
  );
};

function transformMisalignmentData(data: PanelData): MisalignmentPoint[] {
  const result: MisalignmentPoint[] = [];

  const frame = data.series[1];

  if (!frame) {
    return result;
  }

  const timeField = frame.fields.find(f => f.type === 'time');
  const valueField = frame.fields.find(f => f.type === 'number');
  
  if (!timeField || !valueField) {
    return result;
  }

  const minTimestamp = Number(timeField.values[0]);

  for (let i = 0; i < (frame.length)/10; i++) {
    const timestamp = Number((timeField.values[i] - minTimestamp) / 1000);
    const value = Number(valueField.values[i]);
    result.push({
      timestamp,
      value
    });
  }
  

  return result;
}

function transformDistanceData(data: PanelData): DistancePoint[] {
  const result: DistancePoint[] = [];

  const frame = data.series[0];

  if (!frame) {
    return result;
  }

  const timeField = frame.fields.find(f => f.type === 'time');
  const valueField = frame.fields.find(f => f.type === 'number');
  
  if (!timeField || !valueField) {
    return result;
  }

  const minTimestamp = Number(timeField.values[0]);

  for (let i = 0; i < (frame.length)/10; i++) {
    const timestamp = Number((timeField.values[i] - minTimestamp) / 1000); // Convert to seconds and normalize
    const value = Number(valueField.values[i]);
    const earlylate = [-1, 0, 1] as const; //Debug
    const early = earlylate[Math.floor(Math.random() * earlylate.length)] as -1 | 0 | 1;
    result.push({
      timestamp,
      value,
      early
    });
  }
  

  return result;
}
