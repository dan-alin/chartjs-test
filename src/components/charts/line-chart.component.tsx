import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { LineChartProps } from '@typings/charts.d';
import './charts.style.scss';
import { getDefaultData } from 'src/utils/configurations/chart-config';
import useChart from 'src/hooks/use-chart.hook';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart: FC<LineChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
  customFill,
}) => {
  const { data, chartRef, options } = useChart(
    'line',
    customOptions,
    customData,
    customFill
  );

  return (
    <div className={`chart__container chart__container--${size}`}>
      <Line options={options} data={data} ref={chartRef} />
    </div>
  );
};

export default LineChart;
