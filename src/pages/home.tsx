import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { chartConfigurations, yAxeRight } from '../utils';
import { ChartInfoProps } from '@typings/charts.d';
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
  BarChart,
  ScatterChart,
  CircularPacking,
  GaugeChart,
} from '@components/charts';
import chartDataGenerator, {
  d3ChartDataGenerator,
} from 'src/utils/generators/generators';
import { CardBox } from '@components/card-box';
import { colorsDefaults } from 'src/utils/configurations/chart-config';

const charts: ChartInfoProps[] = [
  {
    id: 'line',
  },
  // {
  //   id: 'pie',
  // },
  {
    id: 'doughnut',
  },
  {
    id: 'bar',
  },
  {
    id: 'linearea',
  },
  {
    id: 'scatter',
  },
  {
    id: 'horizontalbar',
  },
  {
    id: 'D3_circular',
  },
  {
    id: 'gauge',
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
          size='xl'
          customOptions={customLineOptions}
          customData={customLineData as ChartData<'line'>}
          customFill={customFill}
          showAlwaysTooltip={chart.id === 'line'}
        />
      );
    case 'pie':
      return (
        <PieChart
          size='xs'
          customOptions={customPieOptions}
          customData={customPieData}
        />
      );

    case 'doughnut':
      return (
        <DoughnutChart
          size='xs'
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
        <BarChart
          size='xl'
          customOptions={customBarOptions}
          customData={customBarData as ChartData<'bar'>}
        />
      );
    case 'scatter':
      return (
        <ScatterChart
          size='md'
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
          size='xs'
          customOptions={customGaugeOptions}
          customData={customGaugeData}
        />
      );
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
      <Row className='justify-content-center mb-4 mt-4'>
        <Col>
          <Form.Select
            aria-label='Chart selection'
            value={chartType.id}
            onChange={(event) => changeChart(event.target)}
          >
            {charts.map((chart) => {
              return (
                <option value={chart.id} key={chart.id}>
                  {t(`charts.${chart.id}.label`)}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} lg={10}>
          <CardBox bg={'secondary'} text={'white'}>
            {' '}
            <Trans i18nKey={`charts.${chartType.id}.description`}></Trans>
          </CardBox>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} lg={10}>
          {renderSwitch(chartType)}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;