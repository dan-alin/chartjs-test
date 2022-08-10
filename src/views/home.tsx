import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { chartConfigurations, yAxeRight } from '../utils';
import { ChartInfoProps } from '@typings/charts.d';
import { ChartData, ChartOptions, ComplexFillTarget } from 'chart.js';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';
import {
  LineChart,
  PieChart,
  DoughnutChart,
  BarChart,
} from '@components/charts';
import chartDataGenerator from 'src/utils/generators/generators';
import ScatterChart from '@components/charts/ScatterChart';

const charts: ChartInfoProps[] = [
  {
    id: 'line',
  },
  {
    id: 'pie',
  },
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
];

const customLineOptions: ChartOptions<'line'> = {
  plugins: {
    title: {
      display: true,
      text: 'Custom title',
    },
    tooltip: {
      yAlign: 'bottom',
      usePointStyle: true,
      position: 'myCustomPositioner',
    },
  },
  scales: {
    y: yAxeRight,
  },
  interaction: {
    intersect: false,
  },
};

const customDoughnutOptions: ChartOptions<'doughnut'> = {
  cutout: '85%',
  plugins: {
    title: {
      display: true,
      text: 'Custom title',
    },
  },
};

const customPieOptions: ChartOptions<'pie'> = {
  plugins: {
    title: {
      display: true,
      text: 'Custom title',
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
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
    legend: {
      position: 'right' as const,
    },
  },
};

const customScatterOptions: ChartOptions<'scatter'> = {
  scales: {
    x: {
      ticks: { stepSize: 1 },
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 10 },
      //grid: { display: false }
    },
  },
};

const customDoughnutData: ChartData<'doughnut'> = chartDataGenerator(
  1,
  3,
  'doughnut'
) as ChartData<'doughnut'>;

const customLineData: ChartData<'line'> =
  chartDataGenerator() as ChartData<'line'>;

const customLineAreaData: ChartData<'line'> = chartDataGenerator(
  1,
  12
) as ChartData<'line'>;

let customBarData: ChartData;

const customPieData: ChartData<'pie'> = chartDataGenerator(
  1,
  3,
  'pie'
) as ChartData<'pie'>;

const customScatterData: ChartData<'scatter'> = chartDataGenerator(
  3,
  9,
  'scatter'
) as ChartData<'scatter'>;

const renderSwitch = (chart: ChartInfoProps) => {
  const description = i18n.t(`charts.${chart.id}.description`, {
    interpolation: { escapeValue: false },
  });
  switch (chart.id) {
    case 'line':
      return (
        <LineChart
          size='xl'
          description={description}
          customOptions={customLineOptions}
          customData={customLineData}
        />
      );
    case 'pie':
      return (
        <PieChart
          size='xs'
          description={description}
          customOptions={customPieOptions}
          customData={customPieData}
        />
      );

    case 'doughnut':
      return (
        <DoughnutChart
          size='xs'
          description={description}
          customOptions={customDoughnutOptions}
          customData={customDoughnutData}
        />
      );
    case 'bar':
    case 'horizontalbar':
      if (chart.id === 'horizontalbar') {
        customBarOptions = { ...customBarOptions, indexAxis: 'y' as const };
        customBarData = chartDataGenerator(2, 5);
      } else {
        customBarOptions = { ...customBarOptions, indexAxis: 'x' as const };
        customBarData = chartDataGenerator(3, 4);
      }
      return (
        <BarChart
          size='xl'
          description={description}
          customOptions={customBarOptions}
          customData={customBarData as ChartData<'bar'>}
        />
      );
    case 'linearea': {
      const areaFill: ComplexFillTarget = {
        target: 'origin',
        above: '',
        below: '',
      };
      return (
        <LineChart
          size='xl'
          description={description}
          customOptions={customLineOptions}
          customData={customLineAreaData}
          customFill={areaFill}
        />
      );
    }
    case 'scatter':
      return (
        <ScatterChart
          size='md'
          description={description}
          customOptions={customScatterOptions}
          customData={customScatterData}
        />
      );
    default:
      return <div>no chart</div>;
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
    console.log('chart selected ', selected);
  };

  return (
    <Container>
      <Row className='justify-content-center mb-4'>
        <Col>
          <h2 className='mb-4 h2 text-center'>{t('title')}</h2>
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
          {renderSwitch(chartType)}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
