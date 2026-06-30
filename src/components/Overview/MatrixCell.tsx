import React from 'react';

interface Props {
  value: number;
}

export const MatrixCell: React.FC<Props> = ({ value }) => {
  const color = `rgba(0, 200, 0, ${value})`;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: color,
        border: '1px solid #000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        color: 'white',
      }}
    >
      {value.toFixed(2)}
    </div>
  );
};
