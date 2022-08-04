import React, { FC } from 'react';
import { Pie } from 'react-chartjs-2';
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

import type { PieOptions } from '@typings/charts';
import { Card } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],

      hoverOffset: 4,
    },
  ],
};

export const options = {
  responsive: true,
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

type PieChartProps = {
  description?: string | undefined;
  customOptions?: PieOptions;
  size?: 'xs' | 'md' | 'xl';
};

const PieChart: FC<PieChartProps> = ({
  size,
  description,
  customOptions = {},
}) => {
  const chartOptions = {
    ...options,
    ...customOptions,
  };
  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Pie options={chartOptions} data={data} />
    </div>
  );
};

export default PieChart;
