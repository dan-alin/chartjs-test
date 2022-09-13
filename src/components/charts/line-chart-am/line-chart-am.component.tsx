import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { IXYChartSettings } from '@amcharts/amcharts5/xy';
import { LineChartAmProps } from '@typings/charts';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import '../charts.style.scss';
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

const LineChartAm: FC<LineChartAmProps> = ({
  size = 'responsive',
  // customOptions = {},
  customData,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<any>(null);
  console.log(chartData);
  useEffect(() => {
    if (customData) {
      setChartData(customData);
    }
  }, [customData]);

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

    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //   orientation: "horizontal"
    // }));

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

    range1.set('value', rangeTime1);
    range1.set('endValue', rangeTime2);

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
      const x = resizeButton1.x() + dx;
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());
      const endPosition = xAxis.toAxisPosition(
        (x + axisFill.width()) / chart.plotContainer.width()
      );

      const value = xAxis.positionToValue(position);
      const endValue = xAxis.positionToValue(endPosition);

      range1.set('value', value);
      range1.set('endValue', endValue);
      range2.set('value', endValue);

      axisFill?.set('x', 0);
    });

    const resizeButton1 = am5.Button.new(root, {
      themeTags: ['resize', 'horizontal'],
      icon: am5.Graphics.new(root, {
        themeTags: ['icon'],
      }),
    });

    resizeButton1.adapters.add('y', function () {
      return 0;
    });

    resizeButton1.adapters.add('x', function (x) {
      return Math.max(0, Math.min(chart.plotContainer.width(), x as number));
    });

    resizeButton1.events.on('dragged', function () {
      const x = resizeButton1.x();
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());

      const value = xAxis.positionToValue(position);

      range1.set('value', value);
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

    const resizeButton2 = am5.Button.new(root, {
      themeTags: ['resize', 'horizontal'],
      icon: am5.Graphics.new(root, {
        themeTags: ['icon'],
      }),
    });

    // restrict from being dragged vertically
    resizeButton2.adapters.add('y', function () {
      return 0;
    });

    // restrict from being dragged outside of plot
    resizeButton2.adapters.add('x', function (x) {
      return Math.max(0, Math.min(chart.plotContainer.width(), x as number));
    });

    // change range when x changes
    resizeButton2.events.on('dragged', function () {
      const x = resizeButton2.x();
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());

      const value = xAxis.positionToValue(position);

      range2.set('value', value);

      range1.set('endValue', value);
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

    return () => {
      root.dispose();
      // setChartState(1);
    };
  }, []);

  return (
    <div className={`chart__container chart__container--${size}`}>
      <div id={chartId} className={'am_chart force_chart'}></div>
    </div>
  );
};
export default LineChartAm;
