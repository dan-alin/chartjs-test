/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  ComplexFillTarget,
  ScatterDataPoint,
} from 'chart.js';
import { getDefaultOptions } from 'src/utils/configurations/chart-config';
import { merge } from 'lodash';
import { createGradient } from 'src/utils';
import chartDataGenerator from 'src/utils/generators/generators';
import { chartJsCharts } from '@typings/charts';
import { useTheme } from 'src/contexts/theme/theme.context';

const useChart = (
  type: string,
  customOptions: unknown,
  customData: ChartData,
  customFill?: ComplexFillTarget
) => {
  const chartRef = useRef<ChartJS<any>>(null);
  const { themeType } = useTheme();
  const [data, setData] = useState<ChartData<any>>({
    labels: [],
    datasets: [],
  });
  const defaultOptions: ChartOptions = getDefaultOptions(themeType);
  const options = merge(defaultOptions, customOptions);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    chart.options = merge(options, customOptions);

    if (type === 'line') {
      const chartData = customFill
        ? {
            ...customData,
            datasets: customData.datasets.map(
              (
                dataset: ChartDataset<any, (number | ScatterDataPoint | null)[]>
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
          }
        : {
            ...customData,
            datasets: customData.datasets.map(
              (
                dataset: ChartDataset<any, (number | ScatterDataPoint | null)[]>
              ) => ({
                ...dataset,
                fill: dataset.fill,
              })
            ),
          };

      setData(chartData);
    } else {
      setData(customData);
    }
  }, [customFill]);

  const generateNewData = (
    datasets: number,
    sets: number,
    type: chartJsCharts
  ) => {
    const newData = chartDataGenerator(datasets, sets, type);
    setData(newData);
  };

  return { data, chartRef, options, setData, generateNewData };
};

export default useChart;
