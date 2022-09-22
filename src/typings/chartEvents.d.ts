import { chartEvents } from 'src/models/events.model';

export type DispatchEvents = DRangeEvent;
export type ListenEvents = LIFilterGroupEvent;

export type DRangeEvent = {
  label: chartEvents;
  firstValue?: number;
  secondValue?: number;
  action?: string;
};

export type LIFilterGroupEvent = {
  action: string;
  group: string;
};

export type ChartEventData = DispatchEvents | ListenEvents | any;
