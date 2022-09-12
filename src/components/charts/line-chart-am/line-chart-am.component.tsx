import React, { FC, useId, useLayoutEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { IXYChartSettings } from '@amcharts/amcharts5/xy';

export enum ChartCategories {
  xy = 'xy',
  hierarchy = 'hierarchy',
}

const initChart = (
  root: am5.Root,
  category: ChartCategories,
  customSettings?: IXYChartSettings
): am5xy.XYChart => {
  const settings: IXYChartSettings = {
    panX: true,
    panY: false,
    wheelX: 'panX',
    wheelY: 'zoomX',
    layout: root.verticalLayout,
    ...customSettings,
  };
  let chartInit: am5xy.XYChart;

  switch (category) {
    case ChartCategories.xy:
      chartInit = am5xy.XYChart.new(root, settings);
      break;
    default:
      chartInit = am5xy.XYChart.new(root, settings);
      break;
  }
  return root?.container?.children.push(chartInit);
};

const LineChartAm: FC = () => {
  const chartId = useId();
  const [amRoot, setAmRoot] = useState<am5.Root>();
  const [chartState, setChartState] = useState<number>(0);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);

    setAmRoot(root);
    // let chart = root.container.children.push(am5xy.XYChart.new(root, {}))
    const chart = initChart(root, ChartCategories.xy);
    console.log(amRoot, chartState, chart);
    return () => {
      root.dispose();
      setChartState(1);
    };
  }, []);

  return <div id={chartId} style={{ width: '100%', height: '500px' }}></div>;
};
export default LineChartAm;
