import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import LineChart from '@components/charts/LineChart';
import PieChart from '@components/charts/PieChart';
import DoughnutChart from '@components/charts/Doughtnut';
import BarChart from '@components/charts/BarChart';
import { chartConfigurations } from '../utils';
import { Charts } from '@typings/charts.d';
import { ChartData, ChartOptions } from 'chart.js';
import { faker } from '@faker-js/faker';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';

export type ChartProps = {
  id: Charts;
};

const charts: ChartProps[] = [
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
];

const customLineOptions: ChartOptions<'line'> = {
  plugins: {
    title: {
      display: true,
      text: 'Custom title',
    },
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

const customBarOptions: ChartOptions<'bar'> = {
  plugins: {
    title: {
      display: true,
      text: 'Custom title',
    },
  },
};

const customLabels = ['custom1', 'custom2', 'custom3'];

const customDoughnutData: ChartData<'doughnut'> = {
  labels: customLabels,
  datasets: [
    {
      label: 'custom',
      data: [1, 4, 7],
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: customLabels.map(() => faker.color.rgb()),
      hoverOffset: 20,
    },
  ],
};

const renderSwitch = (chart: ChartProps) => {
  const description = i18n.t(`charts.${chart.id}.description`);
  switch (chart.id) {
    case 'line':
      return (
        <LineChart
          size='md'
          description={description}
          customOptions={customLineOptions}
        />
      );
    case 'pie':
      return (
        <PieChart
          size='xs'
          description={description}
          customOptions={customPieOptions}
        />
      );

    case 'doughnut':
      return (
        <DoughnutChart
          size='xl'
          description={description}
          customOptions={customDoughnutOptions}
          customData={customDoughnutData}
        />
      );

    case 'bar':
      return (
        <BarChart
          size='md'
          description={description}
          customOptions={customBarOptions}
        />
      );
    default:
      return <div>no chart</div>;
  }
};

const Home: FC = () => {
  const [chartType, setChartType] = useState<ChartProps>(charts[0]);
  const { t } = useTranslation();

  chartConfigurations();

  const changeChart = (target: EventTarget & HTMLSelectElement) => {
    const selected = charts.find(
      (chart: ChartProps) => chart.id === target.value
    );
    if (selected) {
      setChartType(selected);
    }
    console.log('chart selected ', chartType);
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
