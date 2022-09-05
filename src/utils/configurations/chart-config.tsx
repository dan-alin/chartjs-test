import {
  ChartData,
  ChartOptions,
  defaults,
  PointStyle,
  Tooltip,
} from 'chart.js';
import { ThemeType } from 'src/contexts/theme/theme.model';
import { Color } from 'src/models/color.model';

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

export const getDefaultOptions = (theme: ThemeType): ChartOptions => {
  return {
    responsive: true,
    color: theme === 'light' ? Color.DARK_GRAY : Color.WHITE,
    layout: {
      padding: 20,
    },

    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js custom title Chart',
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
    tension: 0, //borderDash: [7]
  };
};

Tooltip.positioners.myCustomPositioner = function (this) {
  // ( this, elements, eventPosition
  // const ymax = this.chart.scales.y.max

  return {
    x: this.getActiveElements()[0]?.element?.x,
    y: 100,
    // You may also include xAlign and yAlign to override those tooltip options.
  };
};

export const colorsDefaults: string[] = [
  '#0780eb',
  '#ffa33f',
  '#22dbbc',
  '#ff4aad',
  '#882dff',
];

export default chartConfigurations;
