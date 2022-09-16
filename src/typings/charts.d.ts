import {
  ChartType,
  ChartOptions,
  ComplexFillTarget,
  TooltipPositionerFunction,
} from 'chart.js';
import * as am5 from '@amcharts/amcharts5';
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
  windowHeight?: boolean;
};

export type GaugePlugin = {
  needleValue?: number;
};

export type Libs = 'am_charts' | 'chart_js' | 'd3' | 'flourish';

export type ChartInfoProps = {
  id: Charts;
  lib: Libs;
};

export type LineChartProps = ChartProps & {
  customOptions?: ChartOptions<'line'>;
  customFill?: ComplexFillTarget | undefined;
  showAlwaysTooltip?: boolean;
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
export type ScatterChartProps = ChartProps & {
  customOptions?: ChartOptions<'scatter'>;
};

export type ForceDirectedProps = AmChartProps & {
  customData: ForceDirected;
};

export type AmDoughnutProps = AmChartProps & {
  customData: DoughnutData[];
};

export type LineChartAmProps = ChartProps & {
  customOptions?: AmCustomOptions;
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
  | LineAreaData[]
  | LineAreaData[];

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
  name: string;
  value: number;
  color: am5.Color;
};

export type LineAreaData = {
  date: number;
  value: number;
};
