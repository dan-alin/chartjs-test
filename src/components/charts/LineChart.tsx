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
  createGradient,
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
  Legend,
  Filler
);

const defaultData = getDefaultData() as ChartData<'line'>;
const options: ChartOptions = getDefaultOptions();

const LineChart: FC<LineChartProps> = ({
  size,
  description,
  customOptions = {},
  customData = defaultData,
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

    console.group('data', customData);

    if (customData.datasets[0].fill === 'gradient') {
      const customDataGradient = {
        ...customData,
        datasets: customData.datasets.map(
          (
            dataset: ChartDataset<'line', (number | ScatterDataPoint | null)[]>
          ) => ({
            ...dataset,
            fill: {
              target: 'origin',
              above: createGradient(chart.ctx, chart.chartArea, [
                '#ffffff',
                dataset.borderColor as string,
              ]),
            },
          })
        ),
      };
      setChartData(customDataGradient);
      console.log('gradient data', customDataGradient);
    } else {
      setChartData(customData);
    }
  }, [customData]);

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
