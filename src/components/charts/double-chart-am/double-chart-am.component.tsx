import { AmCustomOptions } from '@typings/charts';
import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import * as am5percent from '@amcharts/amcharts5/percent';

const DoubleChartAm: FC<any> = ({
  size = 'responsive',
  customOptions,
  customData,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<any[]>([]);
  const windowSize: WindowSize = useWindowSize(true, 100, 60);
  const [chartOptions, setChartOptions] = useState<AmCustomOptions>({
    windowHeight: false,
  });

  useEffect(() => {
    customData && setChartData(customData);
    customOptions && setChartOptions(customOptions);
  }, [customOptions, customData]);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);

    root.setThemes([am5themes_Animated.new(root)]);

    root.numberFormatter.setAll({
      numberFormat: '#,###.#as',
      bigNumberPrefixes: [{ number: 1e3, suffix: 'M' }],
    });

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.verticalLayout,
      })
    );

    // const currentYear = new Date().getFullYear().toString();
    const series = container.children.push(
      am5hierarchy.Pack.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 10,
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
      })
    );

    const maxLevels = 2;
    const maxNodes = 3;
    const maxValue = 100;

    const data = {
      name: 'Root',
      children: [],
    };
    generateLevel(data, '', 0);

    series.data.setAll([data]);
    series.set('selectedDataItem', series.dataItems[0]);

    function generateLevel(data, name: string, level) {
      for (let i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
        const nodeName = name + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i];
        let child: any;
        if (level < maxLevels) {
          child = {
            name: nodeName + level,
          };

          if (level > 0 && Math.random() < 0.5) {
            child.value = Math.round(Math.random() * maxValue);
          } else {
            child.children = [];
            generateLevel(child, nodeName + i, level + 1);
          }
        } else {
          child = {
            name: name + i,
            value: Math.round(Math.random() * maxValue),
          };
        }
        data.children.push(child);
      }

      level++;
      return data;
    }

    //semi circular
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.p50,
        startAngle: 90,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(90),
      })
    );

    const seriesCircle = chart.series.push(
      am5percent.PieSeries.new(root, {
        width: am5.p50,
        startAngle: 90,
        endAngle: 270,
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false,
      })
    );

    seriesCircle.states.create('hidden', {
      startAngle: 180,
      endAngle: 180,
    });

    seriesCircle.slices.template.setAll({
      cornerRadius: 5,
    });

    seriesCircle.ticks.template.setAll({
      forceHidden: true,
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    seriesCircle.data.setAll([
      { value: 10, category: 'One' },
      { value: 9, category: 'Two' },
      { value: 6, category: 'Three' },
      { value: 5, category: 'Four' },
      { value: 4, category: 'Five' },
      { value: 3, category: 'Six' },
      { value: 1, category: 'Seven' },
    ]);

    seriesCircle.appear(1000, 100);

    series.appear(1000);
    // chart.appear(1000, 100);

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

export default DoubleChartAm;
