import React from 'react';
import { MatrixCell } from './MatrixCell';

const YEARS = [
  2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019
];

const SIZE = YEARS.length;

// generate static mock matrix
const matrix: number[][] = Array.from({ length: SIZE }, () =>
  Array.from({ length: SIZE }, () => Math.random())
);

export const MatrixGrid: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `60px repeat(${SIZE}, 1fr)`,
        gridTemplateRows: `40px repeat(${SIZE}, 1fr)`,
        height: '100%',
        width: '100%',
      }}
    >
      {/* Empty top-left corner */}
      <div />

      {/* Column headers */}
      {YEARS.map((year) => (
        <div
          key={`col-${year}`}
          style={{
            textAlign: 'center',
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          {year}
        </div>
      ))}

      {/* Rows */}
      {YEARS.map((rowYear, i) => (
        <React.Fragment key={`row-${rowYear}`}>
          {/* Row header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {rowYear}
          </div>

          {/* Cells */}
          {YEARS.map((_, j) => (
            <MatrixCell key={`${i}-${j}`} value={matrix[i][j]} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
