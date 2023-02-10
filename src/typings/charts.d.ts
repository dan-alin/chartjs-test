import {
  ChartType,
  ChartOptions,
  ComplexFillTarget,
  TooltipPositionerFunction,
} from 'chart.js';

import { LineRangeEvent, SliceSelect } from './chartEvents';
export type d3Charts = 'D3_circular';
export type AMCharts =
  | 'force_directed'
  | 'am_doughnut'
  | 'am_bar'
  | 'am_linearea';
export type chartJsCharts = ChartType | 'linearea' | 'horizontalbar' | 'gauge';
export type flourishCharts =
  | 'line'
  | 'bubble'
  | 'doughnut'
  | 'bar'
  | 'linearea'
  | 'scatter'
  | 'horizontalbar'
  | 'map'
  | 'line-race';
export type Charts = chartJsCharts | d3Charts | AMCharts | flourishCharts;

export type ChartProps = {
  size?: ChartSize;
  customData?;
};

export type AmChartProps = {
  size?: ChartSize;
  customOptions?: AmCustomOptions;
};

export type AmCustomOptions = {
  hideLegend?: boolean;
  legendPosition?: 'left' | 'right' | 'bottom' | 'top' | undefined;
  windowHeight?: boolean;
  isWebview?: boolean;
  hideYAxis?: boolean;
  hideXAxis?: boolean;
  maxYAxis?: number;
};

export type GaugePlugin = {
  needleValue?: number;
};

export type Libs = 'am_charts' | 'chart_js' | 'd3' | 'flourish';

export type ChartInfoProps = {
  id: Charts;
  lib: Libs;
  dataSrc?: string;
  size?: ChartSize;
};

export type LineChartProps = ChartProps & {
  customOptions?: ChartOptions<'line'>;
  customFill?: ComplexFillTarget | undefined;
  showAlwaysTooltip?: boolean;
};

export type BarChartCJSProps = ChartProps & {
  customOptions?: ChartOptions<'bar'>;
};

export type DoughnutChartProps = ChartProps & {
  customOptions?: ChartOptions<'doughnut'>;
};
export type PieChartProps = ChartProps & {
  customOptions?: ChartOptions<'pie'>;
};
export type ScatterChartProps = ChartProps & {
  customOptions?: ChartOptions<'scatter'>;
};

export type ForceDirectedProps = AmChartProps & {
  customData: ForceDirected;
};
export type DoughnutOptions = AmCustomOptions & {
  rotateFocus?: boolean;
};

export type BarChartOptions = AmCustomOptions & {
  hideGrid?: boolean;
  barType: BarTypes;
};

export type BarChartProps = AmChartProps & {
  customOptions?: BarChartOptions;
  customData: BarChartData[];
  lines?: string[];
};

export type AmDoughnutProps = AmChartProps & {
  customOptions?: DoughnutOptions;
  customData: DoughnutData[];
  sliceSelect?: (value: SliceSelect) => void;
};

export type LineData = {
  date: number;
  value: number;
  isEvent?: boolean;
};
export type LineOptions = AmCustomOptions & {
  showRange: boolean;
  showEvents: boolean;
  hideYAxis?: boolean;
  lineType?: 'single' | 'multiple' | 'area' | undefined;
  strokeColor?: string | number;
  maxYAxis?: number;
  minGridDistance?: number | undefined;
};
export type LineChartAmProps = AmChartProps & {
  customOptions?: LineOptions;
  customData: LineData[][];
  rangeDrag?: (value: LineRangeEvent) => void;
};
export type ChartSize = 'xs' | 'md' | 'xl' | 'responsive';

export type CircularPackingProps = {
  width: number;
  height: number;
  data: CircularPackingMainData;
  size?: ChartSize;
};
declare module 'chart.js' {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}

export type CircularPackingMainData = {
  type: 'node';
  value: number;
  name: string;
  groupsColors: { [key: string]: string };
  groups: string[];
  id: string;
  children: CircularPackingElement[];
};

export type CircularPackingElement = {
  type: string;
  name: string;
  value: number;
  id: string;
};

export type CircularPackingData =
  | CircularPackingMainData
  | CircularPackingElement;

export type AMChartsData =
  | ForceDirected
  | DoughnutData[]
  | LineData[][]
  | BarChartData[];

export type ForceDirected = {
  name?: string;
  value?: number;
  children: ForceDirectedData[];
};

export type ForceDirectedData = {
  name: string;
  id: string;
  value?: number;
  type?: string;
};

export type DoughnutData = {
  description: string;
  percentage: number;
  color: string;
};

export type BarChartData = {
  date: string | number | null;
  valueX: number | string | null;
  valueY: number | string | null;
  color?: string;
  lineData?: {
    line: string;
    family: string;
    total: number;
    trend: number;
  };
};

export type BarTypes = 'negPositive' | 'lines' | 'horizontal';
