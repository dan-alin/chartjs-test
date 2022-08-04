import {
  CoreChartOptions,
  ScaleChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  DoughnutControllerChartOptions,
  PieControllerChartOptions,
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
