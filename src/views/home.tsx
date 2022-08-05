import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import LineChart from '@components/charts/LineChart';
import PieChart from '@components/charts/PieChart';
import DoughnutChart from '@components/charts/Doughtnut';
import BarChart from '@components/charts/BarChart';
import { chartConfigurations, yAxeRight } from '../utils';
import { ChartInfoProps } from '@typings/charts.d';
import { ChartData, ChartOptions } from 'chart.js';
import { faker } from '@faker-js/faker';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';

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
];

const customLineOptions: ChartOptions<'line'> = {
  plugins: {
    title: {
      display: true,
      text: 'Custom title',
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
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: customLabels.map(() => faker.color.rgb()),
      hoverOffset: 20,
    },
  ],
};

const customLineData: ChartData<'line'> = {
  labels: customLabels,
  datasets: [
    {
      label: 'custom',
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: faker.color.rgb(),
      backgroundColor: customLabels.map(() => faker.color.rgb()),
    },

    {
      label: 'custom 2',
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: faker.color.rgb(),
      backgroundColor: customLabels.map(() => faker.color.rgb()),
    },
  ],
};

const customBarData: ChartData<'bar'> = {
  labels: customLabels,
  datasets: [
    {
      label: 'custom',
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: faker.color.rgb(),
      backgroundColor: customLabels.map(() => faker.color.rgb()),
    },
    {
      label: 'custom 2',
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: faker.color.rgb(),
      backgroundColor: customLabels.map(() => faker.color.rgb()),
    },
    {
      label: 'custom 3',
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: faker.color.rgb(),
      backgroundColor: customLabels.map(() => faker.color.rgb()),
    },
  ],
};

const customPieData: ChartData<'pie'> = {
  labels: customLabels,
  datasets: [
    {
      label: 'custom',
      data: customLabels.map(() => faker.datatype.number()),
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: customLabels.map(() => faker.color.rgb()),
    },
  ],
};

const renderSwitch = (chart: ChartInfoProps) => {
  const description = i18n.t(`charts.${chart.id}.description`);
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
          size='xl'
          description={description}
          customOptions={customDoughnutOptions}
          customData={customDoughnutData}
        />
      );

    case 'bar':
      return (
        <BarChart
          size='xl'
          description={description}
          customOptions={customBarOptions}
          customData={customBarData}
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
