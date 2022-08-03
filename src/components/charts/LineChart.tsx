import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card } from 'react-bootstrap';
import { yAxeRight } from 'src/utils';
import { LineOptions } from '@typings/charts.d';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const colors = [
  faker.color.rgb(),
  faker.color.rgb(),
  faker.color.rgb(),
  faker.color.rgb(),
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: colors[0],
      backgroundColor: colors[0],
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: colors[2],
      backgroundColor: colors[2],
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y: yAxeRight,
  },
  interaction: {
    intersect: false,
  },
};

export type LineChartProps = {
  description?: string | undefined;
  customOptions?: LineOptions;
};

const LineChart: FC<LineChartProps> = ({ description, customOptions = {} }) => {
  const chartOptions = {
    ...options,
    ...customOptions,
  };
  return (
    <>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Line options={chartOptions} data={data} />
    </>
  );
};

export default LineChart;