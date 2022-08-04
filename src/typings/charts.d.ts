import {
  CoreChartOptions,
  ScaleChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  BarControllerChartOptions,
  ChartTypeRegistry,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

export type ChartTypes = keyof ChartTypeRegistry | 'custom';

export type LineOptions = _DeepPartialObject<
  CoreChartOptions<'line'> &
    ElementChartOptions<'line'> &
    PluginChartOptions<'line'> &
    DatasetChartOptions<'line'> &
    ScaleChartOptions<'line'> &
    LineControllerChartOptions
>;

export type BarOptions = _DeepPartialObject<
  CoreChartOptions<'bar'> &
    ElementChartOptions<'bar'> &
    PluginChartOptions<'bar'> &
    DatasetChartOptions<'bar'> &
    ScaleChartOptions<'bar'> &
    BarControllerChartOptions
>;
