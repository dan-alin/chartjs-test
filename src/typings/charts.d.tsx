import {
  CoreChartOptions,
  ScaleChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

export type LineOptions = _DeepPartialObject<
  CoreChartOptions<'line'> &
    ElementChartOptions<'line'> &
    PluginChartOptions<'line'> &
    DatasetChartOptions<'line'> &
    ScaleChartOptions<'line'> &
    LineControllerChartOptions
>;
