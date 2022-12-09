import React, {
  FC,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { IDateAxisDataItem, IXYChartSettings } from '@amcharts/amcharts5/xy';
import { AmCustomOptions, LineData, LineChartAmProps } from '@typings/charts';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import '../charts.style.scss';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';
import customChartEvent from 'src/utils/webview/custom-events';
import { WebviewActions, WebviewCharts } from 'src/models/events.model';
import { DataItem } from '@amcharts/amcharts5';
import { LineToggleShow } from '@typings/chartEvents';

// INIT functions -----
const initChart = (
  root: am5.Root,
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
  const chartInit: am5xy.XYChart = am5xy.XYChart.new(root, settings);
  return root?.container?.children.push(chartInit);
};

const initButton = (root: am5.Root, width: number): am5.Button => {
  const rangeButton = am5.Button.new(root, {
    themeTags: ['resize', 'horizontal'],
    icon: am5.Graphics.new(root, {
      themeTags: ['icon'],
    }),
  });
  rangeButton.adapters.add('y', function () {
    return 0;
  });
  rangeButton.adapters.add('x', function (x) {
    return Math.max(0, Math.min(width, x as number));
  });
  return rangeButton;
};
// -----

const LineChartAm: FC<LineChartAmProps> = ({
  size = 'responsive',
  customOptions,
  customData,
  rangeDrag,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<LineData[][]>([]);
  const windowSize: WindowSize = useWindowSize(true);
  const [chartOptions, setChartOptions] = useState<AmCustomOptions>({
    windowHeight: false,
  });
  const [showRange, setShowRange] = useState<boolean | undefined>(false);
  const [showEvents, setShowEvents] = useState<boolean | undefined>(false);
  const root = useRef<am5.Root>();
  const chart = useRef<am5xy.XYChart>();
  const series = useRef<am5xy.LineSeries>();
  const xAxis = useRef<am5xy.DateAxis<am5xy.AxisRenderer>>();
  const ranges = useRef<am5.DataItem<am5xy.IDateAxisDataItem>[]>([]);
  const eventsRanges = useRef<am5.DataItem<am5xy.IDateAxisDataItem>[]>([]);

  useEffect(() => {
    if (customData) {
      setChartData(customData);
    }
    if (customOptions) {
      setChartOptions(customOptions);
      setShowRange(customOptions.showRange);
      setShowEvents(customOptions.showEvents);
      if (customOptions.isWebview) {
        customChartEvent.listen(
          WebviewCharts.LINE,
          WebviewActions.SHOWRANGE,
          (data) => {
            setShowRange((data as CustomEvent<LineToggleShow>).detail.show);
          }
        );
        customChartEvent.listen(
          WebviewCharts.LINE,
          WebviewActions.SHOWEVENTS,
          (data) => {
            setShowEvents((data as CustomEvent<LineToggleShow>).detail.show);
          }
        );
      }
    }
  }, [customOptions, customData]);

  useLayoutEffect(() => {
    root.current = am5.Root.new(chartId);
    root.current.setThemes([am5themes_Animated.new(root.current)]);
    if (chartData.length > 0) {
      console.log(chartData);
      chart.current = initChart(root.current);

      //cursor
      const cursor = chart.current.set(
        'cursor',
        am5xy.XYCursor.new(root.current, {})
      );
      cursor.lineX.set('forceHidden', true);
      cursor.lineY.set('forceHidden', true);

      //axes generation
      xAxis.current = chart.current.xAxes.push(
        am5xy.DateAxis.new(root.current, {
          groupData: true,
          baseInterval: {
            timeUnit: 'day',
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root.current, {}),
        })
      );

      const yAxis = chart.current.yAxes.push(
        am5xy.ValueAxis.new(root.current, {
          renderer: am5xy.AxisRendererY.new(root.current, {}),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      chartData.forEach((data: LineData[]) => {
        if (chart.current && root.current && xAxis.current) {
          series.current = chart.current.series.push(
            am5xy.LineSeries.new(root.current, {
              name: 'Series',
              xAxis: xAxis.current,
              yAxis: yAxis,
              valueYField: 'value',
              valueXField: 'date',
            })
          );

          series.current.fills.template.setAll({
            fillOpacity: 0.1,
            visible: true,
          });
          series.current.data.setAll(data);
          series.current.appear(1000);
        }
      });

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.current.appear(1000, 100);
    }

    return () => {
      root.current?.dispose();
    };
  }, [chartId, chartData]);

  useEffect(() => {
    if (root.current && chart.current && series.current && xAxis.current) {
      const chartRoot = root.current;
      const color = chartRoot.interfaceColors.get('primaryButton');
      const plotWidth = chart.current.plotContainer.width();
      const xAxisRange: am5xy.DateAxis<am5xy.AxisRenderer> = xAxis.current;

      if (showRange) {
        createRange();
        const axisFill = ranges.current[0].get('axisFill');

        //RANGE BUTTONS with bullets
        const rangeButtons = [
          initButton(chartRoot, plotWidth),
          initButton(chartRoot, plotWidth),
        ];

        ranges.current.forEach((range, index) => {
          range.get('grid')?.setAll({
            strokeOpacity: 1,
            stroke: color as am5.Color,
          });
          const bulletOptions: am5xy.IAxisBulletSettings = {
            sprite: rangeButtons[index],
          };
          if (index === 0) {
            bulletOptions.location = 0;
          }
          range.set('bullet', am5xy.AxisBullet.new(chartRoot, bulletOptions));
        });

        rangeButtons.forEach((button, index) => {
          button.events.on('dragged', function () {
            const value = axisRangeDrag(button, xAxisRange, plotWidth);
            ranges.current[index].set('value', value);
            ranges.current[0].set('endValue', ranges.current[1].get('value'));
          });
          button.events.on('dragstop', function () {
            rangeEvent(
              WebviewActions.DRAGSTOP,
              ranges.current[0].get('value') as number,
              ranges.current[1].get('value') as number
            );
          });
        });

        // AXIS fill and events
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
          const value = axisRangeDrag(
            rangeButtons[0],
            xAxisRange,
            plotWidth,
            dx
          );
          const endValue = axisRangeDrag(
            rangeButtons[1],
            xAxisRange,
            plotWidth,
            dx,
            axisFill.width()
          );
          ranges.current[0].setAll({ value, endValue });
          ranges.current[1].set('value', endValue);
          rangeEvent(WebviewActions.DRAGSTOP, value, endValue);
          axisFill?.set('x', 0);
        });

        rangeEvent(
          WebviewActions.DRAGSTOP,
          ranges.current[0].get('value') as number,
          ranges.current[1].get('value') as number
        );
      } else {
        // REMOVE range
        ranges.current?.forEach((range) => {
          xAxisRange.axisRanges.removeValue(range);
        });
        //xAxisRange.axisRanges.clear()
      }
    }
  }, [showRange]);

  useEffect(() => {
    if (root.current && chart.current && series.current && xAxis.current) {
      //const color = chartRoot.interfaceColors.get('primaryButton');
      const xAxisRange: am5xy.DateAxis<am5xy.AxisRenderer> = xAxis.current;
      const chartRoot = root.current;
      const color = chartRoot.interfaceColors.get('primaryButton');
      if (showEvents) {
        series.current.dataItems.forEach((serie) => {
          const lineData = serie.dataContext as LineData;
          if (lineData.isEvent) {
            const dataItem: DataItem<IDateAxisDataItem> =
              xAxisRange.createAxisRange(
                xAxisRange.makeDataItem({
                  value: lineData.date,
                })
              );
            dataItem.get('grid')?.setAll({
              strokeOpacity: 1,
              stroke: color as am5.Color,
            });
            eventsRanges.current = [...eventsRanges.current, dataItem];
          }
        });
      } else {
        // REMOVE events
        eventsRanges.current.forEach((range) => {
          xAxisRange.axisRanges.removeValue(range);
        });
      }
    }
  }, [showEvents]);

  function createRange() {
    if (series.current && xAxis.current) {
      const rangeTime1 = (series.current.dataItems[0].dataContext as LineData)
        .date;
      const rangeTime2 = (
        series.current.dataItems[series.current.dataItems.length - 1]
          .dataContext as LineData
      ).date;
      ranges.current = [
        xAxis.current.createAxisRange(
          xAxis.current.makeDataItem({
            value: rangeTime1,
            endValue: rangeTime2,
          })
        ),
        xAxis.current.createAxisRange(
          xAxis.current.makeDataItem({ value: rangeTime2 })
        ),
      ];
    }
  }

  function axisRangeDrag(
    button: am5.Button,
    axis: am5xy.DateAxis<am5xy.AxisRenderer>,
    plotWidth: number,
    dx = 0,
    dposition = 0
  ): number {
    const x = button.x() + dx;
    const position = axis.toAxisPosition((x + dposition) / plotWidth);
    const value = axis.positionToValue(position);
    return value;
  }

  function rangeEvent(
    action: WebviewActions,
    firstValue: number,
    secondValue: number
  ) {
    let detail;
    if (firstValue < secondValue) {
      detail = {
        firstValue: firstValue,
        secondValue: secondValue,
      };
    } else {
      detail = {
        firstValue: secondValue,
        secondValue: firstValue,
      };
    }
    customChartEvent.dispatch(
      WebviewCharts.LINE,
      action ? action : WebviewActions.DRAGSTOP,
      detail
    );
    if (rangeDrag) {
      rangeDrag(WebviewCharts.LINE, detail);
    }
  }

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
