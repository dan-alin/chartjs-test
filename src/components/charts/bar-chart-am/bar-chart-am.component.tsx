import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import { BarChartProps } from '@typings/charts';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
// import { IXYChartSettings } from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const BarChartAm: FC<BarChartProps> = ({ size = 'responsive', customData }) => {
  const chartId = useId();

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (customData) {
      console.log(chartData);

      setChartData(customData);
    }
  }, [customData]);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        width: am5.percent(80),
      })
    );

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);
    cursor.lineX.set('visible', false);

    const data = [
      {
        country: 'USA',
        value: 2025,
        color: '#0780eb',
      },
      {
        country: 'China',
        value: 1882,
        color: '#ffa33f',
      },
      {
        country: 'Germany',
        value: 1322,
        color: '#22dbbc',
      },
      {
        country: 'UK',
        value: 1122,
        color: '#ff4aad',
      },
      {
        country: 'France',
        value: 1114,
        color: '#882dff',
      },
      {
        country: 'South Korea',
        value: 1400,
        color: '#0ff0ec',
      },
      {
        country: 'Canada',
        value: 641,
        color: '#f0f33f',
      },
    ];

    chart
      .get('colors')
      ?.set('colors', [
        am5.color(0x0780eb),
        am5.color(0xffa33f),
        am5.color(0x22dbbc),
        am5.color(0xff4aad),
        am5.color(0x882dff),
        am5.color(0x0ff0ec),
        am5.color(0xf0f33f),
      ]);

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 25 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'country',
        renderer: xRenderer,
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'country',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.data.setAll(data);

    series.columns.template.adapters.add('fill', function (_fill, target) {
      return chart.get('colors')?.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add('stroke', function (_stroke, target) {
      return chart.get('colors')?.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.appear(1000, 100);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'country',
        layout: root.verticalLayout,
        centerX: am5.p0,
        x: am5.p100,
        fillField: 'color',
        strokeField: 'color',
        paddingLeft: 15,
      })
    );

    legend.data.setAll(data);
    // legend.data.push(series);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <div
          id={chartId}
          className={'bar_chart'}
          style={{ width: '100%', height: '500px' }}
        ></div>
      </div>
    </>
  );
};

export default BarChartAm;
