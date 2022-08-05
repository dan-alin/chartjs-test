import { ChartData, ChartOptions, defaults, PointStyle } from 'chart.js';

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
    tension: 0,
    fill: 'end',
    //borderDash: [7]
  };
};
export default chartConfigurations;
