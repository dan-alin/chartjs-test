import {
  CoreChartOptions,
  ScaleChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  DoughnutControllerChartOptions,
  PieControllerChartOptions,
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

export type DoughnutOptions = _DeepPartialObject<
  CoreChartOptions<'doughnut'> &
    ElementChartOptions<'doughnut'> &
    PluginChartOptions<'doughnut'> &
    DatasetChartOptions<'doughnut'> &
    ScaleChartOptions<'doughnut'> &
    DoughnutControllerChartOptions
>;

export type PieOptions = _DeepPartialObject<
  CoreChartOptions<'pie'> &
    ElementChartOptions<'pie'> &
    PluginChartOptions<'pie'> &
    DatasetChartOptions<'pie'> &
    ScaleChartOptions<'pie'> &
    PieControllerChartOptions
>;

export type BarOptions = _DeepPartialObject<
  CoreChartOptions<'bar'> &
    ElementChartOptions<'bar'> &
    PluginChartOptions<'bar'> &
    DatasetChartOptions<'bar'> &
    ScaleChartOptions<'bar'> &
    BarControllerChartOptions
>;
