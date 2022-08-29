import React, { FC, useEffect, useRef, useState } from 'react';
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
  ChartData,
} from 'chart.js';
import { BarChartProps } from '@typings/charts.d';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions = getDefaultOptions();

const BarChart: FC<BarChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });
  const chartOptions = _.merge(options, customOptions);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    console.log('test');

    chart.options = _.merge(options, customOptions);
    setChartData(customData);
  }, [customData, customOptions]);

  return (
    <div className={`chart__container chart__container--${size}`}>
      <Bar
        key={Math.random()}
        redraw
        options={chartOptions}
        data={chartData}
        ref={chartRef}
      />
    </div>
  );
};

export default BarChart;
