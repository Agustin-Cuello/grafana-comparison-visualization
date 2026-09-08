// application/compareTimeSeries.ts
import type {
  ComparisonResult,
  TimeSeries,
} from '../types/TSComparator.types';
import type { TSComparator } from '../components/TSComparator';

export function compareTimeSeries(
  comparator: TSComparator,
  reference: TimeSeries,
  target: TimeSeries
): ComparisonResult {
  return comparator.compare(reference, target);
}
