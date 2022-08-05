import React, { FC } from 'react';
import './charts.style.scss';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
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

const data = getDefaultData() as ChartData<'doughnut'>;

const options: ChartOptions = getDefaultOptions();

const DoughnutChart: FC<DoughnutChartProps> = ({
  description,
  size,
  customOptions = {},
  customData = {},
}) => {
  const chartOptions = _.merge(options, customOptions);
  const chartData = _.merge(data, customData);

  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Doughnut options={chartOptions} data={chartData} />
    </div>
  );
};

export default DoughnutChart;
