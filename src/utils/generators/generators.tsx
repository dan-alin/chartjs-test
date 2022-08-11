import {
  BubbleDataPoint,
  ChartArea,
  ChartData,
  ChartDataset,
  ChartType,
} from 'chart.js';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
//import { ChartDataSets } from 'chart.js';
import colorLib, { Color, RGBA } from '@kurkle/color';

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
  chartType?: ChartType
): ChartData => {
  let data: ChartData = {
    labels: generateLabels(labels),
    datasets: [],
  };

  for (let _i = 0; _i < datasetsRange; _i++) {
    let dataset: ChartDataset;
    const datasetColor: string | number[] | Color | RGBA = faker.color.rgb();

    switch (chartType) {
      case 'pie':
      case 'doughnut':
        dataset = {
          label: `Set ${_i + 1}`,
          data: _.range(labels).map(() => faker.datatype.number()),
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: _.range(labels).map(() => faker.color.rgb()),
          hoverOffset: 4,
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
          data: _.range(labels).map(() => faker.datatype.number()),
          borderColor: datasetColor,
          backgroundColor: transparentize(datasetColor, 0.7),
        };
    }

    data = {
      ...data,
      datasets: [...data.datasets, dataset],
    };
  }

  return data;
};

export default chartDataGenerator;