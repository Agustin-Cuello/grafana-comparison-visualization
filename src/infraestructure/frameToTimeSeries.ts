import type { PanelData } from '@grafana/data';
import type { TimeSeries } from '../types/TSComparator.types';


export function frameToTimeSeries(frame: PanelData["series"][number]): TimeSeries {
  const timeField = frame.fields.find(f => f.type === "time");
  const valueFields = frame.fields.filter(f => f !== timeField);

  if (!timeField || valueFields.length === 0) {
    return [];
  }

  const rows: number[][] = [];

  for (let i = 0; i < frame.length; i++) {
    const values = valueFields.map(f => Number(f.values.get(i)));
    rows.push(values);
  }

  return rows as TimeSeries;
}