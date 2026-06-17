import React from 'react';
import { PanelData, PanelProps } from '@grafana/data';

import DistanceChart from '../Charts/DistanceChart';
import MisalignmentChart from '../Charts/MisalignmentChart';
import HeatmapParallelCoord  from "../heatmap/HeatmapParallelCoord";

import { ManhattanComparator } from "../../utils/comparators/ManhattanComparator";
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

  //Data processed for comparison
  const referenceSeries = React.useMemo(() => frameToTimeSeries(referenceFrame), [referenceFrame]);
  const targetSeries = React.useMemo(() => frameToTimeSeries(targetFrame), [targetFrame]);

  //Data processed for display
  const referenceSeriesTD = React.useMemo(() => frameToTableData(referenceFrame), [referenceFrame]);
  const targetSeriesTD = React.useMemo(() => frameToTableData(targetFrame), [targetFrame]);

  const result = React.useMemo(() => {
    const comparator = new ManhattanComparator();
    console.log("Calculado comparación entre series");
    return comparator.compare(referenceSeries, targetSeries);
  }, [referenceSeries, targetSeries]);

  console.log("Resultado :", result);
  console.log("Target: ", targetSeries);
  console.log("Entry 1 de resultado: ", result[0].degree_of_misalignment);

  return (
  
    <div style={{ width, height, overflowY:"scroll", overflowX:"scroll", marginBottom: "10%"}}>
      <div style={{ width: width, height: height }}>
        <DistanceChart
          Distance={result}
          height = {height*1.25}
          width = {width}
        />
      </div>
      
      <div style={{ width: width, height: height}}>
        <MisalignmentChart
          Misalignment={result}
          height = {height*1.25}
          width = {width}
        />
      </div>

      <div style={{ width: width, height: height*1.5 }}>
        <HeatmapParallelCoord
            reference={referenceSeriesTD}
            target={targetSeriesTD}
            source={result}
        />
      </div>
    </div>
  );
};

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



