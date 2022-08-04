import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { DoughnutOptions } from '../../typings/charts';
import type { ChartData } from 'chart.js';

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
import { Card } from 'react-bootstrap';
import _ from 'lodash';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
//

type DoughnutProps = {
  size?: 'xs' | 'md' | 'xl';
  description?: string | undefined;
  customOptions?: DoughnutOptions;
  customData?: ChartData<'doughnut'>;
};

const labels = ['default'];

const data: ChartData<'doughnut'> = {
  labels,
  datasets: [
    {
      label: 'default',
      data: [1],
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: '#333',
    },
  ],
};

const options = {
  responsive: true,

  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const DoughnutChart: FC<DoughnutProps> = ({
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
