import { ChartType, ChartOptions } from 'chart.js';

export type Charts = ChartType | 'linearea';

export type ChartProps = {
  description?: string | undefined;
  size?: 'xs' | 'md' | 'xl';
  customData?;
};

export type ChartInfoProps = {
  id: Charts;
};

export type LineChartProps = ChartProps & {
  customOptions?: ChartOptions<'line'>;
};
export type BarChartProps = ChartProps & {
  customOptions?: ChartOptions<'bar'>;
};
export type DoughnutChartProps = ChartProps & {
  customOptions?: ChartOptions<'doughnut'>;
};
export type PieChartProps = ChartProps & {
  customOptions?: ChartOptions<'pie'>;
};
