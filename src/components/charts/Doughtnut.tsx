import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { DoughnutOptions } from '../../typings/charts';
import { faker } from '@faker-js/faker';
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

type GraphData = {
  labels: string[];
  data: unknown;
};

type DoughnutProps = {
  size?: 'xs' | 'md' | 'xl';
  description?: string | undefined;
  customOptions?: DoughnutOptions;
  data?: GraphData;
};

const labels = ['January', 'February', 'March'];

const colors = [
  faker.color.rgb(),
  faker.color.rgb(),
  faker.color.rgb(),
  faker.color.rgb(),
];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: colors,
      hoverOffset: 20,
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
}) => {
  const chartOptions = _.merge(options, customOptions);

  console.log(chartOptions);
  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Doughnut options={chartOptions} data={data} />
    </div>
  );
};

export default DoughnutChart;
