import { BubbleDataPoint, ChartArea, ChartData, ChartDataset } from 'chart.js';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
//import { ChartDataSets } from 'chart.js';
import colorLib, { Color, RGBA } from '@kurkle/color';
import {
  chartJsCharts,
  CircularPackingElement,
  CircularPackingMainData,
  d3Charts,
  GaugePlugin,
} from '@typings/charts';

export const generateLabels = (arrayRange = 3, label = 'label'): string[] => {
  return _.range(arrayRange).map((index) => `${label} ${index + 1}`);
};

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  colors: [string, string, string?],
  alpha: [number, number] = [0, 0]
) => {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  if (colors.length > 2) {
    gradient.addColorStop(
      0.5,
      transparentize(colors[1], (alpha[1] - alpha[0]) / 2)
    );
  }
  gradient.addColorStop(0, transparentize(colors[0], alpha[0]));
  gradient.addColorStop(
    1,
    transparentize(colors[colors.length - 1] as string, alpha[1])
  );

  return gradient;
};

export function transparentize(
  value: string | number[] | Color | RGBA,
  opacity: number
) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

const chartDataGenerator = (
  datasetsRange = 3,
  labels = 6,
  chartType?: chartJsCharts
): ChartData => {
  let data: ChartData = {
    labels: generateLabels(labels),
    datasets: [],
  };

  for (let _i = 0; _i < datasetsRange; _i++) {
    let dataset: ChartDataset & GaugePlugin;
    const datasetColor: string | number[] | Color | RGBA = faker.color.rgb();
    //defining custom data fopr gauge
    const fakeData = _.range(labels).map(() => faker.datatype.number());
    const gaugeNeedleRange = {
      max: fakeData.reduce((prev, curr) => prev + curr, 0),
    };
    switch (chartType) {
      case 'linearea':
        dataset = {
          label: `Set ${_i + 1}`,
          data: fakeData,
          borderColor: datasetColor,
          backgroundColor: transparentize(datasetColor, 0.7),
          fill: true,
        };
        break;
      case 'pie':
      case 'doughnut':
        dataset = {
          label: `Set ${_i + 1}`,
          data: fakeData,
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: _.range(labels).map(() => faker.color.rgb()),
          hoverOffset: 4,
        };
        break;
      case 'gauge':
        dataset = {
          label: `Set ${_i + 1}`,
          data: fakeData,
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: _.range(labels).map(() => faker.color.rgb()),
          hoverOffset: 4,
          needleValue: faker.datatype.number(gaugeNeedleRange),
        };

        break;
      case 'scatter':
        dataset = {
          label: `Set ${_i + 1}`,
          data: _.range(labels).map(() => {
            const point: BubbleDataPoint = {
              x: faker.datatype.number({ min: -100, max: 100 }),
              y: faker.datatype.number({ min: -100, max: 100 }),
              r: 10,
            };
            return point;
          }),
          backgroundColor: transparentize(datasetColor, 0.3),
          borderColor: datasetColor,
          borderWidth: 2,
          pointRadius: 7,
        };
        break;
      default:
        dataset = {
          label: `Set ${_i + 1}`,
          data: fakeData,
          borderColor: datasetColor,
          backgroundColor: transparentize(datasetColor, 0.7),
          fill: false,
        };
    }

    data = {
      ...data,
      datasets: [...data.datasets, dataset],
    };
  }

  return data;
};

export const d3ChartDataGenerator = (
  chartType?: d3Charts,
  groups = ['CLASSIC', 'X-TEAM', 'TREND'],
  names = [
    'Global allocation',
    'BlackRock',
    'RedRock',
    'Income Strategy',
    'Tecnology',
    'Gold',
    'Silver',
    'Platinum',
  ]
): CircularPackingMainData => {
  let chartData: CircularPackingMainData = {
    type: 'node',
    name: 'container',
    id: 'mainNode',
    value: 2300,
    groupsColors: {},
    groups,
    children: [],
  };

  groups.forEach((group) => {
    chartData.groupsColors[group] = faker.color.rgb();
  });

  switch (chartType) {
    case 'D3_circular':
      chartData = {
        ...chartData,
        children: _.range(30).map(() => {
          const circleData: CircularPackingElement = {
            type: faker.helpers.arrayElement(groups),
            name: `${faker.helpers.arrayElement(names)}`,
            value: faker.datatype.number({ min: 10, max: 100 }),
            id: faker.random.alphaNumeric(7),
          };
          return circleData;
        }),
      };
      break;
  }

  return chartData;
};

export default chartDataGenerator;
