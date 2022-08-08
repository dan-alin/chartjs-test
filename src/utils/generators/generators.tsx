import { ChartArea, ChartData, ChartType } from 'chart.js';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
//import { ChartDataSets } from 'chart.js';
//import colorLib from '@kurkle/color';

export const generateLabels = (arrayRange = 3, label = 'label'): string[] => {
  return _.range(arrayRange).map((index) => `${label} ${index + 1}`);
};

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  colors: [string, string, string?]
) => {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  if (colors.length > 2) {
    gradient.addColorStop(0.5, colors[1]);
  }
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[colors.length - 1] as string);

  return gradient;
};

// export function transparentize(value, opacity) {
//     let alpha = opacity === undefined ? 0.5 : 1 - opacity;
//     return colorLib(value).alpha(alpha).rgbString();
// }

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
    let dataset;

    switch (chartType) {
      case 'pie':
      case 'doughnut':
        dataset = {
          label: `Set ${_i}`,
          data: _.range(labels).map(() => faker.datatype.number()),
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: _.range(labels).map(() => faker.color.rgb()),
          hoverOffset: 4,
        };
        break;
      default:
        dataset = {
          label: `Set ${_i}`,
          data: _.range(labels).map(() => faker.datatype.number()),
          borderColor: faker.color.rgb(),
          backgroundColor: faker.color.rgb(),
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
