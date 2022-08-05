import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Card } from 'react-bootstrap';
import { BarChartProps } from '@typings/charts.d';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const defaultData = getDefaultData() as ChartData<'bar'>;
export const options: ChartOptions = getDefaultOptions();

const BarChart: FC<BarChartProps> = ({
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
      <Bar options={chartOptions} data={customData} />
    </div>
  );
};

export default BarChart;
