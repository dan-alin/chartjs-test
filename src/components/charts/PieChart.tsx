import React, { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import './charts.style.scss';

import type { PieChartProps } from '@typings/charts';
import { getDefaultData } from 'src/utils/configurations/chartsConfigurations';
import useChart from 'src/hooks/use-chart.hook';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart: FC<PieChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const { data, chartRef, options } = useChart(
    'pie',
    customOptions,
    customData
  );
  return (
    <div className={`chart__container chart__container--${size}`}>
      <Pie options={options} data={data} ref={chartRef} />
    </div>
  );
};

export default PieChart;
