import { LineData, DoughnutData } from './charts';
export type ChartEventData = DispatchEvents | ListenEvents;
export type DispatchEvents = LineRangeEvent | FilterBubble | SliceSelect;
export type ListenEvents =
  | FilterBubble
  | LineToggleShow
  | LineData[][]
  | DoughnutData[];

// Line chart
export type LineRangeEvent = {
  firstValue?: number | undefined;
  secondValue?: number | undefined;
};
export type LineToggleShow = {
  show: boolean;
};

// Bubble chart
export type FilterBubble = {
  group: string;
};

// Pie chart
export type SliceSelect = {
  description: string;
};

export type QueryParams = {
  delay?: number;
  emulateData?: boolean;
};

export type DoughnutQueryParams = QueryParams & {
  rotateFocus?: boolean;
};

export type LineQueryParams = QueryParams & {
  emulateLines?: number;
  showRange?: boolean;
  showEvents?: boolean;
  hideYAxis?: boolean;
  lineType?: 'single' | 'multiple' | 'area' | undefined;
  maxYAxis?: number;
  minGridDistance?: number;
};
