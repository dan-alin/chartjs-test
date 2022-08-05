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

const defaultData = getDefaultData() as ChartData<'pie'>;

const options: ChartOptions = getDefaultOptions();

const PieChart: FC<PieChartProps> = ({
  size,
  description,
  customOptions = {},
  customData = defaultData,
}) => {
  const chartOptions = _.merge(options, customOptions);

  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Pie options={chartOptions} data={customData} />
    </div>
  );
};

export default PieChart;
