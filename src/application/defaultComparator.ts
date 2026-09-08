
import { TSComparator } from "components/TSComparator";
import { KarlPearsonComparator } from "../utils/comparators/KarlPearsonComparator";


export function createDefaultComparator(): TSComparator {
  return new KarlPearsonComparator();
}
