import React, { useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions } from 'types';
import { css, cx } from '@emotion/css';
import { FieldType } from '@grafana/data';
import { BarCanvas } from '../BarGraph';

interface Props extends PanelProps<PanelOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};



export const SimplePanel: React.FC<Props> = ({ data, width, height }) => {
  const series = data.series[0];
  const valueField = series?.fields.find(f => f.type === FieldType.number);

  if (!valueField) {
    return <div>No data</div>;
  }

  const values = [];
  for (let i = 0; i < valueField.values.length; i++) {
    const v = valueField.values.get(i);
    if (typeof v === 'number') {
      values.push(v);
    }
  }

    //Click handler para realizar un zoom a la barra clickeada
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;

    const barWidth = width / values.length;
    const index = Math.floor(x / barWidth);

    if (index >= 0 && index < values.length) {
    }
  };

  return (
    <BarCanvas
      values={values}
      width={width}
      height={height}
      onClick={handleClick}
    />
  );

};

/*
export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <g>
          <circle data-testid="simple-panel-circle" style={{ fill: theme.colors.primary.main }} r={100} />
        </g>
      </svg>

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">Number of series: {data.series.length}</div>
        )}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};*/
