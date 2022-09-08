import React, { FC } from 'react';
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
import type { DoughnutChartProps } from '@typings/charts';
import { getDefaultData } from 'src/utils/configurations/chart-config';
import useChart from 'src/hooks/use-chart.hook';
// import chartDataGenerator from 'src/utils/generators/generators';
// import { Button } from '@components/button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart: FC<DoughnutChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const { data, chartRef, options } = useChart(
    'doughnut',
    customOptions,
    customData
  );

  // const generateData = chartDataGenerator(1, 3, 'doughnut');

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <Doughnut options={options} data={data} ref={chartRef} />
      </div>
      {/* <Button onClick={() => setData(generateData)}>New Data</Button> */}
    </>
  );
};

export default DoughnutChart;
