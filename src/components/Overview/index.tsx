import React from 'react';
import { PanelData, PanelProps } from '@grafana/data';
import { DistancePoint, MisalignmentPoint} from '../../types';

import DistanceChart from '../Charts/DistanceChart';
import MisalignmentChart from '../Charts/MisalignmentChart';
import HeatmapParallelCoord  from "../heatmap/HeatmapParallelCoord";

import { ManhattanComparator } from "../comparators/ManhattanComparator";
import type { TimeSeries } from "../../types/TSComparator.types";
import type { TableData } from "../../types/TableData.types";

export const MatrixPanel: React.FC<PanelProps> = ({ data, width, height }) => {
  const referenceFrame = data.series[0];
  const targetFrame = data.series[1];

  if (!referenceFrame || !targetFrame) {
    return (
      <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        This panel requires at least two time series.
      </div>
    );
  }

  //TODO Data falsa, estas 2 líneas se van y se utiliza el cálculo real
  const processedDistanceData = React.useMemo(() => transformDistanceData(data), [data]);
  const processedMisalignmentData = React.useMemo(() => transformMisalignmentData(data), [data]);
  
  const referenceSeries = React.useMemo(() => frameToTimeSeries(referenceFrame), [referenceFrame]);
  const targetSeries = React.useMemo(() => frameToTimeSeries(targetFrame), [targetFrame]);

  const referenceSeriesTD = React.useMemo(() => frameToTableData(referenceFrame), [referenceFrame]);
  const targetSeriesTD = React.useMemo(() => frameToTableData(targetFrame), [targetFrame]);

  const result = React.useMemo(() => {
    const comparator = new ManhattanComparator();
    console.log("Calculado comparación entre series");
    return comparator.compare(referenceSeries, targetSeries);
  }, [referenceSeries, targetSeries]);


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
          reference={referenceSeriesTD}
          target={targetSeriesTD}
          source={result}
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

  for (let i = 0; i < (frame.length); i++) {
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

  for (let i = 0; i < (frame.length); i++) {
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

function frameToTimeSeries(frame: PanelData["series"][number]): TimeSeries {
  const timeField = frame.fields.find(f => f.type === "time");
  const valueFields = frame.fields.filter(f => f !== timeField);

  if (!timeField || valueFields.length === 0) {
    return [];
  }

  const rows: number[][] = [];

  for (let i = 0; i < frame.length; i++) {
    const values = valueFields.map(f => Number(f.values.get(i)));

    // push only the value columns (remove the timestamp column)
    rows.push(values);
  }

  return rows as TimeSeries;
}

function frameToTableData(frame: PanelData["series"][number]): TableData {
  const timeField = frame.fields.find(f => f.type === "time");
  const valueFields = frame.fields.filter(f => f !== timeField);

  if (!timeField || valueFields.length === 0) {
    return { headers: [], data: [] } as TableData;
  }

  const headers = [timeField.name || 'time', ...valueFields.map(f => f.name || '')];
  const data: string[][] = [];

  for (let i = 0; i < frame.length; i++) {
    const row: string[] = [];
    // time value
    const t = timeField.values.get(i);
    row.push(String(t));
    // all other columns
    for (const vf of valueFields) {
      row.push(String(vf.values.get(i)));
    }
    data.push(row);
  }

  return {
    headers,
    data,
  } as TableData;
}



