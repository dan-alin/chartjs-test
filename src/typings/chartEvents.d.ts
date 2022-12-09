export type ChartEventData = DispatchEvents | ListenEvents;
export type DispatchEvents = LineRangeEvent | FilterBubble | SliceSelect;
export type ListenEvents = FilterBubble | LineToggleShow;

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
  sliceId: string;
};

export type QueryParams = {
  legend?: 'top' | 'left' | 'right' | 'left';
  policy?: string;
  client?: string;
  delay?: number;
};

export type DoughnutQueryParams = QueryParams & {
  rotateFocus?: boolean;
};

export type LineQueryParams = QueryParams & {
  yCategory?: yCategories;
  emulateLines?: number;
};

export type yCategories = 'performance' | 'volatility' | 'risk';
