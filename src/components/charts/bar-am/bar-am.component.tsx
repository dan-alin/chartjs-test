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
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { BarChartData, BarChartOptions, BarChartProps } from '@typings/charts';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';
import { IXYAxis } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';

const BarChart: FC<BarChartProps> = ({
  customData,
  customOptions,
  lines,
  size = 'responsive',
}) => {
  const chartId = useId();
  const windowSize: WindowSize = useWindowSize(true);
  const [chartData, setChartData] = useState<BarChartData[]>([]);
  const [chartOptions, setChartOptions] = useState<BarChartOptions>({
    barType: 'negPositive',
  });
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const series = useRef<am5xy.ColumnSeries>();
  const root = useRef<am5.Root>();
  const dottedGridSettings: am5xy.IGridSettings = {
    strokeDasharray: [5, 2],
    stroke: am5.color('#D1D1D6'),
    strokeWidth: 1,
    opacity: 1,
  };
  const axisStroke = {
    strokeWidth: 1,
    strokeOpacity: 1,
    stroke: am5.color('#d1d1d6'),
  };

  const tooltipStyle = {
    fill: am5.color(0xffffff),
    fillOpacity: 1,
    strokeOpacity: 0,
    shadowColor: am5.color(0x000000),
    shadowBlur: 10,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowOpacity: 0.3,
  };

  useLayoutEffect(() => {
    if (customData) {
      // eventuale parse dei dati fuori dal chart
      setChartData(
        customData.map((barData) => ({
          ...barData,
          date: barData.date ? new Date(barData.date).getTime() : null,
        }))
      );
    }
    if (customOptions) {
      setChartOptions(customOptions);
    }
    if (lines) {
      setSelectedLines(lines);
    }
  }, [customData, customOptions, lines]);

  useLayoutEffect(() => {
    root.current = am5.Root.new(chartId);
    root.current.setThemes([am5themes_Animated.new(root.current)]);

    if (chartData.length > 0 && root.current) {
      root.current.numberFormatter.set('numberFormat', '#,###.00');
      console.log('data', chartData);
      const chart = root.current.container.children.push(
        am5xy.XYChart.new(root.current, {
          panX: false,
          panY: false,
          wheelX: 'none',
          wheelY: 'none',
        })
      );

      let xAxis: IXYAxis;
      let yAxis:
        | am5xy.ValueAxis<am5xy.AxisRenderer>
        | am5xy.CategoryAxis<am5xy.AxisRenderer>;

      let columsSettings: Partial<am5.IRoundedRectangleSettings>;
      const dataProps: { [key: string]: string } = {
        x: 'valueX',
        y: 'valueY',
        category: '',
      };

      //INIT AXES ---------------------------
      switch (chartOptions.barType) {
        case 'negPositive':
          dataProps.x = 'date';

          xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root.current, {
              groupData: false,
              dateFormats: {
                day: 'dd/MM/yy',
                week: 'dd/MM/yy',
                mont: 'MM/yy',
                year: 'yyyy',
              },
              markUnitChange: false,
              baseInterval: {
                timeUnit: 'day',
                count: 2,
              },
              renderer: am5xy.AxisRendererX.new(root.current, axisStroke),
            })
          );

          yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root.current, {
              numberFormat: '#.00p', // p is percentage
              renderer: am5xy.AxisRendererY.new(root.current, {
                ...axisStroke,
                opposite: true,
              }),
            })
          );
          yAxis.get('renderer').grid.template.setAll(dottedGridSettings);

          columsSettings = {
            width: am5.percent(90),
            strokeOpacity: 0,
            fillOpacity: 0.5,
          };
          break;

        case 'lines':
          dataProps.x = '';
          dataProps.category = 'valueX';

          xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root.current, {
              categoryField: 'valueX',
              renderer: am5xy.AxisRendererX.new(root.current, {}),
            })
          );

          xAxis.get('renderer').labels.template.setAll({
            visible: false,
          });

          yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root.current, {
              renderer: am5xy.AxisRendererY.new(root.current, {}),
              numberFormat: '#p',
            })
          );
          columsSettings = {
            width: am5.percent(100),
            strokeWidth: 3,
            stroke: am5.color('#ffffff'),
            strokeOpacity: 0.2,
            fillOpacity: 0.2,
          };

          xAxis.data.setAll(chartData);
          yAxis.get('renderer').grid.template.setAll(dottedGridSettings);

          break;
        case 'horizontal':
          dataProps.y = '';
          dataProps.category = 'valueY';

          yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root.current, {
              categoryField: 'valueY',
              renderer: am5xy.AxisRendererY.new(root.current, {}),
            })
          );
          yAxis.data.setAll(chartData);
          xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root.current, {
              renderer: am5xy.AxisRendererX.new(root.current, {}),
              //verificare
              min: -25,
              max: 25,
            })
          );

          xAxis.get('renderer').labels.template.setAll({
            visible: false,
          });
          yAxis.get('renderer').labels.template.setAll({
            visible: false,
          });

          columsSettings = {
            height: 11,
            strokeOpacity: 0,
          };

          yAxis.get('renderer').grid.template.set('forceHidden', true);
          break;
      }

      //INIT SERIES ---------------------------
      series.current = chart.series.push(
        am5xy.ColumnSeries.new(root.current, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: dataProps.x,
          valueYField: dataProps.y,
          categoryYField: dataProps.category,
          categoryXField: dataProps.category,
        })
      );

      series.current.columns.template.setAll(columsSettings);

      //INIT TOOLTIPS, SELECTION AND FILLS ---------------------------
      const tooltip = am5.Tooltip.new(root.current, {
        getFillFromSprite: false,
      });
      tooltip.get('background')?.setAll(tooltipStyle);

      switch (chartOptions.barType) {
        case 'negPositive':
          // series.set('tooltip', tooltip);
          series.current.columns.template.setAll({
            tooltipHTML: '{valueY} %',
            tooltipY: -5,
            tooltip,
          });
          series.current.columns.template.adapters.add(
            'fillGradient',
            (_, target) =>
              am5.LinearGradient.new(
                target.root,
                fillPositiveNegativeGradient(target, 'valueY')
              )
          );

          series.current.columns.template.set('interactive', true);
          series.current.columns.template.states.create('hover', {
            fillOpacity: 1,
          });
          break;

        case 'lines':
          series.current.columns.template.adapters.add(
            'fill',
            (fill: am5.Color | undefined, target: am5.RoundedRectangle) => {
              const data = target.dataItem?.dataContext as BarChartData;
              return data && data.color ? am5.color(data.color) : fill;
            }
          );

          series.current.columns.template.events.on('click', function (ev) {
            const data = ev.target.dataItem?.dataContext as BarChartData;
            const lineName = data.valueX as string;
            setSelectedLines((lines) => {
              return !lines?.includes(lineName)
                ? [...lines, lineName]
                : lines.filter((line) => line !== lineName);
            });
          });
          break;
        case 'horizontal':
          series.current.columns.template.adapters.add(
            'fill',
            (fill: am5.Color | undefined, target: am5.RoundedRectangle) =>
              fillPositiveNegative(fill, target, 'valueX')
          );
          break;
      }

      xAxis.get('renderer').grid.template.set('forceHidden', true);

      const cursor = chart.set('cursor', am5xy.XYCursor.new(root.current, {}));
      cursor.lineY.set('visible', false);
      cursor.lineX.set('visible', false);

      series.current.data.setAll(chartData);
      series.current.appear(1000);

      if (!chartOptions?.hideLegend) {
        const legend = chart.children.push(
          am5.Legend.new(root.current, {
            nameField: 'line',
            layout: root.current.verticalLayout,
            centerX: am5.p0,
            x: am5.p100,
            fillField: 'color',
            strokeField: 'color',
            paddingLeft: 15,
          })
        );

        legend.data.setAll(chartData);
      }

      chart.appear(1000);
    }

    return () => {
      root.current?.dispose();
    };
  }, [chartData, chartId, chartOptions]);

  useEffect(() => {
    if (series.current && root.current) {
      series.current.columns.template.states.create('selected', {
        fillOpacity: 1,
      });
      series.current.columns.template.states.create('default', {
        fillOpacity: 0.2,
      });

      series.current.columns.each((column) => {
        const data = column.dataItem?.dataContext as BarChartData;
        const lineTooltip = am5.Tooltip.new(column.root, {
          getFillFromSprite: false,
          //minWidth: 180,
        });
        lineTooltip.get('background')?.setAll(tooltipStyle);
        column.setAll({
          tooltip: lineTooltip,
          showTooltipOn: 'always',
          tooltipY: -5,
          tooltipHTML: `<div>
            <div style='text-align:center;'>
              <div style='margin-bottom:10px;'>{lineData.line}</div>
              <div style='margin-bottom:10px;'>{lineData.family}</div>
            </div>
            <div style='text-align:right;'>
              <div style='margin-bottom:10px;'>{lineData.total} <span style="color:#7D7D7D;">&euro;</span></div>
              <div style='margin-bottom:10px;'>{valueY} <span style="color:#7D7D7D;">%</span></div>
              <div style='margin-bottom:10px;font-weight:bold;'>{lineData.trend} %</div>
            </div>
          </div>`,
        });
        if (selectedLines.indexOf(data.valueX as string) >= 0) {
          column.states.applyAnimate('selected');
          column.set('showTooltipOn', 'always');
        } else {
          column.states.apply('default');
          column.states.remove('selected');
          column.set('showTooltipOn', 'hover');
        }
      });
    }
  }, [selectedLines]);

  function fillPositiveNegative(
    fill: am5.Color | undefined,
    target: am5.RoundedRectangle,
    prop: keyof BarChartData
  ): am5.Color | undefined {
    const data = target.dataItem?.dataContext as BarChartData;
    let color: am5.Color | undefined = fill;
    if (data && data[prop]) {
      color = am5.color((data[prop] as number) < 0 ? '#ee3054' : '#1E8927');
    }
    return color;
  }

  function fillPositiveNegativeGradient(
    target: am5.RoundedRectangle,
    prop: keyof BarChartData
  ): am5.ILinearGradientSettings {
    const data = target.dataItem?.dataContext as BarChartData;
    let color = '#39B2E9';
    let isNegative = false;
    if (data && data[prop]) {
      isNegative = (data[prop] as number) < 0;
      color = isNegative ? '#fc646c' : '#39B2E9';
    }
    return {
      stops: [
        {
          color: am5.color(color),
          offset: 0.6,
        },
        {
          color: am5.color(isNegative ? '#f879f6' : color),
        },
      ],
      rotation: 90,
    };
  }

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <div
          id={chartId}
          className={'bar_chart'}
          style={
            chartOptions.windowHeight
              ? { height: windowSize.height }
              : undefined
          }
        ></div>
      </div>
    </>
  );
};

export default BarChart;
