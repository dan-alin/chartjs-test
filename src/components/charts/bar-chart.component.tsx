import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartOptions,
} from 'chart.js';
import { BarChartProps } from '@typings/charts.d';
import { getDefaultData } from 'src/utils/configurations/chart-config';
import useChart from 'src/hooks/use-chart.hook';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: FC<BarChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const { data, chartRef, options } = useChart(
    'bar',
    customOptions,
    customData
  );

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <Bar
          key={Math.random()}
          redraw
          options={options as ChartOptions<'bar'>}
          data={data}
          ref={chartRef}
        />
      </div>
    </>
  );
};

export default BarChart;
