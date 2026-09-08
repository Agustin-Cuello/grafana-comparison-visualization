import type { PanelData } from '@grafana/data';
import type { TableData } from "../types/TableData.types";


export function frameToTableData(frame: PanelData["series"][number]): TableData {
  const timeField = frame.fields.find(f => f.type === "time");
  const valueFields = frame.fields.filter(f => f !== timeField);

  if (!timeField || valueFields.length === 0) {
    return { headers: [], data: [] } as TableData;
  }

  const headers = valueFields.map(f => f.name || '');
  const data: string[][] = [];

  for (let i = 0; i < frame.length; i++) {
    const row: string[] = [];
    // all value columns (exclude time)
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