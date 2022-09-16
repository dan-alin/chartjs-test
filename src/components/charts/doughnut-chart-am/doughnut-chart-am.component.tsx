import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {
  AmCustomOptions,
  AmDoughnutProps,
  DoughnutData,
} from '@typings/charts';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';

const DoughnutChartAM: FC<AmDoughnutProps> = ({
  size = 'responsive',
  customData,
  customOptions = {},
}) => {
  const chartId = useId();
  const windowSize: WindowSize = useWindowSize(true, 100, 60);

  const [chartData, setChartData] = useState<DoughnutData[]>([]);
  const [chartOptions, setChartOptions] = useState<AmCustomOptions>({
    hideLegend: true,
  });
  //const chartRef = useRef(null);
  useEffect(() => {
    if (customOptions) {
      if (customData) {
        setChartData(customData);
      }
      console.log('options', customOptions);
      setChartOptions(customOptions);
    }
  }, [customOptions, customData]);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);
    console.log('*** window size ***', windowSize);

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
    console.log(root.container.children);

    // SERIES
    const series = container.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Sales',
        categoryField: 'name',
        fillField: 'color',
        valueField: 'value',
        alignLabels: false,
        legendLabelText: '{category}',
        legendValueText:
          "[{color}][fontSize: 18px]{valuePercentTotal.formatNumber('#.00')}%[/][/]",
      })
    );

    series.labels.template.setAll({
      textType: 'circular',
      centerX: 0,
      centerY: 0,
    });

    series.slices.template.setAll({
      tooltipText: '',
    });
    series.slices.template.set('strokeOpacity', 0);

    // Disabling labels and ticks
    //series.labels.template.set("visible", false);
    series.ticks.template.set('visible', false);

    series.slices.template.adapters.add(
      'fillGradient',
      (value: am5.Gradient | undefined, target: am5.Slice) => {
        if (target && target.dataItem?.dataContext) {
          const item = target.dataItem?.dataContext as DoughnutData;
          let gradient = value;
          if (item.value > 20) {
            gradient = am5.LinearGradient.new(root, {
              stops: [
                {
                  brighten: 0,
                },
                {
                  brighten: 0.4,
                },
              ],
              rotation: 0,
            });
          }
          return gradient;
        }
      }
    );

    series.data.setAll(customData);

    if (chartOptions && !chartOptions.hideLegend) {
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      const legend = container.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: root.verticalLayout,
          marginTop: 30,
        })
      );

      // set value labels align to right
      legend.valueLabels.template.setAll({ textAlign: 'right' });
      // set width and max width of labels
      legend.labels.template.setAll({
        maxWidth: 140,
        width: 140,
        oversizedBehavior: 'wrap',
      });

      legend.data.setAll(series.dataItems);
    }

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartId, chartData, chartOptions, windowSize]);

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
