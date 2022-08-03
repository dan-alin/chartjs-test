import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import LineChart from '@components/charts/LineChart';
import PieChart from '@components/charts/PieChart';
import DoughnutChart from '@components/charts/Doughtnut';
import BarChart from '@components/charts/BarChart';

export type ChartProps = {
  id: string;
  label: string;
};

const charts: ChartProps[] = [
  {
    id: 'line',
    label: 'Line Chart',
  },
  {
    id: 'pie',
    label: 'Pie Chart',
  },
  {
    id: 'doughnut',
    label: 'Doughnut Chart',
  },
  {
    id: 'bar',
    label: 'Bar Chart',
  },
];

const renderSwitch = (chart: ChartProps) => {
  switch (chart.id) {
    case 'line':
      return <LineChart />;
    case 'pie':
      return <PieChart />;
    case 'doughnut':
      return <DoughnutChart />;
    case 'bar':
      return <BarChart />;
    default:
      return <LineChart />;
  }
};

const Home: FC = () => {
  const [chartType, setChartType] = useState<ChartProps>(charts[0]);

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
      <Row className='justify-content-center'>
        <Col>
          <h2 className='mb-4 h2'>{chartType.label}</h2>
          <Form.Select
            aria-label='Theme selection'
            value={chartType.id}
            onChange={(event) => changeChart(event.target)}
          >
            {charts.map((chart) => {
              return (
                <option value={chart.id} key={chart.id}>
                  {chart.label}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12}>{renderSwitch(chartType)}</Col>
      </Row>
    </Container>
  );
};

export default Home;
