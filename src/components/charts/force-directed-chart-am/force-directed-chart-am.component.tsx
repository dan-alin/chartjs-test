import { ForceDirectedProps } from '@typings/charts';
import React, { FC, useEffect, useId, useLayoutEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
// import { faker } from "@faker-js/faker";

const ForceDirectedchart: FC<ForceDirectedProps> = ({
  size = 'responsive',
  // customOptions = {},
  customData,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<any>([]);
  //const chartRef = useRef(null);

  const generateLabel = (
    settings: am5.ILabelSettings
  ): Partial<am5.ILabelSettings> => {
    return {
      fontSize: 14,
      //fill: am5.color(0x550000),
      oversizedBehavior: 'truncate',
      breakWords: true,
      textAlign: 'center',
      lineHeight: 1.5,
      populateText: true,
      ...settings,
    };
  };

  useEffect(() => {
    if (customData) {
      setChartData(customData);
    }
  }, [customData]);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);
    const responsive = am5themes_Responsive.new(root);
    responsive.addRule({
      name: 'AxisRendererY',
      relevant: (width) => {
        return width < am5themes_Responsive.XL;
      },
      settings: {
        inside: true,
      },
    });

    const actualThemes: am5.Theme[] = [
      am5themes_Animated.new(root),
      responsive,
    ];
    root.setThemes(actualThemes);
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    const series: am5hierarchy.ForceDirected = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        idField: 'id',
        // minRadius: 10,
        //manyBodyStrength: -40,
        initialFrames: 500,
        showOnFrame: 10,
        velocityDecay: 0.6,
        singleBranchOnly: true,
        downDepth: 10,
        topDepth: 3,
        initialDepth: 1,
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
        manyBodyStrength: -2,
        centerStrength: 0.5,
        nodePadding: 0,
      })
    );
    const circles = series.circles.template;

    circles.setAll({
      fillOpacity: 0.7,
      strokeWidth: 1,
      strokeOpacity: 1,
      scale: 1,
    });

    circles.events.on('click', function (ev) {
      console.log(ev);
      console.log('Clicked on');
    });

    circles.states.create('hover', {
      fillOpacity: 1,
      strokeOpacity: 0,
      strokeDasharray: 0,
      scale: 1.3,
    });

    series.nodes.template.setAll({
      draggable: true,
      toggleKey: 'none',
    });

    const labeSettings: Partial<am5.ILabelSettings> = generateLabel({
      text: '[bold]{category}[/]\n{value}%',
    });

    series.labels.template.setAll(labeSettings);

    series.labels.template.setAll(labeSettings);
    series.data.setAll(chartData);
    // series.set("selectedDataItem", series.dataItems[0]);
    series.appear();

    //chartRef.current = container;

    return () => {
      root.dispose();
    };
  }, [chartId, chartData]);

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <div id={chartId} style={{ width: '100%', height: '1000px' }}></div>
      </div>
    </>
  );
};
export default ForceDirectedchart;
