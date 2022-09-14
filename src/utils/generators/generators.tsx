import { BubbleDataPoint, ChartArea, ChartData, ChartDataset } from 'chart.js';
import * as am5 from '@amcharts/amcharts5';
import { range } from 'lodash';
import { faker } from '@faker-js/faker';
//import { ChartDataSets } from 'chart.js';
import colorLib, { Color, RGBA } from '@kurkle/color';
import {
  AMCharts,
  AMChartsData,
  chartJsCharts,
  CircularPackingElement,
  CircularPackingMainData,
  d3Charts,
  ForceDirected,
  GaugePlugin,
} from '@typings/charts';
import { AssetColors } from '../configurations/chart-config';

export const generateLabels = (arrayRange = 3, label = 'label'): string[] => {
  return range(arrayRange).map((index) => `${label} ${index + 1}`);
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
  chartType?: chartJsCharts,
  colors?: string[],
  maxRange?: number
): ChartData => {
  let data: ChartData = {
    labels: generateLabels(labels),
    datasets: [],
  };

  for (let _i = 1; _i <= datasetsRange; _i++) {
    let dataset: ChartDataset & GaugePlugin;
    const datasetColor: string | number[] | Color | RGBA =
      !!colors && colors[_i - 1] ? colors[_i - 1] : faker.color.rgb();
    //defining custom data fopr gauge
    const fakeData = range(labels).map((index) => {
      let options = {};
      if (maxRange) {
        const alpha = faker.datatype.number({ min: 1, max: 2 });
        const max = (maxRange / labels) * (index + 1) * (1 / _i);
        const min = (maxRange / labels) * index * (1 / _i) - index * alpha;
        options = {
          max: max <= maxRange ? max : maxRange,
          min: min >= 0 ? min : 0,
        };
      }

      return faker.datatype.number(options);
    });
    const gaugeNeedleRange = {
      max: fakeData.reduce((prev, curr) => prev + curr, 0),
    };
    const radius = faker.datatype.number({ min: 3, max: 20 });
    switch (chartType) {
      case 'linearea':
        dataset = {
          label: `Set ${_i}`,
          data: fakeData,
          borderColor: datasetColor,
          backgroundColor: transparentize(datasetColor, 0.7),
          fill: true,
        };
        break;
      case 'pie':
      case 'doughnut':
        dataset = {
          label: `Set ${_i}`,
          data: fakeData,
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: colors,
          hoverOffset: 4,
        };
        break;
      case 'gauge':
        dataset = {
          label: `Set ${_i}`,
          data: fakeData,
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: colors,
          hoverOffset: 4,
          needleValue: faker.datatype.number(gaugeNeedleRange),
        };

        break;
      case 'scatter':
        dataset = {
          label: `Set ${_i}`,
          data: range(labels).map(() => {
            const point: BubbleDataPoint = {
              x: faker.datatype.number({ min: -80, max: 80 }),
              y: faker.datatype.number({ min: -80, max: 80 }),
              r: radius,
            };
            return point;
          }),
          backgroundColor: transparentize(datasetColor, 0.3),
          borderColor: datasetColor,
          borderWidth: 2,
          pointRadius: radius,
        };
        break;
      default:
        dataset = {
          label: `Set ${_i}`,
          data: fakeData,
          borderColor: datasetColor,
          borderWidth: 1,
          backgroundColor: transparentize(datasetColor, 0.7),
          fill: false,
          tension: 0.1,
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
  ],
  colors = ['#5856d6', '#39b2e9', '#e35183']
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

  groups.forEach((group, index) => {
    chartData.groupsColors[group] =
      colors && colors[index] ? colors[index] : faker.color.rgb();
  });

  switch (chartType) {
    case 'D3_circular':
      chartData = {
        ...chartData,
        children: range(30).map(() => {
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

export const AMChartDataGenerator = (
  chartType: AMCharts,
  dataRange = 15,
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
): AMChartsData => {
  let chartData: AMChartsData = [];

  switch (chartType) {
    case 'force_directed':
      chartData = {
        value: 0,
        children: [],
      };

      groups.forEach((group) => {
        (chartData as ForceDirected).children = [
          ...(chartData as ForceDirected).children,
          ...range(faker.datatype.number({ min: 5, max: dataRange })).map(
            () => {
              const circleData: CircularPackingElement = {
                type: group,
                name: `${faker.helpers.arrayElement(names)}`,
                value: faker.datatype.number({ min: 10, max: 100 }),
                id: faker.random.alphaNumeric(7),
              };
              return circleData;
            }
          ),
        ];
      });
      break;
    case 'am_doughnut':
      chartData = groups.map((group) => {
        const colorGroup = AssetColors.find((asset) => asset.group === group);

        return {
          name: group,
          color: am5.color(colorGroup ? colorGroup.color : faker.color.rgb()),
          value: faker.datatype.number({ min: 10, max: dataRange }),
        };
      });
      break;
    case 'am_linearea':
      chartData = generateDatas(1200);
      break;
  }

  return chartData;
};
let value = 100;
const date = new Date();
function generateData() {
  date.setHours(0, 0, 0, 0);
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, 'day', 1);
  return {
    date: date.getTime(),
    value: value,
  };
}

function generateDatas(count: number) {
  const data = [];
  for (let i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

export default chartDataGenerator;
