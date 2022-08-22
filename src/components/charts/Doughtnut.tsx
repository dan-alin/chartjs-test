import React, { FC, useEffect, useRef, useState } from 'react';
import './charts.style.scss';
import { Doughnut } from 'react-chartjs-2';
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
import _ from 'lodash';
import type { DoughnutChartProps } from '@typings/charts';
import type { ChartData, ChartOptions } from 'chart.js';
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

const defaultData = getDefaultData() as ChartData<'doughnut'>;

const options: ChartOptions = getDefaultOptions();

const DoughnutChart: FC<DoughnutChartProps> = ({
  size,
  customOptions = {},
  customData = defaultData,
}) => {
  // to handle with a custom hook
  const chartRef = useRef<ChartJS<'doughnut'>>(null);
  const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
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
      <Doughnut options={chartOptions} data={chartData} ref={chartRef} />
    </div>
  );
};

export default DoughnutChart;
