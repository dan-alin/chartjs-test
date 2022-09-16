import React, { useState, FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import FlourishChart from '@components/charts/flourish-chart';
import { CardBox } from '@components/card-box';
import { Logo } from '@components/index';
import { ChartInfoProps } from '@typings/charts';

const charts: ChartInfoProps[] = [
  // {
  //   id: 'map',
  // },
  // {
  //   id: 'line-race',
  // },
  {
    id: 'line',
    lib: 'flourish',
    dataSrc: '11157049',
  },
  {
    id: 'bubble',
    lib: 'flourish',
    dataSrc: '11191376',
  },
  {
    id: 'doughnut',
    lib: 'flourish',
    dataSrc: '11159750',
  },
  {
    id: 'bar',
    lib: 'flourish',
    dataSrc: '11159892',
  },
  {
    id: 'linearea',
    lib: 'flourish',
    dataSrc: '11160102',
  },
  // {
  //   id: 'scatter',
  //   lib: 'flourish'

  // },
  // {
  //   id: 'horizontalbar',
  //   lib: 'flourish'

  // }
];

const Flourish: FC = () => {
  const [chartType, setChartType] = useState<ChartInfoProps>(charts[0]);

  const { t } = useTranslation();

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
        <Col xs={8}>
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
        <Col xs='auto'>
          <Logo libType={chartType.lib}></Logo>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} lg={10}>
          <FlourishChart dataId={chartType.dataSrc} customOptions={{}} />
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

export default Flourish;
