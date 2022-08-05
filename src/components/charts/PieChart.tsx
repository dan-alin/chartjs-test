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
  ChartData,
  ChartOptions,
} from 'chart.js';

import './charts.style.scss';

import type { PieChartProps } from '@typings/charts';
import { Card } from 'react-bootstrap';
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

const data = getDefaultData() as ChartData<'pie'>;

const options = getDefaultOptions() as ChartOptions<'pie'>;

const PieChart: FC<PieChartProps> = ({
  size,
  description,
  customOptions = {},
  customData = {},
}) => {
  const chartOptions = _.merge(options, customOptions);
  const chartData = _.merge(data, customData);
  console.log(data, options);
  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Pie options={chartOptions} data={chartData} />
    </div>
  );
};

export default PieChart;
