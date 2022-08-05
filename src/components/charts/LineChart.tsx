import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Card } from 'react-bootstrap';
import { LineChartProps } from '@typings/charts.d';
import './charts.style.scss';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = getDefaultData() as ChartData<'line'>;
const options = getDefaultOptions() as ChartOptions<'line'>;

const LineChart: FC<LineChartProps> = ({
  size,
  description,
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
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default LineChart;
