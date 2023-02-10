import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { chartConfigurations, yAxeRight } from '../utils';
import {
  BarChartData,
  ChartInfoProps,
  Charts,
  DoughnutData,
  ForceDirected,
  LineData,
} from '@typings/charts.d';
import {
  ChartData,
  ChartOptions,
  ComplexFillTarget,
  TitleOptions,
} from 'chart.js';
import { Trans, useTranslation } from 'react-i18next';
import {
  LineChart,
  PieChart,
  DoughnutChart,
  ScatterChart,
  CircularPacking,
  GaugeChart,
  ForceDirectedChart,
  LineChartAm,
  BarChartCjs,
} from '@components/charts';
import chartDataGenerator, {
  d3ChartDataGenerator,
  AMChartDataGenerator,
} from 'src/utils/generators/generators';
import { colorsDefaults } from 'src/utils/configurations/chart-config';
import DoughnutChartAM from '@components/charts/doughnut-chart-am/doughnut-chart-am.component';
import { Logo } from '@components/logo';
import BarChartAm from '@components/charts/bar-chart-am/bar-chart-am.component';
import { CardBox } from '@components/card-box';

const hideCharts: Charts[] = [
  'pie',
  'doughnut',
  'D3_circular',
  'gauge',
  'horizontalbar',
  'linearea',
  'am_bar',
];

const charts: ChartInfoProps[] = [
  {
    id: 'line',
    lib: 'chart_js',
  },
  {
    id: 'am_linearea',
    lib: 'am_charts',
  },
  {
    id: 'pie',
    lib: 'chart_js',
  },
  {
    id: 'doughnut',
    lib: 'chart_js',
  },
  {
    id: 'am_doughnut',
    lib: 'am_charts',
  },
  {
    id: 'bar',
    lib: 'chart_js',
  },
  {
    id: 'am_bar',
    lib: 'am_charts',
  },
  {
    id: 'linearea',
    lib: 'chart_js',
  },
  {
    id: 'scatter',
    lib: 'chart_js',
  },
  {
    id: 'horizontalbar',
    lib: 'chart_js',
  },
  {
    id: 'D3_circular',
    lib: 'd3',
  },
  {
    id: 'gauge',
    lib: 'chart_js',
  },
  {
    id: 'force_directed',
    lib: 'am_charts',
  },
];

const title: Partial<TitleOptions> = {
  display: true,
  text: 'Custom title',
};

const customLineOptions: ChartOptions<'line'> = {
  plugins: {
    title,
    tooltip: {
      enabled: true,
      yAlign: 'bottom',
      usePointStyle: true,
      position: 'nearest',
      xAlign: 'right',
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        mode: 'x',
      },
    },
    legend: {
      position: 'left' as const,
    },
  },
  scales: {
    y: yAxeRight,
  },
  interaction: {
    intersect: false,
  },
  elements: {
    line: {
      borderWidth: 1.5,
      tension: 0.1,
    },
  },
};

const customDoughnutOptions: ChartOptions<'doughnut'> = {
  cutout: '75%',

  plugins: {
    title,
    legend: {
      position: 'left' as const,
    },
  },
};

const customPieOptions: ChartOptions<'pie'> = {
  plugins: {
    title,
    tooltip: {
      backgroundColor: '#FFF',
      boxHeight: 20,
      boxWidth: 20,
      bodyColor: '#333',
      bodyFont: { weight: 'bold' },
      borderColor: '#f4f4f4',
    },
  },
};

let customBarOptions: ChartOptions<'bar'> = {
  responsive: true,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    title,
    legend: {
      position: 'right' as const,
    },
  },
};

const customScatterOptions: ChartOptions<'scatter'> = {
  scales: {
    x: {
      ticks: { stepSize: 1 },
      max: 100,
      min: -100,
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 5 },
      max: 100,
      min: -100,
      //grid: { display: false }
    },
  },
  plugins: {
    title,
    legend: {
      position: 'right' as const,
    },
  },
};

const customGaugeOptions: ChartOptions<'doughnut'> = {
  //remove click event to prevent the removal of datasets from legend
  events: [
    'mousemove',
    'mouseout',
    // 'click',
    'touchstart',
    'touchmove',
  ],
  //remove animation to avoid chart flickering and rotation
  animation: false,

  cutout: '90%',
  rotation: 270,
  circumference: 180,
  plugins: {
    title,
    // tooltip: {
    //   enabled: false
    // }
  },
};

const customDoughnutData = chartDataGenerator(1, 4, 'doughnut', [
  '#0780eb',
  '#ffa33f',
  '#22dbbc',
  '#ff4aad',
]) as ChartData<'doughnut'>;

const customGaugeData = chartDataGenerator(1, 1, 'gauge', [
  '#0780eb',
]) as ChartData<'doughnut'>;

let customLineData: ChartData;
let customBarData: ChartData;

const customPieData = chartDataGenerator(1, 3, 'pie') as ChartData<'pie'>;

const customScatterData = chartDataGenerator(
  5,
  1,
  'scatter',
  colorsDefaults
) as ChartData<'scatter'>;

const circularPackingData = d3ChartDataGenerator('D3_circular');

const customForceDirectedData = AMChartDataGenerator(
  'force_directed',
  20
) as ForceDirected;

const customAmLinechartData = AMChartDataGenerator(
  'am_linearea'
) as LineData[][];

const customAmdoughnutData = AMChartDataGenerator('am_doughnut', 100, [
  'Cash',
  'Equity',
  'Bond',
  'Altro',
]) as DoughnutData[];

const customAmBarData = AMChartDataGenerator('am_bar') as BarChartData[];

let customFill: ComplexFillTarget | undefined;
const renderSwitch = (chart: ChartInfoProps) => {
  // const description = i18n.t(`charts.${chart.id}.description`);

  switch (chart.id) {
    case 'line':
    case 'linearea':
      if (chart.id === 'linearea') {
        customLineData = chartDataGenerator(
          1,
          50,
          chart.id,
          colorsDefaults,
          100
        );
        customFill = {
          target: 'origin',
          above: '',
          below: '',
        };
      } else {
        customFill = undefined;
        customLineData = chartDataGenerator(
          5,
          50,
          chart.id,
          colorsDefaults,
          100
        );
      }
      return (
        <LineChart
          size='responsive'
          customOptions={customLineOptions}
          customData={customLineData as ChartData<'line'>}
          customFill={customFill}
          showAlwaysTooltip={chart.id === 'line'}
        />
      );
    case 'pie':
      return (
        <PieChart
          size='responsive'
          customOptions={customPieOptions}
          customData={customPieData}
        />
      );

    case 'doughnut':
      return (
        <DoughnutChart
          size='responsive'
          customOptions={customDoughnutOptions}
          customData={customDoughnutData}
        />
      );
    case 'bar':
    case 'horizontalbar':
      if (chart.id === 'horizontalbar') {
        customBarOptions = { ...customBarOptions, indexAxis: 'y' as const };
        customBarData = chartDataGenerator(5, 1, chart.id, colorsDefaults);
      } else {
        customBarOptions = { ...customBarOptions, indexAxis: 'x' as const };
        customBarData = chartDataGenerator(5, 2, chart.id, colorsDefaults);
      }
      return (
        <BarChartCjs
          size='responsive'
          customOptions={customBarOptions}
          customData={customBarData as ChartData<'bar'>}
        />
      );
    case 'scatter':
      return (
        <ScatterChart
          size='responsive'
          customOptions={customScatterOptions}
          customData={customScatterData}
        />
      );
    case 'D3_circular':
      return (
        <CircularPacking data={circularPackingData} width={500} height={600} />
      );
    case 'gauge':
      return (
        <GaugeChart
          size='responsive'
          customOptions={customGaugeOptions}
          customData={customGaugeData}
        />
      );
    case 'force_directed':
      return <ForceDirectedChart customData={customForceDirectedData} />;
    case 'am_doughnut':
      return (
        <DoughnutChartAM
          customData={customAmdoughnutData}
          customOptions={{ hideLegend: false }}
        />
      );
    case 'am_bar':
      return <BarChartAm customData={customAmBarData} />;
    case 'am_linearea':
      return <LineChartAm customData={customAmLinechartData} />;

    default:
      return <div>No chart</div>;
  }
};

const Home: FC = () => {
  const [chartType, setChartType] = useState<ChartInfoProps>(charts[0]);

  const { t } = useTranslation();

  chartConfigurations();

  const changeChart = (target: EventTarget & HTMLSelectElement) => {
    const selected = charts.find(
      (chart: ChartInfoProps) => chart.id === target.value
    );
    if (selected) {
      setChartType(selected);
    }
  };

  return (
    <Container>
      <Row className='justify-content-center mb-4 mt-4 align-items-center'>
        <Col xs={8}>
          <Form.Select
            aria-label='Chart selection'
            value={chartType.id}
            onChange={(event) => changeChart(event.target)}
          >
            {charts
              .filter((chart) => hideCharts.indexOf(chart.id) < 0)
              .map((chart) => {
                return (
                  <option value={chart.id} key={chart.id}>
                    {t(`charts.${chart.id}.label`)}
                  </option>
                );
              })}
          </Form.Select>
        </Col>
        <Col xs='auto'>
          <Logo libType={chartType.lib}></Logo>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} lg={10}>
          {renderSwitch(chartType)}
        </Col>
      </Row>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} lg={10}>
          <CardBox bg={'light'} text={'secondary'}>
            {' '}
            <Trans i18nKey={`charts.${chartType.id}.description`}></Trans>
          </CardBox>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
