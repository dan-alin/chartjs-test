import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

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
//

type DoughnutProps = {
  size?: 'xs' | 'md' | 'xl';
  description?: string | undefined;
  customOptions?: ChartOptions;
  customData?: ChartData;
};

const data = getDefaultData() as ChartData<'doughnut'>;

const options = getDefaultOptions() as ChartOptions;

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
