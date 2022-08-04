import { defaults, PointStyle } from 'chart.js';

export const yAxeRight = {
  type: 'linear' as const,
  display: true,
  position: 'right' as const,
  grid: {
    drawOnChartArea: false,
  },
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
