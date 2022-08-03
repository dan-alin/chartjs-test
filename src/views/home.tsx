import React, { useState } from 'react';

import type { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import LineChart from '@components/charts/LineChart';

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
    id: 'pieAndSliced',
    label: 'Pie and Sliced Charts',
  },
];

const renderSwitch = (chart: ChartProps) => {
  switch (chart.id) {
    case 'line':
      return <LineChart />;
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
            onChange={(event) => changeChart(event.target)}
          >
            <option>Select chart theme</option>
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
      <Row>
        <Col>{renderSwitch(chartType)}</Col>
      </Row>
    </Container>
  );
};

export default Home;
