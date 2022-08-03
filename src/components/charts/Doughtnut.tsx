import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string | string[];
};

type DoughnutProps = {
  title?: string;
  labels?: string[];
  datasets?: Dataset;
  height: number;
  width: number;
};

const labels = ['January', 'February', 'March'];

const data = {
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
      hoverOffset: 20,
    },
  ],
};

const options = {
  responsive: true,
  cutout: '85%',
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
  title,
  height = 300,
  width = 200,
}) => {
  return (
    <div style={{ height: `${height}px`, width: `${width}px` }}>
      {title && <h5>{title}</h5>}
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default DoughnutChart;
