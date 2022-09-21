import {
  AmCustomOptions,
  ForceDirected,
  ForceDirectedData,
  ForceDirectedProps,
} from '@typings/charts';
import React, { FC, useEffect, useId, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import { Color } from '@amcharts/amcharts5';
import { GroupsColors } from 'src/utils/configurations/chart-config';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';
import customChartEvent from 'src/utils/webview/custom-events';
import { chartEvents } from 'src/models/events.model';
import { ChartEventData } from '@typings/chartEvents';
// import { faker } from "@faker-js/faker";

const ForceDirectedChart: FC<ForceDirectedProps> = ({
  size = 'responsive',
  customData,
  customOptions,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<ForceDirected>({
    value: 0,
    children: [],
  });
  const windowSize: WindowSize = useWindowSize(true, 100, 60);
  const [chartOptions, setChartOptions] = useState<AmCustomOptions>({});

  //const chartRef = useRef(null);

  const generateLabel = (
    settings: am5.ILabelSettings
  ): Partial<am5.ILabelSettings> => {
    return {
      fontSize: 11,
      oversizedBehavior: 'truncate',
      breakWords: true,
      textAlign: 'center',
      lineHeight: 1.5,
      populateText: true,
      ...settings,
    };
  };

  const groupFilter = useRef('all');

  const changeGroupFilter = (group: string, dispatch = false) => {
    groupFilter.current = group;
    setChartData({
      ...chartData,
      children: customData.children.filter((circle) =>
        groupFilter.current === 'all'
          ? true
          : circle.type === groupFilter.current
      ),
    });

    if (dispatch) {
      customChartEvent.dispatch(chartEvents.FILTER, {
        action: 'Force directed group filter',
        group: groupFilter.current,
      });
    }
  };

  const changeGroupListener = (data: ChartEventData) => {
    if (data) {
      console.log('filter group', data);
      changeGroupFilter(data.detail.group);
    }
  };

  customChartEvent.listen(chartEvents.FILTER, changeGroupListener);

  useEffect(() => {
    if (customData) {
      setChartData(customData);
    }
    if (customOptions) {
      setChartOptions(customOptions);
    }
  }, [customData, customOptions]);

  useEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);

    // THEME CHART
    const responsive = am5themes_Responsive.new(root);
    responsive.addRule({
      name: 'AxisRendererY',
      relevant: (width) => {
        return width < am5themes_Responsive.XL;
      },
      applying: function () {
        series.labels.template.setAll({
          fontSize: 8,
          text: '[fontSize: 10px]+{sum}%[/]\n[bold]{type}[/]',
        });
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
    // -----

    // SERIES
    const series: am5hierarchy.ForceDirected = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        idField: 'id',
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
        initialFrames: 200,
        showOnFrame: 3,
        velocityDecay: 0.4,
        initialDepth: 1,
        downDepth: 3,
        topDepth: 1,
        manyBodyStrength: 0.1,
        centerStrength: 0.1,
        nodePadding: 0,
        minRadius: 5,
        maxRadius: am5.percent(5),
      })
    );
    const labeSettings: Partial<am5.ILabelSettings> = generateLabel({
      text: '[fontSize: 14px]+{sum}%[/]\n[bold]{type}[/]\n{category}',
      oversizedBehavior: 'fit',
      minScale: 5,
      lineHeight: 1.2,
      layer: 100000,
    });

    series.events.on(
      'pointerover',
      (
        event: am5.ISpritePointerEvent & {
          type: 'pointerover';
          target: am5hierarchy.ForceDirected;
        }
      ) => {
        //console.log(event.target.labels.template);
        event.target.toFront();
      }
    );

    series.labels.template.setAll(labeSettings);

    // CIRCLES
    const circles = series.circles.template;

    const circleSetting: am5.ICircleSettings = {
      fillOpacity: 1,
      stroke: Color.fromString('#ffffff'),
      strokeWidth: 0,
      strokeOpacity: 0,
      scale: 1,
    };

    circles.setAll(circleSetting);

    circles.adapters.add(
      'fill',
      (
        fill: am5.Color | undefined,
        target: am5.Circle
      ): am5.Color | undefined => {
        if (target && target.dataItem?.dataContext) {
          const item = target.dataItem?.dataContext as ForceDirectedData;
          const groupColor = GroupsColors.find(
            (colorgroup) => colorgroup.group === item['type']
          );
          let color: am5.Color | undefined;
          if (groupColor) {
            color = am5.color(groupColor.color);
          } else if (fill) {
            color = fill;
          }
          return color;
        }
      }
    );

    circles.states.create('hover', {
      fillOpacity: 1,
      strokeWidth: 1.5,
      strokeOpacity: 1,
      scale: 1.3,
      layer: 10000,
      stateAnimationDuration: 300,
    });

    // circles.events.on(
    //   'pointerover',
    //   (
    //     event: am5.ISpritePointerEvent & {
    //       type: 'pointerover';
    //       target: am5.Circle;
    //     }
    //   ) => {
    //     event.target.toFront();
    //   }
    // );

    circles.events.on(
      'click',
      (
        ev: am5.ISpritePointerEvent & {
          type: 'click';
          target: am5.Circle;
        }
      ) => {
        console.log(ev.target);
        const currentCircle = ev.target.dataItem
          ?.dataContext as ForceDirectedData;
        if (currentCircle?.type && customData?.children) {
          changeGroupFilter(
            groupFilter.current === 'all' ? currentCircle?.type : 'all',
            true
          );
        }
      }
    );

    series.outerCircles.template.setAll({
      strokeWidth: 2,
      stroke: am5.color('#ffff00'),
    });
    // -----

    // NODES
    const nodes = series.nodes.template;

    nodes.setAll({
      draggable: false,
      toggleKey: 'none',
      tooltipText: '',
      cursorOverStyle: 'zoom-in',
    });

    series.data.setAll([chartData]);
    series.set('selectedDataItem', series.dataItems[0]);
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartId, chartData, customData.children]);

  useEffect(
    () => () =>
      customChartEvent.remove([chartEvents.FILTER], [changeGroupListener]),
    []
  );

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <div
          id={chartId}
          className={'am_chart force_chart'}
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
export default ForceDirectedChart;
