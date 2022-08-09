import React, { FC, useEffect, useRef, useState } from 'react';
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
  Filler,
  ChartDataset,
  ScatterDataPoint,
} from 'chart.js';
import { Card } from 'react-bootstrap';
import { LineChartProps } from '@typings/charts.d';
import './charts.style.scss';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';
import { createGradient } from 'src/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options: ChartOptions = getDefaultOptions();

const LineChart: FC<LineChartProps> = ({
  size,
  description,
  customOptions = {},
  customData = getDefaultData(),
  customFill,
}) => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  const chartOptions = _.merge(options, customOptions);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    let chartData;

    if (customFill) {
      chartData = {
        ...customData,
        datasets: customData.datasets.map(
          (
            dataset: ChartDataset<'line', (number | ScatterDataPoint | null)[]>
          ) => ({
            ...dataset,
            fill: {
              target: customFill.target,
              above: createGradient(
                chart.ctx,
                chart.chartArea,
                ['#ffffff', dataset.borderColor as string],
                [0.5, 0.1]
              ),
            },
          })
        ),
      };
    } else {
      chartData = {
        ...customData,
        datasets: customData.datasets.map(
          (
            dataset: ChartDataset<'line', (number | ScatterDataPoint | null)[]>
          ) => ({
            ...dataset,
            fill: dataset.fill,
          })
        ),
      };
    }
    setChartData(chartData);
  }, [customData, customFill]);

  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Line options={chartOptions} data={chartData} ref={chartRef} />
    </div>
  );
};

export default LineChart;
