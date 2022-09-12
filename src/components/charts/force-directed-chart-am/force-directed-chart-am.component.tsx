import {
  ForceDirected,
  ForceDirectedData,
  ForceDirectedProps,
} from '@typings/charts';
import React, {
  FC,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import { Color } from '@amcharts/amcharts5';
import { GroupsColors } from 'src/utils/configurations/chart-config';
// import { faker } from "@faker-js/faker";

const ForceDirectedchart: FC<ForceDirectedProps> = ({
  size = 'responsive',
  customData,
}) => {
  const chartId = useId();
  const [chartData, setChartData] = useState<ForceDirected>({
    value: 0,
    name: 'Root',
    children: [],
  });
  //const chartRef = useRef(null);

  const generateLabel = (
    settings: am5.ILabelSettings
  ): Partial<am5.ILabelSettings> => {
    return {
      fontSize: 12,
      //fill: am5.color(0x550000),
      oversizedBehavior: 'truncate',
      breakWords: true,
      textAlign: 'center',
      lineHeight: 1.5,
      populateText: true,
      ...settings,
    };
  };

  const groupFilter = useRef('all');

  useEffect(() => {
    if (customData) {
      setChartData(customData);
    }
  }, [customData]);

  useLayoutEffect(() => {
    const root: am5.Root = am5.Root.new(chartId);

    // THEME CHART
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
        initialDepth: 3,
        downDepth: 10,
        topDepth: 2,
        manyBodyStrength: -1,
        //centerStrength: 0.7,
        nodePadding: 0,
        minRadius: 5,
        maxRadius: am5.percent(5),
        //linkWithField: "type"
      })
    );
    const labeSettings: Partial<am5.ILabelSettings> = generateLabel({
      text: '[bold]{type}[/]\n{category}\n{sum}%',
      oversizedBehavior: 'fit',
      minScale: 5,
      layer: 100000,
    });
    series.labels.template.setAll(labeSettings);
    series.hideTooltip();

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

    circles.adapters.add('fill', (fill, target: am5.Circle) => {
      if (target && target.dataItem?.dataContext) {
        const item = target.dataItem?.dataContext as ForceDirectedData;
        const groupColor = GroupsColors.find(
          (colorgroup) => colorgroup.group === item['type']
        );
        if (groupColor) {
          return am5.color(groupColor.color);
        } else {
          return fill;
        }
      }
    });

    circles.states.create('hover', {
      fillOpacity: 1,
      strokeWidth: 1.5,
      strokeOpacity: 1,
      scale: 1.3,
      layer: 10000,
      stateAnimationDuration: 300,
    });

    circles.events.on(
      'pointerover',
      (
        event: am5.ISpritePointerEvent & {
          type: 'pointerover';
          target: am5.Circle;
        }
      ) => {
        event.target.toFront();
      }
    );

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
          groupFilter.current =
            groupFilter.current === 'all' ? currentCircle?.type : 'all';
          setChartData({
            ...chartData,
            children: customData.children.filter((circle) =>
              groupFilter.current === 'all'
                ? true
                : circle.type === groupFilter.current
            ),
          });
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
    });

    series.data.setAll([chartData]);
    series.set('selectedDataItem', series.dataItems[0]);
    series.appear(1000, 100);

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
