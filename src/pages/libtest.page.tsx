import React, { useState, FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import FlourishChart from '@components/charts/flourish-chart';
import { CardBox } from '@components/card-box';

interface FlourishChartTypes {
  id: string;
}

const charts: FlourishChartTypes[] = [
  // {
  //   id: 'map',
  // },
  // {
  //   id: 'line-race',
  // },
  {
    id: 'line',
  },
  {
    id: 'bubble',
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

const LibTest: FC = () => {
  const [chartType, setChartType] = useState<FlourishChartTypes>(charts[0]);

  const { t } = useTranslation();

  const changeChart = (target: EventTarget & HTMLSelectElement) => {
    const selected = charts.find(
      (chart: FlourishChartTypes) => chart.id === target.value
    );
    if (selected) {
      setChartType(selected);
    }
  };

  const renderSwitch = (chart: FlourishChartTypes) => {
    let dataSrc = '';

    switch (chart.id) {
      case 'map':
        dataSrc = '11137799';
        break;
      case 'line-race':
        dataSrc = '11069148';
        break;
      case 'line':
        dataSrc = '11157049';
        break;
      case 'bubble':
        dataSrc = '11160788';
        break;
      case 'doughnut':
        dataSrc = '11159750';
        break;
      case 'bar':
        dataSrc = '11159892';
        break;
      case 'linearea':
        dataSrc = '11160102';
        break;
      case 'scatter':
        dataSrc = '11160679';
        break;
      case 'horizontalbar':
        dataSrc = '11160304';
        break;
      default:
        return <div>No charts</div>;
    }

    return <FlourishChart dataId={dataSrc} />;
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

export default LibTest;
