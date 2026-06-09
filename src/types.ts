export interface PanelOptions {
  url: string;
}

/**
 * Represents a cell in a matrix which contains values and its position
 */
export interface MatrixCell {
  /**
   * Row index
   */
  row: number;
  /**
   * Column index
   */
  col: number;
  /**
   * Value of cell
   */
  values: number[]; 
};


export interface MisalignmentPoint {
  timestamp: number;
  value: number;
};

export interface DistancePoint {
  timestamp: number;
  value: number;
  early: -1 | 0 | 1;
};

export interface DistanceProps {
  Difference: Array<DistancePoint>;
  height: number;
  width: number;
}

export interface MisalignmentPoint {
  timestamp: number;
  value: number;
};

export interface MisalignmentProps {
  Misalignment: Array<MisalignmentPoint>;
  height: number;
  width: number;
}