import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { IXYChartSettings } from '@amcharts/amcharts5/xy';
import {
  AmCustomOptions,
  LineAreaData,
  LineChartAmProps,
} from '@typings/charts';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import '../charts.style.scss';
import { chartEvents } from 'src/models/events.model';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';
import customChartEvent from 'src/utils/webview/custom-events';
import { DRangeEvent } from '@typings/chartEvents';
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

const initButton = (root: am5.Root, width: number): am5.Button => {
  const resizeButton = am5.Button.new(root, {
    themeTags: ['resize', 'horizontal'],
    icon: am5.Graphics.new(root, {
      themeTags: ['icon'],
    }),
  });
  resizeButton.adapters.add('y', function () {
    return 0;
  });
  resizeButton.adapters.add('x', function (x) {
    return Math.max(0, Math.min(width, x as number));
  });
  return resizeButton;
};

const rangeEvent = (rangeEvent: DRangeEvent) => {
  const detail = {
    action: rangeEvent.action,
    firstValue: rangeEvent.firstValue,
    secondValue: rangeEvent.secondValue,
  };
  customChartEvent.dispatch(
    rangeEvent.label ? rangeEvent.label : chartEvents.LINEAREA_DRAGSTOP,
    detail
  );
};

const LineChartAm: FC<LineChartAmProps> = ({
  size = 'responsive',
  customOptions,
  customData,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<LineAreaData[]>([]);
  const windowSize: WindowSize = useWindowSize(true, 100, 60);
  const [chartOptions, setChartOptions] = useState<AmCustomOptions>({
    windowHeight: false,
  });

  useEffect(() => {
    if (customData) {
      setChartData(customData);
    }
    if (customOptions) {
      setChartOptions(customOptions);
    }
  }, [customOptions, customData]);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = initChart(root, ChartCategories.xy);

    //cursor
    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineX.set('forceHidden', true);
    cursor.lineY.set('forceHidden', true);

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    //generate date
    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, 'day', 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count: number) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    //axes generation
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.fills.template.setAll({
      fillOpacity: 0.1,
      visible: true,
    });

    // chart.set(
    //   'scrollbarX',
    //   am5.Scrollbar.new(root, {
    //     orientation: 'horizontal',
    //   })
    // );

    // Set data
    const data = generateDatas(1200);

    series.data.setAll(data);

    const rangeDate = new Date();
    am5.time.add(rangeDate, 'day', Math.round(series.dataItems.length / 2));
    const rangeTime1 = rangeDate.getTime() - am5.time.getDuration('day') * 20;
    const rangeTime2 = rangeDate.getTime() + am5.time.getDuration('day') * 20;

    const color = root.interfaceColors.get('primaryButton');

    // add axis range 1
    const range1 = xAxis.createAxisRange(xAxis.makeDataItem({}));

    range1.setAll({ value: rangeTime1, endValue: rangeTime2 });

    rangeEvent({
      firstValue: rangeTime1,
      secondValue: rangeTime2,
      label: chartEvents.LINEAREA,
      action: 'Initial range',
    });

    range1?.get('grid')?.setAll({
      strokeOpacity: 1,
      stroke: color as am5.Color,
    });

    const axisFill = range1.get('axisFill');
    axisFill?.setAll({
      fillOpacity: 0.15,
      fill: color as am5.Color,
      visible: true,
      draggable: true,
    });

    axisFill?.adapters.add('y', function () {
      return 0;
    });

    axisFill?.events.on('dragstop', function () {
      const dx = axisFill?.x();
      const value = axisRangeDrag(resizeButton1, dx);
      const endValue = axisRangeDrag(resizeButton1, dx, axisFill.width());
      range1.setAll({ value, endValue });
      range2.set('value', endValue);

      rangeEvent({
        firstValue: value,
        secondValue: endValue,
        label: chartEvents.LINEAREA_DRAGSTOP,
        action: 'Drag both axis',
      });
      axisFill?.set('x', 0);
    });

    //Resize button 1
    const resizeButton1 = initButton(root, chart.plotContainer.width());

    resizeButton1.events.on('dragged', function () {
      const value = axisRangeDrag(resizeButton1);
      range1.set('value', value);
    });

    resizeButton1.events.on('dragstop', function () {
      rangeEvent({
        firstValue: range1.get('value') as number,
        label: chartEvents.LINEAREA_DRAGSTOP,
        action: 'range button 1 dragstop',
      });
    });

    range1.set(
      'bullet',
      am5xy.AxisBullet.new(root, {
        location: 0,
        sprite: resizeButton1,
      })
    );

    const range2 = xAxis.createAxisRange(xAxis.makeDataItem({}));

    range2.set('value', rangeTime2);
    range2.get('grid')?.setAll({
      strokeOpacity: 1,
      stroke: color as am5.Color,
    });

    //Resize button 2
    const resizeButton2 = initButton(root, chart.plotContainer.width());

    // change range when x changes
    resizeButton2.events.on('dragged', function () {
      const value = axisRangeDrag(resizeButton2);
      range2.set('value', value);
      range1.set('endValue', value);
    });

    resizeButton2.events.on('dragstop', function () {
      rangeEvent({
        secondValue: range2.get('value') as number,
        label: chartEvents.LINEAREA_DRAGSTOP,
        action: 'range button 2 dragstop',
      });
    });

    // set bullet for the range
    range2.set(
      'bullet',
      am5xy.AxisBullet.new(root, {
        sprite: resizeButton2,
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    function axisRangeDrag(
      button: am5.Button,
      dx = 0,
      dposition = 0,
      axis: am5xy.DateAxis<am5xy.AxisRenderer> = xAxis
    ): number {
      const x = button.x() + dx;
      const position = axis.toAxisPosition(
        (x + dposition) / chart.plotContainer.width()
      );
      const value = axis.positionToValue(position);
      return value;
    }

    return () => {
      root.dispose();
    };
  }, [chartId, chartData, customData]);

  return (
    <div className={`chart__container chart__container--${size}`}>
      <div
        id={chartId}
        className={'am_chart linearea_chart '}
        style={
          chartOptions.windowHeight ? { height: windowSize.height } : undefined
        }
      ></div>
    </div>
  );
};
export default LineChartAm;
