import {
  ChartArea,
  ChartData,
  ChartOptions,
  defaults,
  PointStyle,
} from 'chart.js';

export const yAxeRight = {
  type: 'linear' as const,
  display: true,
  position: 'right' as const,
  grid: {
    drawOnChartArea: false,
  },
};

const labels = ['default'];

export const getDefaultData = () => {
  return {
    labels,
    datasets: [
      {
        label: 'default',
        data: [1],
        borderColor: 'rgb(255, 255, 255)',
        backgroundColor: '#333',
      },
    ],
  } as ChartData;
};

export const getDefaultOptions = (): ChartOptions => {
  return {
    responsive: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
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

const chartConfigurations = () => {
  // Points
  const pointStyle: PointStyle = 'circle';
  // https://www.chartjs.org/docs/latest/configuration/elements.html#point-configuration
  defaults.elements.point = {
    ...defaults.elements.point,
    pointStyle,
    radius: 0,
    hoverRadius: 7,
  };

  // Line
  defaults.elements.line = {
    ...defaults.elements.line,
    stepped: false,
    tension: 0, //borderDash: [7]
  };
};
export default chartConfigurations;
