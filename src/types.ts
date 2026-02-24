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