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
    y: this.getActiveElements()[0]?.element?.y,
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

export const GroupsColors = [
  {
    group: 'CLASSIC',
    color: '#5856d6',
  },
  {
    group: 'X-TEAM',
    color: '#39b2e9',
  },
  {
    group: 'TREND',
    color: '#e35183',
  },
];

export const AssetColors = [
  {
    group: 'Cash',
    color: '#0e9eff',
  },
  {
    group: 'Equity',
    color: '#ff9959',
  },
  {
    group: 'Bond',
    color: '#61d7a6',
  },
  {
    group: 'Altro',
    color: '#837d87',
  },
];

export default chartConfigurations;
