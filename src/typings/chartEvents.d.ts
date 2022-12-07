import { WebviewActions } from 'src/models/events.model';
export type DispatchEvents = DRangeEvent;
export type ListenEvents = LIFilterGroupEvent;

export type DRangeEvent = {
  action: WebviewActions;
  firstValue?: number;
  secondValue?: number;
  description?: string;
};

export type LIFilterGroupEvent = {
  action: string;
  group: string;
};

export type ChartEventData = DispatchEvents | ListenEvents | any;

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
};

export type yCategories = 'performance' | 'volatility' | 'risk';
