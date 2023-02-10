import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {
  AmDoughnutProps,
  DoughnutData,
  DoughnutOptions,
} from '@typings/charts';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';
import customChartEvent from 'src/utils/webview/custom-events';
import { WebviewActions, WebviewCharts } from 'src/models/events.model';

const DoughnutChartAM: FC<AmDoughnutProps> = ({
  size = 'responsive',
  customData,
  customOptions,
  sliceSelect,
}) => {
  const chartId = useId();
  const windowSize: WindowSize = useWindowSize(true);
  const [chartData, setChartData] = useState<DoughnutData[]>([]);
  const [chartOptions, setChartOptions] = useState<DoughnutOptions>({
    hideLegend: true,
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

    // THEME CHART
    const actualThemes: am5.Theme[] = [am5themes_Animated.new(root)];
    root.setThemes(actualThemes);

    const container = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(80),
        innerRadius: am5.percent(70),
      })
    );
    // -----

    // SERIES
    const series = container.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        categoryField: 'description',
        fillField: 'color',
        valueField: 'percentage',
        alignLabels: false,
        legendLabelText:
          "[#837D87][fontSize: 16px]{category}[/][/]\n[{color}][fontSize: 32px]{valuePercentTotal.formatNumber('#.00')}%[/][/]",
        legendValueText: '',
      })
    );

    series.slices.template.setAll({
      tooltipText: '',
      stroke: am5.color(0xffffff),
      strokeWidth: 4,
    });

    series.slices.template.adapters.add(
      'fill',
      (value: am5.Color | undefined, target: am5.Slice) => {
        let color = value;
        if (target) {
          const dataItem = target.dataItem?.dataContext as DoughnutData;
          color =
            dataItem && dataItem.color ? am5.color(dataItem.color) : value;
        }
        return color;
      }
    );

    series.labels.template.set('visible', false);
    series.ticks.template.set('visible', false);

    const fixedPiecePie: Partial<am5.ISliceSettings> = {
      shiftRadius: 0,
      scale: 1,
    };

    series.slices.template.states.create('active', fixedPiecePie);
    series.slices.template.states.create('hover', fixedPiecePie);
    series.slices.template.states.create('hoverActive', fixedPiecePie);

    if (chartOptions.rotateFocus) {
      series.slices.template.events.on('click', function (e) {
        selectSlice(e.target);
      });
    }
    series.data.setAll(chartData);

    if (chartOptions && !chartOptions.hideLegend) {
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/

      let legendCoordinates = {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        x: am5.percent(10),
        y: am5.percent(50),
      };

      switch (chartOptions.legendPosition) {
        case 'left':
          legendCoordinates = {
            ...legendCoordinates,
            x: am5.percent(10),
            y: am5.percent(50),
          };
          break;
        case 'right':
          legendCoordinates = {
            ...legendCoordinates,
            x: am5.percent(90),
            y: am5.percent(50),
          };
          break;
        case 'top':
          legendCoordinates = {
            ...legendCoordinates,
            x: am5.percent(50),
            y: am5.percent(0),
          };
          break;
        case 'bottom':
          legendCoordinates = {
            ...legendCoordinates,
            x: am5.percent(50),
            y: am5.percent(100),
          };
          break;
        default:
          break;
      }

      console.log('legend', legendCoordinates);

      const legend = container.children.push(
        am5.Legend.new(root, {
          ...legendCoordinates,
          layout: root.verticalLayout,
          marginTop: 30,
        })
      );

      // set value labels align to right
      legend.valueLabels.template.setAll({ textAlign: 'right' });
      // set width and max width of labels
      legend.labels.template.setAll({
        oversizedBehavior: 'wrap',
        textAlign: 'left',
        textBaseline: 'middle',
      });

      legend.markers.template.setAll({
        width: 6,
        height: 56,
      });

      legend.data.setAll(series.dataItems);
    }

    if (chartOptions.rotateFocus) {
      const maxSlice = [...series.slices.values].reduce(function (
        prev,
        current
      ) {
        return (prev.dataItem?.dataContext as DoughnutData).percentage >
          (current.dataItem?.dataContext as DoughnutData).percentage
          ? prev
          : current;
      }); //returns object

      series.events.on('datavalidated', function () {
        selectSlice(maxSlice, 0);
      });
    }

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    container.appear(500, 10);

    function selectSlice(slice: am5.Slice, duration = 1000) {
      const sliceData = slice?.dataItem?.dataContext as DoughnutData;
      const startAngle = slice.get('startAngle') || 1;
      const arc = slice.get('arc') || 1;
      const middleAngle = startAngle + arc / 2;
      const firstAngle = series.dataItems[0].get('slice').get('startAngle');
      if (firstAngle && middleAngle) {
        series.animate({
          key: 'startAngle',
          to: firstAngle - middleAngle,
          duration: duration,
          easing: am5.ease.out(am5.ease.cubic),
        });
        series.animate({
          key: 'endAngle',
          to: firstAngle - middleAngle + 360,
          duration: duration,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
      customChartEvent.dispatch(
        WebviewCharts.DOUGHNUT,
        WebviewActions.SLICEFOCUS,
        {
          description: sliceData.description,
        }
      );
      if (sliceSelect) {
        sliceSelect({
          description: sliceData.description,
        });
      }
    }

    return () => {
      root.dispose();
    };
  }, [chartId, chartData, chartOptions, sliceSelect]);

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <div
          id={chartId}
          className={'am_chart doughnut_chart'}
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
export default DoughnutChartAM;
