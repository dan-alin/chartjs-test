import React, { FC } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { ScatterChartProps } from '@typings/charts.d';
import { getDefaultData } from 'src/utils/configurations/chart-config';
import { Scatter } from 'react-chartjs-2';
import useChart from 'src/hooks/use-chart.hook';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterChart: FC<ScatterChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const { data, chartRef, options } = useChart(
    'scatter',
    customOptions,
    customData
  );

  return (
    <div className={`chart__container chart__container--${size}`}>
      <Scatter options={options} data={data} ref={chartRef} />
    </div>
  );
};

export default ScatterChart;
