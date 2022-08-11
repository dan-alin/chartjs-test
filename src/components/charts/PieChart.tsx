import React, { FC, useEffect, useRef, useState } from 'react';
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
  ChartData,
  ChartOptions,
} from 'chart.js';

import './charts.style.scss';

import type { PieChartProps } from '@typings/charts';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const defaultData = getDefaultData() as ChartData<'pie'>;

const options: ChartOptions = getDefaultOptions();

const PieChart: FC<PieChartProps> = ({
  size,
  customOptions = {},
  customData = defaultData,
}) => {
  const chartRef = useRef<ChartJS<'pie'>>(null);
  const [chartData, setChartData] = useState<ChartData<'pie'>>({
    labels: [],
    datasets: [],
  });
  const chartOptions = _.merge(options, customOptions);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    chart.options = _.merge(options, customOptions);
    setChartData(customData);
  }, [customData, customOptions]);

  return (
    <div className={`chart__container chart__container--${size}`}>
      <Pie options={chartOptions} data={chartData} ref={chartRef} />
    </div>
  );
};

export default PieChart;
