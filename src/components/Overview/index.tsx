import React from 'react';
import { PanelProps } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';

import DistanceChart from '../Charts/DistanceChart';
import MisalignmentChart from '../Charts/MisalignmentChart';
import HeatmapParallelCoord  from "../heatmap/HeatmapParallelCoord";

import { compareTimeSeries } from "../../application/compareTimeSeries";
import { createDefaultComparator } from "../../application/defaultComparator";

import { frameToTimeSeries } from "../../infraestructure/frameToTimeSeries";
import { frameToTableData } from "../../infraestructure/frameToTableData";


export const DataComparisonPanel: React.FC<PanelProps> = ({ data, width, height }) => {
  const theme = useTheme2();
  const referenceFrame = data.series[0];
  const targetFrame = data.series[1];

  //Data processed for comparison
  const referenceSeries = React.useMemo(
    () => frameToTimeSeries(referenceFrame), 
    [referenceFrame]
  );

  const targetSeries = React.useMemo(
    () => frameToTimeSeries(targetFrame), 
    [targetFrame]
  );

  //Data processed for display
  const referenceSeriesTD = React.useMemo(
    () => frameToTableData(referenceFrame), 
    [referenceFrame]
  );
  const targetSeriesTD = React.useMemo(
    () => frameToTableData(targetFrame), 
    [targetFrame]
  );

  const result = React.useMemo(() => {
    const comparator = createDefaultComparator();
    return compareTimeSeries(comparator, referenceSeries, targetSeries);
  }, [referenceSeries, targetSeries]);

  const seriesRowCount = referenceSeries.length;
  const widthMultiplier = Math.ceil(seriesRowCount/200);

  return (
  
    <div style={{ width, height, overflowY:"scroll", overflowX:"scroll", marginBottom: "10%"}}>
      <div style={{ width: width, height: height }}>
        <DistanceChart
          Distance={result}
          height = {height*1.1}
          width = {width*widthMultiplier}
          textColor={theme.colors.text.primary}
        />
      </div>

      <div style={{height: height/12 }}></div>
      
      <div>
        <MisalignmentChart
          Misalignment={result}
          height = {height*1.1}
          width = {width*widthMultiplier}
          textColor={theme.colors.text.primary}
        />
      </div>

      <div style={{ width: width, height: height*1.5*widthMultiplier, border: "1px solid " + theme.colors.border, marginTop: "10%"}}>
        <HeatmapParallelCoord
            reference={referenceSeriesTD}
            target={targetSeriesTD}
            source={result}
            textColor={theme.colors.text.primary}
        />
      </div>
    </div>
  );
};
